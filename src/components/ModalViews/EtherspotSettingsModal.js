import "./EtherspotSettingsModal.css";
import { t, Trans } from "@lingui/macro";
import Button from "components/Button/Button";
import ModalWithPortal from "../Modal/ModalWithPortal";
import React, { useState } from "react";
import { useCopyToClipboard } from "react-use";
import {
  useEtherspotTransactions,
  useWalletAddress
} from "@etherspot/transaction-kit";
import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

// images
import copy from "../../img/ic_copy_16.svg";

// components
import Tab from "../Tab/Tab";
import Tooltip from "../Tooltip/Tooltip";
import BuyInputSection from "../BuyInputSection/BuyInputSection";
import TokenSelector from "../Exchange/TokenSelector";
import { helperToast } from "../../lib/helperToast";

// constants
import { ErrorCode, ErrorDisplayType } from "../Exchange/constants";

// hooks
import useEtherspotUiConfig from "../../hooks/useEtherspotUiConfig";

// lib
import {
  bigNumberify,
  formatAmount,
  formatAmountFree,
  parseValue
} from "../../lib/numbers";
import {
  DUST_BNB,
  USD_DECIMALS,
} from "../../lib/legacy";
import { useChainId } from "../../lib/chains";
import { sendNativeValue } from "../../lib/wallets";

// utils
import { getContract } from "../../config/contracts";
import { getTokenInfo, getUsd, useInfoTokens } from "../../domain/tokens";
import Reader from "../../abis/ReaderV2.json";
import Token from "../../abis/Token.json";
import { callContract, contractFetcher } from "../../lib/contracts";

// config
import {
  getChainName,
  IS_NETWORK_DISABLED,
  isSupportedChain
} from "../../config/chains";
import { getToken, getTokens, getWhitelistedTokens } from "../../config/tokens";

const DEPOSIT = "Deposit";
const WITHDRAW = "Withdraw";
const EDIT_OPTIONS = [DEPOSIT, WITHDRAW];
const EDIT_OPTIONS_LABELS = {
  [DEPOSIT]: t`Deposit`,
  [WITHDRAW]: t`Withdraw`,
};
const ERROR_TOOLTIP_MSG = {
  [ErrorCode.InvalidLiqPrice]: t`Liquidation price would cross mark price.`,
  [ErrorCode.InsufficientDepositAmount]: t`Deposit amount is insufficient to bring leverage below the max allowed leverage of 100x`,
};

const { AddressZero } = ethers.constants;

export function EtherspotSettingsModal({
  isEtherspotModalOpen,
  setIsEtherspotModalOpen,
}) {
  const [tokenAddress, setTokenAddress] = useState(AddressZero);
  const [option, setOption] = useState(DEPOSIT);
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isEtherspotWallet, setIsEtherspotWallet, etherspotIntroDisplayed, setEtherspotIntroDisplayed } = useEtherspotUiConfig();
  const { active, library } = useWeb3React();
  const { chainId } = useChainId();
  const { getEtherspotPrimeSdkForChainId } = useEtherspotTransactions();

  const [, copyToClipboard] = useCopyToClipboard();

  const etherspotPrimeAccount = useWalletAddress("etherspot-prime");
  const providerAccount = useWalletAddress("provider");

  const nativeTokenAddress = getContract(chainId, "NATIVE_TOKEN");
  const vaultAddress = getContract(chainId, "Vault");
  const readerAddress = getContract(chainId, "Reader");

  const tokens = getTokens(chainId);
  const tokenAddresses = tokens.map((token) => token.address);

  const whitelistedTokens = getWhitelistedTokens(chainId);
  const whitelistedTokenAddresses = whitelistedTokens.map((token) => token.address);

  const isDeposit = option === DEPOSIT;
  const isWithdrawal = option === WITHDRAW;

  const balancesAccount = isDeposit ? etherspotPrimeAccount : providerAccount;

  const { data: tokenBalances } = useSWR(balancesAccount && active && [active, chainId, readerAddress, "getTokenBalances", balancesAccount], {
    fetcher: contractFetcher(library, Reader, [tokenAddresses]),
  });

  const { data: fundingRateInfo } = useSWR([active, chainId, readerAddress, "getFundingRates"], {
    fetcher: contractFetcher(library, Reader, [vaultAddress, nativeTokenAddress, whitelistedTokenAddresses]),
  });

  const { infoTokens } = useInfoTokens(library, chainId, active, tokenBalances, fundingRateInfo);

  const tokenInfo = getTokenInfo(infoTokens, tokenAddress);

  const token = getToken(chainId, tokenAddress);

  const resetForm = () => {
    setValue("");
    setTokenAddress(AddressZero);
  };

  const etherspotModalLabel = etherspotIntroDisplayed
    ? t`Deposit to your Account Abstraction wallet for following tokens on Arbitrum`
    : t`Account Abstraction`;

  const balance = tokenInfo ? tokenInfo.balance : bigNumberify(0);

  const amount = parseValue(value, token && token.decimals);
  const fromUsdMin = getUsd(amount, tokenAddress, false, infoTokens);

  const resetEtherspotPrimeTransactions = async () => {
    const etherspotPrimeSdk = await getEtherspotPrimeSdkForChainId(42161);

    if (!etherspotPrimeSdk) {
      helperToast.error(t`No Etherspot Prime SDK found for chainId 42161`);
      return;
    }

    try {
      await etherspotPrimeSdk.clearUserOpsFromBatch();
    } catch (e) {
      helperToast.error(t`Failed to reset Etherspot Prime transactions!`);
      // eslint-disable-next-line no-console
      console.warn("Failed to reset Etherspot Prime transactions: ", e);
    }
  };

  const onClickPrimary = async () => {
    setIsSubmitting(true);

    if (isWithdrawal) {
      await resetEtherspotPrimeTransactions();
    }

    const receiver = isWithdrawal ? providerAccount : etherspotPrimeAccount;
    const sender = isWithdrawal ? etherspotPrimeAccount : providerAccount;
    const successAction = isDeposit ? "Deposited" : "Withdrawn";

    if (tokenAddress === AddressZero) {
      try {
        await sendNativeValue(library.getSigner(), chainId, receiver, amount, {
          sender,
          sentMsg: t`${option} transaction submitted!`,
          successMsg: t`${successAction} ${formatAmount(amount, tokens.decimals, 4, true)} ${
            token.symbol
          }!`,
          failMsg: t`${option} failed.`,
          etherspotPrimeSdk: isWithdrawal && await getEtherspotPrimeSdkForChainId(42161),
        });
      } catch (e) {
        //
      }
      setIsSubmitting(false);
      return;
    }

    try {
      const contract = new ethers.Contract(tokenAddress, Token.abi, library.getSigner());
      await callContract(chainId, contract, "transfer", [receiver, amount], {
        sentMsg: t`${option} transaction submitted!`,
        successMsg: t`${successAction} ${formatAmount(amount, tokens.decimals, 4, true)} ${
          token.symbol
        }!`,
        failMsg: t`${option} failed.`,
        etherspotPrimeSdk: isWithdrawal && await getEtherspotPrimeSdkForChainId(42161),
      })
    } catch (e) {
      //
    }
    setIsSubmitting(false);
  };

  function setFromValueToMaximumAvailable() {
    if (!token || !balance) {
      return;
    }

    const nativeToDust = token.isNative && bigNumberify(DUST_BNB).mul(2);
    const maxAvailableAmount = token.isNative && nativeToDust.lt(balance) ? balance.sub(bigNumberify(DUST_BNB).mul(2)) : balance;
    setValue(formatAmountFree(maxAvailableAmount, token.decimals, token.decimals));
  }

  const onValueChange = (e) => {
    setValue(e.target.value);
  };

  const onSelectFromToken = (newToken) => {
    setTokenAddress(newToken.address);
  };

  function shouldShowMaxButton() {
    if (!token || !balance) {
      return false;
    }
    const nativeToDust = token.isNative && bigNumberify(DUST_BNB).mul(2);
    const maxAvailableAmount = token.isNative && nativeToDust.lt(balance) ? balance.sub(bigNumberify(DUST_BNB).mul(2)) : balance;
    return value !== formatAmountFree(maxAvailableAmount, token.decimals, token.decimals);
  }

  const getError = () => {
    if (IS_NETWORK_DISABLED[chainId]) {
      return [t`Swaps disabled, pending ${getChainName(chainId)} upgrade`];
    }

    if (!amount || amount.eq(0)) {
      return [t`Enter an amount`];
    }

    const tokenIfo = getTokenInfo(infoTokens, tokenAddress);
    if (!tokenIfo || !tokenIfo.minPrice) {
      return [t`Incorrect network`];
    }

    if (
      tokenIfo &&
      tokenIfo.balance &&
      amount &&
      amount.gt(tokenIfo.balance)
    ) {
      return [t`Insufficient ${tokenIfo.symbol} balance`];
    }

    return [false];
  };

  const isPrimaryEnabled = () => {
    if (IS_NETWORK_DISABLED[chainId]) {
      return false;
    }
    if (!active) {
      return true;
    }
    const [error, errorType] = getError();
    if (error && errorType !== ErrorDisplayType.Modal) {
      return false;
    }
    if (isSubmitting) {
      return false;
    }

    return true;
  };

  const getPrimaryText = () => {
    if (!active) {
      return t`Connect Wallet`;
    }

    if (!isSupportedChain(chainId)) {
      return t`Incorrect Network`;
    }

    const [error, errorType] = getError();
    if (error && errorType !== ErrorDisplayType.Modal) {
      return error;
    }

    if (isDeposit) {
      return t`Deposit`;
    }

    return t`Withdraw`;
  }

  function renderPrimaryButton() {
    const [errorMessage, errorType, errorCode] = getError();
    const primaryTextMessage = getPrimaryText();
    if (errorType === ErrorDisplayType.Tooltip && errorMessage === primaryTextMessage && ERROR_TOOLTIP_MSG[errorCode]) {
      return (
        <Tooltip
          isHandlerDisabled
          handle={
            <Button variant="primary-action" className="w-full" onClick={onClickPrimary} disabled={!isPrimaryEnabled()}>
              {primaryTextMessage}
            </Button>
          }
          position="center-bottom"
          className="Tooltip-flex"
          renderContent={() => ERROR_TOOLTIP_MSG[errorCode]}
        />
      );
    }
    return (
      <Button
        type="submit"
        variant="primary-action"
        className="w-full"
        onClick={onClickPrimary}
        disabled={!isPrimaryEnabled()}
      >
        {primaryTextMessage}
      </Button>
    );
  }

  return (
    <ModalWithPortal
      className="EtherspotSettingsModal"
      isVisible={isEtherspotModalOpen}
      setIsVisible={setIsEtherspotModalOpen}
      label={etherspotModalLabel}
    >
      {!etherspotIntroDisplayed && (
        <>
          <Trans>Unlock a seamless and hassle-free trading experience with the power of Account Abstraction.</Trans><br/><br/>
          <Trans>All it takes is enabling 1-Click Trading, which allows you to effortlessly create your wallet and deposit tokens.</Trans><br/><br/>
          <Trans>Here's how it works:</Trans><br/><br/>
          <div className="feature-item">
            <span>💰</span>
            <Trans>Deposit your tokens into a self-custodial AA wallet, where you retain full control.</Trans>
          </div>
          <div className="feature-item">
            <span>✍️</span>
            <Trans>Bid farewell to the need for multiple transaction signatures when opening or closing positions.</Trans>
          </div>
          <div className="feature-item">
            <span>👌</span>
            <Trans>Leave behind the requirement for gas tokens; now you can conveniently pay for gas using your tokens.</Trans>
          </div>
          <p className="center secondary">
            <Trans>With <span>Account Abstraction</span>, trading becomes smoother than ever before, ensuring a streamlined process for traders.</Trans>
          </p>
          <Button
            variant="primary-action"
            className="w-full mt-md"
            onClick={() => {
              setEtherspotIntroDisplayed(true);
              setIsEtherspotWallet(true);
            }}
          >
            <Trans>Enable ⚡️ 1-Click Trading</Trans>
          </Button>
        </>
      )}
      {etherspotIntroDisplayed && !!balancesAccount && (
        <>
          <Tab
            options={EDIT_OPTIONS}
            optionLabels={EDIT_OPTIONS_LABELS}
            option={option}
            setOption={setOption}
            onChange={resetForm}
          />
          <div className="Exchange-swap-section-bottom">
            <div className="Exchange-swap-input-container">
              <div className="Exchange-swap-section">
                <div className="Exchange-swap-section-top">
                  <div className="muted">
                    {isDeposit && <Trans>Your Account Abstraction wallet address</Trans>}
                    {isWithdrawal && <Trans>Your wallet address</Trans>}
                  </div>
                </div>
                <div
                  className="wallet-address"
                  onClick={() => {
                    copyToClipboard(balancesAccount);
                    helperToast.success(t`Address copied to your clipboard`);
                  }}
                >
                  <p>{balancesAccount.slice(0, 15)}...{balancesAccount.slice(-16)}</p>
                  <img src={copy} alt="Copy user address" />
                </div>
              </div>
              <BuyInputSection
                topLeftLabel={option}
                topRightLabel={t`Balance`}
                balance={fromUsdMin && `${formatAmount(fromUsdMin, USD_DECIMALS, 2, true)} USD`}
                tokenBalance={balance && `${formatAmount(balance, token.decimals, 4, true)}`}
                onClickTopRightLabel={setFromValueToMaximumAvailable}
                showMaxButton={shouldShowMaxButton()}
                inputValue={value}
                onInputValueChange={onValueChange}
                onClickMax={setFromValueToMaximumAvailable}
              >
                <TokenSelector
                  label={option}
                  chainId={chainId}
                  tokenAddress={tokenAddress}
                  onSelectToken={onSelectFromToken}
                  tokens={tokens}
                  infoTokens={infoTokens}
                  showMintingCap={false}
                  showTokenImgInDropdown={true}
                />
              </BuyInputSection>
              <div className="Exchange-swap-button-container">{renderPrimaryButton()}</div>
            </div>
          </div>
          <Button
            variant="secondary"
            className="w-full mt-md"
            onClick={() => {
              setIsEtherspotWallet(!isEtherspotWallet);
            }}
          >
            <Trans>{isEtherspotWallet ? 'Disable' : 'Enable'} ⚡️ 1-Click Trading</Trans>
          </Button>
        </>
      )}
    </ModalWithPortal>
  );
}

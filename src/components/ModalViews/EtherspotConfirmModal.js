import { t, Trans } from "@lingui/macro";
import { useWeb3React } from "@web3-react/core";
import {
  confirmEtherspotConfirmation,
  rejectEtherspotConfirmation
} from "../../lib/etherspot";
import React from "react";
import Modal from "../Modal/Modal";
import useEtherspotUiConfig from "../../hooks/useEtherspotUiConfig";
import Button from "../Button/Button";
import { formatAmount } from "../../lib/numbers";
import { USD_DECIMALS } from "../../lib/legacy";
import { getUsd, useInfoTokens } from "../../domain/tokens";
import { useChainId } from "../../lib/chains";
import { getContract } from "../../config/contracts";

const EtherspotConfirmModal = () => {
  const {
    confirmEstimation,
  } = useEtherspotUiConfig();


  const { active, library } = useWeb3React();
  const { chainId } = useChainId();
  const { infoTokens } = useInfoTokens(library, chainId, active);

  const estimated = confirmEstimation?.detail

  if (!confirmEstimation || !estimated) return null;

  const gas = estimated.totalGas.mul(estimated.maxFeePerGas);
  const nativeTokenAddress = getContract(chainId, "NATIVE_TOKEN");
  const executionFeeUsd = getUsd(gas, nativeTokenAddress, false, infoTokens);

  return (
    <Modal
      className="EtherspotSettingsModal"
      isVisible={!!confirmEstimation}
      setIsVisible={(visible) => {
        if (visible) return;
        rejectEtherspotConfirmation();
      }}
      label={t`Confirm Transaction`}
    >

      <div className="Exchange-info-row" style={{ marginBottom: 25, marginTop: 10 }}>
        <div className="Exchange-info-label">
          <Trans>Transaction Fee</Trans>
        </div>
        <div className="align-right">
          {formatAmount(gas, 18, 4, true)} ETH
          (${formatAmount(executionFeeUsd, USD_DECIMALS, 2, true)})
        </div>
      </div>
      <Button
        type="submit"
        variant="primary-action"
        className="w-full"
        onClick={confirmEtherspotConfirmation}
      >
        {t`Confirm`}
      </Button>
      <Button
        variant="secondary"
        className="w-full mt-md"
        onClick={rejectEtherspotConfirmation}
      >
        {t`Reject`}
      </Button>
    </Modal>
  )
}

export default EtherspotConfirmModal;

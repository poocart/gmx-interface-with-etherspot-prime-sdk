import React, { useState } from "react";
import Davatar from "@davatar/react";
import { Menu } from "@headlessui/react";
import { t, Trans } from "@lingui/macro";
import { ETH_MAINNET } from "config/chains";
import copy from "img/ic_copy_16.svg";
import externalLink from "img/ic_new_link_16.svg";
import disconnect from "img/ic_sign_out_16.svg";
import { helperToast } from "lib/helperToast";
import { shortenAddress, useENS } from "lib/legacy";
import { useJsonRpcProvider } from "lib/rpc";
import { FaChevronDown } from "react-icons/fa";
import { createBreakpoint, useCopyToClipboard } from "react-use";
import "./AddressDropdown.scss";
import ExternalLink from "components/ExternalLink/ExternalLink";
import ModalWithPortal from "../Modal/ModalWithPortal";
import Button from "../Button/Button";
import useEtherspotUiConfig from "../../hooks/useEtherspotUiConfig";

type Props = {
  account: string;
  accountUrl: string;
  disconnectAccountAndCloseSettings: () => void;
};

function AddressDropdown({ account, accountUrl, disconnectAccountAndCloseSettings }: Props) {
  const useBreakpoint = createBreakpoint({ L: 600, M: 550, S: 400 });
  const breakpoint = useBreakpoint();
  const [, copyToClipboard] = useCopyToClipboard();
  const { ensName } = useENS(account);
  const { provider: ethereumProvider } = useJsonRpcProvider(ETH_MAINNET);
  const [isEtherspotModalOpen, setIsEtherspotModalOpen] = useState(false);
  const { isEtherspotWallet, setIsEtherspotWallet } = useEtherspotUiConfig();

  const etherspotModalLabel = isEtherspotWallet
    ? t`Deposit to your Account Abstraction wallet for following tokens on Arbitrum.`
    : t`Account Abstraction`;

  return (
    <Menu>
      <Menu.Button as="div">
        <button className="App-cta small transparent address-btn">
          <span className={`App-header-etherspot-status-icon${isEtherspotWallet ? ' etherspot-enabled-status' : ''}`} style={{ marginRight: 7 }}>
            ⚡️
          </span>
          <div className="user-avatar">
            {ethereumProvider && <Davatar size={20} address={account} provider={ethereumProvider} />}
          </div>
          <span className="user-address">{ensName || shortenAddress(account, breakpoint === "S" ? 9 : 13)}</span>
          <FaChevronDown />
        </button>
      </Menu.Button>
      <div>
        <Menu.Items as="div" className="menu-items">
          <Menu.Item>
            <div
              className="menu-item"
              onClick={() => setIsEtherspotModalOpen(true)}
            >
              <span className={`App-header-etherspot-status-icon${isEtherspotWallet ? ' etherspot-enabled-status' : ''}`}>
                ⚡️
              </span>
              <p>
                <Trans>1-Click Trading</Trans>
              </p>
            </div>
          </Menu.Item>
          <Menu.Item>
            <div
              className="menu-item"
              onClick={() => {
                copyToClipboard(account);
                helperToast.success(t`Address copied to your clipboard`);
              }}
            >
              <img src={copy} alt="Copy user address" />
              <p>
                <Trans>Copy Address</Trans>
              </p>
            </div>
          </Menu.Item>
          <Menu.Item>
            <ExternalLink href={accountUrl} className="menu-item">
              <img src={externalLink} alt="Open address in explorer" />
              <p>
                <Trans>View in Explorer</Trans>
              </p>
            </ExternalLink>
          </Menu.Item>
          <Menu.Item>
            <div className="menu-item" onClick={disconnectAccountAndCloseSettings}>
              <img src={disconnect} alt="Disconnect the wallet" />
              <p>
                <Trans>Disconnect</Trans>
              </p>
            </div>
          </Menu.Item>
        </Menu.Items>
      </div>
      <ModalWithPortal
        className="etherspot-enable-popup"
        isVisible={isEtherspotModalOpen}
        setIsVisible={setIsEtherspotModalOpen}
        label={etherspotModalLabel}
      >
        {!isEtherspotWallet && (
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
                setIsEtherspotModalOpen(false);
                setIsEtherspotWallet(true);
              }}
            >
              <Trans>Enable ⚡️ 1-Click Trading</Trans>
            </Button>
          </>
        )}
        {isEtherspotWallet && (
          <>
            <Button
              variant="secondary"
              className="w-full mt-md"
              onClick={() => {
                setIsEtherspotModalOpen(false);
                setIsEtherspotWallet(false);
              }}
            >
              <Trans>Disable ⚡️ 1-Click Trading</Trans>
            </Button>
          </>
        )}
      </ModalWithPortal>
    </Menu>
  );
}

export default AddressDropdown;

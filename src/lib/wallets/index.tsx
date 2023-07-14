import { useEffect, useState } from "react";
import { InjectedConnector } from "@web3-react/injected-connector";
import {
  ARBITRUM,
  ARBITRUM_TESTNET,
  AVALANCHE,
  AVALANCHE_FUJI,
  DEFAULT_CHAIN_ID,
  getChainName, getExplorerUrl,
  getRpcUrl,
  MAINNET,
  NETWORK_METADATA, SUPPORTED_CHAIN_IDS
} from "config/chains";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import {
  CURRENT_PROVIDER_LOCALSTORAGE_KEY,
  SELECTED_NETWORK_LOCAL_STORAGE_KEY,
  SHOULD_EAGER_CONNECT_LOCALSTORAGE_KEY,
  WALLET_CONNECT_V2_LOCALSTORAGE_KEY,
  WALLET_LINK_LOCALSTORAGE_PREFIX,
} from "config/localStorage";
import { helperToast } from "../helperToast";
import { t, Trans } from "@lingui/macro";
import { BigNumber, ethers, Transaction } from "ethers";

import { Web3ReactManagerFunctions } from "@web3-react/core/dist/types";
import { UserRejectedRequestError, WalletConnectConnector } from "./WalletConnectConnector";
import { isEtherspotWalletEnabled } from "../../config/env";
import ExternalLink from "../../components/ExternalLink/ExternalLink";
import {
  extractError,
  NETWORK_CHANGED,
  NOT_ENOUGH_FUNDS,
  RPC_ERROR,
  SLIPPAGE,
  USER_DENIED
} from "../contracts/transactionErrors";
import { ToastifyDebug } from "../../components/ToastifyDebug/ToastifyDebug";

export type NetworkMetadata = {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
};

const injectedConnector = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS,
});

export function hasMetaMaskWalletExtension() {
  return window.ethereum;
}

export function hasCoinBaseWalletExtension() {
  const { ethereum } = window;

  if (!ethereum?.providers && !ethereum?.isCoinbaseWallet) {
    return false;
  }

  return window.ethereum.isCoinbaseWallet || ethereum.providers.find(({ isCoinbaseWallet }) => isCoinbaseWallet);
}

export function activateInjectedProvider(providerName: string) {
  const { ethereum } = window;

  if (!ethereum?.providers && !ethereum?.isCoinbaseWallet && !ethereum?.isMetaMask) {
    return undefined;
  }

  let provider;
  if (ethereum?.providers) {
    switch (providerName) {
      case "CoinBase":
        provider = ethereum.providers.find(({ isCoinbaseWallet }) => isCoinbaseWallet);
        break;
      case "MetaMask":
      default:
        provider = ethereum.providers.find(({ isMetaMask }) => isMetaMask);
        break;
    }
  }

  if (provider) {
    ethereum?.setSelectedProvider?.(provider);
  }
}

export function getInjectedConnector() {
  return injectedConnector;
}

export const getWalletConnectConnector = () => {
  const chainId = Number(localStorage.getItem(SELECTED_NETWORK_LOCAL_STORAGE_KEY)) || DEFAULT_CHAIN_ID;
  return new WalletConnectConnector({
    rpcMap: {
      [AVALANCHE]: getRpcUrl(AVALANCHE)!,
      [ARBITRUM]: getRpcUrl(ARBITRUM)!,
      [ARBITRUM_TESTNET]: getRpcUrl(ARBITRUM_TESTNET)!,
      [AVALANCHE_FUJI]: getRpcUrl(AVALANCHE_FUJI)!,
    },
    showQrModal: true,
    chainId,
    supportedChainIds: SUPPORTED_CHAIN_IDS,
    projectId: "8fceb548bea9a92efcb7c0230d70011b",
  });
};

export function clearWalletConnectData() {
  localStorage.removeItem(WALLET_CONNECT_V2_LOCALSTORAGE_KEY);
}

export function clearWalletLinkData() {
  Object.entries(localStorage)
    .map((x) => x[0])
    .filter((x) => x.startsWith(WALLET_LINK_LOCALSTORAGE_PREFIX))
    .map((x) => localStorage.removeItem(x));
}

export function useEagerConnect(setActivatingConnector: (connector: any) => void) {
  const { activate, active } = useWeb3React();
  const [tried, setTried] = useState(false);

  useEffect(() => {
    (async function () {
      if (Boolean(localStorage.getItem(SHOULD_EAGER_CONNECT_LOCALSTORAGE_KEY)) !== true) {
        // only works with WalletConnect
        clearWalletConnectData();
        // force clear localStorage connection for MM/CB Wallet (Brave legacy)
        clearWalletLinkData();
        return;
      }

      let shouldTryWalletConnect = false;
      try {
        // naive validation to not trigger Wallet Connect if data is corrupted
        const rawData = localStorage.getItem(WALLET_CONNECT_V2_LOCALSTORAGE_KEY);
        if (rawData) {
          const data = JSON.parse(rawData);
          if (data && data.connected) {
            shouldTryWalletConnect = true;
          }
        }
      } catch (ex) {
        if (ex instanceof SyntaxError) {
          // rawData is not a valid json
          clearWalletConnectData();
        }
      }

      if (shouldTryWalletConnect) {
        try {
          const connector = getWalletConnectConnector();
          setActivatingConnector(connector);
          await activate(connector, undefined, true);
          // in case Wallet Connect is activated no need to check injected wallet
          return;
        } catch (ex) {
          // assume data in localstorage is corrupted and delete it to not retry on next page load
          clearWalletConnectData();
        }
      }

      try {
        const connector = getInjectedConnector();
        const currentProviderName = localStorage.getItem(CURRENT_PROVIDER_LOCALSTORAGE_KEY) ?? false;
        if (currentProviderName !== false) {
          activateInjectedProvider(currentProviderName);
        }
        const authorized = await connector.isAuthorized();
        if (authorized) {
          setActivatingConnector(connector);
          await activate(connector, undefined, true);
        }
      } catch (ex) {}

      setTried(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

export function useInactiveListener(suppress = false) {
  const injected = getInjectedConnector();
  const { active, error, activate } = useWeb3React();

  useEffect(() => {
    const { ethereum } = window;
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        activate(injected);
      };
      const handleChainChanged = (chainId) => {
        activate(injected);
      };
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          activate(injected);
        }
      };
      const handleNetworkChanged = (networkId) => {
        activate(injected);
      };

      ethereum.on("connect", handleConnect);
      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("networkChanged", handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("connect", handleConnect);
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
          ethereum.removeListener("networkChanged", handleNetworkChanged);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, error, suppress, activate]);
}

export const addBscNetwork = async () => {
  return addNetwork(NETWORK_METADATA[MAINNET]);
};

export const addNetwork = async (metadata: NetworkMetadata) => {
  await window.ethereum.request({ method: "wallet_addEthereumChain", params: [metadata] }).catch();
};

export const switchNetwork = async (chainId: number, active?: boolean) => {
  if (!active) {
    // chainId in localStorage allows to switch network even if wallet is not connected
    // or there is no wallet at all
    localStorage.setItem(SELECTED_NETWORK_LOCAL_STORAGE_KEY, String(chainId));
    document.location.reload();
    return;
  }

  try {
    const chainIdHex = "0x" + chainId.toString(16);
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainIdHex }],
    });
    helperToast.success(t`Connected to ${getChainName(chainId)}`);
    return getChainName(chainId);
  } catch (ex) {
    // https://docs.metamask.io/guide/rpc-api.html#other-rpc-methods
    // This error code indicates that the chain has not been added to MetaMask.
    // 4001 error means user has denied the request
    // If the error code is not 4001, then we need to add the network
    if (ex.code !== 4001) {
      return await addNetwork(NETWORK_METADATA[chainId]);
    }

    // eslint-disable-next-line no-console
    console.error("error", ex);
  }
};

export const getWalletConnectHandler = (
  activate: Web3ReactManagerFunctions["activate"],
  deactivate: Web3ReactManagerFunctions["deactivate"],
  setActivatingConnector: (connector?: WalletConnectConnector) => void
) => {
  const fn = async () => {
    const walletConnect = getWalletConnectConnector();
    setActivatingConnector(walletConnect);
    activate(walletConnect, (ex) => {
      if (ex instanceof UnsupportedChainIdError) {
        helperToast.error(t`Unsupported chain. Switch to Arbitrum network on your wallet and try again`);
        // eslint-disable-next-line no-console
        console.warn(ex);
      } else if (!(ex instanceof UserRejectedRequestError)) {
        helperToast.error(ex.message);
        // eslint-disable-next-line no-console
        console.warn(ex);
      }
      clearWalletConnectData();
      deactivate();
    });
  };
  return fn;
};

export const getInjectedHandler = (
  activate: Web3ReactManagerFunctions["activate"],
  deactivate: Web3ReactManagerFunctions["deactivate"]
) => {
  const fn = async () => {
    activate(getInjectedConnector(), (e) => {
      if (e instanceof UnsupportedChainIdError) {
        showUnsupportedNetworkToast();

        deactivate();

        return;
      }

      const errString = e.message ?? e.toString();
      helperToast.error(errString);
    });
  };
  return fn;
};

export async function addTokenToMetamask(token: {
  address: string;
  symbol: string;
  decimals: number;
  imageUrl?: string;
}) {
  try {
    const wasAdded = await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: token.address,
          symbol: token.symbol,
          decimals: token.decimals,
          image: token.imageUrl,
        },
      },
    });
    if (wasAdded) {
      // https://github.com/MetaMask/metamask-extension/issues/11377
      // We can show a toast message when the token is added to metamask but because of the bug we can't. Once the bug is fixed we can show a toast message.
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

export function showUnsupportedNetworkToast() {
  const chainId = Number(localStorage.getItem(SELECTED_NETWORK_LOCAL_STORAGE_KEY)) || DEFAULT_CHAIN_ID;

  helperToast.error(
    <div>
      <Trans>
        <div>Your wallet is not connected to {getChainName(chainId)}.</div>
        <br />
        <div className="clickable underline" onClick={() => switchNetwork(chainId, true)}>
          Switch to {getChainName(chainId)}
        </div>
      </Trans>
    </div>
  );
}

export function useHandleUnsupportedNetwork() {
  const { error, deactivate } = useWeb3React();

  useEffect(() => {
    if (error instanceof UnsupportedChainIdError) {
      showUnsupportedNetworkToast();

      deactivate();
    }
  }, [error, deactivate]);
}


export async function sendNativeValue(
  signer: ethers.providers.JsonRpcSigner,
  chainId: number,
  receiver: string,
  value: BigNumber,
  opts: {
    sender?: string,
    sentMsg?: string;
    successMsg?: string;
    hideSuccessMsg?: boolean;
    failMsg?: string;
    setPendingTxns?: (txns: any) => void;
    readOnly?: boolean;
    etherspotPrimeSdk?: any;
  }
): Promise<void | Transaction> {
  try {
    if (!opts) {
      opts = {};
    }

    const nonce = await signer.getTransactionCount();

    const tx = {
      value,
      from: opts.sender ?? await signer.getAddress(),
      to: receiver,
      gasLimit: ethers.BigNumber.from(21000),
      nonce,
      data: '0x',
      chainId,
    };

    if (opts.readOnly) {
      return tx;
    }

    let hash;
    let res;

    if (!opts.etherspotPrimeSdk) {
      res = await signer.sendTransaction(tx);
      ({ hash } = res);
    } else {
      await opts.etherspotPrimeSdk.addUserOpsToBatch({
        value: tx.value,
        data: tx.data,
        to: tx.to,
      });
      const userOpSigned = await opts.etherspotPrimeSdk.sign();
      hash = await opts.etherspotPrimeSdk.send(userOpSigned);
    }

    const txUrl = getExplorerUrl(chainId, isEtherspotWalletEnabled())
      + (isEtherspotWalletEnabled() ? "userOpHash/" : "tx/")
      + hash
      + (isEtherspotWalletEnabled() ? '?network=arbitrum-one' : '');
    const sentMsg = opts.sentMsg || t`Transaction sent.`;

    helperToast.success(
      <div>
        {sentMsg}{" "}
        <ExternalLink href={txUrl}>
          <Trans>View status.</Trans>
        </ExternalLink>
        <br />
      </div>
    );

    if (opts.setPendingTxns) {
      const message = opts.hideSuccessMsg ? undefined : opts.successMsg || t`Transaction completed!`;
      const pendingTxn = {
        hash,
        message,
        isEtherspotWallet: isEtherspotWalletEnabled(),
      };
      opts.setPendingTxns((pendingTxns) => [...pendingTxns, pendingTxn]);
    }

    return res;
  } catch (e) {
    let failMsg;

    let autoCloseToast: number | boolean = 5000;

    const [message, type, errorData] = extractError(e);
    switch (type) {
      case NOT_ENOUGH_FUNDS:
        failMsg = (
          <Trans>
            There is not enough ETH in your account on Arbitrum to send this transaction.
            <br />
            <br />
            <ExternalLink href="https://arbitrum.io/bridge-tutorial/">Bridge ETH to Arbitrum</ExternalLink>
          </Trans>
        );
        break;
      case NETWORK_CHANGED:
        failMsg = (
          <Trans>
            <div>Your wallet is not connected to {getChainName(chainId)}.</div>
            <br />
            <div className="clickable underline" onClick={() => switchNetwork(chainId, true)}>
              Switch to {getChainName(chainId)}
            </div>
          </Trans>
        );
        break;
      case USER_DENIED:
        failMsg = t`Transaction was cancelled.`;
        break;
      case SLIPPAGE:
        failMsg = t`The mark price has changed, consider increasing your Allowed Slippage by clicking on the "..." icon next to your address.`;
        break;
      case RPC_ERROR:
        autoCloseToast = false;

        const originalError = errorData?.error?.message || errorData?.message || message;

        failMsg = (
          <div>
            <Trans>
              Transaction failed due to RPC error.
              <br />
              <br />
              Please try changing the RPC url in your wallet settings.{" "}
              <ExternalLink href="https://gmxio.gitbook.io/gmx/trading#backup-rpc-urls">More info</ExternalLink>
            </Trans>
            <br />
            {originalError && <ToastifyDebug>{originalError}</ToastifyDebug>}
          </div>
        );
        break;
      default:
        autoCloseToast = false;

        failMsg = (
          <div>
            {opts.failMsg || t`Transaction failed`}
            <br />
            {message && <ToastifyDebug>{message}</ToastifyDebug>}
          </div>
        );
    }

    helperToast.error(failMsg, { autoClose: autoCloseToast });
    throw e;
  }
}


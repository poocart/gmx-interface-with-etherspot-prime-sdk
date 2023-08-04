import { TX_ERROR_PATTERNS, USER_DENIED } from "./contracts/transactionErrors";

export const enum EtherspotUiEvent {
  DISPLAY_CONFIRMATION = "display-etherspot-confirmation",
  HIDE_CONFIRMATION = "hide-etherspot-confirmation",
  CONFIRM = "confirm-etherspot-confirmation",
  DECLINE = "decline-etherspot-confirmation",
}

export const displayEtherspotConfirmation = async (estimation: Object): Promise<void> => {
  // @ts-ignore
  const myEvent = new CustomEvent(EtherspotUiEvent.DISPLAY_CONFIRMATION, { detail: estimation });
  document.dispatchEvent(myEvent);

  return new Promise((resolve, reject) => {
    const confirm = () => {
      resolve();
    };

    const decline = () => {
      reject({ message: TX_ERROR_PATTERNS[USER_DENIED][0].msg });
    };

    document.addEventListener(EtherspotUiEvent.CONFIRM, confirm);
    document.addEventListener(EtherspotUiEvent.DECLINE, decline);
  });
}

export const rejectEtherspotConfirmation = () => {
  document.dispatchEvent(new CustomEvent(EtherspotUiEvent.HIDE_CONFIRMATION));
  document.dispatchEvent(new CustomEvent(EtherspotUiEvent.DECLINE));
}

export const confirmEtherspotConfirmation = () => {
  document.dispatchEvent(new CustomEvent(EtherspotUiEvent.HIDE_CONFIRMATION));
  document.dispatchEvent(new CustomEvent(EtherspotUiEvent.CONFIRM));
}

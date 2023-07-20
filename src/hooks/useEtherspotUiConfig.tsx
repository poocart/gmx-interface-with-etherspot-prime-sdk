import { createContext, useContext } from "react";

interface IEtherspotUiConfigContext {
  data: {
    isEtherspotWallet: boolean;
    etherspotIntroDisplayed: boolean;
    setIsEtherspotWallet: (isEtherspotWallet: boolean) => void;
    setEtherspotIntroDisplayed: (displayed: boolean) => void;
  },
}

export const EtherspotUiConfigContext = createContext<IEtherspotUiConfigContext | null>(null);

const useEtherspotUiConfig = () => {
  const context = useContext(EtherspotUiConfigContext);

  if (context === null) {
    throw new Error('No parent <EtherspotUiConfigContext />');
  }

  return context.data;
};

export default useEtherspotUiConfig;
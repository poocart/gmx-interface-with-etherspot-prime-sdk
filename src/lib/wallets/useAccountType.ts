import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useWalletAddress } from "@etherspot/transaction-kit";
import useEtherspotUiConfig from "../../hooks/useEtherspotUiConfig";

export enum AccountType {
  CONTRACT = "contract",
  EOA = "eoa",
}

export default function useAccountType() {
  const { active, library } = useWeb3React();
  const [contractType, setContractType] = useState<AccountType | null>(null);
  const { isEtherspotWallet } = useEtherspotUiConfig();
  const account = useWalletAddress(isEtherspotWallet ? "etherspot-prime" : "provider");

  useEffect(() => {
    if (!active) return;
    (async function () {
      const code = await library.getCode(account);
      const type = code === "0x" ? AccountType.EOA : AccountType.CONTRACT;
      setContractType(type);
    })();
  }, [account, library, active]);

  return contractType;
}

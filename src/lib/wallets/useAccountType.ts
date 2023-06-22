import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useWalletAddress } from "@etherspot/transaction-kit";

export enum AccountType {
  CONTRACT = "contract",
  EOA = "eoa",
}

export default function useAccountType() {
  const { active, library } = useWeb3React();
  const [contractType, setContractType] = useState<AccountType | null>(null);
  const account = useWalletAddress("etherspot-prime", 80001);

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

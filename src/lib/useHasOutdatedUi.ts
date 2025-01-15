import useSWR from "swr";

import { UI_VERSION } from "config/env";

import { isDevelopment } from "config/env";
import { PRODUCTION_HOST } from "config/links";
import { REQUIRED_UI_VERSION_KEY } from "config/localStorage";
import { useChainId } from "lib/chains";
import useWallet from "lib/wallets/useWallet";

export function useHasOutdatedUi() {
  const { chainId } = useChainId();
  const { active } = useWallet();

  const { data: minVersion, mutate } = useSWR([chainId, active], {
    fetcher: async () => {
      const randomParam = Math.random().toString(36).substring(2, 8);

      const prodUiConfig = await fetch(`${PRODUCTION_HOST}/config.json?no_cache=${randomParam}`).then((res) =>
        res.json()
      );

      return prodUiConfig.uiVersion;
    },
  });

  let hasOutdatedUi = false;

  if (typeof minVersion === "number" && minVersion > UI_VERSION) {
    hasOutdatedUi = true;
  }

  if (isDevelopment()) {
    const localStorageVersion = localStorage.getItem(REQUIRED_UI_VERSION_KEY);
    hasOutdatedUi = Boolean(localStorageVersion && parseFloat(localStorageVersion) > UI_VERSION);
  }

  return { data: hasOutdatedUi, mutate };
}

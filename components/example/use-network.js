import { useState, useEffect } from "react";

export const useNetwork = () => {
  const [network, setNetwork] = useState(undefined);

  useEffect(() => {
    const provider = window.ton ?? {};
    if (!provider?.isOpenMask) return;

    provider.send("wallet_getChain").then((chainId) => setNetwork(chainId));

    provider.on("chainChanged", setNetwork);
    return () => {
      provider.off("chainChanged", setNetwork);
    };
  }, []);

  return network;
};

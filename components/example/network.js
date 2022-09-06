import { useEffect, useState } from "react";
import Callout from "nextra-theme-docs/callout";

export default () => {
  const [network, setNetwork] = useState("");

  useEffect(() => {
    const provider = window.ton ?? {};
    if (!provider?.isOpenMask) return;

    // Initial chainId value
    provider.send("wallet_getChain").then((chainId) => setNetwork(chainId));

    // Subscribe to change network
    provider.on("chainChanged", setNetwork);
    return () => {
      // Unsubscribe
      provider.off("chainChanged", setNetwork);
    };
  }, []);

  return (
    <div className="pb-8 pt-4">
      {network ? (
        <Callout emoji={network === "mainnet" ? "💎" : "⚙️"}>{network}</Callout>
      ) : (
        <Callout>OpenMask not detected</Callout>
      )}
    </div>
  );
};

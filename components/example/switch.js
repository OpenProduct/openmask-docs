import { useEffect, useState } from "react";
import Callout from "nextra-theme-docs/callout";

export default () => {
  const [network, setNetwork] = useState("");

  const switchNetwork = async () => {
    const provider = window.ton ?? {};
    if (!provider?.isOpenMask) return;

    const next = network === "mainnet" ? "testnet" : "mainnet";
    try {
      await provider.send("wallet_switchChain", next);

      setNetwork(next);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const provider = window.ton ?? {};
    if (!provider?.isOpenMask) return;

    // Initial chainId value
    provider.send("ton_getChain").then((chainId) => setNetwork(chainId));
  }, []);

  return (
    <div className="pb-8 pt-4">
      <button
        onClick={switchNetwork}
        className="py-3 px-5 mb-3 bg-[#88d3ff] text-black text-lg"
      >
        Switch network
      </button>
      {network ? (
        <Callout emoji={network === "mainnet" ? "💎" : "⚙️"}>{network}</Callout>
      ) : (
        <Callout>OpenMask not detected</Callout>
      )}
    </div>
  );
};

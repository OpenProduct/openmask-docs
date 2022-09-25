import { useState, useEffect } from "react";

export default ({ children }) => {
  const [network, setNetwork] = useState("");

  const switchNetwork = async () => {
    const provider = window.ton ?? {};
    if (!provider?.isOpenMask) return;

    try {
      await provider.send("wallet_switchChain", "mainnet");
    } catch (e) {
      console.error(e);
    }
  };

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

  if (network != "mainnet") {
    return (
      <div className="py-8">
        <button
          onClick={switchNetwork}
          className="py-3 px-5 mb-3 bg-[#88d3ff] text-black text-lg"
        >
          Switch to Mainnet
        </button>
      </div>
    );
  }

  return children;
};

import { useState, useEffect, useCallback } from "react";
import Callout from "nextra-theme-docs/callout";

const Balance = () => {
  const [balance, setBalance] = useState("");

  const updateBalance = useCallback(async () => {
    const provider = window.ton;

    try {
      const balance = await provider.send("ton_getBalance");
      setBalance(String(Number(balance) / 1000000000));
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    updateBalance();

    const provider = window.ton;
    // Subscribe to change account event to update user balance
    provider.on("accountsChanged", updateBalance);
    return () => {
      // Unsubscribe
      provider.off("accountsChanged", updateBalance);
    };
  }, [updateBalance]);

  return <>{balance} TON</>;
};

const Connect = () => {
  const [address, setAddress] = useState("");

  const connect = async () => {
    const provider = window.ton;

    try {
      const accounts = await provider.send("ton_requestAccounts");
      const account = accounts[0];
      setAddress(account);

      // Store account to user local storage to know,
      // that already provide an access to your dApp
      localStorage.setItem("OpenMask", account);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    // After initialize app, check if you dApp have an access and connect
    const account = localStorage.getItem("OpenMask");
    if (!account) return;

    connect();
  }, []);

  return (
    <div className="py-8">
      <button
        onClick={connect}
        className="py-3 px-5 mb-3 bg-[#88d3ff] text-black text-lg"
      >
        Connect OpenMask
      </button>
      {address && (
        <Callout emoji="✅">
          {address}
          <br />
          <Balance />
        </Callout>
      )}
    </div>
  );
};

export default () => {
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

  return <Connect />;
};

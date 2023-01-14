import { useState, useEffect, useMemo } from "react";
import Callout from "nextra-theme-docs/callout";
import {
  TonHttpProvider,
  JettonMinterDao,
  Address,
  beginCell,
} from "@openproduct/web-sdk/cjs/index.js";
import { useNetwork } from "../example/use-network";

const JettonMinter = "EQCEEjP7sz4OMDoSfRd9UzykQ6B---fGkBD_JlvBF2TpBPSt";

const ProxyHandler = "EQDEY8thfI0jS826MYM3K37XlzhAYr96OQ5naVJDrk8KJ_I3";

const proxyMessage = (target, queryId = 0) => {
  return beginCell()
    .storeUint(0x1ee6e170, 32)
    .storeUint(queryId, 64)
    .storeAddress(target)
    .endCell()
    .toHex();
};

const SendProxyMessage = ({ client, address }) => {
  const [message, setMessage] = useState("");

  const [disabled, setDisabled] = useState(false);
  const [isSent, setSent] = useState(false);
  const [isConfirm, setConfirm] = useState(false);

  const send = async () => {
    const provider = window.ton;
    setSent(false);
    setConfirm(false);

    setDisabled(true);
    try {
      const [wallet] = await provider.send("ton_requestAccounts");

      console.log("from", wallet);
      console.log("to", new Address(address).toString(false));

      const walletSeqNo = await provider.send("ton_sendTransaction", [
        {
          to: new Address(address).toString(false),
          value: "50000000",
          dataType: "hex",
          data: proxyMessage(new Address(ProxyHandler)),
        },
        wallet,
      ]);
      setSent(true);
      await provider.send("ton_confirmWalletSeqNo", [walletSeqNo, wallet]);

      const [transaction] = await client.getTransactions(wallet, 1);

      setMessage(transaction.in_msg.message);

      console.log(transaction);

      setConfirm(true);
    } catch (e) {
      console.error(e);
      alert(e.message);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div className="pt-8">
      <button
        disabled={disabled}
        onClick={send}
        className="py-3 px-5 mb-3 bg-[#88d3ff] text-black text-lg"
      >
        Send Proxy Message
      </button>
      {isSent && (
        <Callout emoji={isConfirm ? "✅" : "⏱"}>
          {isConfirm ? "Done." : "Pending... ~15 sec"}
        </Callout>
      )}
      {message && <Callout>Proxy Handler: {message}</Callout>}
    </div>
  );
};

const Connect = () => {
  const [address, setAddress] = useState("");

  const network = useNetwork();

  const client = useMemo(() => {
    const host =
      network === "mainnet"
        ? "https://toncenter.com/api/v2/jsonRPC"
        : "https://testnet.toncenter.com/api/v2/jsonRPC";

    // The client without API key have a limitation in 1 request set second,
    // please don't click buttons too often
    return new TonHttpProvider(host);
  }, [network]);

  const connect = async () => {
    const provider = window.ton;

    try {
      const accounts = await provider.send("ton_requestAccounts");
      const account = accounts[0];

      const minter = new JettonMinterDao(client, new Address(JettonMinter));
      const jettonWalletAddress = await minter.getJettonWalletAddress(
        new Address(account)
      );

      if (jettonWalletAddress) {
        setAddress(jettonWalletAddress.toString(true, true, true));
      } else {
        setAddress("Missing");
      }

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
      {address && <Callout>Jetton Wallet: {address}</Callout>}
      {address && address != "Missing" && (
        <SendProxyMessage address={address} client={client} />
      )}
    </div>
  );
};

export default Connect;

import { useEffect, useMemo, useState } from "react";
import Callout from "nextra-theme-docs/callout";
import { useNetwork } from "./use-network";
import AddressLink from "./address-link";
import {
  TonHttpProvider,
  parseAddress,
  beginCell,
  Address,
} from "@openproduct/web-sdk/cjs";

export const CheckResult = ({ address }) => {
  const network = useNetwork();

  const [counter, setCounter] = useState("");
  const [owner, setOwner] = useState("");

  const client = useMemo(() => {
    const host =
      network === "mainnet"
        ? "https://toncenter.com/api/v2/jsonRPC"
        : "https://testnet.toncenter.com/api/v2/jsonRPC";

    // The client without API key have a limitation in 1 request set second,
    // please don't click buttons too often
    return new TonHttpProvider(host);
  }, [network]);

  const getCounter = async () => {
    try {
      // it's a BN
      const counter = await client.call2(address, "counter");
      setCounter(counter.toString());
    } catch (e) {
      alert(e.message);
    }
  };

  const getOwner = async () => {
    try {
      // it's a Cell
      const result = await client.call2(address, "owner_address");
      setOwner(parseAddress(result).toString(true, true, true));
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <>
      <div className="my-5">
        <button
          onClick={getCounter}
          className="py-3 px-5 mb-3 bg-[#88d3ff] text-black text-lg"
        >
          Get Counter
        </button>
        {counter && <Callout>{counter}</Callout>}
      </div>
      <div className="my-5">
        <button
          onClick={getOwner}
          className="py-3 px-5 mb-3 bg-[#88d3ff] text-black text-lg"
        >
          Get contract owner
        </button>
        {owner && <Callout>{owner}</Callout>}
      </div>
    </>
  );
};

const initCode =
  "b5ee9c72c1020f01000109000000000d00120017001c0023002800360040004e0053006c0071008701040114ff00f4a413f4bcf2c80b010201620902020120080302014805040009b59f10055002015807060017ad0c76a2687d20699f9818c0000faf607c13b79118400017bffecf6a2687d20699f981840202cd0b0a002dd7c13b7911829815f797033c1044c4b4050895b047800c0201480d0c00271c20063232c15400f3c5807e80b2dab25cfec02001f30cb434c0fe900c005c6c2456f83b51343e9034cfcc00f4c7f4cfcc4860840dd247cbeea7c408d7c0c069321633c5b2cff27b553808608411f550e46ea497c1780860841060da602ea7cc4cd9b1c17cb819807e800c007c01380060840b68e2abeea384d671c17cb819be900c00721633c5b2cff27b553817c1200e0006f2c065ea043d88";

const getInitData = async (ownerAddress, counter) => {
  return await beginCell()
    .storeAddress(new Address(ownerAddress))
    .storeUint(counter, 64)
    .endCell()
    .toHex();
};

const getInitMessage = async () => {
  return await beginCell()
    .storeUint(0x37491f2f, 32)
    .storeUint(0, 64)
    .endCell()
    .toHex();
};

export default ({ initCounter = 7 }) => {
  const [disabled, setDisabled] = useState(false);
  const [isSent, setSent] = useState(false);
  const [isConfirm, setConfirm] = useState(false);
  const [address, setAddress] = useState("");

  const send = async () => {
    const provider = window.ton;
    setSent(false);
    setConfirm(false);

    setDisabled(true);
    try {
      const [address] = await provider.send("ton_requestAccounts");

      const { walletSeqNo, newContractAddress } = await provider.send(
        "ton_deployContract",
        [
          {
            initCodeCell: initCode,
            initDataCell: await getInitData(address, initCounter),
            initMessageCell: await getInitMessage(),
            amount: "50000000", // 0.05 TON
          },
          address,
        ]
      );
      setSent(true);
      await provider.send("ton_confirmWalletSeqNo", [walletSeqNo, address]);

      setAddress(newContractAddress);
      setConfirm(true);

      localStorage.setItem(
        "smart-contract-address-" + initCounter,
        newContractAddress
      );
    } catch (e) {
      console.error(e);
      alert(e.message);
    } finally {
      setDisabled(false);
    }
  };

  useEffect(() => {
    const contractAddress = localStorage.getItem(
      "smart-contract-address-" + initCounter
    );
    if (contractAddress) {
      setAddress(contractAddress);
    }
  }, []);

  return (
    <div className="py-8">
      <button
        disabled={disabled}
        onClick={send}
        className="py-3 px-5 mb-3 bg-[#88d3ff] text-black text-lg"
      >
        Deploy Smart Contract
      </button>
      {isSent && (
        <Callout emoji={isConfirm ? "✅" : "⏱"}>
          {isConfirm ? (
            <>
              Done. New contract address: <AddressLink address={address} />
            </>
          ) : (
            "Deploy Pending... ~15 sec"
          )}
        </Callout>
      )}
      {!isSent && address && (
        <Callout emoji="🏗">
          Previously deployed contract: <AddressLink address={address} />
        </Callout>
      )}

      {address && <CheckResult address={address} />}
    </div>
  );
};

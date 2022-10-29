import { useState } from "react";
import Callout from "nextra-theme-docs/callout";
import { beginCell, Address, bytesToBase64 } from "@openproduct/web-sdk/cjs";
import { CheckResult } from "./deploy-smart-contract";

const getIncrementMessage = async () => {
  return await beginCell()
    .storeUint(0x37491f2f, 32)
    .storeUint(0, 64)
    .endCell()
    .toHex();
};

export default () => {
  const [disabled, setDisabled] = useState(false);
  const [isSent, setSent] = useState(false);
  const [isConfirm, setConfirm] = useState(false);
  const [address, setAddress] = useState(
    "EQDfaBxWpFhDXZTnqFL0J_MZaEB5PVibDYEAnDUI2pXYyw22"
  );

  const increment = async () => {
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
          value: "10000000",
          dataType: "hex",
          data: await getIncrementMessage(),
        },
        wallet,
      ]);
      setSent(true);
      await provider.send("ton_confirmWalletSeqNo", [walletSeqNo, wallet]);

      setConfirm(true);
    } catch (e) {
      console.error(e);
      alert(e.message);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div className="py-8">
      <div className="pb-8">
        <input
          className="border w-full"
          value={address}
          onChange={(e) => setAddress(e.currentTarget.value)}
        />
      </div>

      <button
        disabled={address == "" || disabled}
        onClick={increment}
        className="py-3 px-5 mb-3 bg-[#88d3ff] text-black text-lg"
      >
        Increment
      </button>
      {isSent && (
        <Callout emoji={isConfirm ? "✅" : "⏱"}>
          {isConfirm ? "Done." : "Pending... ~15 sec"}
        </Callout>
      )}
      {address && <CheckResult address={address} />}
    </div>
  );
};

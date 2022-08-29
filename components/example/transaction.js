import { useState } from "react";
import Callout from "nextra-theme-docs/callout";

export default () => {
  const [disabled, setDisabled] = useState(false);
  const [isSent, setSent] = useState(false);
  const [isConfirm, setConfirm] = useState(false);

  const send = async () => {
    const provider = window.ton;
    setSent(false);
    setConfirm(false);

    console.log("isTonMask=", provider.isTonMask);
    setDisabled(true);
    try {
      const seqNo = await provider.send("ton_sendTransaction", {
        to: "UQDwLAVAK8Q2fRbYa-hHmiMb9mEE0psIwwyH-rsAkZx4h991",
        value: "100000000",
        data: "Donate",
      });
      setSent(true);
      await provider.send("ton_confirmTransaction", seqNo);
      setConfirm(true);
    } catch (e) {
      console.error(e);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div className="py-8">
      <div className="pb-4">
        Donate address: "UQDwLAVAK8Q2fRbYa-hHmiMb9mEE0psIwwyH-rsAkZx4h991"
      </div>
      <button
        disabled={disabled}
        onClick={send}
        className="py-3 px-5 mb-3 bg-[#88d3ff] text-black text-lg"
      >
        Send 0.1 TON
      </button>
      {isSent && (
        <Callout emoji={isConfirm ? "✅" : "⏱"}>
          {isConfirm
            ? "Success. Transaction confirm!"
            : "Transaction Pending... ~15 sec"}
        </Callout>
      )}
    </div>
  );
};

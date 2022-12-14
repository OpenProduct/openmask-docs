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

    console.log("isOpenMask=", provider.isOpenMask);
    setDisabled(true);
    try {
      await provider.send("ton_requestAccounts");

      const seqNo = await provider.send("ton_sendTransaction", [
        {
          to: "EQCV4FC_GjwyRDx4RAfI9-f1z3Tfi6JBxEOHol8SUpI2xTxT",
          value: "100000000",
          data: "Donate",
        },
      ]);
      setSent(true);
      await provider.send("ton_confirmWalletSeqNo", [seqNo]);
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
        OpenMask donate address:
        "EQCV4FC_GjwyRDx4RAfI9-f1z3Tfi6JBxEOHol8SUpI2xTxT"
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

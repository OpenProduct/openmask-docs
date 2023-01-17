import { useState } from "react";
import Callout from "nextra-theme-docs/callout";

const Message = "Hello world";

export default () => {
  const [encryptMessage, setEncryptMessage] = useState("");
  const [decryptMessage, setDecryptMessage] = useState("");

  const encrypt = async () => {
    const provider = window.ton;
    try {
      const result = await provider.send("ton_encryptMessage", {
        message: btoa(Message),
      });

      setEncryptMessage(result);
    } catch (e) {
      console.error(e);
    }
  };

  const decrypt = async () => {
    const provider = window.ton;
    if (!encryptMessage) return;
    try {
      const result = await provider.send("ton_decryptMessage", {
        message: encryptMessage,
      });

      setDecryptMessage(atob(result));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="py-8">
      <Callout>
        <div className="break-all w-full">{Message}</div>
      </Callout>
      <button
        onClick={encrypt}
        className="py-3 px-5 mt-5 bg-[#88d3ff] text-black text-lg"
      >
        Encrypt
      </button>
      {encryptMessage && (
        <Callout>
          <div className="break-all w-full">{encryptMessage}</div>
        </Callout>
      )}
      {encryptMessage && (
        <button
          onClick={decrypt}
          className="py-3 px-5 mt-5 bg-[#88d3ff] text-black text-lg"
        >
          Decrypt
        </button>
      )}
      {decryptMessage && (
        <Callout>
          <div className="break-all w-full">{decryptMessage}</div>
        </Callout>
      )}
    </div>
  );
};

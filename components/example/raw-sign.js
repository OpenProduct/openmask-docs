import { useEffect, useState } from "react";
import Callout from "nextra-theme-docs/callout";

export default () => {
  const [data, setData] = useState("");
  const signRaw = async () => {
    const provider = window.ton;
    try {
      const signed = await provider.send("ton_rawSign", {
        data: "48656c6c6f20776f726c64",
      });

      setData(signed);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="py-8">
      <button
        onClick={signRaw}
        className="py-3 px-5 mb-3 bg-[#88d3ff] text-black text-lg"
      >
        Raw Sign
      </button>
      {data && (
        <Callout>
          <div className="break-all w-full">{data}</div>
        </Callout>
      )}
    </div>
  );
};

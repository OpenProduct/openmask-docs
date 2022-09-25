import { useState } from "react";
import Callout from "nextra-theme-docs/callout";

function toHex(str) {
  var result = "";
  for (var i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result;
}

export default () => {
  const [data, setData] = useState("");
  const signRaw = async () => {
    const provider = window.ton;
    try {
      const signed = await provider.send("ton_personalSign", {
        data: "Hello world",
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
        Personal Sign
      </button>
      {data && (
        <Callout>
          <div className="break-all w-full">{data}</div>
        </Callout>
      )}
    </div>
  );
};

const TegroMinterMainnet = "EQAvDfWFG0oYX19jwNDNBBL1rKNT9XfaGP9HyTb5nb2Eml6y";

export default () => {
  const addTegro = async () => {
    const provider = window.ton;

    console.log("isOpenMask=", provider.isOpenMask);
    try {
      await provider.send("wallet_watchAsset", {
        type: "jetton",
        address: TegroMinterMainnet,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="py-8">
      <button
        onClick={addTegro}
        className="py-3 px-5 mb-3 bg-[#88d3ff] text-black text-lg"
      >
        Watch Tegro Mainnet Asset
      </button>
    </div>
  );
};

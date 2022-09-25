const TegroMinterTestnet = "EQCKt2WPGX-fh0cIAz38Ljd_OKQjoZE_cqk7QrYGsNP6wUh-";

export default () => {
  const addTegro = async () => {
    const provider = window.ton;

    try {
      await provider.send("wallet_watchAsset", {
        type: "jetton",
        address: TegroMinterTestnet,
        name: "Tegro",
        symbol: "TGR",
        image: "https://tegro.io/tgr.png",
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
        Watch Tegro Testnet Asset
      </button>
    </div>
  );
};

export default () => {
  const addNFT = async () => {
    const provider = window.ton;

    try {
      await provider.send("wallet_watchAsset", {
        type: "nft",
        address: "EQD197AvD5v-9Klyp2VATZtjJDUoW8hPL4yDU4ijopBjpLoG",
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="py-8">
      <button
        onClick={addNFT}
        className="py-3 px-5 mb-3 bg-[#88d3ff] text-black text-lg"
      >
        Watch NFT Mainnet Asset
      </button>
    </div>
  );
};

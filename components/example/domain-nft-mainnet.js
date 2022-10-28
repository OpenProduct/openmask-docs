export default () => {
  const addDomainNft = async () => {
    const provider = window.ton;

    try {
      await provider.send("wallet_watchAsset", {
        type: "nft",
        address: "EQDUbOXDPvO6baVT6knQUCf5z1TQ1ZO0BRAqpToZsvccNw_F",
      });
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  };

  return (
    <div className="py-8">
      <button
        onClick={addDomainNft}
        className="py-3 px-5 mb-3 bg-[#88d3ff] text-black text-lg"
      >
        Watch TonDns Domain NFT
      </button>
    </div>
  );
};

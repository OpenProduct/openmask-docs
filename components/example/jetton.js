export default () => {
  const addIslandCoin = async () => {
    const provider = window.ton;
    try {
      await provider.send("wallet_watchAsset", {
        type: "jetton",
        address: "EQBXHCDdBA6Vgd2zi-yRpFk8m04vn3ROWYU9GRZfpvrim1M5",
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="py-8">
      <button
        onClick={addIslandCoin}
        className="py-3 px-5 mb-3 bg-[#88d3ff] text-black text-lg"
      >
        Watch TON Island Coin
      </button>
    </div>
  );
};

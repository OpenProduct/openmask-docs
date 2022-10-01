export default () => {
  const addWSOL = async () => {
    const provider = window.ton;
    try {
      await provider.send("wallet_watchAsset", {
        type: "jetton",
        address: "EQC4cCygTZPKIP9cCsWx7DW5i5MQPOsEcfKkKwBZKkRCCfaW",
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="py-8">
      <button
        onClick={addWSOL}
        className="py-3 px-5 mb-3 bg-[#88d3ff] text-black text-lg"
      >
        Watch Wrapped SOL Coin
      </button>
    </div>
  );
};

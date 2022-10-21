import { useNetwork } from "./use-network";

export default ({ address }) => {
  const network = useNetwork();

  if (!address) return;

  const tonscan =
    network === "mainnet"
      ? "https://tonscan.org/address/"
      : "https://testnet.tonscan.org/address/";

  const url = tonscan + address;

  return (
    <a href={url} target="_blanc">
      {address}
    </a>
  );
};

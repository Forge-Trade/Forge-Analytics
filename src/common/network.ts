import { Network } from "./interfaces/uniswap.interface";

// https://github.com/Uniswap/interface/blob/main/src/constants/chains.ts
enum SupportedChainId {
  MAINNET = 9001,
}

// NOTE: also update CreatePositionModal, isNative function.
export const NETWORKS: Network[] = [
  {
    id: "evmos",
    chainId: SupportedChainId.MAINNET,
    name: "Evmos",
    desc: "Evmos Mainnet",
    logoURI:
      "https://assets.coingecko.com/coins/images/24023/standard/evmos.png?1696523216",
    subgraphEndpoint:
    "https://subgraph.satsuma-prod.com/09c9cf3574cc/orbital-apes/v3-subgraph/api",
    totalValueLockedUSD_gte: 1000,
    volumeUSD_gte: 300,
  },
];

let currentNetwork = NETWORKS[0];

export const getCurrentNetwork = (): Network => {
  return currentNetwork;
};

export const setCurrentNetwork = (network: Network) => {
  currentNetwork = network;
};

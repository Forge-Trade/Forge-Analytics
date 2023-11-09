const https = require("https");
const fs = require("fs");

const SKIP_PLATFORMS = [
  "tron",
  "sora",
  "factom",
  "elrond",
  "nuls",
  "everscale",
  "stacks",
  "vite",
  "bitcoin-cash",
  "nem",
  "tezos",
  "hedera-hashgraph",
  "mixin-network",
  "hydra",
  "xrp",
  "eos",
  "binancecoin",
  "near-protocol",
  "terra",
  "secret",
  "neo",
  "algorand",
  "stellar",
  "cardano",
  "karura",
  "fusion-network",
  "zilliqa",
  "icon",
  "solana",
  "xdc-network",
  "waves",
  "polygon-pos",
  "optimistic-ethereum",
  "osmosis"
];

const CUSTOM_TOKENS = {
  evmos: {
    "0x98fafd9f714ce0b4bb2870527076f2f314aaed82": {
      id: "tashi-protocol",
      name: "Tashi"
    }
  }
};

const options = {
  hostname: "api.coingecko.com",
  port: 443,
  path: "/api/v3/coins/list?include_platform=true",
  method: "GET",
};

const _renameKeys = (obj, newKeys) => {
  const keyValues = Object.keys(obj).map((key) => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
};

const process = (data) => {
  let result = data.reduce((result, curr) => {
    const { id, name } = curr;
    Object.keys(curr.platforms).map((platform) => {
      if (SKIP_PLATFORMS.includes(platform)) return;
      const address = curr.platforms[platform].trim();
      if (!address) return;

      if (!result[platform]) result[platform] = {};
      result[platform][address] = { id, name };
    });
    return result;
  }, {});

  result = _renameKeys(result, {
    "arbitrum-one": "arbitrum",
    "binance-smart-chain": "bnb",
  });

  Object.keys(CUSTOM_TOKENS).forEach((platform) => {
    result[platform] = { ...result[platform], ...CUSTOM_TOKENS[platform] };
  });

  return result;
};

const req = https.request(options, (res) => {
  const chunks = [];

  res.on("data", (d) => {
    chunks.push(d);
  });

  res.on("end", () => {
    const data = JSON.parse(Buffer.concat(chunks).toString());
    const processedData = process(data);

    const filepath = "./src/repos/tokenAddressMapping.json";

    fs.writeFileSync(filepath, JSON.stringify(processedData, 2, 2));
    console.log(`[Log] Chains: ${Object.keys(processedData).join(", ")}`);
    console.log(`[DONE] Generated token address mapping file to ${filepath}`);
  });
});

req.on("error", (error) => {
  console.error(`[Error] ${error.message}`);
});

req.end();

# Forge DEX Analytics Dashboard

https://github.com/Forge-Trade/Forge-Analytics/assets/16395727/377b525c-3f2d-4ef2-9f55-f79ab5934c8a

## Calculation Breakdown

### 1. Calculate deposit amount of token0 and token1

- Refer to [Uniswap V3 Whitepaper](https://uniswap.org/whitepaper-v3.pdf) (Formula: 6.29, 6.30, P.8), we can calculate total amount of each token by using these formulas: (if `il <= ic < iu`; where `il` = lowerTickId, `ic` = currentTickId, `iu` = upperTickId, `Pl` = lower price, `Pu` = upper price)
  - `deltaY = deltaL * (sqrt(P) - sqrt(Pl))`
  - `deltaX = deltaL * (1 / sqrt(P) - 1 / sqrt(Pu))`
- For estimation of the amount of token0 (`deltaX`) and token1 (`deltaY`) we need to know `deltaL` that make:
  - `deltaY * priceUSDY + deltaX * priceUSDX = depositAmountUSD`
- So we can write a equation like this:
  - `deltaL * (sqrt(P) - sqrt(Pl)) * priceUSDY + deltaL * (1 / sqrt(P) - 1 / sqrt(Pu)) * priceUSDX = depositAmountUSD`
  - Then: `deltaL = depositAmountUSD / ((sqrt(P) - sqrt(Pl)) * priceUSDY + (1 / sqrt(P) - 1 / sqrt(Pu)) * priceUSDX)`
- After we've calculated `deltaL`, we can calculate `deltaX` and `deltaY` using these formulas mentioned in Uniswap v3 Whitepaper
  - `deltaY = deltaL * (sqrt(P) - sqrt(Pl))` (Formula: 6.29, P.8)
  - `deltaX = deltaL * (1 / sqrt(P) - 1 / sqrt(Pu))` (Formula: 6.30, P.8)

### 2. Calculate estimated fee

- Estimated fee (daily) can be calculated by this equation:
  - `fee = feeTier * volume24H * (deltaL / (L + deltaL))` where:
    - `volume24H` = average of 24h volume from `[currentDay - 7, currentDay - 1]`
    - `L` = total liquidity (cumulative of `liquidityNet` from all ticks that `il <= ic`)
    - `deltaL` = delta liquidity, can be calculated from:
      - `liquidityAmount0 = amount0 * (sqrt(pu) * sqrt(pl)) / (sqrt(pu) - sqrt(pl))`
      - `liquidityAmount1 = amount1 / (sqrt(pu) - sqrt(pl))`
      - if `ic < il`; `deltaL = liquidityAmount0`
      - if `ic > iu`; `deltaL = liquidityAmount1`
      - if `ic >= il && ic <= iu`; `deltaL = min(liquidityAmount0, liquidityAmount1)`

---

## TO-DO

- [ ] Integrate our shiny [new graph](https://github.com/Forge-Trade/Forge-Price-Subgraph) for better price querying.
- [ ] Tashi contracts integration + autocompounder
- [ ] Revert & Steer data feed
- [ ] Replace CoinGecko API with GeckoTerminal API

---

Forked by [@LPX](https://x.com/LPX_404) to unify Evmos DeFi; Recent: [@noahwbragg](https://twitter.com/noahwbragg). Previous: [@chunrapeepat](https://twitter.com/chunrapeepat).


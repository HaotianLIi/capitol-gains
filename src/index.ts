import { verifyPagePrams } from "./quiver/trade/congressTrade";

async function main() {
  const createFileWith50Trade = verifyPagePrams(50);
  return createFileWith50Trade;
}

await main();


import { verifyPagePrams } from "./quiver/trade/congressTrade";
import { getCongressTradeData } from "./quiver/trade/congressTrade";
async function main() {
  const pageSizeWriteTest = await verifyPagePrams(50);
  const pageSizeGetTest = getCongressTradeData();

}

await main();


import { getCongressTradeByBioGuideId, getCongressTradeByDefault } from "./quiver/trade/congressTrade";

async function main() {
  const id = "T000490";
  await getCongressTradeByBioGuideId(id);
  // await getCongressTradeByDefault();
}

await main();



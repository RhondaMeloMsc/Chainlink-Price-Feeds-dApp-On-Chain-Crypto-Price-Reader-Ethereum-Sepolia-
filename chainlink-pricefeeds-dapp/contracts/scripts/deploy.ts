
import { ethers } from "hardhat";
import "dotenv/config";

async function main() {
  const feed = process.env.FEED_ADDRESS;
  if (!feed) throw new Error("Set FEED_ADDRESS in contracts/.env to a Chainlink feed address");
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);
  console.log("Using FEED_ADDRESS:", feed);

  const Consumer = await ethers.getContractFactory("PriceConsumer");
  const consumer = await Consumer.deploy(feed);
  await consumer.waitForDeployment();

  console.log("CONSUMER_ADDRESS:", await consumer.getAddress());
}

main().catch((e) => { console.error(e); process.exit(1); });

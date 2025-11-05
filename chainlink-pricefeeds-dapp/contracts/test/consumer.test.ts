
import { ethers } from "hardhat";
import { expect } from "chai";

describe("PriceConsumer", () => {
  it("stores feed address and exposes latestPrice()", async () => {
    // Deploy a dummy feed that returns a fixed price for local tests
    const Dummy = await ethers.getContractFactory(`
      // SPDX-License-Identifier: MIT
      pragma solidity ^0.8.24;
      contract DummyFeed {
        function decimals() external pure returns (uint8) { return 8; }
        function description() external pure returns (string memory) { return "BTC / USD"; }
        function version() external pure returns (uint256) { return 4; }
        function getRoundData(uint80) external pure returns (uint80, int256, uint256, uint256, uint80) {
          return (1, 500000000000, block.timestamp-10, block.timestamp-10, 1);
        }
        function latestRoundData() external pure returns (uint80, int256, uint256, uint256, uint80) {
          return (2, 501234567890, block.timestamp-5, block.timestamp-5, 2);
        }
      }
    `, []);
    const dummy = await Dummy.deploy();
    await dummy.waitForDeployment();

    const Consumer = await ethers.getContractFactory("PriceConsumer");
    const consumer = await Consumer.deploy(await dummy.getAddress());
    await consumer.waitForDeployment();

    const out = await consumer.latestPrice();
    // tuple: price, decimals, desc, updatedAt
    expect(out[1]).to.equal(8n);
    expect(out[2]).to.equal("BTC / USD");
  });
});


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {AggregatorV3Interface} from "./AggregatorV3Interface.sol";

/**
 * @title PriceConsumer
 * @dev Minimal consumer for Chainlink AggregatorV3 price feeds.
 */
contract PriceConsumer {
    AggregatorV3Interface public immutable feed;

    constructor(address _feed) {
        require(_feed != address(0), "feed=0");
        feed = AggregatorV3Interface(_feed);
    }

    function latestPrice() external view returns (int256 price, uint8 decimals, string memory desc, uint256 updatedAt) {
        (, int256 answer,, uint256 _updatedAt,) = feed.latestRoundData();
        decimals = feed.decimals();
        desc = feed.description();
        price = answer;
        updatedAt = _updatedAt;
    }
}

// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetFixedSupply.sol";

/**
    @title Mock ERC20
    @author jierlich
    @notice Mock ERC20 for testing purposes
*/

contract MockERC20 is ERC20PresetFixedSupply {
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        address owner
    ) ERC20PresetFixedSupply(name, symbol, initialSupply, owner) {}

    function decimals() public view override returns (uint8) {
        return 8;
    }
}

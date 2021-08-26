// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";

/**
    @title DumbRock
    @author jierlich
    @notice It's just a dumb rock
*/

contract DumbRock is Ownable, ERC721PresetMinterPauserAutoId {
    address public wbtc;

    uint256 public fee = 21000000 gwei;

    constructor(address _wbtc) ERC721PresetMinterPauserAutoId("DumbRock", "DUMB", "") {
        wbtc = _wbtc;
    }

    function mintRock(address _to) public payable {
        require(msg.value == fee, 'Incorrect fee amount');
        IERC20(wbtc).transferFrom(msg.sender, address(this), 100000000);
        super.mint(_to);
    }

    function burnRock(uint256 _tokenId) public {
        require(super.ownerOf(_tokenId) == msg.sender, 'Only owner can burn');
        super.burn(_tokenId);
        IERC20(wbtc).transfer(msg.sender, 100000000);
    }

    function withdraw() onlyOwner() public {
        payable(owner()).transfer(address(this).balance);
    }
}
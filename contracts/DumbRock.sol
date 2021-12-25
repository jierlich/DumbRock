// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
    @title DumbRock
    @author jierlich
    @notice It's just a dumb rock
*/

contract DumbRock is Ownable, ERC721 {
    address public wbtc;

    // Ether is matic here since deployment is on Polygon
    uint256 public fee = 4.2 ether;
    /// @notice 0.0021 BTC
    uint256 public btcCost = 210000; 
    uint256 public count;

    constructor(address _wbtc) ERC721("DumbRock", "DUMB") {
        wbtc = _wbtc;
    }

    function mintRock(address _to) public payable {
        require(msg.value == fee, 'Incorrect fee amount');
        require(count < 2100, 'Max mint reached');
        IERC20(wbtc).transferFrom(msg.sender, address(this), btcCost);
        _safeMint(_to, count);
        count += 1;
        
    }

    function burnRock(uint256 _tokenId) public {
        require(super.ownerOf(_tokenId) == msg.sender, 'Only owner can burn');
        _burn(_tokenId);
        IERC20(wbtc).transfer(msg.sender, btcCost);
    }

    function withdraw() onlyOwner() public {
        payable(owner()).transfer(address(this).balance);
    }
}
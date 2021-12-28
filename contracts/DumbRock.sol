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

    /// @notice ether is matic here since deployment will be on Polygon
    uint256 public fee = 4.2 ether;
    /// @notice 0.0021 BTC
    uint256 public btcCost = 210000; 
    uint256 public count = 0;
    uint256 public maxRocks = 2100;
    string URI = "ipfs://QmXLw83RKDRPxjZhp3jDbCuvB1cbtHeCazSjnZmEuHduZG";

    constructor(address _wbtc) ERC721("DumbRock", "DUMB") {
        wbtc = _wbtc;
    }

    function mintRock(address _to) public payable {
        require(msg.value == fee, 'Incorrect fee amount');
        require(count < maxRocks, 'Max mint reached');
        bool success = IERC20(wbtc).transferFrom(msg.sender, address(this), btcCost);
        require(success, "Failed to deposit wBTC");
        _safeMint(_to, count);
        count += 1;
        
    }

    function burnRock(uint256 _tokenId) public {
        require(super.ownerOf(_tokenId) == msg.sender, 'Only owner can burn');
        _burn(_tokenId);
        bool success = IERC20(wbtc).transfer(msg.sender, btcCost);
        require(success, "Failed to withdraww wBTC");
    }

    function withdraw() onlyOwner() public {
        payable(owner()).transfer(address(this).balance);
    }

    function baseURI() public view virtual returns (string memory) {
        return URI;
    }

    function tokenURI(uint256 /* tokenId */) public view virtual override returns (string memory) {
        return URI;
    }
}

// SPDX-License-Itentifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MintAnimalToken is ERC721Enumerable {
    constructor() ERC721("h662Animals", "HAS") {}

    //public : 외부에서 사용가능
    //mapping(key=>value)
    //animalTypes 컨트렉트: 토근아이디(key) 입력시 animalType(value)가 나옴. 없으면 0 리턴
    mapping(uint256 => uint256) public animalTypes;

    function mintAnimalToken() public {
        uint256 animalTokenId = totalSupply() + 1;//tokenId = 민팅된 총개수 + 1

        //랜덤한값(1~5중에 하나)을 뽑아서 animalType에 저장
        uint256 animalType = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, animalTokenId))) % 5 + 1;
        animalTypes[animalTokenId] = animalType;

        _mint(msg.sender, animalTokenId);
    }
}
//contract addr:0xd9145CCE52D386f254917e481eB44e9943F39138
// 0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8
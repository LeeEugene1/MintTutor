// SPDX-License-Itentifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

import "SaleAnimalToken.sol";

contract MintAnimalToken is ERC721Enumerable {
    constructor() ERC721("h662Animals", "HAS") {}

    SaleAnimalToken public saleAnimalToken;

    struct AnimalTokenData {
        uint256 animalTokenId;
        uint256 animalType;
        uint256 animalPrice;
    }

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

    //v2: 속도개선을 위해 컨트렉트내부에서 for문 돌리기
    function getAnimalTokens(address _animalTokenOwner) view public returns (AnimalTokenData[] memory) {
        uint256 balanceLength = balanceOf(_animalTokenOwner);
        require (balanceLength != 0, "Owner did not have token.");

        AnimalTokenData[] memory animalTokenData = new AnimalTokenData[](balanceLength);

        for(uint256 i = 0; i < balanceLength; i++){
            uint256 animalTokenId = tokenOfOwnerByIndex(_animalTokenOwner, i);
            uint256 animalType = animalTypes[animalTokenId];
            uint256 animalPrice = saleAnimalToken.getAnimalTokenPrice(animalTokenId);

            animalTokenData[i] = AnimalTokenData(animalTokenId, animalType, animalPrice);
        }

        return animalTokenData;
    }

    //v2: saleAnimalToken을 사용하기위해 컨트렉트 배포후에 setSaleAnimalToken(sale컨트렉트주소)등록
    function setSaleAnimalToken(address _saleAnimalToken) public{
        saleAnimalToken = SaleAnimalToken(_saleAnimalToken);
    }

}
//v1: 민팅: mintAnimalToken, 민팅확인: getAnimalTokens
//contract addr_v2: 0xb18B6Fd54fd1020163C994148eAB9519acBAB86B
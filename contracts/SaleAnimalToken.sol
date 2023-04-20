// SPDX-License-Itentifier: MIT

pragma solidity ^0.8.0;

import "MintAnimalToken.sol";

contract SaleAnimalToken{
    MintAnimalToken public mintAnimalTokenAddress;//mintAnimalTokenAddress = '', contructor에서 생성

    constructor(address _mitAnimalTokenAddress){
        mintAnimalTokenAddress = MintAnimalToken(_mitAnimalTokenAddress);//deploy시 인자로 Mint contract를 deploy하고 생성된 컨트렉트주소입력
    }

    mapping(uint256 => uint256) public animalTokenPrices;//prices: tokenId => price

    uint256[] public onSaleAnimalTokenArr;

    //판매등록
    function setForSaleAnimalToken(uint256 _animalTokenId, uint256 _price) public {
        address animalTokenOwner = mintAnimalTokenAddress.ownerOf(_animalTokenId);

        //test코드: 맞으면 다음줄 아니면 메시지출력
        require(animalTokenOwner == msg.sender, "Caller is not animal token owner.");
        require(_price > 0, "Price is zero or lower.");
        require(animalTokenPrices[_animalTokenId] == 0, "This token is already on sale.");//없으면 0 있으면 다른숫자
        //Mint 컨트렉트에서 판매권한을 줬는가? isApprovedForAll(owner:이컨트렉트만든놈, operator:_mitAnimalTokenAddress)
        require(mintAnimalTokenAddress.isApprovedForAll(animalTokenOwner, address(this)), "Animal token owner did not approve token.");
        //참고로 권한을 주려면 Mint컨트렉트에서 setApprovalForAll(operator:_mitAnimalTokenAddress, approved: true)

        animalTokenPrices[_animalTokenId] = _price;

        //판매중인것만 배열에 담음 - 프앤에서 필요
        onSaleAnimalTokenArr.push(_animalTokenId);
    }
}
//0xd9145CCE52D386f254917e481eB44e9943F39138
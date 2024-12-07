// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PlatformToken is ERC20 {
    constructor() ERC20("XFIT", "XFIT") {
        _mint(address(this), 1000000 ether);
    }

    function approveCustom(address owner , address spender, uint256 value)  public  returns (bool) {
        
        _approve(owner, spender, value);
        return true;
    }

}
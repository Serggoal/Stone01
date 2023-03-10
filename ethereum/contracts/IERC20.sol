// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IERC20 {
    function decimals() external pure returns(uint);

    function totalSupply() external view returns(uint);

    function balanceOf(address account) external view returns(uint);

    function transfer(address to, uint amount) external;

    function allowance(address holder, address spender) external view returns(uint);

    function approve(address spender, uint amount) external;

    function transferFrom(address sender, address recipient, uint amount) external;

    event Transfer(address indexed from, address indexed to, uint amount);
    event Approval(address indexed holder, address indexed to, uint amount);
}
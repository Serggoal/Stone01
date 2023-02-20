// SPDX-License-Identifier: MIT

import "./IERC20.sol";

pragma solidity ^0.8.0;

contract RestartGame is IERC20 {
    address public owner;
    uint public totalTokens;
    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowances;
    string public name = "GameToken";
    string public symbol = "GAMT";
    uint public stopSupply;
    uint public contractBalance; 
    uint public remainsTokens;
    uint public fullBalance;
    uint public degree = 1000000000000000000; // 10**18
    uint public startAmout = 100000000000000000; // 0,1 ether;
    uint public rateGame = 500000000000000; // 0,0005 Eth
    uint public rateDepo = 100000000000000; // 0,0001 Eth
    uint public minDepo = 10000000000000000; // 0,01 Eth
    uint public minBet = 1000000000000000; // 0,001 Eth
    bool public restartPoint; 
    // uint public usersFee; 

    // mapping(address => uint) feeAmount; 
    // address[] public arrayUsersFee;

    constructor(uint _stopSupply) {
        owner = msg.sender;
        stopSupply = _stopSupply;
    }

    modifier enoughTokens(address _from, uint _amount) {
        require(balanceOf(_from) >= _amount, "Not enough tokens!");
        _;
    }

    modifier onlyOwner() {
       require(msg.sender == owner, "Only owner");
       _;
    }

    modifier startOrNot() {
       require(restartPoint == true, "Game is over or isn't start yet!");
       _;
    }

    event Rewarding(address receiver, uint howManyRewards);

     function getBalance() public {
       contractBalance = address(this).balance;
  }

    function setStopSupply(uint _stopSupply) public onlyOwner startOrNot {
      uint stopSupplyCheck = startAmout / rateDepo;
      require(_stopSupply > stopSupplyCheck, "Uncorrect stopSupply!");  
      stopSupply = _stopSupply;
    }

    function setRateGame(uint _rateGame) public onlyOwner {
      rateGame = _rateGame;
    }

    function setRateDepo(uint _rateDepo) public onlyOwner {
      rateDepo = _rateDepo;
    }

    function decimals() public override pure returns(uint) {
        return 18; 
    }

    function totalSupply() public override view returns(uint) {
        return totalTokens;
    }

    function balanceOf(address account) public override view returns(uint) {
        return balances[account];
    }

    function transfer(address to, uint amount) external override enoughTokens(msg.sender, amount) {
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
    }

    function allowance(address holder, address spender) external override view returns(uint) {
        return allowances[holder][spender];
    }

    function approve(address spender, uint amount) external override {
        allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
    }

    function transferFrom(address sender, address recipient, uint amount) external override enoughTokens(sender, amount) {
        allowances[sender][recipient] -= amount;
        balances[sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
    }

    // function balanceFee(address account) public view returns(uint) {
    //     return feeAmount[account];
    // }
    
    function mint(uint amount) private {
        // if(balances[msg.sender] == 0) {
        // arrayUsersFee.push(msg.sender);
        // }

        balances[msg.sender] += amount;
        totalTokens += amount;
        getBalance();

        if(totalTokens >= stopSupply) {
           remainsTokens = totalTokens;
           fullBalance = contractBalance;
           restartPoint = !restartPoint;
        }
      
        emit Transfer(address(0), msg.sender, amount);
    }

    // функция ручной выплаты. 
    
    function _rewardTokenHolders() public {
        require(balances[msg.sender] != 0, "You haven't tokens!");
        require(stopSupply <= remainsTokens, "The game is still going on!");
        
        address payable receiver = payable(msg.sender);
        uint rewardForPlayer = _howManyRewards(msg.sender);
        receiver.transfer(rewardForPlayer);

        emit Rewarding(receiver, rewardForPlayer);
    }

    function _howManyRewards(address _player) private returns(uint) {
        uint currentAmountPlayerTokens = balances[_player];

        balances[_player] = 0;
        totalTokens -= currentAmountPlayerTokens;
      return fullBalance * degree / remainsTokens * currentAmountPlayerTokens / degree;
    }

    // момент первой поставки ликвидности для старта игры
    function startGame() public payable {
        require(totalTokens == 0, "Game is already started!");
        require(msg.value >= startAmout, "Incorrect sum");

        remainsTokens = 0;
        fullBalance = 0;
        // delete arrayUsersFee;

        uint tokensToDepo = msg.value / rateDepo * degree;
        mint(tokensToDepo);
        restartPoint = !restartPoint;
    }

        // процесс поставки ликвидности в игру. В замен ликвидности получает токены

    function depo() public startOrNot payable {
        require(totalTokens != 0, "Game isn't yet started!");
        require(totalTokens < stopSupply, "Game is over!");
        require(msg.value >= minDepo, "Incorrect sum!"); // 0,01 Eth
    
          uint tokensToDepo = msg.value / rateDepo * degree;
          mint(tokensToDepo);
    }

    // процесс игры, когда пользователь делает ставку и запускает Бота
    // _result поступает с фронта, либо выиграл(1), либо проиграл(2)


    function playGame(uint _result) external startOrNot payable {
        
        require(totalTokens < stopSupply, "Game is over!");
        require(msg.value >= minBet, "Incorrect sum!"); // 0,001 Eth 
        require(msg.value <= contractBalance, "Not enouth funds in game!");

        uint rewardPlayer;

        // uint fee;
        // fee = msg.value / 1000 * 3;  // 0.3% fee
        // usersFee += fee;

        rewardPlayer = msg.value * 2;
        address addressPlayer = payable(msg.sender);

        // for (uint i = 0; i < arrayUsersFee.length; i++) {
        // uint singleFee; 
        // address addr = arrayUsersFee[i];
        // singleFee = balanceOf(addr) * fee / totalTokens;
        // feeAmount[addr] += singleFee;
        // }
        
        uint tokensToGame;

        if(_result == 1) {
            payable(addressPlayer).transfer(rewardPlayer);
            getBalance();
        } else if(_result == 2) {
            tokensToGame = msg.value / rateGame * degree;
            mint(tokensToGame);
        }
        emit Rewarding(addressPlayer, rewardPlayer);
    }

    // function _rewardFeeTokenHolders() public {
    //     require(feeAmount[msg.sender] != 0, "You haven't reward-fee!");
        
    //     address payable receiver = payable(msg.sender);
    //     uint feeForPlayer = feeAmount[msg.sender];
    //     feeAmount[msg.sender] = 0;
    //     receiver.transfer(feeForPlayer);
    //     usersFee -= feeForPlayer;
    //     getBalance();

    //     emit Rewarding(receiver, feeForPlayer);
    // }

    fallback() external payable {
    }

    receive() external payable {
    }

}
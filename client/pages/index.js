import { useState, useEffect } from "react";
import { ethers } from 'ethers';
import Layout from "../components/Layout";
import StepOrdered from "../components/StepOrdered";
import FooterResult from "../components/FooterResult";
import BlocksForGame from "../components/BlocksForGame";
import Score from "../components/Score";
import Header from "../components/Header";
import AllStats from "../components/AllStats";
import { Input, Modal, Button, List, Segment } from "semantic-ui-react";
import RestartGame from '../../ethereum/artifacts/contracts/RestartGame.sol/RestartGame.json';

const Index = () => {
    const [human, setHuman] = useState("");
    const [bot, setBot] = useState("");
    const [result, setResult] = useState();
    const [noticeBot, setNoticeBot] = useState("Run bot");
    const [colorButtonBot, setColorButtonBot] = useState("violet");
    const [resultColor, setResultColor] = useState("grey");
    const [resultIcon, setResultIcon] = useState("game");
    const [countHuman, setCountHuman] = useState(0);
    const [countBot, setCountBot] = useState(0);
    const [smileScore, setSmileScore] = useState();
    const [etherCheck, setEtherCheck] = useState(0);
    const [account, setAccount] = useState("");
    const [contract, setContract] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [bet, setBet] = useState(0);
    const [startBet, setStartBet] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState("This is error");
    const [isShowResult, setIsShowResult] = useState(false);
    const [isActiveShowButton, setIsActiveShowButton] = useState(true);
    const [isActiveShowResultButton, setIsActiveShowResultButton] = useState(true);

    const [provider, setProvider] = useState("");
    const [balanceOfContract, setBalanceOfContract] = useState("");
    const [stopSupply, setStopSupply] = useState(0);
    const [startAmount, setStartAmount] = useState("");
    const [balanceAcc, setBalanceAcc] = useState(0);
    const [totalTokens, setTotalTokens] = useState(0);
    const [userTokens, setUserTokens] = useState(0);
    const [restartPoint, setRestartPoint] = useState();
//    const [usersFee, setUsersFee] = useState(0);
//    const [balanceUserFee, setBalanceUserFee] = useState(0);

    const userReward = userTokens / totalTokens * balanceOfContract;

  const initConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();

      if (network.chainId !== 5) {
        setModalContent('Для игры необходимо выбрать сеть Goerli');
        setOpenModal(true);
      } else {
        const newSigner = provider.getSigner();
        setAccount(accounts[0]);
        setProvider(provider);
        setContract(
          new ethers.Contract(
            '0x39EDBfD2fd9a3Eb309099c93221f8219645a29F0',
            RestartGame.abi,
            newSigner
          )
        );
        const balanceOfContract = await provider.getBalance("0x39EDBfD2fd9a3Eb309099c93221f8219645a29F0");
        const balanceOfContract2= ethers.utils.formatEther(balanceOfContract)
        setBalanceOfContract(balanceOfContract2.toString());
        setIsConnected(true);
        setIsActiveShowButton(false);

        const codeAddress = provider.getCode("0x39EDBfD2fd9a3Eb309099c93221f8219645a29F0");
        console.log("code: ", codeAddress);
      }
    } else {
      setModalContent('Для игры нужно расширение Metamask');
      setOpenModal(true);
    }
  };

//   статистическая информация

  useEffect(() => {
    (async () => {
      if (contract) {
        try {
          const balanceAcc = await provider.getBalance(account);
          const balanceAcc2= ethers.utils.formatEther(balanceAcc);
          setBalanceAcc(balanceAcc2.toString());

          const startAmount = await contract.startAmout();
          const startAmount2= ethers.utils.formatEther(startAmount);
          setStartAmount(startAmount2.toString());

          const totalTokens = await contract.totalSupply();
          const totalTokens2= ethers.utils.formatEther(totalTokens);
          setTotalTokens(totalTokens2.toString()); 
        
          const balanceOfContract = await provider.getBalance("0x39EDBfD2fd9a3Eb309099c93221f8219645a29F0");
          const balanceOfContract2= ethers.utils.formatEther(balanceOfContract);
          setBalanceOfContract(balanceOfContract2.toString());

          // const usersFee = await contract.usersFee();
          // const usersFee2= ethers.utils.formatEther(usersFee);
          // setUsersFee(usersFee2.toString()); 

          const userTokens = await contract.balanceOf(account);
          const userTokens2= ethers.utils.formatEther(userTokens);
          setUserTokens(userTokens2.toString());

          // const balanceUserFee = await contract.balanceFee(account);
          // const balanceUserFee2= ethers.utils.formatEther(balanceUserFee);
          // setBalanceUserFee(balanceUserFee2.toString());

          const stopSupply = await contract.stopSupply();
          const stopSupply2= ethers.utils.formatEther(stopSupply);
          setStopSupply(stopSupply2.toString()); 

          const restartPoint = await contract.restartPoint();
          setRestartPoint(restartPoint.toString());

         } catch (error) {
          console.error("error: ", error);
          setModalContent(error.message);
          setOpenModal(true);
        }
      }
    }) ();
  }, [startBet, bet, isConnected, isShowResult, isActiveShowButton, restartPoint]);

  //  функция выбора игрока

    function handleHumanChange(e) {
      if(!isConnected) {
      setModalContent('Please, connect to Metamask');
      setOpenModal(true);

      } else {
      setHuman(e.target.value);
      setBot();
      setNoticeBot("Run bot")
      setColorButtonBot("violet")
    }
  }
  
  //  получение рандом числа от мин до макс
    const botPicture = { 1: "stone", 2: "scissors", 3: "paper" };

    function randomNumberInRange(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

  //  функция первичного старта/депозита игры

    const handleStartGame = async () => {

      if(!isConnected) {
        setModalContent('First of all you need to connect the Metamask!');
        setOpenModal(true);
      } else if(balanceOfContract != 0 && restartPoint == "true") {
        setModalContent('Game is already started!');
        setOpenModal(true);
      } else if(startBet < startAmount) {
        setModalContent('Incorrect sum. Need more then or equal to 0.1 Eth');
        setOpenModal(true);
      } else {
        ///
        try {
          let res = await contract.startGame({
            value: ethers.utils.parseEther(startBet) 
          });
          await res.wait();
          setNoticeBot("Run bot")
          setColorButtonBot("violet")
          setRestartPoint("true");
          setStartBet();
          setIsActiveShowButton(false);
        } catch (error) {
       //   setLoading(false);
          if (error.code == 'INSUFFICIENT_FUNDS') {
            setModalContent('Недостаточно средств!');
            setOpenModal(true);
          }
          if (error.code == "4001") {
            setModalContent('Транкзация отклонена пользователем');
            setOpenModal(true);
          }
          if (error.code == 'CALL_EXCEPTION') {
            setModalContent('Ошибка транкзации, попробуйте еще раз');
            setOpenModal(true);
          }
          console.error("error: ", error);
          setModalContent(error.message);
            setOpenModal(true);
        }
        ///
      }
    }

     //  функция депозитов в игру

    const handleDepoGame = async () => {
      setIsActiveShowButton(true);
      if(totalTokens == 0) {
        setModalContent("Game isn't yet started!");
        setOpenModal(true);
      } else if(totalTokens >= stopSupply) {
        setModalContent("Game is over!");
        setOpenModal(true);  
      } else if(startBet < 0.01) {
        setModalContent('Incorrect sum. Need more than or equal to 0.01 Eth');
        setOpenModal(true);
      } else {
        
        try {
          let res = await contract.depo({
            value: ethers.utils.parseEther(startBet),
          });
          await res.wait();
          
          setHuman("");
          setBot("");
          setResult("");
          setResultColor("grey");
          setResultIcon("game");
          setIsActiveShowResultButton(true);
          setIsActiveShowButton(false);
          setIsShowResult(false);
          setEtherCheck(0);
          setStartBet();
        } catch (error) {
          if (error.code === 'INSUFFICIENT_FUNDS') {
            setModalContent('Недостаточно средств!');
            setOpenModal(true);
          }
          if (error.code === 4001) {
            setModalContent('Транкзация отклонена пользователем');
            setOpenModal(true);
          }
          if (error.code === 'CALL_EXCEPTION') {
            setModalContent('Ошибка транкзации, попробуйте еще раз');
            setOpenModal(true);
          }
          console.error("error: ", error);
          setIsActiveShowButton(false);
          setModalContent(error.message);
          setOpenModal(true);
          setHuman("");
          setBot("");
          setResult("");
          setResultColor("grey");
          setResultIcon("game");
          setIsActiveShowResultButton(true);
          setIsShowResult(false);
          setEtherCheck(0);
        }
        
      }
    }

   //  функция игры / ставок

    const handleClickBot = async () => {
        setIsActiveShowButton(true); 
        if(!isConnected) {
        setIsActiveShowButton(false); 
        setModalContent('Please, connect to Metamask');
        setOpenModal(true);

        } else if(balanceOfContract == 0) {
        setIsActiveShowButton(false);
         setColorButtonBot("red")
         return setNoticeBot("Game not start")
        }
        
        else if(!human) {
          setIsActiveShowButton(false);
          setColorButtonBot("red")
          return setNoticeBot("Your move first")
        }

        else if(!bet) {
          setIsActiveShowButton(false);
          setColorButtonBot("red")
          return setNoticeBot("Your bet need")
        }

        else if(totalTokens >= stopSupply) {
          setIsActiveShowButton(false);
          setModalContent("Game is over!");
          setOpenModal(true);  
        }

        else if(bet < 0.001) {
          setIsActiveShowButton(false);
          setModalContent("Incorrect sum. Need more than or equal to 0.001 Eth");
          setOpenModal(true);
        }

        else if(bet > balanceOfContract) {
          setIsActiveShowButton(false);
          setModalContent("Not enouth funds in game!");
          setOpenModal(true);
        } else {
        setBot(botPicture[randomNumberInRange(1, 3)]); 
        } 
        
    };
    
    // функция запуска / показа результата

    const handleShowResult = async () => {
      setIsActiveShowResultButton(false);
      //setIsActiveShowButton(true); 
      if(etherCheck == 1 || etherCheck == 2) {
      try {
        let res = await contract.playGame(etherCheck, {
           value: ethers.utils.parseEther(bet),
        });
        await res.wait();
        setIsActiveShowResultButton(true);
        setIsActiveShowButton(false); 
        setIsShowResult(true);
        setEtherCheck(0);

      } catch (error) {
        setIsActiveShowButton(false); 
        setIsActiveShowResultButton(true);
        console.error("error: ", error);
        setModalContent(error.message);
        setOpenModal(true);
        setHuman("");
        setBot("");
        setResult("");
        setEtherCheck(0);
        setHuman();
        setResultColor("grey");
        setResultIcon("game");
        setIsShowResult(false);
      }
     } else {
      setIsShowResult(true);
      setIsActiveShowResultButton(true);
     }
    };

    // функция Клейма LP

    const handleClaimRewards = async () => {
      try {
        setIsActiveShowButton(true);
        let res = await contract._rewardTokenHolders({gasLimit: 100000});
        await res.wait();
        setIsActiveShowButton(false);
      } catch (error) {
        console.error("error: ", error);
        setModalContent(error.message);
        setOpenModal(true);
        setIsActiveShowButton(false);
      }
    };

    // функция Клейма комиссии

    // const handleClaimFee = async () => {
    //   try {
    //     setIsActiveShowButton(true);
    //     let res = await contract._rewardFeeTokenHolders({from: account});
    //     await res.wait();
    //     setIsActiveShowButton(false);
    //   } catch (error) {
    //     console.error("error: ", error);
    //     setModalContent(error.message);
    //     setOpenModal(true);
    //     setIsActiveShowButton(false);
    //   }
    // }

   // функция перезапуска игры

    const handleClickRestartGame = () => {
        setHuman("");
        setBot("");
        setResult("");
        setResultColor("grey");
        setResultIcon("game");
        setIsActiveShowResultButton(true);
        setIsActiveShowButton(false);
        setIsShowResult(false);
        setEtherCheck(0);
      };

      // функция перезапуска счета
    
    const handleClickRestartScore = () => {
      setCountHuman(0);
      setCountBot(0);
      setHuman("");
      setBot("");
      setResult("");
      setResultColor("grey");
      setResultIcon("game");
      setIsActiveShowResultButton(true);
      setIsActiveShowButton(false);
      setIsShowResult(false);
      setEtherCheck(0);
    }
    
    // функция изменения личного выбора

    const handleChangeMyChoose = () => {
      setHuman("");
      setBot("");
    }
    
    // эффект определения результата
  
    useEffect(() => {
      (async () => {
        if (human && bot) {
          if (human === "stone" && bot === "scissors") {
            setResult("You win");
          } else if (human === "scissors" && bot === "paper") {
            setResult("You win");
          } else if (human === "paper" && bot === "stone") {
            setResult("You win");
          } else if (human === "stone" && bot === "paper") {
            setResult("You lost");
          } else if (human === "scissors" && bot === "stone") {
            setResult("You lost");
          } else if (human === "paper" && bot === "scissors") {
            setResult("You lost");
          } else {
            setResult("Drawn game");
          }
          return null;
        }
        setResult("Please, choose all picture!");
      })();
    }, [human, bot, result]);

    // for ether-contract

    useEffect(() => {
      (async () => {
        if (result === "You win") {
          setEtherCheck(1);
        } else if (result === "You lost") {
          setEtherCheck(2);
        } 
      })();
    }, [human, bot, result]);

    // эффект получения счета

    useEffect(() => {
      (async () => {
        if(isShowResult) {
        if (result === "You win") {
          setResultColor("green");
          setCountHuman(prev => prev + 1);
          setResultIcon("winner");

        } else if (result === "You lost") {
          setResultColor("red");
          setCountBot(prev => prev + 1);
          setResultIcon("frown outline");

        } else if (result === "Drawn game"){
          setResultColor("blue");
          setResultIcon("handshake outline");
        } else {
          setResultColor("grey");
          setResultIcon("game");
        }
      }
      })();
    }, [isShowResult]);

   // эффект иконки счета

    useEffect(() => {
      (async () => {
        if(isShowResult) {
        if (countHuman > countBot) {
          setSmileScore("smile outline");
        } else if (countHuman < countBot) {
          setSmileScore("frown outline");
        } else {
          setSmileScore("balance scale");
        }
       }
      })();
    }, [countHuman, countBot]);

// эффект сброса цвета и надписи на кнопке Бота

    useEffect(() => {
      (async () => {
        setColorButtonBot("violet");
        setNoticeBot("Run bot");
      })();
    }, [bet, isConnected]);

  // эффект затемнения кнопок при клеймах и старте

    useEffect(() => {
      (async () => {
      if(totalTokens < stopSupply && totalTokens == 0) {
      setIsActiveShowButton(true);
     } 
    })();
    }, [isActiveShowButton]);

    return (
<Layout>

  {/* блок - главного меню */}

  <Header 
     onInitConnection={initConnection}
     account={account}
     balanceOfContract={balanceOfContract}
     balanceAcc={balanceAcc}
     totalTokens={totalTokens}
     stopSupply={stopSupply}
     userTokens={userTokens}
     isConnected={isConnected}
     restartPoint={restartPoint}
  />

    {/* блок - старта игры */} {/* блок депозитов */} {/* блок счёта - SCORE */}
  
  <List divided verticalAlign='middle' style={{margin: "20px"}}>
    <List.Item>
      <List.Content floated='right'>
      <Score 
             countHuman={countHuman}
             countBot={countBot}
             onClickRestartScore={handleClickRestartScore}
             smileScore={smileScore}
           />
      </List.Content>
     
         {totalTokens == 0 ?
      
          <Input
          // disabled={totalTokens == 0 && isConnected ? !{isActiveShowButton} : {isActiveShowButton}}
           icon='ethereum'
           iconPosition='left'
           label={{ tag: true, content: 'Start game. No less 0.1 Eth!' }}
           labelPosition='right'
           placeholder='0.00000'
           onChange={(e) => setStartBet(e.target.value)}
          />
          :
          <Input
          // disabled={isActiveShowButton}
           icon='ethereum'
           iconPosition='left'
           label={{ tag: true, content: 'Depo in game. No less 0.01 Eth!' }}
           labelPosition='right'
           placeholder='0.00000'
           onChange={(e) => setStartBet(e.target.value)}
          />
         }
        {!startBet ? "" : 
             <Button 
            // disabled={(totalTokens == 0 && isConnected) || (totalTokens != 0 && isConnected) ? !{isActiveShowButton} : {isActiveShowButton}} 
             color='violet' animated='fade' style={{marginLeft: "20px"}}>
               <Button.Content visible>Press here!</Button.Content>
               {totalTokens == 0 ?
               <Button.Content hidden onClick={handleStartGame}>Good luck</Button.Content>
               :
               <Button.Content hidden onClick={handleDepoGame}>Thank's for depo</Button.Content>
               }
             </Button>
        }
       </List.Item>
    </List>

     {/* блок - всей информации */}

     <AllStats 
      userReward={userReward} 
      isConnected={isConnected} 
      userTokens={userTokens}
      totalTokens={totalTokens}
      stopSupply={stopSupply}
      restartPoint={restartPoint}
     // usersFee={usersFee}
     // balanceUserFee={balanceUserFee}
      //onHandleClaimFee={handleClaimFee}
      onHandleClaimRewards={handleClaimRewards}
   />
    
     {/* блок - пошагового выполнения */}

   <StepOrdered 
   human={human} 
   bot={bot} 
   bet={bet}
   isActiveShowResultButton={isActiveShowResultButton}
   isShowResult={isShowResult}
   />

     {/* блок - ставки */}

   <Segment inverted color='violet' textAlign='center'>
   <Input
    //disabled={isActiveShowButton}
    icon='ethereum'
    iconPosition='left'
    label={{ tag: true, content: 'Your bet. No less 0.001 Eth!' }}
    labelPosition='right'
    placeholder='0.00000'
    onChange={(e) => setBet(e.target.value)}
  />
  </Segment>

 {/* блок - игры */}

  <BlocksForGame 
         human={human} 
         bot={bot} 
         noticeBot={noticeBot} 
         colorButtonBot={colorButtonBot}
         onHumanChange={handleHumanChange} 
         onChangeMyChoose={handleChangeMyChoose}
         onClickBot={handleClickBot} 
         contract={contract}
         isConnected={isConnected}
         isShowResult={isShowResult}
         isActiveShowButton={isActiveShowButton}
         />

  {/* footer for result */}

  <FooterResult 
    onShowResult={handleShowResult}
    resultColor={resultColor} 
    resultIcon={resultIcon} 
    result={result}
    bot={bot} 
    onClickRestartGame={handleClickRestartGame} 
    isShowResult={isShowResult}
    isActiveShowResultButton={isActiveShowResultButton}
  />
      


   <Modal
      centered={false}
      open={openModal}
      >
      <Modal.Header>Something wrong!</Modal.Header>
      <Modal.Content>
        <Modal.Description style={{wordBreak: 'break-word'}}>
          {modalContent}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpenModal(false)}>OK</Button>
      </Modal.Actions>
     </Modal>

   </Layout>
    );
};
export default Index;

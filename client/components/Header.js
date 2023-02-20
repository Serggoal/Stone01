import { Button, Menu, Icon } from "semantic-ui-react";
import Link from 'next/link'
import { useState, useEffect } from "react";

const Header = (props) => {

  const [overviewGame, setOverviewGame] = useState("Welcome to the Game!!! Connect Metamask (Goerli) ==>");

  useEffect(() => {
    (async () => {

    if(props.totalTokens == 0 && props.restartPoint == "false") {
      setOverviewGame("The game will start after the first deposit!");    
    }  else if(props.restartPoint == "false" && props.userTokens > 0) {
      setOverviewGame("Game is over. Claim your rewards.");
    } else if(props.restartPoint == "false" && props.userTokens == 0) {
      setOverviewGame("Game is over. Wait for the start!");
    } else if(props.restartPoint == "true") {
      setOverviewGame("Play in game: depo or bet and win x2!");    
  }
    })();
  }, [props.totalTokens, props.isConnected, props.userTokens, props.restartPoint]);

  const miniNumber = Number(props.balanceAcc).toFixed(4);
  const miniNumberContract = Number(props.balanceOfContract).toFixed(4);
  const miniText = (props.account).substring(0, 5) + '.....' + (props.account).slice(37);
  return (
    <Menu size='large' style={{marginTop: "20px"}}>
      {/* <Menu.Item href="/" header>Home</Menu.Item> */}

      <Menu.Item href="" header color='green'>{overviewGame}</Menu.Item>

        <Menu.Menu position='right'>    
         <Menu.Item>
            {!props.account ? <Button color='orange'>Funds in game</Button> : <Button color='orange'><Icon name='ethereum' />{miniNumberContract}</Button>}
          </Menu.Item>
          <Menu.Item>
          {!props.account ? <Button primary style={{marginRight: "20px"}}>Your Eth</Button> : <Button primary style={{marginRight: "20px"}}><Icon name='ethereum' />{miniNumber}</Button>}
            {!props.account ? <Button primary onClick={props.onInitConnection}>Connect Metamask</Button> :
            <Link href="/play"><Button primary>{miniText}</Button></Link>}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
  );
};
export default Header;
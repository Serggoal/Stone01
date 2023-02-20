import React from 'react'
import { Header, Icon, Message, Button } from 'semantic-ui-react'

const FooterResult = (props) => (

  <Header icon textAlign='center'>
  
  {!props.bot ? "" :
  <div>
    {props.isShowResult ? "" :
    <Button disabled={!props.isActiveShowResultButton} color='violet' onClick={props.onShowResult} circular size='massive'>SHOW RESULT</Button>
    }
   </div>
  }
    
  <Icon name={props.resultIcon} circular style={{marginTop: "20px"}}/>

  <Header.Content>
    <h2 style={{color: props.resultColor}}>Result:</h2>
    {!props.isShowResult ? 
    ""
    :
    <Message compact color={props.resultColor}>{props.result}</Message>
    }
  </Header.Content>
    {props.isShowResult && <Button color='violet' style={{margin: "20px"}} onClick={props.onClickRestartGame}>Play again</Button>}
  </Header>
)

export default FooterResult
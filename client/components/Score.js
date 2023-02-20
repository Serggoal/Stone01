import React from 'react'
import { Button, Icon, Label } from "semantic-ui-react";

const Score = (props) => (

  <Button.Group>
    {props.countHuman > 0 || props.countBot > 0 ? 
   <Button style={{margin: "1px"}} color='violet' onClick={props.onClickRestartScore}>Restart score</Button> 
      : ""}
   <Button as='div' labelPosition='right'>
   <Button color='blue'>
    <Icon name='heart' />
    You
   </Button>
    <Label as='a' basic color='green' pointing='left'>
      {props.countHuman}
    </Label>
   </Button>
   {props.countHuman > 0 || props.countBot > 0 ? 
    <Button circular size="medium" icon={props.smileScore} />
   : ""}

  <Button as='div' labelPosition='left'>
     <Label as='a' basic color='red' pointing='right'>
      {props.countBot}
     </Label>
    <Button color='blue'>
     <Icon name='fork' />
      Bot
    </Button>
   </Button>
  </Button.Group>
)

export default Score
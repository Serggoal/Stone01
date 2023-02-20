import { Button, Menu, Icon, Label, Segment } from "semantic-ui-react";
import { useState, useEffect } from "react";

const AllStats = (props) => {


    const miniNumberRewards = Number(props.userReward).toFixed(4);
    const miniBalanceUserFee = Number(props.balanceUserFee).toFixed(6);
   // const miniStopSupply = Number(props.stopSupply).toFixed(1);

    return ( 
      <>
    <Segment color='violet' textAlign='center'>
    <Menu compact>

     <Menu.Item as='a'>
     <Icon name='stop circle' /> StopGame tokens
     <Label color='red' floating>
       {props.stopSupply}
     </Label>
   </Menu.Item>
   <Menu.Item as='a'>
     <Icon name='users' /> Total tokens
     <Label color='orange' floating>
       {props.totalTokens}
     </Label>
   </Menu.Item>
   <Menu.Item as='a'>
     <Icon name='male' /> Your tokens 
     <Label color='teal' floating>
       {props.userTokens}
     </Label>
   </Menu.Item>
   <Menu.Item as='a'>
     <Icon name='ethereum' /> Your LP rewards 
     {props.isConnected && props.userTokens > 0 ? <Label color='green' floating> {miniNumberRewards} </Label>
      :
      <Label color='green' floating> 0 </Label> }
   </Menu.Item>
   
  {props.restartPoint == "false" && props.isConnected && props.userTokens > 0 ?
   <Menu.Item as='a' onClick={props.onHandleClaimRewards} >
   <Icon name='mail' /> 
   <Label color='green'>
     Claim LP rewards
   </Label>
   </Menu.Item>
   : ""
  }
  </Menu> 
 </Segment>

 {/* <Segment color='green' textAlign='center'>
    <Menu compact>

    <Menu.Item as='a'>
     <Icon name='dollar' /> All fees 
     <Label color='orange' floating>
       {props.usersFee}
     </Label>
   </Menu.Item>
   
   <Menu.Item as='a'>
     <Icon name='ethereum' /> Your fee rewards 
     {props.isConnected && props.balanceUserFee > 0 ? <Label color='green' floating> {miniBalanceUserFee} </Label>
      :
      <Label color='green' floating> 0 </Label> }
   </Menu.Item>
   
  {props.balanceUserFee > 0 ?
   <Menu.Item as='a' onClick={props.onHandleClaimFee} >
   <Icon name='ethereum' /> 
   <Label color='green'>
     Claim fee rewards
   </Label>
   </Menu.Item>
   :
   ""}

  </Menu> 
 </Segment> */}


 </>
    )
};
export default AllStats;
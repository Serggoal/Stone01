import React from 'react';
import { useState } from "react";
import { Button, Segment, Grid, Divider, Header, Icon, Modal } from "semantic-ui-react";
import Image from 'next/image';
import Stone from "../images/stonemini.png";
import Scissors from "../images/Scissorsmini.png";
import Paper from "../images/Papermini.png";
import Stone2 from "../images/stone.png";
import Scissors2 from "../images/scissors.png";
import Paper2 from "../images/paper.png";

export default function BlocksForGame(props) {

    const pictures = { stone: Stone, scissors: Scissors, paper: Paper };
    const picturesBot = { stone: Stone2, scissors: Scissors2, paper: Paper2 };

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    return (
      <>
    <Segment placeholder>
    <Grid columns={2} stackable textAlign='center'>
    <Divider vertical> === </Divider>

     {/* human */}

      <Grid.Row verticalAlign='middle'>
        <Grid.Column>
        {!props.human ?
          <Header icon>
            <Icon name='recycle' />
            To play the game, please<br/> select your picture from the dropdown below <br/><br/>
            <select onChange={props.onHumanChange}>
              <option value="">Choose your picture</option>
              <option value="stone">stone</option>
              <option value="scissors">scissors</option>
              <option value="paper">paper</option>
            </select> 
          </Header>
          :
          <Header icon>
            <Icon name='smile outline' />
            <select>
            <option value="">Choise is done</option>
            </select>
            <br/><br/>
            {!props.human || props.bot ? "" : 
        <Button color="grey" onClick={props.onChangeMyChoose}>Want to change</Button> 
            }
          </Header>
        }

        </Grid.Column>

        {/* human picture */}

        <Grid.Column>
        {!props.human ?
          <Header icon>
            <Icon name='eye' />
            <br/><br/>Your choice will appear here
          </Header>
          :
          <Header icon>
            <br/>Your picture is: {props.human.toUpperCase()} <br/><br/>
            <Image src={pictures[props.human]} alt="" width="100" />

   <div style={{margin: "10px"}}>
    <Modal 
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show Picture</Button>}
    >
      <Modal.Header>{props.human.toUpperCase()}</Modal.Header>
      <Modal.Content image scrolling>
        <Image src={pictures[props.human]} wrapped />
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Close"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
    </div>
          </Header>
          
        }
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>

 {/* bot */}

  <Segment placeholder>
    <Grid columns={2} stackable textAlign='center'>
      <Divider vertical> === </Divider>

      <Grid.Row verticalAlign='middle'>
        <Grid.Column>
        {!props.bot ? 
          <Header icon>
            <Icon name='cogs' />
            Run the robot <br/>image selection program <br/><br/>
            <Button 
            //disabled={props.isActiveShowButton} 
            color={props.colorButtonBot} onClick={props.onClickBot}>{props.noticeBot}</Button> 
          </Header>
          :
          <Header icon>
            <Icon name='bug' />
            {props.isShowResult ? "" :
            <Button loading primary> Loading </Button>
            }
          </Header>
        }
        </Grid.Column>

        <Grid.Column>
        {!props.isShowResult ?
          <Header icon>
            <Icon name='eye' />
            <br/><br/>Robot's choice will appear here
          </Header>
          :
          <Header icon>
            <br/>Robot's picture is: {props.bot} <br/><br/>
            {/* .toUpperCase() */}
            <Image src={picturesBot[props.bot]} alt="" width="80" />

            {/* BOT picture */}

    <div style={{margin: "10px"}}>
     <Modal 
      onClose={() => setOpen2(false)}
      onOpen={() => setOpen2(true)}
      open={open2}
      trigger={<Button>Show Picture</Button>}
    >
      <Modal.Header>{props.bot}</Modal.Header>
      <Modal.Content image>
        <Image src={picturesBot[props.bot]} wrapped />
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Close"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen2(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
    </div>

          </Header>
        }
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
  </>
)

    }
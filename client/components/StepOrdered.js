import React from 'react';
import { Step } from 'semantic-ui-react';

const StepOrdered = (props) => (
    <Step.Group ordered fluid>
       {/* widths={3} */}
       {props.bet == "" ?
      <Step active>
        <Step.Content>
          <Step.Title>Fisrt step</Step.Title>
          <Step.Description>Set your bet</Step.Description>
        </Step.Content>
      </Step>
      :
      <Step completed>
        <Step.Content>
          <Step.Title>Fisrt step</Step.Title>
          <Step.Description>Set your bet</Step.Description>
        </Step.Content>
      </Step>
    }
    {props.human == "" ?
      <Step active>
        <Step.Content>
          <Step.Title>Second step</Step.Title>
          <Step.Description>Choose your own picture</Step.Description>
        </Step.Content>
      </Step>
      :
      <Step completed>
        <Step.Content>
          <Step.Title>Second step</Step.Title>
          <Step.Description>Choose your own picture</Step.Description>
        </Step.Content>
      </Step>
    }
  {!props.bot ?
      <Step active>
        <Step.Content>
          <Step.Title>Third step</Step.Title>
          <Step.Description>Launch the robot's choose</Step.Description>
        </Step.Content>
      </Step>
      :
      <Step completed>
        <Step.Content>
          <Step.Title>Third step</Step.Title>
          <Step.Description>Launch the robot's choose</Step.Description>
        </Step.Content>
      </Step>
  }
  {props.isActiveShowResultButton && !props.isShowResult ?
      <Step active>
        <Step.Content>
          <Step.Title>Look at the result</Step.Title>
        </Step.Content>
      </Step>
      :
      <Step completed>
        <Step.Content>
          <Step.Title>Look at the result</Step.Title>
        </Step.Content>
      </Step>
    }
    </Step.Group>
);

export default StepOrdered;
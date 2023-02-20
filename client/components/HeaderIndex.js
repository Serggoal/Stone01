import { Button, Menu } from "semantic-ui-react";
import Link from 'next/link';

const HeaderIndex = () => {

  return (
    <Menu size='large' style={{marginTop: "20px"}}>
      <Menu.Item href="/" header>Home</Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item>
            <Link href="/play"><Button primary>Let's GO</Button></Link>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
  );
};
export default HeaderIndex;
import React from 'react'
import { List } from 'semantic-ui-react'

const FooterContacts = () => (

<List style={{padding: "20px"}}>
<List.Item>
  <List.Icon name='users' />
  <List.Content>
  <a href="https://www.guidedao.xyz">Guide DAO</a>
  </List.Content>
</List.Item>
<List.Item>
  <List.Icon name='marker' />
  <List.Content>Moscow and all over the world</List.Content>
</List.Item>
<List.Item>
  <List.Icon name='mail' />
  <List.Content>
    <a href='mailto:YO@M-C-S.XYZ'>YO@M-C-S.XYZ</a>
  </List.Content>
</List.Item>
<List.Item >
  <List.Icon name='linkify' />
  <List.Content>
    <a href="https://telegra.ph/GameFi-Liquidity-Providing-02-09">Learn more about the GameFi Liquidity Providing</a>
  </List.Content>
</List.Item>
</List>
)

export default FooterContacts;
import React from 'react';
import { Menu } from 'antd';


function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="favorite">
        <a style={{position: "relative", bottom:"-12px"}}href="/favorite">Your Favorite Movies</a>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu
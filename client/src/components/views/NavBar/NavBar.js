import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button} from 'antd';
import './Sections/Navbar.css';
import Icon,{LeftOutlined} from '@ant-design/icons';
const Logo = 'https://w7.pngwing.com/pngs/922/754/png-transparent-movies-now-television-channel-high-definition-television-mn-movies-miscellaneous-television-text.png';

function NavBar() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="menu__logo">
        <a href="/"><img src={Logo} alt="Logo" style={{ width: '50%', marginTop: '-7px' }} /></a>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <LeftOutlined />
          {/* <Icon type="align-right" /> */}
        </Button>
        <Drawer
          //title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
const Upload = require('../../../../assets/images/upload.png');

function RightMenu(props) {

  const user = useSelector(state => state.user)
  var namee = "";

  if (user.userData && user.userData.isAuth) {
    console.log("display",user.userData.name);
   namee = user.userData.name;}
  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
       
        <Menu.Item key="mail">
          <a style={{position: "relative", bottom:"-12px"}} href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a style={{position: "relative", bottom:"-12px"}} href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
         <Menu.Item key="mail">
         <h3 style={{position: "relative", bottom:"-12px"}}>{namee}</h3>
        </Menu.Item>
        <Menu.Item key="logout">
          <a style={{position: "relative", bottom:"-12px"}} onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);


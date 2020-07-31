import React from "react";
import { Menu } from "antd";

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="favorite">
        <a href="/favorite">Favorite</a>
      </Menu.Item>
      <Menu.Item key="STORY">
        <a href="/write-story">Write a Story</a>
      </Menu.Item>
    </Menu>
    
  );
}

export default LeftMenu;

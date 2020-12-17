import React, { useState, useContext } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
export default function Bar() {
  const context = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setactiveItem] = useState(path);
  const handleItemClick = (e, { name }) => setactiveItem(name);
  const handleLogout = ()=>{
    context.logout();
  };

  return (
    <Menu pointing secondary size="massive" color="pink">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      {!context.user ? (
        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name="register"
            active={activeItem === "register"}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
      ) : (
        <Menu.Menu position="right">
          <Menu.Item
            name={"hello " + context.user.username}
            active={activeItem === "user"}
                     as={Link}
            to="/"
            color="pink"
          />

          <Menu.Item
            name="logout"
            onClick={handleLogout}
            color="red"
          />
          {/* {context.user.username} */}
        </Menu.Menu>
      )}
    </Menu>
  );
}

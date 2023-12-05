import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// import "../assets/css/left.css";
import "../assets/css/sidebar.css";
import { Icon } from "@iconify/react";
import Logo from "../assets/img/cabemoji.png";
import ColorControl from "./ColorControl";

const sidebar = () => {
  return (
    <Sidebar className="sidebarCtn">
      <Menu>
        <div className="header">
        <img src={Logo} alt="Logo" height={100} />
        <p>QPanel v1.0.0</p>
        </div>
        <MenuItem
          icon={<Icon icon="material-symbols:dashboard-outline"></Icon>} 
        >
          Dashboard
        </MenuItem>
        <MenuItem icon={<Icon icon="iconamoon:profile"></Icon>}>
          Profil
        </MenuItem>
        <MenuItem icon={<Icon icon="ph:placeholder"></Icon>}>Orders</MenuItem>
        <hr className="sideHr" />
        <SubMenu
          icon={<Icon icon="material-symbols:mail-outline"></Icon>}
          label="Services"
        >
          <MenuItem
            icon={<Icon icon="material-symbols:media-link-outline"></Icon>}
          >
            Media Services
          </MenuItem>
          <MenuItem icon={<Icon icon="material-symbols:mail-outline"></Icon>}>
            Mail Services
          </MenuItem>
        </SubMenu>
        <MenuItem icon={<Icon icon="ph:placeholder"></Icon>}>
          Placeholder
        </MenuItem>
        <hr className="sideHr" />
        <MenuItem icon={<Icon icon="material-symbols:logout"></Icon>}>
          Logout
        </MenuItem>
        <MenuItem icon={<Icon icon="material-symbols:settings-outline"></Icon>}>
          Settings
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default sidebar;

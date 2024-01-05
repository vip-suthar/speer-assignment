import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Flex, Grid, Tooltip, Typography, Space } from "antd";
import { RightOutlined } from "@ant-design/icons";

import LogoImage from "../../assets/images/logo.jpg";
import {
  PhoneOutlined,
  ArchiveOutlined,
  PhoneBold,
  ArchiveBold,
} from "../commons/Icons.js";
import {
  logoContainerStyle,
  logoTitleStyle,
  navActivityButtonIconStyle,
  navArchiveButtonIconStyle,
  navButtonStyle,
  navButtonsContainerStyle,
  navbarContainerStyle,
  navbarExpandButtonStyle,
} from "./style.js";

const { Title } = Typography;
const { useBreakpoint } = Grid;

function Navbar() {
  const [expanded, setExpanded] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const screens = useBreakpoint();

  return (
    <Flex
      align="center"
      vertical={screens.sm}
      justify={screens.xs && "space-between"}
      gap={16}
      style={navbarContainerStyle({ screens, expanded })}
    >
      <Space size={8}>
        <div style={logoContainerStyle({ screens, expanded })}>
          <img src={LogoImage} height={40} id="brand-logo" alt="logo" />
        </div>
        {(screens.xs || expanded) && (
          <Title level={4} style={logoTitleStyle({ screens, expanded })}>
            AirCall
          </Title>
        )}
      </Space>

      {screens.sm && (
        <Button
          icon={<RightOutlined rotate={expanded ? 180 : 0} />}
          shape="circle"
          size="small"
          style={navbarExpandButtonStyle({ expanded, screens })}
          onClick={() => {
            setExpanded(!expanded);
          }}
        />
      )}

      <Flex
        vertical={screens.sm}
        gap={8}
        style={navButtonsContainerStyle({ expanded, screens })}
      >
        <Tooltip title={(expanded || screens.xs) ? "" : "Activity"} placement="right">
          <Button
            style={navButtonStyle({
              expanded,
              screens,
              active: location.pathname.trim() === "/",
            })}
            icon={
              location.pathname.trim() === "/" ? (
                <PhoneBold
                  rotate={10}
                  style={navActivityButtonIconStyle()}
                />
              ) : (
                <PhoneOutlined
                  rotate={10}
                  style={navActivityButtonIconStyle()}
                />
              )
            }
            size="large"
            children={expanded || screens.xs ? "Activity" : null}
            block={expanded && screens.sm}
            onClick={() => {
              navigate("/");
            }}
          />
        </Tooltip>
        <Tooltip title={(expanded || screens.xs) ? "" :  "Archive"} placement="right">
          <Button
            style={navButtonStyle({
              expanded,
              screens,
              active: location.pathname.trim() === "/archive",
            })}
            icon={
              location.pathname.trim() === "/archive" ? (
                <ArchiveBold style={navArchiveButtonIconStyle()} />
              ) : (
                <ArchiveOutlined style={navArchiveButtonIconStyle()} />
              )
            }
            size="large"
            children={expanded || screens.xs ? "Archive" : null}
            block={expanded && screens.sm}
            onClick={() => {
              navigate("/archive");
            }}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
}

export default Navbar;

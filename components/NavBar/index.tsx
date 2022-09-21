import React from "react";
import {
  Navbar,
  Link,
  Text,
  Avatar,
  Dropdown,
  Button,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo";
import { useRouter } from "next/router";
import { runInContext } from "vm";
import Login from "../Auth/Login";
import SignUp from "../Auth/SignUp";

interface IRoutes {
  path: string;
  name: string;
}

const NavBar = () => {
  const { route, push } = useRouter();

  const collapseItems = [
    "Home",
    "All Meetups",
    "Profile",
    "Settings",
    "About App",
    "Help & Feedback",
    "Log Out",
  ];

  const ROUTES: IRoutes[] = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/all-meetups",
      name: "All Meetups",
    },
    {
      path: "/about",
      name: "About",
    },
  ];

  return (
    <Navbar variant="floating">
      <Navbar.Toggle showIn="xs" />
      <Navbar.Brand
        css={{
          "@xs": {
            w: "12%",
          },
        }}
        hideIn="xs"
      >
        <AcmeLogo />
        <Text
          onClick={() => push("/")}
          css={{
            cursor: "pointer",
          }}
          b
          color="inherit"
        >
          Lets Link
        </Text>
      </Navbar.Brand>
      <Navbar.Content
        enableCursorHighlight
        activeColor="secondary"
        hideIn="xs"
        variant="highlight-rounded"
      >
        {ROUTES.map((item, index) =>
          route === item.path ? (
            <Navbar.Link key={index} isActive onClick={() => push(item.path)}>
              {item.name}
            </Navbar.Link>
          ) : (
            <Navbar.Link key={index} onClick={() => push(item.path)}>
              {item.name}
            </Navbar.Link>
          )
        )}
      </Navbar.Content>
      {0 == 0 ? (
        <Navbar.Content>
          <Navbar.Link color="inherit" href="#">
            <Login />
          </Navbar.Link>
          <Navbar.Item>
            <SignUp />
          </Navbar.Item>
        </Navbar.Content>
      ) : (
        <Navbar.Content
          css={{
            "@xs": {
              w: "12%",
              jc: "flex-end",
            },
          }}
        >
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  color="secondary"
                  size="md"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="secondary"
              onAction={(actionKey) => console.log({ actionKey })}
            >
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  azaniam04@gmail.com
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="settings" withDivider>
                Settings
              </Dropdown.Item>
              <Dropdown.Item key="help_and_feedback">Profile</Dropdown.Item>
              <Dropdown.Item key="logout" withDivider color="error">
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
      )}

      <Navbar.Collapse>
        {ROUTES.map((item, index) => (
          <Navbar.CollapseItem
            key={item.name}
            activeColor="secondary"
            css={{
              color: index === collapseItems.length - 1 ? "$error" : "",
            }}
            isActive={route === item.path}
          >
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              onClick={() => push(item.path)}
            >
              {item.name}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;

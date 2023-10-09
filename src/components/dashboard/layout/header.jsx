import {
  DownOutlined,
  ExclamationCircleFilled,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProfileOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Layout,
  Menu,
  Row,
  theme,
  Dropdown,
  Avatar,
  Space,
  message,
  Modal,
  Card,
  Image,
  Typography,
} from "antd";
import { useCollapsed } from "../../../store/storeCollapsed";
import React, { useLayoutEffect, useState } from "react";
import CenterItems from "../../reusable/centerItem";
import { useAuthPersist } from "../../../store/authPersist";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
function HeaderDashboard() {
  const { Header } = Layout;
  const { confirm } = Modal;
  const { data, update, clear, isAuthenticated } = useAuthPersist();
  const [roles, setRoles] = useState("");
  const foldSidebar = useCollapsed((state) => state.isCollapsed);
  const setFoldSidebar = useCollapsed((state) => state.setCollapsed);
  const navigate = useNavigate();
  const handleMenuClick = (e) => {
    // message.info("Click on menu item.");
    if (e.key == 3) {
      // message.warning("apakah anda yakin akan logout?");
      ModalConfirm();
    }
    // console.log("click", e);
  };

  const items = [
    {
      label: "Logout",
      key: "3",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  const ModalConfirm = () => {
    confirm({
      title: "Apakah anda yakin ingin keluar?",
      icon: <ExclamationCircleFilled />,
      content: "Setelah keluar anda harus melakukan login kembali",
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(resolve(update(false), clear()), 2000);
        }).catch(() => console.log("Oops errors!"));
      },
      onCancel() {},
    });
  };
  useLayoutEffect(() => {
    let sub = true;
    setRoles(data[0].credential.data.role);
    return () => {
      sub = false;
    };
  }, []);

  return (
    <Header
      style={{
        width: "100%",
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "end",
        height: "100px",
      }}
    >
      <div style={{}}>
        <Row justify={"space-between"} align={"middle"}>
          <Col>
            <Card
              style={{
                width: 300,
                marginTop: "10px",
                height: "90px",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
              }}
              size="small"
            >
              <Row justify={"space-around"}>
                <Col span={5}>
                  {roles == "ADMIN" ? (
                    <Image
                      src="/dashboard/photo-admin.png"
                      width={"100%"}
                      height={"auto"}
                      preview={false}
                    />
                  ) : (
                    <Image
                      src="/dashboard/photo-student.png"
                      width={"100%"}
                      height={"auto"}
                      preview={false}
                    />
                  )}
                </Col>
                <Col span={11}>
                  <Typography.Title level={4}>
                    {data[0].credential.data.username || null}
                  </Typography.Title>
                  <Typography.Paragraph>{roles || null}</Typography.Paragraph>
                </Col>
                <Col span={4}>
                  {" "}
                  <Dropdown
                    trigger={["click"]}
                    menu={menuProps}
                    placement="bottomRight"
                    overlayStyle={{
                      width: "150px",
                    }}
                  >
                    <a
                      onClick={(e) => e.preventDefault}
                      className="link-primary"
                      style={{ color: "#7D77D5" }}
                    >
                      <BsFillCaretDownFill size={32} />{" "}
                    </a>
                  </Dropdown>{" "}
                </Col>
              </Row>
            </Card>
          </Col>
          <Col>
            {/* {data.map((items, idx) => {
            return (
              <Row key={idx} justify="center" gutter={16}>
                <Col>
                  <Avatar
                    src={`${items?.data?.picture}`}
                    size="large"
                    onError={(e) => console.log(e)}
                  />{" "}
                </Col>
                <Col>
                  <div style={{ marginTop: 5 }}>
                    <Dropdown
                      trigger={["click"]}
                      menu={menuProps}
                      placement="bottomRight"
                    >
                      <a
                        onClick={(e) => e.preventDefault()}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        <Space>
                          {items.data.name}
                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                  </div>
                </Col>
              </Row>
            );
          })} */}
          </Col>
        </Row>
      </div>
    </Header>
  );
}

export default HeaderDashboard;

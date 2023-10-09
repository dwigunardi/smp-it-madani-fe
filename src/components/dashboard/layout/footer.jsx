import React from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
function FooterDashboard() {
  const { Footer } = Layout;
  return (
    <Footer
      style={{
        textAlign: "center",
        width: "100%",
        height: "auto",
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "18pt",
        lineHeight: "45px",
        color:'white'
      }}
    >
      SMP IT MADANI SUKABUMI
    </Footer>
  );
}

export default FooterDashboard;

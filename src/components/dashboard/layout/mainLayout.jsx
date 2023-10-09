import React from "react";
import { Breadcrumb, ConfigProvider, Layout, Menu, message, theme } from "antd";
import SidebarDashboard from "./sider";
import HeaderDashboard from "./header";
import FooterDashboard from "./footer";
import { Fade } from "react-awesome-reveal";
import { ColorPallete } from "../../../utils/colorPalette";
import { useNavigate } from "react-router-dom";
import { useAuthPersist } from "../../../store/authPersist";
import { useEffect } from "react";
function MainLayout({ children }) {
  const { isAuthenticated, data, create, remove, update, clear } =
    useAuthPersist();
  const Navigate = useNavigate();
  const currentDate = new Date();
  let expiredToken = data[0].credential.data.exp * 1000 || ''
  const dateExpire = new Date(expiredToken);
  // console.log(dateExpire, "ini main layout");
  useEffect(() => {
    let sub = true;
    if (currentDate >= dateExpire) {
      setTimeout(() => {
        update(false);
        clear();
        message.info("Session telah berakhir silahkan login ulang")
        Navigate('/')
      }, 2000);
    }
    return () => {
      sub = false;
    };
  }, [isAuthenticated,currentDate, dateExpire]);
  return (
    <div>
      <Fade triggerOnce>
        <ConfigProvider
          theme={{
            token: {
              colorBgLayout: ColorPallete.secondary,
            },
          }}
        >
          <Layout
            style={{ minHeight: "100vh", backgroundColor: "red !important" }}
          >
            <SidebarDashboard />
            <Layout className="site-layout">
              <HeaderDashboard />
              {children}
              <FooterDashboard />
            </Layout>
          </Layout>
        </ConfigProvider>
      </Fade>
    </div>
  );
}

export default MainLayout;

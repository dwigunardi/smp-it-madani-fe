import React, { useEffect, useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Image, Layout, Menu, Typography, theme } from "antd";
import { useCollapsed } from "../../../store/storeCollapsed";
import { ColorPallete } from "../../../utils/colorPalette";
import { BsBank2, BsFillPeopleFill } from "react-icons/bs";
import { ImNewspaper } from "react-icons/im";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaMoneyBillAlt, FaShoppingCart, FaSyncAlt } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { useAuthPersist } from "../../../store/authPersist";

function SidebarDashboard() {
  const foldSidebar = useCollapsed((state) => state.isCollapsed);
  const setFoldSidebar = useCollapsed((state) => state.setCollapsed);
  const [roleUser, setRoleUser] = useState("");
  const [current, setCurrent] = useState("/dashboard");
  const { data, create, remove, update, clear, isAuthenticated } =
    useAuthPersist();
  const username = data[0].credential.data.username;
  let { siswaId } = useParams();
  const { Sider } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  // submenu keys of first level
  const rootSubmenuKeys = ["/dashboard/keuangan"];
  const onOpenChange = (keys) => {
    // console.log(keys)
    const latestOpenKey = keys
      ? setOpenKeys(keys)
      : keys.find((key) => openKeys.indexOf(key) == -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) == -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const items = [
    getItem("Home", "/dashboard", <HomeOutlined />),
    getItem("Keuangan", "1", <BsBank2 />, [
      getItem(
        "Penerimaan",
        "/dashboard/keuangan/penerimaan",
        <GiReceiveMoney />
      ),
      getItem("Pengeluaran", "/dashboard/keuangan/belanja", <FaShoppingCart />),
      getItem("Tagihan", "/dashboard/keuangan/tagihan", <FaMoneyBillAlt />),
      getItem(
        "Rekapitulasi",
        "/dashboard/keuangan/rekapitulasi",
        <FaSyncAlt />
      ),
    ]),
    getItem("Data Siswa", "/dashboard/data_siswa", <BsFillPeopleFill />),
    getItem("Berita", "/dashboard/berita", <ImNewspaper />),
  ];

  const studentItem = [
    getItem("Home", `/siswa/dashboard/${username}`, <HomeOutlined />),
    getItem("Keuangan", "1", <BsBank2 />, [
      getItem(
        "Tagihan",
        `/siswa/dashboard/tagihan/${username}`,
        <FaMoneyBillAlt />
      ),
      getItem(
        "Rekapitulasi",
        `/siswa/dashboard/rekapitulasi/${username}`,
        <FaSyncAlt />
      ),
    ]),
  ];

  const handleMenu = (e) => {
    // console.log('click ', e);
    setCurrent(e.key);
    navigate(e.key);
  };

  useEffect(() => {
    const pathNow = location.pathname;
    setCurrent(pathNow);
    setRoleUser(data[0]?.credential?.data?.role);
  }, [location.pathname]);
  return (
    <Sider
      breakpoint="md"
      collapsible
      collapsed={foldSidebar}
      onBreakpoint={(broken) => {
        broken ? setFoldSidebar(true) : setFoldSidebar(false);
      }}
      onCollapse={(collapsed, type) => {
        collapsed ? setFoldSidebar(true) : setFoldSidebar(false);
      }}
      style={{
        backgroundColor: ColorPallete.primary,
        width: "370px",
        fontWeight: "bold",
        fontSize: "17px",
      }}
    >
      <div
        className="d-flex justify-content-evenly"
        style={{
          height: "100px",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src="/logo.png"
          preview={false}
          width={foldSidebar ? "60%" : "30%"}
          height={"auto"}
        />
        {foldSidebar ? null : (
          <Typography.Paragraph
            style={{ color: "white", marginTop: 10, fontWeight: 700 }}
          >
            SMP IT Madani
          </Typography.Paragraph>
        )}
      </div>
      <Menu
        theme={false}
        defaultSelectedKeys={["1"]}
        onClick={handleMenu}
        selectedKeys={[current]}
        mode="inline"
        items={roleUser == "STUDENT" ? studentItem : items}
        style={{
          color: "white",
        }}
      />
    </Sider>
  );
}

export default SidebarDashboard;

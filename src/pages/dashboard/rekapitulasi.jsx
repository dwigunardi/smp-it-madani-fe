import React from "react";
import CardDashboard from "../../components/reusable/cardDashboard";
import { Tabs } from "antd";
import RekapitulasiSemua from "./rekapitulasiSemua";
import RekapitulasiLunas from "./rekapitulasiLunas";
import RekapitulasiBelumLunas from "./rekapitulasiBelumLunas";
function Rekapitulasi() {
  const onChangeTabs = (key) => {
    
  };
  const items = [
    {
      key: "1",
      label: `Semua`,
      children: <RekapitulasiSemua />,
    },
    {
      key: "2",
      label: `Lunas`,
      children: <RekapitulasiLunas />,
    },
    {
      key: "3",
      label: `Belum Lunas`,
      children: <RekapitulasiBelumLunas  />,
    },
  ];
  return (
    <CardDashboard
      titleCard={"Rekapitulasi Pembayaran SPP"}
      mode={"rekapitulasi"}
    >
      <Tabs defaultActiveKey="1" items={items} onChange={onChangeTabs} />
    </CardDashboard>
  );
}

export default Rekapitulasi;

import React, { useEffect, useState } from "react";
import CardDashboard from "../../components/reusable/cardDashboard";
import TableView from "../../components/reusable/tableView";
import { Avatar, Button, Col, Row, Space, Table, Tooltip, Typography } from "antd";
import { BsFillCursorFill } from "react-icons/bs";
import { ColorPallete } from "../../utils/colorPalette";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FcInfo } from "react-icons/fc";
import { UserOutlined } from "@ant-design/icons";
import FormatRupiah from "../../components/reusable/formatNumber";
import { useAuthPersist } from "../../store/authPersist";
import axios from "axios";
import { baseurl } from "../../config/baseUrl";
import { useRekapStore } from "../../store/rekapitulasiStore";
function RekapitulasiSiswa() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [dataRekapitulasi, setDataRekapitulasi] = useState([]);
  const [combinedArray, setCombinedArray] = useState([]);
  const [dataTotal, setDataTotal] = useState("");
  const Navigate = useNavigate();
  const { data } = useAuthPersist();
  const [dataDetail, setDataDetail] = useState("");
  const accessToken = data[0].credential.accessToken;
  const { getAllRekap, getDataLunas, getDataPending } = useRekapStore(
    (state) => state
  );
  const columns = () => {
    return [
      {
        key: "no",
        dataIndex: "no",
        title: "No",
        render: (t, r, index) => `${(page - 1) * pageSize + index + 1}`,
      },
      {
        title: "Nama Siswa",
        dataIndex: "nama_siswa",
        key: "nama_siswa",
      },
      {
        title: "NIS",
        dataIndex: "NIS",
        key: "NIS",
      },
      {
        title: "Kelas",
        dataIndex: "kelas",
        key: "kelas",
      },
      {
        title: "Nama Tagihan",
        dataIndex: "nama_tagihan",
        key: "nama_tagihan",
      },
      {
        title: "Jumlah",
        dataIndex: "jumlah",
        key: "jumlah",
        render: (_, record) => {
          return <div>{FormatRupiah(record.jumlah)}</div>;
        },
      },
      {
        title: "status",
        dataIndex: "status",
        key: "status",
       
      },
      Table.EXPAND_COLUMN,
      // {
      //   title: "Action",
      //   key: "action",
      //   render: (_, record) => {
      //     return (
      //       <Space size="middle" key={record.transaksi_id}>
      //         <Button
      //           type="primary"
      //           icon={<FcInfo size={18} style={{ marginRight: 4 }} />}
      //           style={{ fontWeight: 500 }}
      //           onClick={() =>
      //             // Navigate(`/dashboard/keuangan/rekapitulasi/${record.trasanksi_id}`)
      //             console.log(record.nama_siswa)
      //           }
      //         >
      //           Detail
      //         </Button>
      //       </Space>
      //     );
      //   },
      // },
    ];
  };

  useEffect(() => {
    let controler = new AbortController();
    axios
      .get(baseurl + "/rekapitulasi/student", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          setDataRekapitulasi(res.data.data)
          setDataTotal(res.data.total)
        }
      });
    return () => {
      controler.abort();
    };
  }, []);

  const handleExpand = (expanded, record) => {
    if (expanded) {
      setDataDetail(record);
    }else{
      setDataDetail('')
    }
  };
  const renderExpanRow = (record, idx, indent, expanded) => {
    const columnDetail = [
      {
        dataIndex: "transaksi_id",
        title: "Transaksi Id",
        key: 'transaksi_id'
      },
      {
        title: "Email Siswa",
        dataIndex: "email_siswa",
        key: 'email_siswa'
      },
      {
        title: "Jatuh Tempo",
        dataIndex: "jatuh_tempo",
        key: "jatuh_tempo",
      },
      {
        title: "Tanggal Bayar",
        dataIndex: "tanggal_bayar",
        key: "tanggal_bayar",
      },
    ];

    return (
      <div>
        <Typography.Title level={3} className="text-center">
          Detail Rekapitulasi{" "}
        </Typography.Title>
        <Table
          columns={columnDetail}
          dataSource={[dataDetail]}
          rowKey={(record) => record.transaksi_id}
          pagination={false}
        />
      </div>
    );
  };
  return (
    <div>
      <CardDashboard
        titleCard={"Rekapitulasi Pembayaran SPP"}
        mode={"rekapitulasi-siswa"}
      >
        <TableView
          dataSource={dataRekapitulasi}
          columns={columns()}
          setPage={setPage}
          setPageSize={setPageSize}
          mode="rekapitulasi-siswa"
          dataTotal={dataTotal}
          pageSize={pageSize}
          token={accessToken}
          renderExpanded={renderExpanRow}
          handleExpand={handleExpand}
        />
      </CardDashboard>
    </div>
  );
}

export default RekapitulasiSiswa;

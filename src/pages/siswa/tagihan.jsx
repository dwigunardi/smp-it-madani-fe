import React, { useState } from "react";
import CardDashboard from "../../components/reusable/cardDashboard";
import TableView from "../../components/reusable/tableView";
import { Avatar, Button, Col, Row, Space, Tooltip } from "antd";
import { BsFillCursorFill } from "react-icons/bs";
import { ColorPallete } from "../../utils/colorPalette";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FcInfo } from "react-icons/fc";
import { UserOutlined } from "@ant-design/icons";
import FormatRupiah from "../../components/reusable/formatNumber";
import axios from "axios";
import { baseurl } from "../../config/baseUrl";
import { useAuthPersist } from "../../store/authPersist";
import { useEffect } from "react";
import { useTagihanStore } from "../../store/tagihanStore";

function TagihanSiswa() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const Navigate = useNavigate();
  const { data } = useAuthPersist();
  const {
    dataTagihanSiswa,
    lengthData,
    loading,
    hasErrors,
    fetchSiswa,
    dataTagihan,
  } = useTagihanStore((state) => state);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const accessToken = data[0].credential.accessToken;

  const columns = (bayarTagihan, exportTagihan) => {
    return [
      {
        key: "no",
        dataIndex: "no",
        title: "No",
        width: "5%",
        render: (t, r, index) => `${(page - 1) * pageSize + index + 1}`,
      },
      {
        title: "Nama Tagihan",
        dataIndex: "nama_tagihan",
        key: "nama_tagihan",
      },
      {
        title: "Jatuh Tempo",
        dataIndex: "jatuh_tempo",
        key: "jatuh_tempo",
      },
      {
        title: "Jumlah",
        dataIndex: "jumlah",
        key: "jumlah",
        render: (_, record) => {
          const number = record.jumlah;
          return <div>{FormatRupiah(number)}</div>;
        },
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => {
          // console.log(record.transaksi_id)
          return (
            <Space size="middle" key={record.transaksi_id}>
              {record.status == "Lunas" ? (
                <Button
                  type="primary"
                  style={{ fontWeight: 500 }}
                  loading={loadingBtn}
                >
                  Export
                </Button>
              ) : (
                <Button
                  type="primary"
                  style={{ fontWeight: 500 }}
                  onClick={() => bayarTagihan(record.transaksi_id)}
                  loading={loadingBtn}
                >
                  Bayar
                </Button>
              )}
            </Space>
          );
        },
      },
    ];
  };
  const bayarTagihan = async (id) => {
    try {
      setLoadingBtn(true);
      const data = {
        transaksi_id: id,
      };
      const req = await axios
        .post(baseurl + `/transaksi`, data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            const newWindow = window.open(res.data.data.paymentUrl);
            if (newWindow) {
              // The new tab was successfully opened
              setLoadingBtn(false);
              newWindow.focus();
            } else {
              // The new tab was blocked by the pop-up blocker
              message.error("Gagal Membuka tab baru, tolong izinkan!");
              setLoadingBtn(false);
              throw new Error("Pop-up blocker prevented opening the new tab");
            }
          }
        });
    } catch (error) {
      console.log(error);
      setLoadingBtn(false);
    }
  };

  useEffect(() => {
    let sub = true;
    fetchSiswa(accessToken);
    return () => {
      sub = false;
    };
  }, [lengthData, fetchSiswa]);

  return (
    <div>
      <CardDashboard
        titleCard={"Tagihan"}
        mode={"tagihan-siswa"}
        extraButton={false}
      >
        <TableView
          dataSource={dataTagihanSiswa.data}
          columns={columns(bayarTagihan)}
          setPage={setPage}
          setPageSize={setPageSize}
          mode="tagihan-siswa"
          // loadingTable={loading}
        />
      </CardDashboard>
    </div>
  );
}

export default TagihanSiswa;

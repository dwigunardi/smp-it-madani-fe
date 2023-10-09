import React, { useState } from "react";
import CardDashboard from "../../components/reusable/cardDashboard";
import TableView from "../../components/reusable/tableView";
import { Avatar, Button, Col, Input, Row, Space, Table, Tooltip, Typography } from "antd";
import { BsFillCursorFill } from "react-icons/bs";
import { ColorPallete } from "../../utils/colorPalette";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FcInfo } from "react-icons/fc";
import { SearchOutlined } from "@ant-design/icons";
import FormatRupiah from "../../components/reusable/formatNumber";
import { useRekapStore } from "../../store/rekapitulasiStore";
import { useAuthPersist } from "../../store/authPersist";

function RekapitulasiBelumLunas() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const Navigate = useNavigate();
  const { data } = useAuthPersist();
  const accessToken = data[0].credential.accessToken;
  const { dataPending } = useRekapStore((state) => state);
  const [dataDetail, setDataDetail] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    confirm();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder="Search text"
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters, confirm)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  });
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
        sorter: (a, b) => a.nama_siswa.localeCompare(b.nama_siswa),
        ...getColumnSearchProps("nama_siswa"),
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
        sorter: (a, b) => a.kelas - b.kelas,
        filters: [
          {
            text: 'Kelas 1',
            value: '1',
          },
          {
            text: 'Kelas 2',
            value: '2',
          },
          {
            text: 'Kelas 3',
            value: '3',
          },
        ],
        onFilter: (value, record) => record.kelas.indexOf(value) === 0,
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
        sorter: (a, b) => a.jumlah - b.jumlah,
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
  const totalData = dataPending.reduce(function (acc, obj) {
    return acc + parseInt(obj.jumlah);
  }, 0);

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
          dataSource={[record]}
          rowKey={(record) => record.transaksi_id}
          pagination={false}
        />
      </div>
    );
  };
  // console.log(totalData, "here");
  return (
    <div>
      <TableView
        dataSource={dataPending}
        columns={columns()}
        setPage={setPage}
        setPageSize={setPageSize}
        mode="rekapitulasi-belum"
        token={accessToken}
        dataTotal={totalData}
        renderExpanded={renderExpanRow}
        handleExpand={handleExpand}
      />
    </div>
  );
}

export default RekapitulasiBelumLunas;

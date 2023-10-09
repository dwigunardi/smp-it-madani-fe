import React, { useState } from "react";
import CardDashboard from "../../components/reusable/cardDashboard";
import TableView from "../../components/reusable/tableView";
import {
  Avatar,
  Button,
  Col,
  Row,
  Space,
  Modal,
  Tooltip,
  message,
  Input,
} from "antd";
import { BsFillCursorFill } from "react-icons/bs";
import { ColorPallete } from "../../utils/colorPalette";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FcInfo } from "react-icons/fc";
import {
  ExclamationCircleFilled,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import FormatRupiah from "../../components/reusable/formatNumber";
import { useTagihanStore } from "../../store/tagihanStore";
import { useAuthPersist } from "../../store/authPersist";
import { useEffect } from "react";
import axios from "axios";
import { baseurl } from "../../config/baseUrl";
function Tagihan() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const Navigate = useNavigate();
  const { data } = useAuthPersist();
  const [tagihanByStudent, setTagihanByStudent] = useState([]);
  const accessToken = data[0].credential.accessToken;
  const { dataTagihan, fetch, total, lengthData } = useTagihanStore(
    (state) => state
  );
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const { confirm } = Modal;

  const handleFilter = (value, record) => {
    return record.kelas == value;
  };
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

  const columns = (deleteTagihan) => {
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
        dataIndex: "nama",
        key: "nama",
        sorter: (a, b) => a.nama.localeCompare(b.nama),
        ...getColumnSearchProps("nama"),
      },
      {
        title: "Kode",
        dataIndex: "kode",
        key: "kode",
      },
      {
        title: "Jumlah",
        dataIndex: "jumlah",
        key: "jumlah",
        sorter: (a, b) => a.jumlah - b.jumlah,
        render: (_, record) => {
          const number = record.jumlah;
          return <div>{FormatRupiah(number)}</div>;
        },
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => {
          return (
            <Space size="middle" key={record.id}>
              <Button
                type="default"
                onClick={() => deleteTagihan(record.id)}
                icon={<FaTrash size={18} style={{ marginRight: 4 }} />}
                style={{
                  fontWeight: 500,
                  borderColor: ColorPallete.rose,
                  backgroundColor: ColorPallete.rose,
                  color: "white",
                }}
                className="ripple shadow-1-strong rounded"
                data-mdb-ripple-color="light"
              >
                Batal
              </Button>
            </Space>
          );
        },
      },
    ];
  };
  const deleteTagihan = async (id) => {
    try {
      confirm({
        title: "Apakah anda yakin ingin membatalkan tagihan ini?",
        icon: <ExclamationCircleFilled />,
        content: " ",
        okText: "Iya",
        okType: "danger",
        cancelText: "Tidak",
        onOk() {
          const req = axios
            .delete(baseurl + `/tagihan/${id}`, {
              headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((res) => {
              if (res.status == 200 || res.status == 201) {
                message.success(res.data.message);
                fetch(accessToken);
              }
            });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    } catch (error) {
      message.error("Gagal Menghapus");
    }
  };
  let abortController = new AbortController();

  useEffect(() => {
    let sub = true;
    fetch(accessToken);

    return () => {
      sub = false;
      abortController.abort();
    };
  }, []);

  return (
    <div>
      <CardDashboard
        titleCard={"Tagihan"}
        mode={"tagihan"}
        extraButton={true}
        actionModal={() => Navigate("/dashboard/keuangan/tagihan/tambah")}
      >
        <TableView
          dataSource={dataTagihan}
          columns={columns(deleteTagihan)}
          setPage={setPage}
          setPageSize={setPageSize}
          mode="tagihan"
          token={accessToken}
          dataTotal={total}
        />
      </CardDashboard>
    </div>
  );
}

export default Tagihan;

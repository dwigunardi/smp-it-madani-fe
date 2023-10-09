import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardDashboard from "../../components/reusable/cardDashboard";
import TableView from "../../components/reusable/tableView";
import FormatRupiah from "../../components/reusable/formatNumber";
import {
  Avatar,
  Button,
  Col,
  Row,
  Space,
  Table,
  Tooltip,
  Typography,
  message,
  Modal,
  Input,
} from "antd";
import { BsFillCursorFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { ColorPallete } from "../../utils/colorPalette";
import { FcInfo } from "react-icons/fc";
import { useAuthPersist } from "../../store/authPersist";
import axios from "axios";
import { baseurl } from "../../config/baseUrl";
import { ExclamationCircleFilled, SearchOutlined } from "@ant-design/icons";

function Belanja() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [dataPengeluaran, setDataPengeluaran] = useState([]);
  const [dataPengeluaranDetal, setDataPengeluaranDetail] = useState([]);
  const [sumberDana, setSumberDana] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [statusGet, setStatusGet] = useState(true);
  const [dataTotal, setDataTotal] = useState([]);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const { data } = useAuthPersist();
  const [sumberDanaMap, setSumberDanaMap] = useState({});
  const accessToken = data[0].credential.accessToken;
  const { confirm } = Modal;

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
          placeholder="Search Nama Pengeluaran"
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

  const columns = (deletePengeluaran) => {
    return [
      {
        dataIndex: "no",
        title: "No",
        render: (t, r, index) => `${(page - 1) * pageSize + index + 1}`,
      },
      {
        title: "Nama Pengeluaran",
        dataIndex: "nama_belanja",
        key: "nama_belanja",
        width: "30%",
        sorter: (a, b) => a.nama.localeCompare(b.nama),
        ...getColumnSearchProps("nama_belanja"),
      },
      {
        title: "Kode Rekening",
        dataIndex: "kode_rekening",
        key: "kode_rekening",
        width: "20%",
      },
      {
        title: "Kode Kegiatan",
        dataIndex: "kode_kegiatan",
        key: "kode_kegiatan",
        width: "15%",
      },
      {
        title: "Bulan/Tahun",
        dataIndex: "bulan_tahun",
        key: "bulan_tahun",
      },
      {
        title: "Jumlah",
        dataIndex: "jumlah",
        key: "jumlah",
        sorter: (a, b) => a.jumlah - b.jumlah,
        render: (_, record) => {
          return <div key={record.id}>{FormatRupiah(record.jumlah)}</div>;
        },
      },
      Table.EXPAND_COLUMN,
      {
        title: "Action",
        key: "action",
        className: "text-center",
        render: (_, record) => {
          // console.log(record.id);
          return (
            <Space size="middle">
              {/* <Button
                type="primary"
                icon={<FcInfo size={18} style={{ marginRight: 4 }} />}
                style={{ fontWeight: 500 }}
                onClick={() => {
                  // Navigate(`/dashboard/keuangan/belanja/detail/${record.id}`);
                  // message.info(
                  //   "Klik Pada tanda + dalam Table Untuk Melihat Detail"
                  // );
                  // console.log(record.id);
                }}
              >
                Detail
              </Button> */}
              <Button
                type="primary"
                onClick={() =>
                  Navigate(`/dashboard/keuangan/belanja/update/${record.id}`)
                }
                icon={
                  <BsFillCursorFill
                    size={18}
                    style={{ marginRight: 4, color: "white" }}
                  />
                }
                style={{
                  fontWeight: 500,
                  borderColor: ColorPallete.darkPurple,
                  color: "white",
                  backgroundColor: ColorPallete.darkPurple,
                }}
              >
                Update
              </Button>
              <Button
                type="default"
                onClick={() =>
                  deletePengeluaran(record.id, record.nama_belanja)
                }
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
                Delete
              </Button>
            </Space>
          );
        },
      },
    ];
  };

  const handleExpand = async (expanded, record) => {
    if (expanded) {
      try {
        const response = await axios.get(
          baseurl + `/pengeluaran/${record.id}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (response.status === 200 || response.status === 201) {
          setDataPengeluaranDetail(response.data.data.pengeluaran);
          // const sumberDanaData = response.data.data.sumber_dana_alokasi_anggaran;
          // setSumberDana(sumberDanaData)
          const sumberDanaData = response.data.data.sumber_dana_alokasi_anggaran;
          setSumberDanaMap((prevMap) => ({
            ...prevMap,
            [record.id]: sumberDanaData, // Save sumberDanaData under the pengeluaran_id key
          }));
          // console.log(response.data.data.sumber_dana_alokasi_anggaran, 'th')
        }
      } catch (error) {
        console.log(error);
        message.error("Gagal Get Data");
      }
    }
  };

  const renderExpanRow = (record, idx, indent, expanded) => {
    const rowData = sumberDanaMap[record.id] || [];
    const columnDetail = [
      {
        dataIndex: "no",
        title: "No",
        render: (t, r, index) => `${(page - 1) * pageSize + index + 1}`,
      },
      {
        title: "Sumber Dana",
        dataIndex: "sumber_dana",
        key: "sumber_dana",
      },
      {
        title: "Belanja Operasi",
        dataIndex: "belanja_operasi",
        key: "belanja_operasi",
        render: (_, items) => {
          return (
            <div key={items.id}>{FormatRupiah(items.belanja_operasi)}</div>
          );
        },
      },
      {
        title: "Belanja Modal",
        dataIndex: "belanja_modal",
        key: "belanja_modal",
        render: (_, items) => {
          return (
            <div key={items.id}>{FormatRupiah(items.belanja_modal)}</div>
          );
        },
      },
    ];

    return (
      <div>
        <Typography.Title level={3} className="text-center">
          Detail Pengeluaran{" "}
        </Typography.Title>
        <Table
          columns={columnDetail}
          dataSource={rowData}
          rowKey={(record) => record.id}
          pagination={false}
        />
      </div>
    );
  };

  const deletePengeluaran = async (id, name) => {
    try {
      confirm({
        title: `Apakah anda yakin ingin menghapus,  ${name}?`,
        icon: <ExclamationCircleFilled />,
        content: "Data Berikut ini akan secara permanen terhapus.",
        okText: "Iya",
        okType: "danger",
        cancelText: "Tidak",
        onOk() {
          setStatusGet(true);
          const req = axios
            .delete(baseurl + `/pengeluaran/${id}`, {
              headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((res) => {
              if (res.status == 200 || res.status == 201) {
                message.success(res.data.message);
                setStatusGet(false);
              }
            });
        },
        onCancel() {
          console.log("Cancel");
          setStatusGet(true);
        },
      });
    } catch (error) {
      console.log(error);
      message.error("Gagal Menghapus");
      setStatusGet(false);
    }
  };

  const getData = async () => {
    try {
      setLoading(true);
      axios
        .get(baseurl + "/pengeluaran", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          if (response.status == 200 || response.status == 201) {
            setDataPengeluaran(response.data.pengeluaran);
            setDataTotal(response.data.total);
            setLoading(false);
            setStatusGet(false);
          }
        });
    } catch (error) {
      console.log(error);
      message.error("Gagal Get Data");
      setLoading(false);
      setStatusGet(false);
    }
  };
  useEffect(() => {
    getData();
  }, [statusGet]);

  return (
    <div>
      <CardDashboard
        titleCard={"Belanja"}
        mode={"belanja"}
        extraButton={true}
        actionModal={() => Navigate("/dashboard/keuangan/belanja/tambah")}
      >
        <TableView
          dataSource={dataPengeluaran}
          columns={columns(deletePengeluaran)}
          setPage={setPage}
          setPageSize={setPageSize}
          mode="belanja"
          loadingTable={loading}
          dataTotal={dataTotal}
          renderExpanded={renderExpanRow}
          handleExpand={handleExpand}
          token={accessToken}
        />
      </CardDashboard>
    </div>
  );
}

export default Belanja;

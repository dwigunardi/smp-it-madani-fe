import React, { useEffect, useState } from "react";
import CardDashboard from "../../components/reusable/cardDashboard";
import { Space, Button, Modal, message, Input } from "antd";
import { BsFillCursorFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { ColorPallete } from "../../utils/colorPalette";
import TableView from "../../components/reusable/tableView";
import { FcInfo } from "react-icons/fc";
import FormatRupiah from "../../components/reusable/formatNumber";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../../config/baseUrl";
import { useAuthPersist } from "../../store/authPersist";
import { usePenerimaanStore } from "../../store/penerimaanStore";
import PenerimaanUpdate from "./penerimaanUpdate";
import { SearchOutlined } from "@ant-design/icons";

function Penerimaan() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const navigate = useNavigate();
  // const [dataPenerimaan, setDataPenerimaan] = useState([]);
  const {
    dataPenerimaan,
    dataPenerimaanDetail,
    fetch,
    dataExport,
    fetchById,
    putPenerimaan,
    loading,
    deletePenerimaan,
    total,
  } = usePenerimaanStore((state) => state);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalUpdateId, setModalUpdateId] = useState(0);

  const [openDeleteModal, setOpeneDelemodal] = useState(false);
  const [modalDeleteId, setModalDeleteId] = useState(0);

  const { data } = useAuthPersist();
  const accessToken = data[0].credential.accessToken;

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

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
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
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
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex] &&
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filteredValue: searchedColumn === dataIndex ? [searchText] : null,
  });

  const columns = (updateModal, deleteModal) => {
    return [
      {
        key: "no",
        dataIndex: "no",
        title: "No",
        render: (t, r, index) => `${(page - 1) * pageSize + index + 1}`,
        width: 70
      },
      {
        title: "Nama Penerimaan",
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
          const format = FormatRupiah(record.jumlah);
          return <p>{format}</p>;
        },
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle" key={record.id}>
            {/* <Button
              type="primary"
              icon={<FcInfo size={18} style={{ marginRight: 4 }} />}
              style={{ fontWeight: 500 }}
            >
              Detail
            </Button> */}
            <Button
              type="primary"
              onClick={() => updateModal(record.id)}
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
              onClick={() => deleteModal(record.id)}
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
        ),
      },
    ];
  };
  const updateModal = (id) => {
    setModalUpdateId(id);
    fetchById(id, accessToken);
    setOpenUpdate(true);
  };
  const handleCancelUpdate = () => {
    console.log("Clicked cancel button");
    setOpenUpdate(false);
  };
  const updatePenerimaan = (values) => {
    console.log(values, "here");
    putPenerimaan(values, modalUpdateId, accessToken);
    message.success("Berhasil Update");
    setOpenUpdate(false);
  };
  const deleteModal = (id) => {
    setModalDeleteId(id);
    fetchById(id, accessToken);
    setOpeneDelemodal(true);
  };
  const handleOkDelete = async () => {
    setConfirmLoading(true);
    deletePenerimaan(modalDeleteId, accessToken);
    setTimeout(() => {
      setConfirmLoading(false);
      setOpeneDelemodal(false);
    }, 1000);
  };
  const handleCancel = () => {
    setOpeneDelemodal(false);
  };
  useEffect(() => {
    let sub = true;
    fetch(accessToken);
    return () => {
      sub = false;
    };
  }, [openUpdate, openDeleteModal]);
  return (
    <div>
      <CardDashboard
        titleCard={"Penerimaan"}
        mode={"penerimaan"}
        extraButton
        actionModal={() => navigate("/dashboard/keuangan/penerimaan/tambah")}
      >
        <TableView
          dataSource={dataPenerimaan}
          columns={columns(updateModal, deleteModal)}
          setPage={setPage}
          setPageSize={setPageSize}
          pageSize={pageSize}
          token={accessToken}
          dataTotal={total}
          mode="penerimaan"
        />
        <Modal
          title="Update Data Penerimaan"
          open={openUpdate}
          // onOk={handleOkUpdate}
          // confirmLoading={confirmLoading}
          onCancel={handleCancelUpdate}
          width={"600px"}
          footer={[]}
        >
          <PenerimaanUpdate
            dataToUpdate={dataPenerimaanDetail}
            handleBatal={handleCancelUpdate}
            sendValues={updatePenerimaan}
          />
        </Modal>
        <Modal
          title="Delete Data Penerimaan"
          open={openDeleteModal}
          onOk={handleOkDelete}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>Apakah anda yakin ingin menghapus data berikut ini ? </p>
          <p>Nama Penerimaan : {dataPenerimaanDetail.nama} </p>
          <p>Kode : {dataPenerimaanDetail.kode}</p>
          <p>Jumlah : {FormatRupiah(dataPenerimaanDetail.jumlah)}</p>
        </Modal>
      </CardDashboard>
    </div>
  );
}

export default Penerimaan;

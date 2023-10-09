import React, { useRef, useState } from "react";
import CardDashboard from "../../components/reusable/cardDashboard";
import { Space, Button, Input, Select } from "antd";
import { BsFillCursorFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { ColorPallete } from "../../utils/colorPalette";
import TableView from "../../components/reusable/tableView";
import { FcInfo } from "react-icons/fc";
import FormatRupiah from "../../components/reusable/formatNumber";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { baseurl } from "../../config/baseUrl";
import { useAuthPersist } from "../../store/authPersist";
import { useSiswaStore } from "../../store/siswaStore";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";

function DataSiswa() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [dataSiswa, setDataSiswa] = useState([]);
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const { data } = useAuthPersist();
  const { dataAllSiswa, fetch, findedSiswa, findSiswa, loading, dataTotal } =
    useSiswaStore((state) => state);
  const accessToken = data[0].credential.accessToken;
  const Navigate = useNavigate();

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

  const columns = () => {
    return [
      {
        key: "no",
        dataIndex: "no",
        title: "No",
        render: (t, r, index) => `${(page - 1) * pageSize + index + 1}`,
        width: 70,
      },
      {
        title: "Nama Siswa",
        dataIndex: "nama",
        key: "nama",
        sorter: (a, b) => a.nama.localeCompare(b.nama),
        ...getColumnSearchProps("nama"),
      },
      {
        title: "NISN",
        dataIndex: "nisn",
        key: "nisn",
        // ...getColumnSearchProps("nisn"),
      },
      {
        title: "Jenis Kelamin",
        dataIndex: "jenis_kelamin",
        key: "jenis_kelamin",
        width: 120,
      },
      {
        title: "Tanggal Lahir",
        dataIndex: "tanggal_lahir",
        key: "tanggal_lahir",
        render: (_, record) => {
          const date = record.tanggal_lahir;
          const parts = date.split("-"); // Split the string into an array based on the hyphens

          const formattedDate = parts.reverse().join("-");
          return formattedDate;
        },
      },
      {
        title: "Tempat Lahir",
        dataIndex: "tempat_lahir",
        key: "tempat_lahir",
      },
      {
        title: "Agama",
        dataIndex: "agama",
        key: "agama",
        width: 120,
      },
      {
        title: "Kelas",
        dataIndex: "kelas",
        key: "kelas",
        width: 70,
        filterDropdown: ({ setSelectedKeys, confirm }) => (
          <div style={{ padding: 8 }}>
            <Select
              style={{ width: 120 }}
              value={selectedFilter}
              onChange={(value) => setSelectedFilter(value)}
              allowClear
              placeholder={"Pilih Kelas"}
            >
              <Select.Option value="1">1</Select.Option>
              <Select.Option value="2">2</Select.Option>
              <Select.Option value="3">3</Select.Option>
            </Select>
            <Button
              type="primary"
              onClick={() => {
                confirm();
              }}
              style={{ marginRight: 8, marginLeft: 5 }}
            >
              OK
            </Button>
          </div>
        ),
        filterIcon: (filtered) => (
          <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: handleFilter,
        filteredValue: selectedFilter ? [selectedFilter] : null,
      },
      {
        title: "Nama Wali Murid",
        dataIndex: "nama_wali_murid",
        key: "nama_wali_murid",
        sorter: (a, b) => a.nama_wali_murid.localeCompare(b.nama_wali_murid),
        ...getColumnSearchProps("nama_wali_murid"),
      },
      {
        title: "NIK Wali Murid",
        dataIndex: "nik_wali_murid",
        key: "nik_wali_murid",
      },
      {
        title: "Alamat",
        dataIndex: "alamat",
        key: "alamat",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
    ];
  };

  useEffect(() => {
    let controller = true;
    fetch(accessToken);
    return () => {
      controller = false;
    };
  }, [dataTotal]);

  return (
    <div>
      <CardDashboard
        titleCard={"Data Siswa"}
        mode={"data_siswa"}
        extraButton
        actionModal={() => Navigate("/dashboard/data_siswa/tambah")}
      >
        <TableView
          dataSource={dataAllSiswa}
          columns={columns()}
          setPage={setPage}
          setPageSize={setPageSize}
          mode="data_siswa"
          pageSize={pageSize}
          loadingTable={loading}
          token={accessToken}
          dataTotal={dataTotal}
        />
      </CardDashboard>
    </div>
  );
}

export default DataSiswa;

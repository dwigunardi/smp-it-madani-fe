import { Button, Row, Table, message, Modal, Dropdown, DatePicker } from "antd";
import React, { useState } from "react";
import "./tableStyle.css";
import FormatRupiah from "./formatNumber";
import { useBeritaStore } from "../../store/beritaStore";
import { usePenerimaanStore } from "../../store/penerimaanStore";
import axios from "axios";
import { baseurl } from "../../config/baseUrl";
import { FaTrash } from "react-icons/fa";
import { ColorPallete } from "../../utils/colorPalette";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useSiswaStore } from "../../store/siswaStore";
function TableView(props) {
  const { loading } = useBeritaStore((state) => state);
  const loadingPenerimaan = usePenerimaanStore((state) => state.loading);
  const exportPenerimaan = usePenerimaanStore((state) => state.export);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [dateValue, setDateValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { dataAllSiswa, fetch } = useSiswaStore((state) => state);
  const { confirm } = Modal;
  const {
    title = "Page",
    subtitle = "",
    columns = [],
    dataSource = [],
    onClickAdd = () => {},
    filters,
    filterStyles = "",
    setPage = () => {},
    setPageSize = () => {},
    pageSize = 5,
    mode = "",
    token = "",
    dataTotal = "",
    loadingTable = false,
    renderExpanded = () => {},
    getRow = () => {},
    handleExpand = () => {},
  } = props;

  const renderFooterPenerimaan = (pageData) => {
    // console.log(pageData, "penerimaan");
    return (
      <Row>
        <p>Hello world</p>
      </Row>
    );
  };
  const renderSummaryPenerimaan = (pageData) => {
    const total = pageData.reduce(function (acc, obj) {
      return acc + parseInt(obj.jumlah);
    }, 0);
    const format = FormatRupiah(dataTotal);
    const downloadFile = () => {
      axios({
        url: baseurl + "/penerimaan/export",
        method: "GET",
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`, // Include the bearer token in the request headers
        },
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Laporan Penerimaan.pdf");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error("Error downloading file:", error);
          message.error("Gagal download File");
        });
    };
    // console.log(format, "penerimaan");
    return (
      <Table.Summary fixed>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={4}>
            Total
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1} colSpan={1}>
            {format}
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1} className="d-flex justify-content-end">
            <Button
              shape="round"
              size="larger"
              className="px-5"
              style={{
                fontWeight: 600,
                boxShadow: "0px 20px 55px rgba(15, 18, 63, 0.25)",
              }}
              onClick={() => downloadFile()}
            >
              Export
            </Button>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </Table.Summary>
    );
  };

  const renderFooterDataSiswa = (pageData) => {
    // console.log(pageData);
    const downloadFile = () => {
      axios({
        url: baseurl + "/students/export",
        method: "GET",
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`, // Include the bearer token in the request headers
        },
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Data Siswa.pdf");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error("Error downloading file:", error);
          message.error("Gagal download File");
        });
    };

    const deleteSiswa = () => {
      confirm({
        title: "Apakah anda yakin ingin menghapus seluruh siswa?",
        icon: <ExclamationCircleFilled />,
        content:
          "Setelah anda mengklik iya seluruh data siswa akan di hapus, namun anda bisa menambahkan kembali di form tambah siswa",
        okText: "Iya",
        okType: "danger",
        cancelText: "Tidak",
        onOk() {
          const req = axios
            .delete(baseurl + "/students", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              if (res.status == 200 || res.status == 201) {
                setLoadingDelete(false);
                message.success("Berhasil Hapus Siswa");
                // window.location.reload();
                fetch(token)
              }
            })
            .catch((err) => {
              console.log(err);
              message.error("Gagal Mengahapus Siswa");
              setLoadingDelete(false);
            });
        },
        onCancel() {
          console.log("Cancel");
          setLoadingDelete(false);
        },
      });
    };

    return (
      <Table.Summary fixed>
        <Table.Summary.Row className="custom-footer-row">
          <Table.Summary.Cell index={0} colSpan={6}>
            <div className="row">
              <div className="col-5">Total</div>
              <div className="col-5">Siswa {dataTotal} orang</div>
            </div>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1} colSpan={6}>
            <div className="row justify-content-start">
              <div className="col-3">
                <Button
                  shape="round"
                  size="larger"
                  className="px-5"
                  style={{
                    fontWeight: 600,
                    boxShadow: "0px 20px 55px rgba(15, 18, 63, 0.25)",
                  }}
                  onClick={() => downloadFile()}
                >
                  Export
                </Button>
              </div>
              <div className="col-3">
                <Button
                  shape="round"
                  size="larger"
                  className="px-5"
                  icon={<FaTrash size={18} style={{ marginRight: 4 }} />}
                  style={{
                    fontWeight: 500,
                    borderColor: ColorPallete.rose,
                    backgroundColor: ColorPallete.rose,
                    color: "white",
                  }}
                  loading={loadingDelete}
                  onClick={() => deleteSiswa()}
                >
                  Hapus Siswa
                </Button>
              </div>
            </div>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </Table.Summary>
    );
  };
  const handleLoading = (props) => {};
  const renderFooterDataTagihan = (data) => {
    const total = data.reduce(function (acc, obj) {
      return acc + parseInt(obj.jumlah);
    }, 0);
    const format = FormatRupiah(dataTotal);
    // console.log(format, "penerimaan");
    const downloadFile = () => {
      axios({
        url: baseurl + "/tagihan/export",
        method: "GET",
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`, // Include the bearer token in the request headers
        },
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Laporan Tagihan.pdf");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error("Error downloading file:", error);
          message.error("Gagal download File");
        });
    };
    return (
      <Table.Summary fixed>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={3}>
            Total
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1}>{format}</Table.Summary.Cell>
          <Table.Summary.Cell index={1} className="d-flex justify-content-end">
            <Button
              shape="round"
              size="larger"
              className="px-5"
              style={{
                fontWeight: 600,
                boxShadow: "0px 20px 55px rgba(15, 18, 63, 0.25)",
              }}
              onClick={() => downloadFile()}
            >
              Export
            </Button>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </Table.Summary>
    );
  };

  const renderFooterDataBelanja = (pageData) => {
    const total = pageData.reduce(function (acc, obj) {
      return acc + parseInt(obj.jumlah);
    }, 0);
    const format = FormatRupiah(dataTotal);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = async () => {
      try {
        setConfirmLoading(true);
        axios({
          url: baseurl + `/pengeluaran/export?date=${dateValue}`,
          method: "GET",
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`, // Include the bearer token in the request headers
          },
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            `Laporan Pengeluaran tanggal ${dateValue}.pdf`
          );
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setConfirmLoading(false);
          setIsModalOpen(false);
        });
      } catch (error) {
        console.error("Error downloading file:", error);
        message.error("Gagal download File");
        setConfirmLoading(false);
        setIsModalOpen(false);
      }
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const handlePicker = (date, dateString) => {
      // console.log(date.format("DD-MM-YYYY"));
      setDateValue(date.format("DD-MM-YYYY"));
    };
    return (
      <Table.Summary fixed>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={5}>
            Total
          </Table.Summary.Cell>
          <Table.Summary.Cell index={2} colSpan={3}>
            {format}
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1} className="d-flex justify-content-end">
            <Button
              shape="round"
              size="larger"
              className="px-5"
              style={{
                fontWeight: 600,
                boxShadow: "0px 20px 55px rgba(15, 18, 63, 0.25)",
              }}
              onClick={showModal}
            >
              Export
            </Button>
            <Modal
              title="Export"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              confirmLoading={confirmLoading}
            >
              <p>Silahkan Pilih tanggal Export</p>
              <DatePicker
                onChange={handlePicker}
                style={{ width: "100%" }}
                placeholder="Pilih Waktu Export"
              />
            </Modal>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </Table.Summary>
    );
  };
  const renderFooterRekapitulasiSemua = (pageData) => {
    const total = pageData.reduce(function (acc, obj) {
      return acc + parseInt(obj.jumlah);
    }, 0);
    const format = FormatRupiah(dataTotal);
    const items = [
      {
        label: <a>Kelas 1</a>,
        key: "1",
      },
      {
        label: <a>Kelas 2</a>,
        key: "2",
      },
      {
        label: <a>Kelas 3</a>,
        key: "3",
      },
    ];
    const handleMenuClick = (info) => {
      return downloadFile(info.key);
    };
    const menuProps = {
      items,
      onClick: handleMenuClick,
    };

    const downloadFile = (kelas) => {
      if (mode == "rekapitulasi-semua") {
        return axios({
          url:
            baseurl +
            `/rekapitulasi/export?status=success|pending&kelas=${kelas}`,
          method: "GET",
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`, // Include the bearer token in the request headers
          },
        })
          .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
              "download",
              `Laporan Rekapitulasi Semua Kelas ${kelas}.pdf`
            );
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          })
          .catch((error) => {
            console.error("Error downloading file:", error);
            message.error("Gagal download File");
          });
      } else if (mode == "rekapitulasi-lunas") {
        return axios({
          url: baseurl + `/rekapitulasi/export?status=success&kelas=${kelas}`,
          method: "GET",
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`, // Include the bearer token in the request headers
          },
        })
          .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
              "download",
              `Laporan Rekapitulasi Lunas Kelas ${kelas}.pdf`
            );
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          })
          .catch((error) => {
            console.error("Error downloading file:", error);
            message.error("Gagal download File");
          });
      } else if (mode == "rekapitulasi-belum") {
        return axios({
          url: baseurl + `/rekapitulasi/export?status=pending&kelas=${kelas}`,
          method: "GET",
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`, // Include the bearer token in the request headers
          },
        })
          .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
              "download",
              `Laporan Rekapitulasi Belum Lunas Kelas ${kelas}.pdf`
            );
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          })
          .catch((error) => {
            console.error("Error downloading file:", error);
            message.error("Gagal download File");
          });
      }
    };
    return (
      <Table.Summary fixed>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={5}>
            Total
          </Table.Summary.Cell>
          <Table.Summary.Cell index={2} colSpan={2}>
            {format}
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1} className="d-flex justify-content-end">
            <Dropdown
              menu={menuProps}
              placement="bottom"
              trigger={["click"]}
              arrow={{
                pointAtCenter: true,
              }}
            >
              <Button
                shape="round"
                size="larger"
                className="px-5"
                style={{
                  fontWeight: 600,
                  boxShadow: "0px 20px 55px rgba(15, 18, 63, 0.25)",
                }}
              >
                Export
              </Button>
            </Dropdown>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </Table.Summary>
    );
  };
  const renderFooterRekapitulasiSiswa = (pageData) => {
    const total = pageData.reduce(function (acc, obj) {
      return acc + parseInt(obj.jumlah);
    }, 0);
    const format = FormatRupiah(dataTotal);
    const downloadFile = () => {
      axios({
        url: baseurl + "/rekapitulasi/export/student",
        method: "GET",
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`, // Include the bearer token in the request headers
        },
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Laporan Rekapitulasi.pdf");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error("Error downloading file:", error);
          message.error("Gagal download File");
        });
    };
    return (
      <Table.Summary fixed>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={5}>
            Total
          </Table.Summary.Cell>
          <Table.Summary.Cell index={2} colSpan={2}>
            {format}
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1} className="d-flex justify-content-end">
            <Button
              shape="round"
              size="larger"
              className="px-5"
              style={{
                fontWeight: 600,
                boxShadow: "0px 20px 55px rgba(15, 18, 63, 0.25)",
              }}
              onClick={() => downloadFile()}
            >
              Export
            </Button>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </Table.Summary>
    );
  };

  const renderFooterTagihanSiswa = (pageData) => {
    const total = pageData.reduce(function (acc, obj) {
      return acc + parseInt(obj.jumlah);
    }, 0);
    const format = FormatRupiah(total);
    return (
      <Table.Summary fixed>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={3}>
            Total
          </Table.Summary.Cell>
          <Table.Summary.Cell index={2} colSpan={3}>
            {format}
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </Table.Summary>
    );
  };

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={{
        pageSize: pageSize,
        onChange(current, perPageTotal) {
          setPageSize(perPageTotal);
          setPage(current);
        },
      }}
      rowKey={(record) =>
        mode === "tagihan-siswa"
          ? record.transaksi_id
          : mode === "rekapitulasi-semua" ||
            mode === "rekapitulasi-belum" ||
            mode === "rekapitulasi-lunas"
          ? record.transaksi_id
          : mode === "rekapitulasi-siswa"
          ? record.transaksi_id
          : mode === "belanja"
          ? record.id
          : record.id
      }
      summary={
        mode == "berita"
          ? null
          : mode == "penerimaan"
          ? (currentPageData) => renderSummaryPenerimaan(currentPageData)
          : mode == "data_siswa"
          ? (currentPageData) => renderFooterDataSiswa(currentPageData)
          : mode == "tagihan"
          ? (currentPageData) => renderFooterDataTagihan(currentPageData)
          : mode == "belanja"
          ? (currentPageData) => renderFooterDataBelanja(currentPageData)
          : mode == "rekapitulasi-semua"
          ? (currentPageData) => renderFooterRekapitulasiSemua(currentPageData)
          : mode == "rekapitulasi-lunas"
          ? (currentPageData) => renderFooterRekapitulasiSemua(currentPageData)
          : mode == "rekapitulasi-belum"
          ? (currentPageData) => renderFooterRekapitulasiSemua(currentPageData)
          : mode == "tagihan-siswa"
          ? (currentPageData) => renderFooterTagihanSiswa(currentPageData)
          : mode == "rekapitulasi-siswa"
          ? (currentPageData) => renderFooterRekapitulasiSiswa(currentPageData)
          : null
      }
      loading={
        mode == "berita"
          ? loading
          : mode == "penerimaan"
          ? loadingPenerimaan
          : mode == "tagihan-siswa"
          ? loadingTable
          : mode == "belanja"
          ? loadingTable
          : false
      }
      scroll={
        mode == "data_siswa"
          ? { x: 1700 }
          : mode == "profil"
          ? { x: 1700 }
          : false
      }
      className="custom-table"
      expandable={
        mode === "belanja"
          ? {
              expandedRowRender: (record, idx, indent, expanded) =>
                renderExpanded(record, idx, indent, expanded),
              // expandRowByClick: true,
              onExpand: handleExpand,
            }
          : mode === "rekapitulasi-semua"
          ? {
              expandedRowRender: (record, idx, indent, expanded) =>
                renderExpanded(record, idx, indent, expanded),
              // expandRowByClick: true,
              onExpand: handleExpand,
            }
          : mode === "rekapitulasi-lunas"
          ? {
              expandedRowRender: (record, idx, indent, expanded) =>
                renderExpanded(record, idx, indent, expanded),
              // expandRowByClick: true,
              onExpand: handleExpand,
            }
          : mode === "rekapitulasi-belum"
          ? {
              expandedRowRender: (record, idx, indent, expanded) =>
                renderExpanded(record, idx, indent, expanded),
              // expandRowByClick: true,
              onExpand: handleExpand,
            }
          : mode === "rekapitulasi-siswa"
          ? {
              expandedRowRender: (record, idx, indent, expanded) =>
                renderExpanded(record, idx, indent, expanded),
              // expandRowByClick: true,
              onExpand: handleExpand,
            }
          : false
      }
    />
  );
}

export default TableView;

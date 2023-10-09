import React, { useEffect, useState } from "react";
import CardDashboard from "../../components/reusable/cardDashboard";
import {
  Button,
  Checkbox,
  Input,
  Form,
  DatePicker,
  InputNumber,
  Row,
  Col,
  Select,
  Space,
  message,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { baseurl } from "../../config/baseUrl";
import { useAuthPersist } from "../../store/authPersist";
import dayjs from "dayjs";
function BelanjaUpdate() {
  const navigate = useNavigate();
  const { Option } = Select;
  let { belanjaId } = useParams();
  const [jumlahValue1, setjumlahValue1] = useState(0);
  const [jumlahValue2, setjumlahValue2] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dataPengeluaran, setDataPengeluaran] = useState([]);
  const [form] = Form.useForm();
  const { data } = useAuthPersist();
  const accessToken = data[0].credential.accessToken;
  const onFinish = (fieldValues) => {
    setLoading(true);
    const date = new Date();
    const output = {
      nama_belanja: fieldValues.namaBelanja,
      kode_rekening: fieldValues.kode_rek,
      kode_kegiatan: fieldValues.kode_kegiatan,
      bulan_tahun: fieldValues["bulanTahun"].format("YYYY-MM-DD"),
      sumber_dana_alokasi_anggaran: {
        bos_reguler: {
          belanja_operasi: fieldValues[`jumlah_operasi-0`],
          belanja_modal: fieldValues[`jumlah_belanja-0`],
        },
        bos_daerah: {
          belanja_operasi: fieldValues[`jumlah_operasi-1`],
          belanja_modal: fieldValues[`jumlah_belanja-1`],
        },
        afirmasi_kerja: {
          belanja_operasi: fieldValues[`jumlah_operasi-2`],
          belanja_modal: fieldValues[`jumlah_belanja-2`],
        },
        silpa: {
          belanja_operasi: fieldValues[`jumlah_operasi-3`],
          belanja_modal: fieldValues[`jumlah_belanja-3`],
        },
        bos_lainnya: {
          belanja_operasi: fieldValues[`jumlah_operasi-4`],
          belanja_modal: fieldValues[`jumlah_belanja-4`],
        },
      },
    };

    axios
      .put(baseurl + `/pengeluaran/${belanjaId}`, output, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.status == 200 || res.status == 201) {
          message.success("Berhasil memperbaharui data pengeluaran");
          setLoading(false);
          navigate(-1);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Membuat Data");
        setLoading(false);
      });
    console.log("Success:", output);
    setLoading(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleBatal = () => {
    navigate(-1);
  };
  const parseRupiah = (value) => {
    if (!value) return NaN;
    const parsedValue = value.replace(/[^0-9]/g, "");
    return parseInt(parsedValue, 10);
  };
  const formatRupiah = (value) => {
    if (!value) return 0;
    const formattedValue = value
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `Rp ${formattedValue}`;
  };
  const handleJumlah1Change = (value) => {
    setjumlahValue1(value);
  };
  const handleJumlah2Change = (value) => {
    setjumlahValue2(value);
  };
  const config = {
    rules: [
      {
        type: "object",
        required: true,
        message: "Please select time!",
      },
    ],
  };
  const options = [
    "Bos Reguler",
    "Bos Daerah",
    "Afirmasi/Kinerja",
    "SiLPA",
    "Bos Lainnya",
  ];

  useEffect(() => {
    let controler = new AbortController();
    setLoading(true);
    axios
      .get(baseurl + `/pengeluaran/${belanjaId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        signal: controler.signal,
      })
      .then((response) => {
        if (response.status == 200 || response.status == 201) {
          setDataPengeluaran(response.data.data.pengeluaran);
          form.setFieldsValue({
            namaBelanja: response.data.data.pengeluaran.nama_belanja,
            kode_rek: response.data.data.pengeluaran.kode_rekening,
            kode_kegiatan: response.data.data.pengeluaran.kode_kegiatan,
            bulanTahun: dayjs(response.data.data.pengeluaran.bulan_tahun),
            [`jumlah_operasi-0`]:
              response.data.data.sumber_dana_alokasi_anggaran[0]
                .belanja_operasi,
            [`jumlah_belanja-0`]:
              response.data.data.sumber_dana_alokasi_anggaran[0].belanja_modal,
            [`jumlah_operasi-1`]:
              response.data.data.sumber_dana_alokasi_anggaran[1]
                .belanja_operasi,
            [`jumlah_belanja-1`]:
              response.data.data.sumber_dana_alokasi_anggaran[1].belanja_modal,
            [`jumlah_operasi-2`]:
              response.data.data.sumber_dana_alokasi_anggaran[2]
                .belanja_operasi,
            [`jumlah_belanja-2`]:
              response.data.data.sumber_dana_alokasi_anggaran[2].belanja_modal,
            [`jumlah_operasi-3`]:
              response.data.data.sumber_dana_alokasi_anggaran[3]
                .belanja_operasi,
            [`jumlah_belanja-3`]:
              response.data.data.sumber_dana_alokasi_anggaran[3].belanja_modal,
            [`jumlah_operasi-4`]:
              response.data.data.sumber_dana_alokasi_anggaran[4]
                .belanja_operasi,
            [`jumlah_belanja-4`]:
              response.data.data.sumber_dana_alokasi_anggaran[4].belanja_modal,
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        message.error("Gagal Get Data");
        setLoading(false);
      });

    return () => {
      controler.abort();
    };
  }, [belanjaId]);

  return (
    <div>
      <CardDashboard
        titleCard={"Update Pengeluaran"}
        mode={"tambah_belanja"}
        extraButton={false}
      >
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          form={form}
          disabled={loading}
        >
          <Form.Item
            label="Nama Pengeluaran"
            name="namaBelanja"
            rules={[
              {
                required: true,
                message: "Tolong masukan Nama Belanja!",
              },
            ]}
          >
            <Input style={{ border: "1px solid #0F123F" }} />
          </Form.Item>

          <Form.Item
            label="Kode Rekening"
            name="kode_rek"
            rules={[
              {
                required: true,
                message: "Tolong masukan Kode Rekening!",
              },
              {
                validator: async (_, names) => {
                  if (names.length <= 10) {
                    return Promise.reject(
                      new Error("Kode Rekening minimal. (min 10 Karakter)")
                    );
                  }
                },
              },
            ]}
          >
            <Input style={{ border: "1px solid #0F123F" }} />
          </Form.Item>
          <Form.Item
            label="Kode Kegiatan"
            name="kode_kegiatan"
            rules={[
              {
                required: true,
                message: "Tolong masukan Kode Kegiatan!",
              },
              {
                validator: async (_, names) => {
                  if (names.length >= 6) {
                    return Promise.reject(
                      new Error("Melebihi bidang maksimal. (Max 5 Karakter)")
                    );
                  }
                },
              },
            ]}
          >
            <Input style={{ border: "1px solid #0F123F" }} />
          </Form.Item>
          <Form.Item name="bulanTahun" label="Bulan / Tahun" {...config}>
            <DatePicker
              allowClear
              style={{ border: "1px solid #0F123F", width: "100%" }}
            />
          </Form.Item>
          <div className="mb-3">
            <span className="text-danger" style={{ fontSize: 14 }}>
              *{" "}
            </span>
            Sumber Dana dan Alokasi Anggaran
          </div>
          {options.map((value, idx) => {
            return (
              <Row justify={"space-between"} align={"middle"} key={idx}>
                <Col span={4}>
                  <Form.Item
                    name={`sumber-${idx}`}
                    initialValue={value}
                    rules={[
                      {
                        required: true,
                        message: "Missing Bos Reguler",
                      },
                    ]}
                  >
                    <Input
                      style={{ border: "1px solid #0F123F", width: "100%" }}
                      readOnly
                    />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    name={`operasi-${idx}`}
                    initialValue={"Operasi Belanja"}
                    rules={[
                      {
                        required: true,
                        message: "Missing Operasi Belanja",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Operasi Belanja"
                      style={{ border: "1px solid #0F123F", width: "100%" }}
                      readOnly
                    />
                  </Form.Item>
                </Col>
                <Col span={4} className="">
                  <Form.Item
                    name={`jumlah_operasi-${idx}`}
                    rules={[
                      {
                        required: false,
                        message: "Missing Jumlah",
                      },
                    ]}
                    initialValue={jumlahValue1}
                    extra={
                      <div>
                        <span className="text-danger">*</span>
                        <span>Jika tidak Isi otomatis 0</span>
                      </div>
                    }
                  >
                    <InputNumber
                      min={0}
                      value={jumlahValue1}
                      formatter={formatRupiah}
                      parser={parseRupiah}
                      onChange={handleJumlah1Change}
                      style={{ border: "1px solid #0F123F", width: "100%" }}
                      placeholder="Masukan Jumlah"
                    />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    name={`belanja-${idx}`}
                    initialValue={"Belanja Modal"}
                    rules={[
                      {
                        required: true,
                        message: "Missing Belanja Modal",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Belanja Modal"
                      style={{ border: "1px solid #0F123F", width: "100%" }}
                      readOnly
                    />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    name={`jumlah_belanja-${idx}`}
                    rules={[
                      {
                        required: false,
                        message: "Missing Jumlah",
                      },
                    ]}
                    extra={
                      <div>
                        <span className="text-danger">*</span>
                        <span>Jika tidak Isi otomatis 0</span>
                      </div>
                    }
                    initialValue={jumlahValue2}
                  >
                    <InputNumber
                      min={0}
                      type="text"
                      value={jumlahValue2}
                      formatter={formatRupiah}
                      parser={parseRupiah}
                      onChange={handleJumlah2Change}
                      style={{ border: "1px solid #0F123F", width: "100%" }}
                      placeholder="Masukan Jumlah"
                    />
                  </Form.Item>
                </Col>
              </Row>
            );
          })}

          <Form.Item>
            <div className="d-flex justify-content-between">
              <Button
                type="default"
                size="large"
                className="px-4"
                onClick={() => handleBatal()}
              >
                Batal
              </Button>
              <Button
                type="primary"
                size="large"
                className="px-4"
                htmlType="submit"
              >
                Simpan
              </Button>
            </div>
          </Form.Item>
        </Form>
      </CardDashboard>
    </div>
  );
}

export default BelanjaUpdate;

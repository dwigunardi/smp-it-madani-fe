import React, { useState } from "react";
import CardDashboard from "../../components/reusable/cardDashboard";
import {
  Button,
  Checkbox,
  Input,
  Form,
  DatePicker,
  InputNumber,
  Select,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../../config/baseUrl";
import { useAuthPersist } from "../../store/authPersist";

function PenerimaanTambah() {
  const navigate = useNavigate();
  const [jumlahValue, setJumlahValue] = useState(0);
  const { data } = useAuthPersist();
  const [displayMsg, setDisplayMsg] = useState('')
  const accessToken = data[0].credential.accessToken;
  const onFinish = async (fieldValues) => {
    try {
      const date = new Date();
      const values = await {
        bulan_tahun: fieldValues["date"].format("YYYY-MM-DD"),
        nama: fieldValues.namaPenerimaan,
        jumlah: fieldValues.jumlah,
        kode: fieldValues.kode,
      };

      // console.log("Success:", values);
      const post = await axios
        .post(
          baseurl + "/penerimaan",
          values,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          }
        )
        .then((res) => {
          message.success(res.data.message)
          setTimeout(() => {
            navigate(-1)
          }, 1000);
        });
    } catch (error) {
      console.log(error.response.data.errors);
      message.error(error.response.data.errors.nama)
    }
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
    if (!value) return "";
    const formattedValue = value
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `Rp ${formattedValue}`;
  };
  const handleJumlahChange = (value) => {
    setJumlahValue(value);
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
  return (
    <div>
      <CardDashboard titleCard={"Tambah Penerimaan"} mode={"tambah_penerimaan"}>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Nama Penerimaan"
            name="namaPenerimaan"
            rules={[
              {
                required: true,
                message: "Please input your Nama Tagihan!",
              },
            ]}
          >
            <Input style={{ border: "1px solid #0F123F" }} />
          </Form.Item>
          <Form.Item
            label="Kode"
            name="kode"
            rules={[
              {
                required: true,
                message: "Please input your Kode!",
              },
            ]}
          >
            <Input style={{ border: "1px solid #0F123F" }} />
          </Form.Item>
          <Form.Item name="date" label="Bulan/Tahun" {...config}>
            <DatePicker
              style={{ border: "1px solid #0F123F", width: "100%" }}
              allowClear
            />
          </Form.Item>
          <Form.Item
            label="Jumlah"
            name="jumlah"
            rules={[
              {
                required: true,
                message: "Please input your Jumlah!",
              },
              {
                type: "number",
                message: "Format yang dimasukan salah!",
              },
            ]}
            extra="Masukan Hanya Angka"
          >
            <InputNumber
              min={1}
              type="text"
              value={jumlahValue}
              formatter={formatRupiah}
              parser={parseRupiah}
              onChange={handleJumlahChange}
              style={{ border: "1px solid #0F123F", width: "100%" }}
            />
          </Form.Item>
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

export default PenerimaanTambah;

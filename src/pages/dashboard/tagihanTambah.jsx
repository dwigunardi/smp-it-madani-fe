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
import { useAuthPersist } from "../../store/authPersist";
import { useTagihanStore } from "../../store/tagihanStore";
import axios from "axios";
import { baseurl } from "../../config/baseUrl";
import dayjs from "dayjs";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import generatePicker from "antd/lib/date-picker/generatePicker";
function TagihanTambah() {
  const { data } = useAuthPersist();
  const accessToken = data[0].credential.accessToken;
  const {
    dataTagihan,
    fetch,
    loading,
    postTagihan,
    pesan,
    hasErrors,
    fetchSiswa,
  } = useTagihanStore((state) => state);
  const navigate = useNavigate();
  const [jumlahValue, setJumlahValue] = useState(1);
  // console.log(accessToken)
  const onFinish = async (fieldValues) => {
    try {
      const date = new Date();
      const values = await {
        nama: fieldValues.namaTagihan,
        kode: fieldValues.kode,
        deskripsi: fieldValues.deskripsi,
        jatuh_tempo: fieldValues["jatuhTempo"].format("YYYY-MM-DD"),
        jumlah: fieldValues.jumlah,
      };
      await axios
        .post(baseurl + "/tagihan", values, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          if (response.status == 200 || response.status == 201) {
            message.success("Berhasil Mengirim Tagihan");
            navigate(-1);
            fetchSiswa(accessToken);
          }
        });

      // console.log("Success:", values);
    } catch (error) {
      message.error(
        error.response.data.message ||
          error.response.data.errors.nama ||
          error.response.data.errors.kode ||
          error.response.data.errors.deskripsi
      );
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
      <CardDashboard titleCard={"Tambah Tagihan"} mode={"tambah_tagihan"}>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Nama Tagihan"
            name="namaTagihan"
            rules={[
              {
                required: true,
                message: "Please input your Nama Tagihan!",
              },
              {
                required: true,
                min: 10,
                message: "Minimal 10 Karakter",
              },
            ]}
          >
            {/* <Select
              style={{ border: "1px solid #0F123F", borderRadius: "5px" }}
              options={[
                {
                  value: "SPP",
                  label: "SPP",
                },
                {
                  value: "Non-SPP",
                  label: "Non-SPP",
                },
              ]}
              placeholder={"--> Silahkan Pilih Nama Tagihan"}
            /> */}
            <Input
              placeholder="Silahkan Masukan Nama tagiahan"
              style={{ border: "1px solid #0F123F", borderRadius: "5px" }}
            />
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
          <Form.Item
            label="Deskripsi"
            name="deskripsi"
            rules={[
              {
                required: true,
                message: "Please input your Deskripsi!",
              },
            ]}
          >
            <Input style={{ border: "1px solid #0F123F" }} />
          </Form.Item>
          <Form.Item name="jatuhTempo" label="Jatuh Tempo" {...config}>
            <DatePicker
              style={{ border: "1px solid #0F123F", width: "100%" }}
              allowClear
              disabledDate={(current) => {
                return current && current < dayjs().add(1, "week").endOf("day");
              }}
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
                loading={loading}
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

export default TagihanTambah;

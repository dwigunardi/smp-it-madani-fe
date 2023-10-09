import { Button, DatePicker, Form, Input, InputNumber, Spin } from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
function PenerimaanUpdate(props) {
  const { dataToUpdate, handleBatal, sendValues } = props;
  const [jumlahValue, setJumlahValue] = useState(0);
  const [form] = Form.useForm();
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
  const onFinish = async (fieldValues) => {
    try {
      const date = new Date();
      const values = await {
        bulan_tahun: fieldValues["date"].format("YYYY-MM-DD"),
        nama: fieldValues.namaPenerimaan,
        jumlah: fieldValues.jumlah,
        kode: fieldValues.kode,
      };

      console.log("Success:", values);
      sendValues(values);
    } catch (error) {
      console.log(error.response.data.errors);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    let sub = true;
    form.setFieldsValue({
      namaPenerimaan: dataToUpdate.nama,
      kode: dataToUpdate.kode,
      date: dayjs(dataToUpdate.bulan_tahun),
      jumlah: dataToUpdate.jumlah,
    });
    return () => {
      sub = false;
    };
  }, [dataToUpdate]);
  return (
    <div>
      {dataToUpdate ? (
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          form={form}
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
      ) : (
        <Spin size="large" />
      )}
    </div>
  );
}

export default PenerimaanUpdate;

import React, { useState } from "react";
import CardDashboard from "../../components/reusable/cardDashboard";
import { Button, Checkbox, Input, message } from "antd";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../../config/baseUrl";
import { useAuthPersist } from "../../store/authPersist";

function DataSiswaTambah() {
  const navigate = useNavigate();
  const { data } = useAuthPersist();
  const [filesUpload, setFilesUpload] = useState("");
  const [loading, setLoading] = useState(false)
  // console.log(filesUpload);
  const handleBatal = () => {
    setFilesUpload("");
    navigate(-1);
  };

  const handleUpload = async () => {
    try {
      setLoading(true)
      const formData = new FormData();
      await formData.append('file', filesUpload);
      await axios
        .post(baseurl + "/students/import", formData, {
          headers: {
            Authorization: `Bearer ${data[0].credential.accessToken}`,
          },
        })
        .then((res) => {
          // console.log(res, "ini");
          if(res.status == 200 || res.status == 201){
            message.success('Berhasil Import Siswa')
            setLoading(false)
            navigate(-1);
          }
        })
        .catch((error) => {
          console.log(error, 'ada error')
          message.error(error.response.data.message);
          setLoading(false)
        });
    } catch (error) {
      console.log(error);
      message.error("Gagal Mengupload");
      setLoading(false)
    }
    setLoading(false)
  };
  return (
    <div>
      <CardDashboard
        titleCard={"Tambah Siswa"}
        mode={"tambah_siswa"}
        extraButton={false}
      >
        <p
          style={{
            color: "#0F123F",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "20px",
            lineHeight: "32px",
            letterSpacing: "0.02em",
          }}
        >
          File Excel Siswa
        </p>
        <Form.Group controlId="formFile" className="mb-3" >
          <Form.Control
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            placeholder="Hanya dapat mengupload file berformat csv"
            onChange={(e) => setFilesUpload(e.target.files[0])}
            disabled={loading}
          />
          <small>
            <span style={{ color: "red" }}>*</span> Hanya dapat mengupload file
            berformat csv
          </small>
        </Form.Group>
        <br />
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
            onClick={handleUpload}
            loading={loading}
          >
            Simpan
          </Button>
        </div>
        <br />
      </CardDashboard>
    </div>
  );
}

export default DataSiswaTambah;

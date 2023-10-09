import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Result, Typography } from "antd";
import { AiFillWarning } from "react-icons/ai";
import { useAuthPersist } from "../../store/authPersist";
import { CloseCircleOutlined } from "@ant-design/icons";
function Transaksi() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useAuthPersist();
  const { Paragraph, Text } = Typography;
  const searchParams = new URLSearchParams(location.search);
  const resultCode = searchParams.get("resultCode");
  const merchantOrderId = searchParams.get("merchantOrderId");
  const reference = searchParams.get("reference");
  const successText =
    "Sistem Akan Memeriksa Pembayaran anda dalam kurun waktu 1-5 menit";
  const pendingText = "Sistem Menemukan kalau tagihan anda belum di bayar";
  // Render your component with the extracted query parameters
  // const username = data[0]?.credential?.data?.username || "TEST";
  return (
    <div>
      {resultCode == "00" ? (
        <div className="d-flex justify-content-center align-items-center">
          <Result
            status="success"
            title="Berhasil Membayar Tagihan Sekolah"
            subTitle={
              <div>
                <ul style={{ listStyle: "none" }}>
                  <li>Order Id : {merchantOrderId}</li>
                  <li>No Referensi : {reference}</li>
                </ul>
                <p>{successText}</p>
              </div>
            }
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={() => window.close()}
              >
                Kembali
              </Button>,
            ]}
          />{" "}
        </div>
      ) : resultCode == "01" ? (
        <Result
          icon={
            <AiFillWarning
              color="#faad14"
              style={{
                width: 72,
                height: 72,
              }}
            />
          }
          status={"warning"}
          title="Tagihan Belum Di Bayar, Silahkan Ulang Kembali"
          subTitle={
            <div>
              <ul style={{ listStyle: "none" }}>
                <li>Order Id : {merchantOrderId}</li>
                <li>No Referensi : {reference}</li>
              </ul>
              <p>{pendingText}</p>
            </div>
          }
          extra={[
            <Button type="primary" key="console" onClick={() => window.close()}>
              Kembali
            </Button>,
          ]}
        />
      ) : resultCode == "02" ? (
        <Result
          status="error"
          title="Gagal Membayar"
          subTitle="Tolong Periksa Kembali Pemesanan anda."
          extra={[
            <Button type="primary" key="console" onClick={() => window.close()}>
              Kembali
            </Button>,
          ]}
        >
          <div className="desc">
            <Paragraph>
              <Text
                strong
                style={{
                  fontSize: 16,
                }}
              >
                Konten yang Anda kirimkan memiliki kesalahan berikut:
              </Text>
            </Paragraph>
            <Paragraph>
              <CloseCircleOutlined className="site-result-demo-error-icon" />{" "}
              Anda Membatalkan Transaksi Tersebut.
            </Paragraph>
            <Paragraph>
              <CloseCircleOutlined className="site-result-demo-error-icon" />{" "}
              Koneksi Internet Anda Tidak Stabil
              {/* <a>Apply Unlock &gt;</a> */}
            </Paragraph>
            <Paragraph>
              <CloseCircleOutlined className="site-result-demo-error-icon" />{" "}
              Silahkan Hubungi :<a>Admin Sekolah &gt;</a>
            </Paragraph>
          </div>
        </Result>
      ) : null}
      {/* <h1>Result Code: {resultCode}</h1>
        <h1>Merchant Order ID: {merchantOrderId}</h1>
        <h1>Reference: {reference}</h1> */}
    </div>
  );
}

export default Transaksi;

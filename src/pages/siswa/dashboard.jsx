import React from "react";
import { useAuthPersist } from "../../store/authPersist";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { baseurl } from "../../config/baseUrl";
import { Typography, message } from "antd";
import CardDashboard from "../../components/reusable/cardDashboard";
import TableView from "../../components/reusable/tableView";

function DashboardSiswa() {
  const [loading, setLoading] = useState(false);
  const [dataProfile, setDataProfile] = useState({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { data } = useAuthPersist();
  const accessToken = data[0].credential.accessToken;
  const columns = () => {
    return [
      {
        title: "Nama Siswa",
        dataIndex: "nama",
        key: "nama",
        // width: "15%",
      },
      {
        title: "NISN",
        dataIndex: "nisn",
        key: "nisn",
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
        // width: "10%",
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
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Nama Wali Murid",
        dataIndex: "nama_wali_murid",
        key: "nama_wali_murid",
        // width: "20%",
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
        // width: "20%",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
    ];
  };
  useEffect(() => {
    let controler = new AbortController();
    setLoading(true);
    axios
      .get(baseurl + "/auth/user", {
        headers: { Authorization: `Bearer ${accessToken}` },
        signal: controler.signal,
      })
      .then((response) => {
        if (response.status == 200 || response.status == 201) {
          setDataProfile(response.data.data);
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
  }, []);
  // console.log(dataProfile);
  return (
    <div>
      <CardDashboard
        titleCard={"Profile Student"}
        mode={"profil"}
        extraButton={false}
        extraTittle={true}
        isiExtra={
          <Typography.Title level={3}>
            Selamat Datang {dataProfile?.nama}
          </Typography.Title>
        }
        // actionModal={() => Navigate("/dashboard/keuangan/belanja/tambah")}
      >
        {/* <Typography.Title level={2}>{dataProfile.nama}</Typography.Title> */}
        <div
        // style={{ width: "50%", textJustify: "inter-word", textAlign: "left" }}
        >
          <Typography.Paragraph>
            Selamat datang di fasilitas layanan Siswa SMP IT Madani. Fasilitas
            ini merupakan salah satu bentuk pelayanan dari pihak pengelola
            Sekolah dalam menyediakan informasi tagihan, melakukan pembayaran
            online dan diharapkan seluruh siswa yang masih aktif dapat
            memperoleh informasi tersebut dengan mudah, serta dapat memudahkan
            transaksi dengan fasilitas ini.
          </Typography.Paragraph>
        </div>
        <div>
          <TableView
            dataSource={[dataProfile]}
            columns={columns()}
            setPage={setPage}
            setPageSize={setPageSize}
            mode="profil"
          />
        </div>
      </CardDashboard>
    </div>
  );
}

export default DashboardSiswa;

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardDashboard from "../../components/reusable/cardDashboard";
import TableView from "../../components/reusable/tableView";
import FormatRupiah from "../../components/reusable/formatNumber";

function RekapitulasiDetail() {
  const { name } = useParams();
  const [page, setPage] = useState(1);
  const Navigate = useNavigate()
  const sampleData = [
    {
      id: 1,
      namaSiswa: "Budiono",
      nis: "101180144",
      kelas: "12A",
      rekap: [
        {
          kategori: "SPP",
          jumlah: 500000,
          status: "Lunas",
          tahun: 2023,
          bulan: "Januari",
        },
        {
          kategori: "SPP",
          jumlah: 500000,
          status: "Lunas",
          tahun: 2023,
          bulan: "Februari",
        },
        {
          kategori: "SPP",
          jumlah: 500000,
          status: "Lunas",
          tahun: 2023,
          bulan: "Maret",
        },
        {
          kategori: "SPP",
          jumlah: 500000,
          status: "Lunas",
          tahun: 2023,
          bulan: "April",
        },
        {
          kategori: "SPP",
          jumlah: 500000,
          status: "Lunas",
          tahun: 2023,
          bulan: "Mei",
        },
        {
          kategori: "SPP",
          jumlah: 500000,
          status: "Lunas",
          tahun: 2023,
          bulan: "Juni",
        },
        {
          kategori: "SPP",
          jumlah: 500000,
          status: "Non - Lunas",
          tahun: 2023,
          bulan: "Juli",
        },
      ],
    },
    {
      id: 2,
      namaSiswa: "Ujang kemem",
      nis: "101180143",
      kelas: "12A",
      rekap: [
        {
          kategori: "SPP",
          jumlah: 500000,
          status: "Lunas",
          tahun: 2023,
          bulan: "Januari",
        },
        {
          kategori: "SPP",
          jumlah: 500000,
          status: "Lunas",
          tahun: 2023,
          bulan: "Februari",
        },
        {
          kategori: "SPP",
          jumlah: 500000,
          status: "Lunas",
          tahun: 2023,
          bulan: "Maret",
        },
        {
          kategori: "SPP",
          jumlah: 500000,
          status: "Lunas",
          tahun: 2023,
          bulan: "April",
        },
        {
          kategori: "SPP",
          jumlah: 500000,
          status: "Lunas",
          tahun: 2023,
          bulan: "Mei",
        },
        {
          kategori: "SPP",
          jumlah: 500000,
          status: "Lunas",
          tahun: 2023,
          bulan: "Juni",
        },
        {
          kategori: "SPP",
          jumlah: 500000,
          status: "Non - Lunas",
          tahun: 2023,
          bulan: "Juli",
        },
      ],
    },
  ];
  
  const findName = sampleData.find((value, idx) => value.namaSiswa == name);
  const columns = () => {
    return [
      {
        key: "no",
        dataIndex: "no",
        title: "No",
        render: (t, r, index) => `${(page - 1) * 10 + index + 1}`,
      },
      {
        title: "Kategori",
        dataIndex: "kategori",
        key: "kategori",
      },
      {
        title: "Jumlah",
        dataIndex: "jumlah",
        key: "jumlah",
        render: (_, record) => {
          return <div>{FormatRupiah(record.jumlah)}</div>;
        },
      },
      {
        title: "status",
        dataIndex: "status",
        key: "status",
      },
    ];
  };

  return (
    <div>
      <CardDashboard
        extraButton={true}
        titleCard={"Detail Rekapitulasi Pembayaran"}
        mode="detailRekapitulasi"
        actionModal={() => Navigate(-1)}
      >
        <div>
          {/* <p>Nama : {findName.namaSiswa}</p>
          <p>NIS : {findName.nis}</p>
          <p>Kelas : {findName.kelas} </p> */}
        </div>
        <TableView
          dataSource={findName.rekap}
          columns={columns()}
          pagination={{
            onChange(current) {
              console.log(current, "ini pagination");
              setPage(current);
            },
          }}
          mode="rekapitulasi-detail"
        />
      </CardDashboard>
    </div>
  );
}

export default RekapitulasiDetail;

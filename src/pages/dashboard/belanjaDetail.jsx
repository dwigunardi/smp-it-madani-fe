import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardDashboard from "../../components/reusable/cardDashboard";
import { Button, Image, message } from "antd";
import { BsArrowBarLeft } from "react-icons/bs";
import { useState } from "react";
import { useAuthPersist } from "../../store/authPersist";
import axios from "axios";
import { baseurl } from "../../config/baseUrl";

function BelanjaDetail(props) {
  let { belanjaId } = useParams();
  const [loading, setLoading] = useState(false);
  const [dataPengeluaran, setDataPengeluaran] = useState([]);
  const [sumberDana, setSumberDana] = useState([]);
  const Navigate = useNavigate();
  const { data } = useAuthPersist();
  const accessToken = data[0].credential.accessToken;
  useEffect(() => {
    let controler = new AbortController();
    setLoading(true);
    let sub = true;
    axios
      .get(baseurl + `/pengeluaran/${belanjaId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        signal: controler.signal,
      })
      .then((response) => {
        if (response.status == 200 || response.status == 201) {
          setDataPengeluaran(response.data.data.pengeluaran);
          setSumberDana(response.data.data.sumber_dana_alokasi_anggaran);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        message.error("Gagal Get Data");
        setLoading(false);
      });
    return () => {
      sub = false;
      controler.abort();
    };
  }, [belanjaId]);
  // console.log(dataBeritaDetail)
  return (
    <div>
      <CardDashboard
        extraButton={false}
        titleCard={"Detail Pengeluaran"}
        mode="detailPengeluaran"
      >
        <div className="d-flex justify-content-center container"></div>
        {/* <h2
          style={{
            fontFamily: "Nunito, Segoe UI, arial",
            color: "#6c757d",
          }}
        >
          {dataPengeluaran.nama_belanja}
        </h2> */}
        <ul>
          <li>Nama Pengeluaran : {dataPengeluaran.nama_belanja}</li>
        </ul>
        {/* <h5>Di tulis Oleh : {dataBeritaDetail.author}</h5> */}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nama Pengeluaran</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>

        <div className="pt-5 d-flex justify-content-end">
          <Button
            icon={<BsArrowBarLeft />}
            size="large"
            onClick={() => Navigate(-1)}
          >
            Kembali
          </Button>
        </div>
      </CardDashboard>
    </div>
  );
}

export default BelanjaDetail;

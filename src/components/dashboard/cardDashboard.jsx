import { Col, Image, Row } from "antd";
import React from "react";
import { BsCash } from "react-icons/bs";
import FormatRupiah from "../reusable/formatNumber";

function CardDashboard(props) {
  const { dataKas, dataPemasukan, dataPengeluaran } = props;
  const data = [
    {
      id: 1,
      icon: (
        <BsCash
          size={50}
          color="blue"
          style={{ position: "absolute", top: "25", left: "25" }}
        />
      ),
      image: "/card-dashboard/kas.png",
      tittle: "Total Kas",
      amount: typeof dataKas === "number" ? FormatRupiah(dataKas) : 0,
    },
    {
      id: 2,
      icon: (
        <BsCash
          size={50}
          color="green"
          style={{ position: "absolute", top: "25", left: "25" }}
        />
      ),
      image: "/card-dashboard/pemasukan.png",
      tittle: "Total Penerimaan",
      amount:
        typeof dataPemasukan === "number" ? FormatRupiah(dataPemasukan) : 0,
    },
    {
      id: 3,
      icon: (
        <BsCash
          size={50}
          color="red"
          style={{ position: "absolute", top: "25", left: "25" }}
        />
      ),
      image: "/card-dashboard/pengeluaran.png",
      tittle: "Total Pengeluaran",
      amount:
        typeof dataPengeluaran === "number" ? FormatRupiah(dataPengeluaran) : 0,
    },
  ];

  return (
    <Row justify={"space-around"} align={"middle"} className="">
      {data.map((items, idx) => {
        return (
          <Col span={7} key={idx}>
            <div className="card mb-3" style={{ width: "100%" }}>
              <div className="row g-0">
                <div className="col-md-4 position-relative">
                  <div
                    style={{
                      background:
                        "linear-gradient(128.58deg, #0F123F 14.67%, #3A408F 86.8%)",
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src={items.image}
                      width={"80%"}
                      height={"auto"}
                      preview={false}
                    />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{items.tittle}</h5>
                    <p className="card-text">{items.amount}</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        );
      })}
    </Row>
  );
}

export default CardDashboard;

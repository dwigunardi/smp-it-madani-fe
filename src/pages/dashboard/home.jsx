import React, { useEffect } from "react";
import { Card, Col, Image, Layout, Row } from "antd";
import { Container } from "react-bootstrap";
import { BsCash } from "react-icons/bs";
import CardDashboard from "../../components/dashboard/cardDashboard";
import LineChartDashboard from "../../components/dashboard/lineChartDashboard";
import PieChartDashboard from "../../components/dashboard/pieChartDashboard";
import { useAuthPersist } from "../../store/authPersist";
import axios from "axios";
import { baseurl } from "../../config/baseUrl";
import { useState } from "react";
function HomeDashboard() {
  const { Content } = Layout;
  const { data } = useAuthPersist();
  const accessToken = data[0].credential.accessToken;
  const [total, setTotal] = useState("");

  useEffect(() => {
    let controler = new AbortController();
    const fetchData = async () => {
      try {
        const requests = axios
          .get(baseurl + "/dashboard/all-total", {
            headers: { Authorization: `Bearer ${accessToken}` },
            signal: controler.signal,
          })
          .then((res) => {
            if (res.status == 200 || res.status == 201) {
              setTotal(res.data.data);
            }
          });
        // axios.get(baseurl + "/dashboard/all-total", {
        //   headers: { Authorization: `Bearer ${accessToken}` },
        //   signal: controler.signal,
        // }),
        // axios.get(baseurl + "/rekapitulasi?status=success|pending&kelas=3", {
        //   headers: { Authorization: `Bearer ${accessToken}` },
        //   signal: controler.signal,
        // }),
        // ];
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    return () => {
      controler.abort();
    };
  }, []);

  // console.log(total);
  return (
    <Content className="mt-5">
      <Container fluid>
        <CardDashboard
          dataKas={total?.Kas}
          dataPemasukan={total?.Pemasukan}
          dataPengeluaran={total?.Pengeluaran}
        />
        <br />
        <Row justify={"space-around"} align={"top"} className="">
          <Col span={15}>
            {" "}
            <Card
              title={
                <div className="mt-2">
                  <h3>Result</h3>{" "}
                  <p style={{ marginTop: "-10px", color: "grey" }}>
                    SMP IT Madani
                  </p>
                </div>
              }
              extra={<a href="#">More</a>}
              bodyStyle={{ height: "500px" }}
            >
              <LineChartDashboard />
            </Card>
          </Col>
          <Col span={7}>
            <Card
              title={
                <div className="mt-2">
                  <h3>Chart</h3>{" "}
                  <div
                    className="d-flex justify-content-start gap-3"
                    style={{ alignItems: "center", alignContent: "center" }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        backgroundColor: "#2153E2",
                        borderRadius: "50%",
                      }}
                    />
                    <p style={{ width: 10, height: 10 }}>Kas</p>
                  </div>
                  <div
                    className="d-flex justify-content-start gap-3"
                    style={{ alignItems: "center", alignContent: "center" }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        backgroundColor: "#32CD32",
                        borderRadius: "50%",
                      }}
                    />
                    <p style={{ width: 10, height: 10 }}>Penerimaan</p>
                  </div>
                  <div
                    className="d-flex justify-content-start gap-3"
                    style={{ alignItems: "center", alignContent: "center" }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        backgroundColor: "#FF7675",
                        borderRadius: "50%",
                      }}
                    />
                    <p style={{ width: 10, height: 10 }}>Pengeluran</p>
                  </div>
                </div>
              }
              bodyStyle={{ height: "300px" }}
            >
              <PieChartDashboard dataPie={[total[3]]} />
            </Card>
          </Col>
        </Row>
      </Container>
    </Content>
  );
}

export default HomeDashboard;

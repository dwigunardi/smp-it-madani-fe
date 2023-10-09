import React, { useState } from "react";
import { Button, Card, Layout } from "antd";
import { Container } from "react-bootstrap";
function CardDashboard(props) {
  const {
    titleCard,
    children,
    actionModal = () => {},
    mode,
    extraButton,
    extraTittle,
    isiExtra,
  } = props;
  // hover button
  const [onHover, setHover] = useState(false);

  const { Content } = Layout;

  return (
    <Content className="mt-5 px-4">
      <Container fluid>
        <Card
          title={
            <div className="mt-2 py-3">
              <h3
                style={{
                  color: "#0F123F",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                }}
              >
                {mode == "belanja" ? "Pengeluaran" : titleCard}
              </h3>{" "}
              <p
                style={{
                  marginTop: "-10px",
                  color: "#BABEC6",
                }}
              >
                SMP IT Madani
              </p>
            </div>
          }
          extra={
            extraButton ? (
              <Button
                style={{
                  border: onHover ? null : "2px solid #0F123F",
                  color: onHover ? null : "#0F123F",
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={(e) =>
                  mode == "berita"
                    ? actionModal()
                    : mode == "data_siswa"
                    ? actionModal()
                    : mode == "tagihan"
                    ? actionModal()
                    : mode == "belanja"
                    ? actionModal()
                    : mode == "penerimaan"
                    ? actionModal()
                    : mode == "detailRekapitulasi"
                    ? actionModal()
                    : console.log("bukan berita cuy")
                }
              >
                <p>
                  {mode == "berita"
                    ? "Tambah Berita"
                    : mode == "data_siswa"
                    ? "Tambah Siswa"
                    : mode == "belanja"
                    ? "Tambah Pengeluaran"
                    : mode == "penerimaan"
                    ? "Tambah Penerimaan"
                    : mode == "tagihan"
                    ? "Tambah Tagihan"
                    : mode == "detailRekapitulasi"
                    ? "Kembali | <-"
                    : titleCard}
                </p>
              </Button>
            ) : extraTittle ? (
              isiExtra
            ) : null
          }
          bodyStyle={{
            minHeight: mode == "tambah_siswa" ? "auto" : "300px",
            maxHeight: "auto",
            overflowY: "auto",
          }}
        >
          {children}
        </Card>
      </Container>
    </Content>
  );
}

export default CardDashboard;

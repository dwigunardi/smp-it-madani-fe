import React, { Suspense, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { ColorPallete } from "../../utils/colorPalette";
import { useBeritaStore } from "../../store/beritaStore";
import { useNavigate, useParams } from "react-router-dom";
import { Image } from "antd";
import ReactHtmlParser from "react-html-parser";
import SkeletonLoader from "../../components/reusable/skeletonLoader";
function LandingDetailBerita() {
  const { dataBeritaDetail, pager, fetchBySlug, hasErrors } = useBeritaStore(
    (state) => state
  );
  const Navigate = useNavigate();
  const { beritaId } = useParams();
  useEffect(() => {
    let sub = true;
    fetchBySlug(beritaId);
    return () => {
      sub = false;
    };
  }, []);
  
  let date = new Date(dataBeritaDetail.updated_at);
  let createdAt = date.toLocaleString("default", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <Container fluid className="pt-5">
      <Row>
        <Col sm={12}>
          <Card>
            <div className="d-flex gap-5">
              <BsArrowLeftCircleFill
                size={30}
                color={ColorPallete.primary}
                style={{ cursor: "pointer" }}
                onClick={() => Navigate(-1)}
              />
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  fontFamily: "poppins",
                }}
                className="w-100"
              >
                {dataBeritaDetail.title}
              </p>
              <div className="flex-shrink-1">
                <Image
                  src="/logo.png"
                  preview={false}
                  width={"50%"}
                  height={"auto"}
                />
              </div>
            </div>
            <div style={{ paddingLeft: "80px" }}>
              <p>Di Buat : {createdAt}</p>
              <h5>Author : {dataBeritaDetail.author}</h5>
            </div>
            <Card.Body style={{ paddingLeft: "80px" }}>
              <Card.Title>
                <Image
                  src={dataBeritaDetail.image}
                  width={"30%"}
                  height={"auto"}
                  className="mx-auto"
                />
              </Card.Title>
              <Suspense fallback={<SkeletonLoader />}>
                <div className="pt-3">
                  {ReactHtmlParser(dataBeritaDetail.body)}
                </div>
              </Suspense>
              <Button variant="primary" onClick={() => Navigate(-1)}>
                Kembali
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LandingDetailBerita;

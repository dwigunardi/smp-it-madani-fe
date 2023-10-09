import { Col, Image, Row, Typography } from "antd";
import React from "react";
import { Container } from "react-bootstrap";
import { ColorPallete } from "../../../utils/colorPalette";
import { HiOutlinePhone } from "react-icons/hi";
import {
  useLaptopQuery,
  useSmallMobileQuery,
  useTabletQuery,
} from "../../../hooks/useMediaQuery";
function KontakKami() {
  //responsive
  const isSmallMobile = useSmallMobileQuery();
  const isLaptop = useLaptopQuery();
  const isTablet = useTabletQuery();

  return (
    <Container>
      <Typography.Title className="text-center">Kontak Kami</Typography.Title>
      {isLaptop ? (
        <Row justify={"space-evenly"} align={"top"}>
          <Col
            lg={{
              span: 10,
              offset: 2,
            }}
          >
            <Typography.Paragraph
              style={{ fontWeight: 600, fontSize: 20 }}
              className="text-left"
            >
              Lokasi Instansi
            </Typography.Paragraph>
            <div
              style={{
                backgroundColor: ColorPallete.secondary,
                width: "100%",
                height: "401px",
                borderRadius: "10% 5% 5% 30%",
                padding: "10%",
                position: "relative",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.366970004769!2d106.938841163518!3d-6.965963400985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6847dcc1c9a131%3A0x5e98f5235e148363!2sSMP%2FSMK%20IT%20MADANI!5e0!3m2!1sid!2sid!4v1680717784551!5m2!1sid!2sid"
                width="85%"
                height="85%"
                style={{
                  position: "absolute",
                  top: "7%",
                  left: "7%",
                  border: 0,
                  borderRadius: "10% 5% 5% 30%",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Col>
          <Col
            lg={{
              span: 10,
              offset: 2,
            }}
          >
            <Typography.Paragraph
              style={{ fontWeight: 600, fontSize: 20 }}
              className="text-left"
            >
              Narahubung Instansi
            </Typography.Paragraph>
            <div
              style={{
                backgroundColor: ColorPallete.primary,
                width: "80%",
                height: "401px",
                borderRadius: "3% 50% 5% 5%",
                padding: "0 1% 1% 0",
                position: "relative",
                background: "linear-gradient(180deg, #2E5894 0%, #2470A3 100%)",
                boxShadow: `5px 10px 4px  ${ColorPallete.secondary}`,
              }}
            >
              <Row
                justify={"center"}
                gutter={32}
                align={"middle"}
                style={{
                  borderBottom: `7px solid white`,
                  height: "34%",
                }}
              >
                <Col
                  lg={{
                    span: 5,
                  }}
                >
                  <Image
                    src="/section-kontak/telpon.svg"
                    width={"100%"}
                    height={"auto"}
                    preview={false}
                    style={{ marginLeft: "30%" }}
                  />
                </Col>
                <Col
                  lg={{
                    span: 16,
                    offset: 1,
                  }}
                >
                  <Typography.Paragraph
                    className="text-light text-start mt-3   "
                    strong
                    style={{ fontSize: 20 }}
                  >
                    0858-4625-3419
                  </Typography.Paragraph>
                </Col>
              </Row>
              <Row
                justify={"center"}
                gutter={32}
                align={"middle"}
                style={{
                  borderBottom: `7px solid white`,
                  height: "34%",
                }}
              >
                <Col
                  lg={{
                    span: 5,
                  }}
                >
                  <Image
                    src="/section-kontak/mail.svg"
                    width={"100%"}
                    height={"auto"}
                    preview={false}
                    style={{ marginLeft: "30%" }}
                  />
                </Col>
                <Col
                  lg={{
                    span: 16,
                    offset: 1,
                  }}
                >
                  <Typography.Paragraph
                    className="text-light text-start mt-3   "
                    strong
                    style={{ fontSize: 20 }}
                  >
                   smpmadani25@gmail.com
                  </Typography.Paragraph>
                </Col>
              </Row>
              <Row
                justify={"center"}
                gutter={32}
                align={"middle"}
                style={{
                  height: "34%",
                }}
              >
                <Col lg={{ span: 5 }}>
                  <Image
                    src="/section-kontak/place.svg"
                    width={"100%"}
                    height={"auto"}
                    preview={false}
                    style={{ marginLeft: "30%" }}
                  />
                </Col>
                <Col
                  lg={{
                    span: 16,
                    offset: 1,
                  }}
                >
                  <Typography.Paragraph
                    className="text-light text-start mt-3   "
                    strong
                    style={{ fontSize: 20 }}
                  >
                    Baros, Kec. Baros, Kota Sukabumi, Jawa Barat 43161
                  </Typography.Paragraph>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      ) : isTablet ? (
        <Row justify={"center"} align={"top"}>
          <Col span={22}>
            <Typography.Paragraph
              style={{ fontWeight: 600, fontSize: 20 }}
              className="text-left"
            >
              Lokasi Instansi
            </Typography.Paragraph>
            <div
              style={{
                backgroundColor: ColorPallete.secondary,
                width: "100%",
                height: "401px",
                borderRadius: "10% 5% 5% 30%",
                padding: "10%",
                position: "relative",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.366970004769!2d106.938841163518!3d-6.965963400985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6847dcc1c9a131%3A0x5e98f5235e148363!2sSMP%2FSMK%20IT%20MADANI!5e0!3m2!1sid!2sid!4v1680717784551!5m2!1sid!2sid"
                width="85%"
                height="85%"
                style={{
                  position: "absolute",
                  top: "7%",
                  left: "7%",
                  border: 0,
                  borderRadius: "10% 5% 5% 30%",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <Typography.Paragraph
              style={{ fontWeight: 600, fontSize: 20, marginTop: 20 }}
              className="text-left"
            >
              Narahubung Instansi
            </Typography.Paragraph>
            <div
              style={{
                backgroundColor: ColorPallete.primary,
                width: "100%",
                height: "401px",
                borderRadius: "30% 3% 20% 3%",
                padding: "0 1% 1% 0",
                position: "relative",
                background: "linear-gradient(180deg, #2E5894 0%, #2470A3 100%)",
                boxShadow: `5px 10px 4px  ${ColorPallete.secondary}`,
              }}
            >
              <Row
                justify={"center"}
                gutter={32}
                align={"middle"}
                style={{
                  borderBottom: `7px solid white`,
                  height: "34%",
                }}
              >
                <Col
                  lg={{
                    span: 5,
                  }}
                >
                  <Image
                    src="/section-kontak/telpon.svg"
                    width={"100%"}
                    height={"auto"}
                    preview={false}
                    style={{ marginLeft: "30%" }}
                  />
                </Col>
                <Col
                  lg={{
                    span: 16,
                    offset: 1,
                  }}
                >
                  <Typography.Paragraph
                    className="text-light text-start mt-3   "
                    strong
                    style={{ fontSize: 20 }}
                  >
                    0858-4625-3419
                  </Typography.Paragraph>
                </Col>
              </Row>
              <Row
                justify={"center"}
                gutter={32}
                align={"middle"}
                style={{
                  borderBottom: `7px solid white`,
                  height: "34%",
                }}
              >
                <Col
                  lg={{
                    span: 5,
                  }}
                >
                  <Image
                    src="/section-kontak/mail.svg"
                    width={"100%"}
                    height={"auto"}
                    preview={false}
                    style={{ marginLeft: "30%" }}
                  />
                </Col>
                <Col
                  lg={{
                    span: 16,
                    offset: 1,
                  }}
                >
                  <Typography.Paragraph
                    className="text-light text-start mt-3   "
                    strong
                    style={{ fontSize: 20 }}
                  >
                   smpmadani25@gmail.com
                  </Typography.Paragraph>
                </Col>
              </Row>
              <Row
                justify={"center"}
                gutter={32}
                align={"middle"}
                style={{
                  height: "34%",
                }}
              >
                <Col lg={{ span: 5 }}>
                  <Image
                    src="/section-kontak/place.svg"
                    width={"100%"}
                    height={"auto"}
                    preview={false}
                    style={{ marginLeft: "30%" }}
                  />
                </Col>
                <Col
                  lg={{
                    span: 16,
                    offset: 1,
                  }}
                >
                  <Typography.Paragraph
                    className="text-light text-start mt-3   "
                    strong
                    style={{ fontSize: 20 }}
                  >
                    Baros, Kec. Baros, Kota Sukabumi, Jawa Barat 43161
                  </Typography.Paragraph>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      ) : isSmallMobile ? (
        <Row justify={"center"} align={"top"}>
          <Col span={22}>
            <Typography.Paragraph
              style={{ fontWeight: 600, fontSize: 20 }}
              className="text-left"
            >
              Lokasi Instansi
            </Typography.Paragraph>
            <div
              style={{
                backgroundColor: ColorPallete.secondary,
                width: "100%",
                height: "301px",
                borderRadius: "10% 5% 5% 30%",
                padding: "10%",
                position: "relative",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.366970004769!2d106.938841163518!3d-6.965963400985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6847dcc1c9a131%3A0x5e98f5235e148363!2sSMP%2FSMK%20IT%20MADANI!5e0!3m2!1sid!2sid!4v1680717784551!5m2!1sid!2sid"
                width="85%"
                height="85%"
                style={{
                  position: "absolute",
                  top: "7%",
                  left: "7%",
                  border: 0,
                  borderRadius: "10% 5% 5% 30%",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <Typography.Paragraph
              style={{ fontWeight: 600, fontSize: 20, marginTop: 20 }}
              className="text-left"
            >
              Narahubung Instansi
            </Typography.Paragraph>
            <div
              style={{
                backgroundColor: ColorPallete.primary,
                width: "100%",
                height: "301px",
                borderRadius: "30% 3% 20% 3%",
                padding: "0 1% 1% 0",
                position: "relative",
                background: "linear-gradient(180deg, #2E5894 0%, #2470A3 100%)",
                boxShadow: `5px 10px 4px  ${ColorPallete.secondary}`,
              }}
            >
              <Row
                justify={"center"}
                gutter={32}
                align={"middle"}
                style={{
                  borderBottom: `7px solid white`,
                  height: "34%",
                }}
              >
                <Col
                  lg={{
                    span: 5,
                  }}
                >
                  <Image
                    src="/section-kontak/telpon.svg"
                    width={"100%"}
                    height={"auto"}
                    preview={false}
                    style={{ marginLeft: "30%" }}
                  />
                </Col>
                <Col
                  lg={{
                    span: 16,
                    offset: 1,
                  }}
                >
                  <Typography.Paragraph
                    className="text-light text-start mt-3   "
                    strong
                    style={{ fontSize: 16 }}
                  >
                    0858-4625-3419
                  </Typography.Paragraph>
                </Col>
              </Row>
              <Row
                justify={"center"}
                gutter={32}
                align={"middle"}
                style={{
                  borderBottom: `7px solid white`,
                  height: "34%",
                }}
              >
                <Col
                  lg={{
                    span: 5,
                  }}
                >
                  <Image
                    src="/section-kontak/mail.svg"
                    width={"100%"}
                    height={"auto"}
                    preview={false}
                    style={{ marginLeft: "30%" }}
                  />
                </Col>
                <Col
                  lg={{
                    span: 16,
                    offset: 1,
                  }}
                >
                  <Typography.Paragraph
                    className="text-light text-start mt-3"
                    strong
                    style={{ fontSize: 16 }}
                  >
                   smpmadani25@gmail.com
                  </Typography.Paragraph>
                </Col>
              </Row>
              <Row
                justify={"center"}
                gutter={32}
                align={"middle"}
                style={{
                  height: "34%",
                }}
              >
                <Col span={5}>
                  <Image
                    src="/section-kontak/place.svg"
                    width={"100%"}
                    height={"auto"}
                    preview={false}
                    style={{ marginLeft: "30%" }}
                  />
                </Col>
                <Col
                  span={16}
                >
                  <Typography.Paragraph
                    className="text-light text-start mt-3   "
                    strong
                    style={{ fontSize: 16 }}
                  >
                    Baros, Kec. Baros, Kota Sukabumi, Jawa Barat 43161
                  </Typography.Paragraph>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      ) : null}
    </Container>
  );
}

export default KontakKami;

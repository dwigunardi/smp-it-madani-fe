import React from "react";
import "../../../pages/landing/style/borderStyle.css";
import { Container } from "react-bootstrap";
import { Col, Row, Typography } from "antd";
import {
  useLaptopQuery,
  useSmallMobileQuery,
  useTabletQuery,
} from "../../../hooks/useMediaQuery";
import { Pagination, Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
function VisiMisi() {
  //responsive
  const isSmallMobile = useSmallMobileQuery();
  const isLaptop = useLaptopQuery();
  const isTablet = useTabletQuery();
  const cardMisi = [
    {
      id: 1,
      deskripsi:
        "Meningkatkan mutu pembelajaran yang mencakup IPTEK dengan menjungjung tinggi budaya bangsa",
    },
    {
      id: 2,
      deskripsi:
        "Menghasilkan tamatan yang cerdas,terampil,kompetitif dan mandiri",
    },
    {
      id: 3,
      deskripsi: "Menanamkan jiwa kewirausahaan (enterpreneurship)",
    },
    {
      id: 4,
      deskripsi:
        "Menghasilkan hubungan yang harmonis dan saling menguntungkan antara sekolah dunia industri dan dunia usaha.",
    },
  ];
  return (
    <div
      style={{
        background: "linear-gradient(90deg, #2E5894 4.61%, #2470A3 100%)",
        width: "100%",
        height: "100%",
        borderTopLeftRadius: "15%",
        borderBottomRightRadius: "15%",
        position: "relative",
        zIndex: "-1",
      }}
    >
      <Container style={{ zIndex: 2 }}>
        {isLaptop ? (
          <Row justify={"center"} className="p-5">
            <Col>
              {" "}
              <Typography.Title className="text-center text-light">
                VISI
              </Typography.Title>
              <Typography.Paragraph
                className="text-center text-light"
                style={{
                  fontWeight: "500",
                  fontSize: "26px",
                  lineHeight: "30px",
                }}
              >
                Berprestasi Unggul Berperilaku Akhlakul Karimah
              </Typography.Paragraph>
              <Typography.Title className="text-center text-light">
                MISI
              </Typography.Title>
              <Row justify={"space-between"} align={"middle"}>
                {cardMisi.map((item, idx) => {
                  return (
                    <Col key={idx} span={5}>
                      <div className="gradient-border-mask bodyHeight">
                        <div
                          className="h-100 w-100"
                          style={{
                            display: "flex",
                            alignContent: "center",
                            alignItems: "center",
                            justifyItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography.Paragraph
                            className="text-justify text-light text-elipsis"
                            style={{
                              fontWeight: "500",
                              fontSize: "22px",
                              lineHeight: "30px",
                            }}
                          >
                            {item.deskripsi}
                          </Typography.Paragraph>
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        ) : isTablet ? (
          <Row justify={"center"} className="p-5">
            <Col>
              {" "}
              <Typography.Title className="text-center text-light">
                VISI
              </Typography.Title>
              <Typography.Paragraph
                className="text-center  text-light"
                style={{
                  fontWeight: "500",
                  fontSize: "24px",
                  lineHeight: "30px",
                }}
              >
                Berprestasi Unggul Berperilaku Akhlakul Karimah
              </Typography.Paragraph>
              <Typography.Title className="text-center text-light">
                MISI
              </Typography.Title>
              <Swiper
                slidesPerView={2}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                // navigation={true}
                loop={true}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
              >
                {cardMisi.map((item, idx) => {
                  return (
                    <SwiperSlide key={idx}>
                      <Row justify={"space-between"} align={"middle"}>
                        <Col key={idx} span={24}>
                          <div className="gradient-border-mask bodyHeight">
                            <div
                              className="h-100 w-100"
                              style={{
                                display: "flex",
                                alignContent: "center",
                                alignItems: "center",
                                justifyItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Typography.Paragraph
                                className="text-center text-light"
                                style={{
                                  fontWeight: "500",
                                  fontSize: "20px",
                                  lineHeight: "30px",
                                }}
                              >
                                {item.deskripsi}
                              </Typography.Paragraph>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Col>
          </Row>
        ) : isSmallMobile ? (
          <Row justify={"center"} className="p-5">
            <Col>
              {" "}
              <Typography.Title className="text-center text-light">
                VISI
              </Typography.Title>
              <Typography.Paragraph
                className="text-center text-light"
                style={{
                  fontWeight: "500",
                  fontSize: "32px",
                  lineHeight: "40px",
                }}
              >
                Berprestasi Unggul Berperilaku Akhlakul Karimah
              </Typography.Paragraph>
              <Typography.Title className="text-center text-light">
                MISI
              </Typography.Title>
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                // navigation={true}
                loop={true}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
              >
                {cardMisi.map((item, idx) => {
                  return (
                    <SwiperSlide key={idx}>
                      <Row justify={"space-between"} align={"middle"}>
                        <Col key={idx} span={24}>
                          <div className="gradient-border-mask bodyHeight">
                            <div
                              className="h-100 w-100"
                              style={{
                                display: "flex",
                                alignContent: "center",
                                alignItems: "center",
                                justifyItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Typography.Paragraph
                                className="text-center text-light"
                                style={{
                                  fontWeight: "500",
                                  fontSize: "20px",
                                  lineHeight: "30px",
                                }}
                              >
                                {item.deskripsi}
                              </Typography.Paragraph>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Col>
          </Row>
        ) : null}
      </Container>
      <div
        style={{
          backgroundImage: "url(/section-visi-misi/circuit-img.svg)",
          width: "100%",
          height: "100%",
          backgroundRepeat: "repeat-x",
          objectFit: "cover",
          backgroundSize: "cover",
          zIndex: "-1",
          position: "absolute",
          borderTopLeftRadius: "15%",
          borderBottomRightRadius: "15%",
          top: 0,
        }}
      ></div>
    </div>
  );
}

export default VisiMisi;

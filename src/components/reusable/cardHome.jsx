import { Col, Image, Row, Typography } from "antd";
import React from "react";
import { Carousel, Container } from "react-bootstrap";
import { FaChalkboardTeacher, FaBookOpen } from "react-icons/fa";
import { BsBuilding } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import CenterItems from "./centerItem";
import { CardPallette } from "../../utils/colorPalette";
import {
  useDekstopQuery,
  useLaptopQuery,
  useLargeDekstopQuery,
  useMobileQuery,
  useSmallMobileQuery,
  useTabletQuery,
} from "../../hooks/useMediaQuery";
import { Pagination, Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";


function CardHome() {
  //responsive
  const isSmallMobile = useSmallMobileQuery();
  const isMobile = useMobileQuery();
  const isLargeDekstop = useLargeDekstopQuery();
  const isDekstop = useDekstopQuery();
  const isLaptop = useLaptopQuery();
  const isTablet = useTabletQuery();

  const items = [
    {
      id: 1,
      icon: <FaChalkboardTeacher className="mx-auto w-100 h-50" />,
      backGround: "/card-home/bg-1.svg",
      backGroundColor: CardPallette.purple,
      tittle: "Pengajar Kompeten",
      deskripsi: "Guru yang berpengalaman dan ahli di bidangnya",
    },
    {
      id: 1,
      icon: <BsBuilding className="mx-auto w-100 h-50" />,
      backGround: "/card-home/bg-1.svg",
      backGroundColor: CardPallette.skyBlue,
      tittle: "Kerjasama",
      deskripsi:
        "Memberi kesempatan untuk belajar dan berkembang secara optimal",
    },
    {
      id: 1,
      icon: <HiUserGroup className="mx-auto w-100 h-50" />,
      backGround: "/card-home/bg-1.svg",
      backGroundColor: CardPallette.yellow,
      tittle: "Lingkungan",
      deskripsi: "Lingkungan sekolah yang memberikan rasa aman dan nyaman",
    },
    {
      id: 1,
      icon: <FaBookOpen className="mx-auto w-100 h-50" />,
      backGround: "/card-home/bg-1.svg",
      backGroundColor: CardPallette.red,
      tittle: "Budaya",
      deskripsi: "Budaya Islami yang mengedepankan akhlakul karimah",
    },
  ];

  return (
    <Container>
      {isLargeDekstop ? (
        <div>
          <Row className="w-100" justify={"space-around"}>
            {items.map((data, idx) => {
              return (
                <Col span={3} key={idx}>
                  <div
                    className="position-relative"
                    style={{
                      //   backgroundImage: `url(${data.backGround})`,
                      backgroundColor: data.backGroundColor,
                      borderRadius: "10%",
                      width: "100%",
                      height: "100%",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "contain",
                    }}
                  >
                    <CenterItems className="w-100 h-100">
                      {data.icon}
                    </CenterItems>
                  </div>
                </Col>
              );
            })}
          </Row>
          <br />
          <Row justify={"space-around"}>
            {items.map((data, idx) => {
              return (
                <Col key={idx} span={5}>
                  <Typography.Title level={4} className="text-center">
                    {data.tittle}
                  </Typography.Title>
                  <Typography.Paragraph
                    className="text-center"
                    style={{ fontWeight: 600, fontSize: 16 }}
                  >
                    {data.deskripsi}
                  </Typography.Paragraph>
                </Col>
              );
            })}
          </Row>{" "}
        </div>
      ) : isDekstop ? (
        <div>
          <Row className="w-100" justify={"space-around"}>
            {items.map((data, idx) => {
              return (
                <Col span={3} key={idx}>
                  <div
                    className="position-relative"
                    style={{
                      //   backgroundImage: `url(${data.backGround})`,
                      backgroundColor: data.backGroundColor,
                      borderRadius: "10%",
                      width: "100%",
                      height: "100%",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "contain",
                    }}
                  >
                    <CenterItems className="w-100 h-100">
                      {data.icon}
                    </CenterItems>
                  </div>
                </Col>
              );
            })}
          </Row>
          <br />
          <Row justify={"space-around"}>
            {items.map((data, idx) => {
              return (
                <Col key={idx} span={5}>
                  <Typography.Title level={4} className="text-center">
                    {data.tittle}
                  </Typography.Title>
                  <Typography.Paragraph
                    className="text-center"
                    style={{ fontWeight: 600, fontSize: 16 }}
                  >
                    {data.deskripsi}
                  </Typography.Paragraph>
                </Col>
              );
            })}
          </Row>{" "}
        </div>
      ) : isLaptop ? (
        <div>
          <Row className="w-100" justify={"space-around"}>
            {items.map((data, idx) => {
              return (
                <Col span={3} key={idx}>
                  <div
                    className="position-relative"
                    style={{
                      //   backgroundImage: `url(${data.backGround})`,
                      backgroundColor: data.backGroundColor,
                      borderRadius: "10%",
                      width: "100%",
                      height: "100%",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "contain",
                    }}
                  >
                    <CenterItems className="w-100 h-100">
                      {data.icon}
                    </CenterItems>
                  </div>
                </Col>
              );
            })}
          </Row>
          <br />
          <Row justify={"space-around"}>
            {items.map((data, idx) => {
              return (
                <Col key={idx} span={5}>
                  <Typography.Title level={4} className="text-center">
                    {data.tittle}
                  </Typography.Title>
                  <Typography.Paragraph
                    className="text-center"
                    style={{ fontWeight: 600, fontSize: 16 }}
                  >
                    {data.deskripsi}
                  </Typography.Paragraph>
                </Col>
              );
            })}
          </Row>{" "}
        </div>
      ) : isTablet ? (
        <Swiper
          slidesPerView={2}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          loop={true}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          grabCursor={true}
        >
          {items.map((data, idx) => {
            return (
              <SwiperSlide key={idx}>
                <Row justify={"center"} align={"middle"}>
                  <Col span={22}>
                    <div
                      className=""
                      style={{
                        //   backgroundImage: `url(${data.backGround})`,
                        backgroundColor: data.backGroundColor,
                        borderRadius: "10%",
                        width: "100%",
                        height: "300px",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                        padding: "20px",
                        marginBottom: "20px",
                      }}
                    >
                      <CenterItems className="w-100 h-100">
                        {data.icon}
                      </CenterItems>
                    </div>
                    <Typography.Title level={4} className="text-center">
                      {data.tittle}
                    </Typography.Title>
                    <Typography.Paragraph
                      className="text-center"
                      style={{ fontWeight: 600, fontSize: 16 }}
                    >
                      {data.deskripsi}
                    </Typography.Paragraph>
                  </Col>
                </Row>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : isSmallMobile ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          loop={true}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {items.map((data, idx) => {
            return (
              <SwiperSlide key={idx}>
                <Row justify={"center"} align={"middle"}>
                  <Col span={22}>
                    <div
                      className="position-relative"
                      style={{
                        //   backgroundImage: `url(${data.backGround})`,
                        backgroundColor: data.backGroundColor,
                        borderRadius: "10%",
                        width: "100%",
                        height: "300px",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                        padding: "20px",
                        marginBottom: "20px",
                      }}
                    >
                      <CenterItems className="w-100 h-100">
                        {data.icon}
                      </CenterItems>
                    </div>
                    <Typography.Title level={2} className="text-center">
                      {data.tittle}
                    </Typography.Title>
                    <Typography.Paragraph
                      className="text-center"
                      style={{ fontWeight: 600, fontSize: 20 }}
                    >
                      {data.deskripsi}
                    </Typography.Paragraph>
                  </Col>
                </Row>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : null}
    </Container>
  );
}

export default CardHome;

import {
  Button,
  Col,
  Drawer,
  Empty,
  Image,
  Modal,
  Row,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { Carousel, Container } from "react-bootstrap";
import { ColorPallete } from "../../../utils/colorPalette";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";
import {
  useLaptopQuery,
  useSmallMobileQuery,
  useTabletQuery,
} from "../../../hooks/useMediaQuery";
import { Fade, Slide } from "react-awesome-reveal";
import { Link, useNavigate } from "react-router-dom";

function Berita(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dataBerita } = props;
  const navigate = useNavigate();
  //responsive
  const isSmallMobile = useSmallMobileQuery();
  const isLaptop = useLaptopQuery();
  const isTablet = useTabletQuery();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const containerStyle = {
    position: "relative",
    height: "auto",
    overflow: "auto",
    // textAlign: 'center',
    // padding: isLaptop ? 20 : null,
    background: "transparent",
  };

  return (
    <Container className="my-3">
      <Typography.Title className="text-center">
        Berita dan Informasi
      </Typography.Title>
      {dataBerita.length == 0 ? (
        <Empty />
      ) : isLaptop ? (
        <div style={containerStyle}>
          <Modal
            title={"List Berita & Informasi"}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width="90%"
            bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
            style={{ overflow: "auto" }}
            footer={[
              <Button key="back" type="primary" onClick={handleCancel}>
                Tutup
              </Button>,
            ]}
          >
            <Container>
              <Row justify={"space-around"} align={"middle"} className="gap-4">
                {dataBerita.map((items, idx) => {
                  return (
                    <Col span={7} key={idx}>
                      <Slide
                        direction="up"
                        cascade
                        delay={500}
                        damping={0.7}
                        triggerOnce
                      >
                        <Link to={`/home/berita/${items.slug}`}>
                          <Image
                            className=""
                            src={items.image}
                            alt="First slide"
                            width={"100%"}
                            height={"auto"}
                            preview={false}
                          />
                          <Carousel.Caption className="text-light">
                            <h3>{items.title}</h3>
                            <p>{items.isi}</p>
                          </Carousel.Caption>
                        </Link>
                      </Slide>
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </Modal>
          <Swiper
            spaceBetween={30}
            slidesPerView={3}
            pagination={{
              clickable: true,
            }}
            loop={true}
            navigation={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper my-2"
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
          >
            {dataBerita.map((items, idx) => {
              return (
                <SwiperSlide key={idx} style={{ cursor: "pointer" }}>
                  <div className="w-100 position-relative">
                    <Link to={`/home/berita/${items.slug}`}>
                      <Image
                        className="rounded-3"
                        src={items.image}
                        alt="First slide"
                        width={"100%"}
                        height={"auto"}
                        preview={false}
                      />
                      <div
                        className="w-100 h-100 position-absolute rounded-3"
                        style={{
                          backgroundColor: "rgba(0,0,0,0.5)",
                          top: 0,
                          left: 0,
                        }}
                      ></div>
                      <Carousel.Caption>
                        <h3 className="text-light">{items.title}</h3>
                      </Carousel.Caption>
                    </Link>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : isTablet ? (
        <div>
          <Modal
            title={"List Berita & Informasi"}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width="95%"
            bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
            style={{ overflow: "auto" }}
            footer={[
              <Button key="back" type="primary" onClick={handleCancel}>
                Tutup
              </Button>,
            ]}
          >
            <Container>
              <Row justify={"space-around"} align={"middle"} className="gap-4">
                {dataBerita.map((items, idx) => {
                  return (
                    <Col span={11} key={idx}>
                      <Slide
                        direction="up"
                        delay={500}
                        cascade
                        damping={0.7}
                        triggerOnce
                      >
                        <Image
                          className=""
                          src={items.image}
                          alt="First slide"
                          width={"100%"}
                          height={"auto"}
                          preview={false}
                        />
                        <Carousel.Caption className="text-light">
                          <h3>{items.title}</h3>
                          <p>{items.isi}</p>
                        </Carousel.Caption>
                      </Slide>
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </Modal>
          <Swiper
            spaceBetween={30}
            slidesPerView={2}
            pagination={{
              clickable: true,
            }}
            loop={true}
            navigation={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper my-2"
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
          >
            {dataBerita.map((items, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <Image
                    className=""
                    src={items.image}
                    alt="First slide"
                    width={"100%"}
                    height={"auto"}
                    preview={false}
                  />
                  <Carousel.Caption className="">
                    <h3>{items.title}</h3>
                    <p>{items.isi}</p>
                  </Carousel.Caption>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : isSmallMobile ? (
        <div style={containerStyle}>
          <Modal
            title={"List Berita & Informasi"}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width="100vw"
            bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
            style={{ overflow: "auto" }}
            footer={[
              <div className="d-flex justify-content-center">
                <Button key="back" type="primary" onClick={handleCancel}>
                  Tutup
                </Button>
              </div>,
            ]}
          >
            <Container>
              <Row justify={"space-around"} align={"middle"} className="gap-4">
                {dataBerita.map((items, idx) => {
                  return (
                    <Col key={idx} span={22}>
                      <Slide
                        direction="left"
                        delay={500}
                        cascade
                        damping={0.7}
                        triggerOnce
                      >
                        <Image
                          className=""
                          src={items.image}
                          alt="First slide"
                          width={"100%"}
                          height={"auto"}
                          preview={false}
                        />
                        <Carousel.Caption className="">
                          <h3>{items.title}</h3>
                          <p>{items.isi}</p>
                        </Carousel.Caption>
                      </Slide>
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </Modal>
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            loop={true}
            navigation={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper my-2"
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
          >
            {dataBerita.map((items, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <Image
                    className=""
                    src={items.image}
                    alt="First slide"
                    width={"100%"}
                    height={"auto"}
                    preview={false}
                  />
                  <Carousel.Caption className="">
                    <h3>{items.title}</h3>
                    <p>{items.isi}</p>
                  </Carousel.Caption>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : null}
      {dataBerita.length == 0 ? (
        <div className="py-3"></div>
      ) : isTablet ? (
        <div
          className="d-flex justify-content-end mt-5"
          style={{
            width: "87%",
          }}
        >
          <Button
            type="primary"
            size="large"
            style={{
              backgroundColor: ColorPallete.primary,
            }}
            onClick={() => navigate("/home/berita")}
          >
            Lihat semua <MdKeyboardDoubleArrowRight size={"25px"} />
          </Button>
        </div>
      ) : isSmallMobile ? (
        <div
          className="d-flex justify-content-center mt-5"
          style={{
            width: "100%",
          }}
        >
          <Button
            type="primary"
            size="large"
            style={{
              backgroundColor: ColorPallete.primary,
            }}
            onClick={() => navigate("/home/berita")}
          >
            Lihat semua <MdKeyboardDoubleArrowRight size={"25px"} />
          </Button>
        </div>
      ) : (
        <div
          className="d-flex justify-content-end mt-5"
          style={{
            width: "87%",
          }}
        >
          <Button
            type="primary"
            size="large"
            style={{
              backgroundColor: ColorPallete.primary,
            }}
            onClick={() => navigate("/home/berita")}
          >
            Lihat semua <MdKeyboardDoubleArrowRight size={"25px"} />
          </Button>
        </div>
      )}
    </Container>
  );
}

export default Berita;

import { Col, Image, Row, Typography } from "antd";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import {
  useLaptopQuery,
  useSmallMobileQuery,
  useTabletQuery,
} from "../../../hooks/useMediaQuery";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Pagination, Thumbs } from "swiper";
function Galeri() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  //responsive
  const isSmallMobile = useSmallMobileQuery();
  const isLaptop = useLaptopQuery();
  const isTablet = useTabletQuery();

  const imgGallery = [
    {
      id: 1,
      img: "/section-galeri/1.jpeg",
    },
    {
      id: 2,
      img: "/section-galeri/2.webp",
    },
    {
      id: 3,
      img: "/section-galeri/3.webp",
    },
    {
      id: 4,
      img: "/section-galeri/4.webp",
    },
    {
      id: 5,
      img: "/section-galeri/5.webp",
    },
    {
      id: 6,
      img: "/section-galeri/6.webp",
    },
  ];
  return (
    <Container className="my-5">
      <Typography.Title className="text-center">Galery</Typography.Title>
      {isLaptop ? (
        <div>
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              reverseDirection: true,
            }}
            className="mySwiper2 my-2"
          >
            {imgGallery.map((item, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <Image
                    src={item.img}
                    width={"100%"}
                    height={"500px"}
                    style={{
                      backgroundSize: "contain",
                      objectFit: "cover",
                      aspectRatio: "16/9",
                    }}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={6}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {imgGallery.map((item, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <Image
                    src={item.img}
                    width={"100%"}
                    height={"auto"}
                    preview={false}
                    style={{
                      backgroundSize: "contain",
                      objectFit: "cover",
                      aspectRatio: "16/9",
                    }}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : isTablet ? (
        <div>
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              reverseDirection: true,
            }}
            className="mySwiper2 my-2"
          >
            {imgGallery.map((item, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <Image
                    src={item.img}
                    width={"100%"}
                    height={"400px"}
                    style={{
                      backgroundSize: "contain",
                      objectFit: "cover",
                      aspectRatio: "16/9",
                    }}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={6}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {imgGallery.map((item, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <Image
                    src={item.img}
                    width={"100%"}
                    height={"auto"}
                    preview={false}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : isSmallMobile ? (
        <div>
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              reverseDirection: true,
            }}
            className="mySwiper2 my-2"
          >
            {imgGallery.map((item, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <Image
                    src={item.img}
                    width={"100%"}
                    height={"300px"}
                    style={{
                      backgroundSize: "contain",
                      objectFit: "cover",
                      aspectRatio: "16/9",
                    }}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs, Pagination]}
            className="mySwiper"
          >
            {imgGallery.map((item, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <Image
                    src={item.img}
                    width={"100%"}
                    height={"auto"}
                    preview={false}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : null}
    </Container>
  );
}

export default Galeri;

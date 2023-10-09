import {
  Button,
  Col,
  ConfigProvider,
  FloatButton,
  Image,
  Row,
  Typography,
} from "antd";
import React, { useEffect } from "react";
import LandingJumbotron from "../../components/landing/jumbotron";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "./style/borderStyle.css";
import "./style/carouselStyle.css";
import Sambutan from "../../components/landing/section/sambutan";
import VisiMisi from "../../components/landing/section/visiMisi";
import KontakKami from "../../components/landing/section/kontakKami";
import HomeBackground from "../../components/landing/layout/homeBackground";
import Galeri from "../../components/landing/section/galeri";
import Berita from "../../components/landing/section/berita";
import WhyUs from "../../components/landing/section/whyUs";
import { Slide, Fade } from "react-awesome-reveal";
import { useBeritaStore } from "../../store/beritaStore";
import { ColorPallete } from "../../utils/colorPalette";
function LandingHome() {
  const { dataBerita, pager, fetch, hasErrors } = useBeritaStore(
    (state) => state
  );
  useEffect(() => {
    let sub = true;
    fetch();
    return () => {
      sub = false;
    };
  }, []);
  return (
    <div id="section">
      <section id="beranda"></section>
      <Fade damping={0.5}>
        <LandingJumbotron />
      </Fade>
      <section id="why-us">
        <Slide direction="up" triggerOnce>
          <Fade triggerOnce>
            <WhyUs />
          </Fade>
        </Slide>
      </section>
      {/* section sambutan */}
      <section id="sambutan">
        <Slide direction="up" triggerOnce>
          <Sambutan />
        </Slide>
      </section>
      <br />
      <br />
      <br />
      <section id="visiMisi">
        {/* section visi misi */}
        <Slide direction="up" triggerOnce>
          <VisiMisi />
        </Slide>
      </section>
      <HomeBackground>
        <section id="galeri">
          <Slide direction="up" triggerOnce>
            <Galeri />
          </Slide>
        </section>
        <br />
        {/* section berita */}
        <section id="berita">
          <Slide direction="up" triggerOnce>
            <Berita dataBerita={dataBerita} />
          </Slide>
        </section>
        <section id="kontak-kami">
          <Slide direction="up" triggerOnce>
            <KontakKami />
          </Slide>
        </section>
      </HomeBackground>
      <ConfigProvider
        theme={{
          token: {
            colorBgElevated: ColorPallete.primary,
            colorText: "white",
          },
        }}
      >
        <FloatButton.BackTop />
      </ConfigProvider>
    </div>
  );
}

export default LandingHome;

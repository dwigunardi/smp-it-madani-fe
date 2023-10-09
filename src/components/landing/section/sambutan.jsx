import { Col, Image, Row, Typography } from "antd";
import React from "react";
import { Container } from "react-bootstrap";
import {
  useLaptopQuery,
  useSmallMobileQuery,
  useTabletQuery,
} from "../../../hooks/useMediaQuery";

function Sambutan() {
  //responsive
  const isSmallMobile = useSmallMobileQuery();
  const isLaptop = useLaptopQuery();
  const isTablet = useTabletQuery();
  return (
    <Container>
      {isLaptop ? (
        <Row
          justify={"space-around"}
          align="middle"
          className="position-relative"
        >
          <Col span={10}>
            <Image
              src="/section-sambutan/model_3.png"
              width={"100%"}
              height="auto"
              preview={false}
            />
            <Image
              src="/section-sambutan/ellipse.svg"
              width={"30%"}
              height="auto"
              preview={false}
              style={{ position: "absolute", bottom: "-50%", left: "-50%" }}
            />
          </Col>
          <Col span={12}>
            <Typography.Title style={{ fontWeight: "600px", fontSize: "40px" }}>
              Sambutan Kepala Sekolah
            </Typography.Title>
            <Typography.Paragraph
              style={{ fontWeight: "600px", fontSize: "30px" }}
            >
              Ibu Laila Puspita Dewi, S.pd MM
            </Typography.Paragraph>
            <Typography.Paragraph
              style={{
                fontWeight: "400px",
                fontSize: "20px",
                textJustify: "inter-word",
                textAlign: "justify",
              }}
            >
              Selamat datang di SMP IT Madani! Kami dengan penuh sukacita
              menyambut Anda, para murid, di sekolah ini. Di SMP IT Madani, kami
              percaya bahwa setiap murid memiliki potensi unik dan luar biasa
              yang perlu dihargai dan dikembangkan. Sebagai kepala sekolah,
              peran kami adalah membantu Anda meraih kesuksesan dalam perjalanan
              pendidikan Anda. Kami berkomitmen untuk menciptakan lingkungan
              belajar yang menyenangkan, aman, dan inspiratif, sehingga Anda
              dapat tumbuh dan berkembang menjadi pribadi yang berdaya dan
              berprestasi. Di SMP IT Madani, Anda akan mendapatkan pengalaman
              pendidikan yang holistik dan berkualitas. Kami menyediakan program
              akademik yang komprehensif, kegiatan ekstrakurikuler yang
              bervariasi, dan dukungan penuh dari tim pengajar yang berdedikasi.
              Kami ingin Anda merasa diterima dengan hangat dan didukung dalam
              perjalanan belajar Anda di SMP IT Madani. Bersama-sama, kami akan
              menjelajahi dunia pengetahuan, mengembangkan bakat dan minat Anda,
              serta menginspirasi Anda untuk mencapai impian dan tujuan Anda.
              Terima kasih telah memilih SMP IT Madani sebagai tempat untuk
              mengembangkan potensi Anda. Kami sangat antusias untuk menjalani
              perjalanan ini bersama Anda dan menjadi bagian dari pertumbuhan
              dan keberhasilan Anda. Selamat datang, dan semoga Anda memiliki
              pengalaman belajar yang luar biasa di SMP IT Madani! Hormat kami,
              Laila Puspita Dewi, S.pd MM Kepala Sekolah SMP IT Madani
            </Typography.Paragraph>
          </Col>
        </Row>
      ) : isTablet ? (
        <Row
          justify={"space-around"}
          align="middle"
          className="position-relative"
        >
          <Typography.Title style={{ fontWeight: "600px", fontSize: "44px" }}>
            Sambutan Kepala Sekolah
          </Typography.Title>
          <Col span={10}>
            <Typography.Paragraph
              style={{ fontWeight: "600px", fontSize: "30px" }}
              className="text-center"
            >
              Bpk. Ibu S.Pd
            </Typography.Paragraph>
            <Image
              src="/section-sambutan/fotoKepsek.svg"
              width={"100%"}
              height="auto"
              preview={false}
            />
            <Image
              src="/section-sambutan/ellipse.svg"
              width={"30%"}
              height="auto"
              preview={false}
              style={{ position: "absolute", bottom: "-50%", left: "-40%" }}
            />
          </Col>
          <Col span={12}>
            <Typography.Paragraph
              style={{
                fontWeight: "400px",
                fontSize: "20px",
                textJustify: "inter-word",
                textAlign: "justify",
              }}
            >
              Selamat datang di SMP IT Madani! Kami dengan penuh sukacita
              menyambut Anda, para murid, di sekolah ini. Di SMP IT Madani, kami
              percaya bahwa setiap murid memiliki potensi unik dan luar biasa
              yang perlu dihargai dan dikembangkan. Sebagai kepala sekolah,
              peran kami adalah membantu Anda meraih kesuksesan dalam perjalanan
              pendidikan Anda. Kami berkomitmen untuk menciptakan lingkungan
              belajar yang menyenangkan, aman, dan inspiratif, sehingga Anda
              dapat tumbuh dan berkembang menjadi pribadi yang berdaya dan
              berprestasi. Di SMP IT Madani, Anda akan mendapatkan pengalaman
              pendidikan yang holistik dan berkualitas. Kami menyediakan program
              akademik yang komprehensif, kegiatan ekstrakurikuler yang
              bervariasi, dan dukungan penuh dari tim pengajar yang berdedikasi.
              Kami ingin Anda merasa diterima dengan hangat dan didukung dalam
              perjalanan belajar Anda di SMP IT Madani. Bersama-sama, kami akan
              menjelajahi dunia pengetahuan, mengembangkan bakat dan minat Anda,
              serta menginspirasi Anda untuk mencapai impian dan tujuan Anda.
              Terima kasih telah memilih SMP IT Madani sebagai tempat untuk
              mengembangkan potensi Anda. Kami sangat antusias untuk menjalani
              perjalanan ini bersama Anda dan menjadi bagian dari pertumbuhan
              dan keberhasilan Anda. Selamat datang, dan semoga Anda memiliki
              pengalaman belajar yang luar biasa di SMP IT Madani! Hormat kami,
              Laila Puspita Dewi, S.pd MM Kepala Sekolah SMP IT Madani
            </Typography.Paragraph>
          </Col>
        </Row>
      ) : isSmallMobile ? (
        <Row
          justify={"space-around"}
          align="middle"
          className="position-relative"
        >
          <Typography.Title
            className="text-center"
            style={{ fontWeight: "600px", fontSize: "44px" }}
          >
            Sambutan Kepala Sekolah
          </Typography.Title>
          <Col span={20}>
            <Typography.Paragraph
              style={{ fontWeight: "600px", fontSize: "30px" }}
              className="text-center"
            >
              Bpk. Ibu S.Pd
            </Typography.Paragraph>
            <Image
              src="/section-sambutan/fotoKepsek.svg"
              width={"100%"}
              height="auto"
              preview={false}
            />
            <Image
              src="/section-sambutan/ellipse.svg"
              width={"30%"}
              height="auto"
              preview={false}
              style={{ position: "absolute", bottom: "-40%", left: "-30%" }}
            />
            <Typography.Paragraph
              style={{
                fontWeight: "400px",
                fontSize: "20px",
                textJustify: "inter-word",
                textAlign: "justify",
              }}
            >
              Selamat datang di SMP IT Madani! Kami dengan penuh sukacita
              menyambut Anda, para murid, di sekolah ini. Di SMP IT Madani, kami
              percaya bahwa setiap murid memiliki potensi unik dan luar biasa
              yang perlu dihargai dan dikembangkan. Sebagai kepala sekolah,
              peran kami adalah membantu Anda meraih kesuksesan dalam perjalanan
              pendidikan Anda. Kami berkomitmen untuk menciptakan lingkungan
              belajar yang menyenangkan, aman, dan inspiratif, sehingga Anda
              dapat tumbuh dan berkembang menjadi pribadi yang berdaya dan
              berprestasi. Di SMP IT Madani, Anda akan mendapatkan pengalaman
              pendidikan yang holistik dan berkualitas. Kami menyediakan program
              akademik yang komprehensif, kegiatan ekstrakurikuler yang
              bervariasi, dan dukungan penuh dari tim pengajar yang berdedikasi.
              Kami ingin Anda merasa diterima dengan hangat dan didukung dalam
              perjalanan belajar Anda di SMP IT Madani. Bersama-sama, kami akan
              menjelajahi dunia pengetahuan, mengembangkan bakat dan minat Anda,
              serta menginspirasi Anda untuk mencapai impian dan tujuan Anda.
              Terima kasih telah memilih SMP IT Madani sebagai tempat untuk
              mengembangkan potensi Anda. Kami sangat antusias untuk menjalani
              perjalanan ini bersama Anda dan menjadi bagian dari pertumbuhan
              dan keberhasilan Anda. Selamat datang, dan semoga Anda memiliki
              pengalaman belajar yang luar biasa di SMP IT Madani! Hormat kami,
              Laila Puspita Dewi, S.pd MM Kepala Sekolah SMP IT Madani
            </Typography.Paragraph>
          </Col>
        </Row>
      ) : null}
    </Container>
  );
}

export default Sambutan;

import { Image, Row, Col, Typography } from "antd";
import React from "react";
import { Container } from "react-bootstrap";
import {
  useDekstopQuery,
  useLaptopQuery,
  useLargeDekstopQuery,
  useMobileQuery,
  useSmallMobileQuery,
  useTabletQuery,
} from "../../hooks/useMediaQuery";
import Typewriter from "typewriter-effect";
function LandingJumbotron() {
  const isSmallMobile = useSmallMobileQuery();
  const isMobile = useMobileQuery();
  const isLargeDekstop = useLargeDekstopQuery();
  const isDekstop = useDekstopQuery();
  const isLaptop = useLaptopQuery();
  const isTablet = useTabletQuery();
  return (
    <div className="min-w-100">
      {isLargeDekstop ? (
        <div
          className="position-relative"
          style={{
            backgroundImage: "url(/jumbotron/jumbotron.svg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            objectFit: "cover",
            width: "100%",
            height: "auto",
            aspectRatio: "16/9",
            zIndex: "1",
          }}
        >
          <Container>
            <Row
              justify={"space-around"}
              align={"middle"}
              style={{ height: "100vh" }}
            >
              <Col span={10} offset={1}>
                <Typography.Title
                  className="text-light"
                  style={{
                    fontSize: "4rem",
                  }}
                >
                  <Typewriter
                    options={{
                      strings: [
                        "SMP IT MADANI <br /> SUKABUMI",
                        "Welcomes You",
                      ],
                      autoStart: true,
                      loop: true,
                      pauseFor: 1000,
                      delay: "natural",
                    }}
                  />
                </Typography.Title>
                <Typography.Text
                  strong
                  className="text-light"
                  style={{
                    fontSize: 28,
                    // position: "absolute",
                    // top: "50%",
                    // left: "20%",
                    // zIndex: 9,
                  }}
                >
                  <Typewriter
                    options={{
                      strings: "Berprestasi Unggul, Berakhlakul Karimah",
                      autoStart: true,
                      loop: false,
                      pauseFor: 1000,
                      delay: "natural",
                    }}
                  />
                </Typography.Text>
              </Col>
              <Col span={10} offset={3} className="mt-5">
                <Image
                  src="/jumbotron/model_1.png"
                  fallback="/error-img.png"
                  width={'100%'}
                  height={"auto"}
                  preview={false}
                  // className="vh-100"
                />
              </Col>
            </Row>
          </Container>
        </div>
      ) : isDekstop ? (
        <div
          className="position-relative"
          style={{
            backgroundImage: "url(/jumbotron/jumbotron.svg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            objectFit: "cover",
            width: "100%",
            height: "auto",
            aspectRatio: "16/9",
            zIndex: "1",
          }}
        >
          <Container className="pt-5">
            <Row
              justify={"space-around"}
              align={"middle"}
              style={{ height: "100vh" }}
            >
              <Col span={10} offset={1}>
                <Typography.Title
                  className="text-light"
                  style={{
                    fontSize: "4rem",
                  }}
                >
                 <Typewriter
                    options={{
                      strings: [
                        "SMP IT MADANI <br /> SUKABUMI",
                        "Welcomes You",
                      ],
                      autoStart: true,
                      loop: true,
                      pauseFor: 1000,
                      delay: "natural",
                    }}
                  />
                </Typography.Title>
                <Typography.Text
                  strong
                  className="text-light"
                  style={{
                    fontSize: 28,
                    // position: "absolute",
                    // top: "50%",
                    // left: "20%",
                    // zIndex: 9,
                  }}
                >
                 <Typewriter
                    options={{
                      strings: "Berprestasi Unggul, Berakhlakul Karimah",
                      autoStart: true,
                      loop: false,
                      pauseFor: 1000,
                      delay: "natural",
                    }}
                  />
                </Typography.Text>
              </Col>
              <Col span={10} offset={1}>
                <Image
                  src="/jumbotron/model_1.png"
                  fallback="/error-img.png"
                  width={'100%'}
                  height={"auto"}
                  preview={false}
                  // className="vh-100"
                />
              </Col>
            </Row>
          </Container>
        </div>
      ) : isLaptop ? (
        <div
          className="position-relative"
          style={{
            backgroundImage: "url(/jumbotron/jumbotron.svg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            objectFit: "cover",
            width: "100%",
            height: "auto",
            aspectRatio: "16/9",
            zIndex: "1",
            // height: "100vh"
          }}
        >
          <Container className="pt-5">
            <Row
              justify={"space-around"}
              align={"middle"}
              style={{ height: "80vh" }}
            >
              <Col span={10} offset={1}>
                <Typography.Title
                  className="text-light"
                  style={{
                    fontSize: "2.8rem",
                  }}
                >
                 <Typewriter
                    options={{
                      strings: [
                        "SMP IT MADANI <br /> SUKABUMI",
                        "Welcomes You",
                      ],
                      autoStart: true,
                      loop: true,
                      pauseFor: 1000,
                      delay: "natural",
                    }}
                  />
                </Typography.Title>
                <Typography.Text
                  strong
                  className="text-light"
                  style={{
                    fontSize: 24,
                    // position: "absolute",
                    // top: "50%",
                    // left: "20%",
                    // zIndex: 9,
                  }}
                >
                 <Typewriter
                    options={{
                      strings: "Berprestasi Unggul, Berakhlakul Karimah",
                      autoStart: true,
                      loop: false,
                      pauseFor: 1000,
                      delay: "natural",
                    }}
                  />
                </Typography.Text>
              </Col>
              <Col span={10} offset={1}>
                <Image
                  src="/jumbotron/model_1.png"
                  fallback="/error-img.png"
                  width={'100%'}
                  height={"auto"}
                  preview={false}
                  // className="vh-100"
                />
              </Col>
            </Row>
          </Container>
        </div>
      ) : isTablet ? (
        <div
          className="position-relative"
          style={{
            backgroundImage: "url(/jumbotron/jumbotron.svg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            objectFit: "contain",
            width: "100%",
            height: "auto",
            aspectRatio: "16/9",
            zIndex: "1",
            paddingTop: "50px",
            // height: "100vh"
          }}
        >
          <Container className="pt-5">
            <Row
              justify={"space-around"}
              align={"middle"}
              style={{ height: "35vh" }}
            >
              <Col span={10}>
                <Typography.Title
                  className="text-light"
                  style={{
                    fontSize: "2.2rem",
                  }}
                >
                 <Typewriter
                    options={{
                      strings: [
                        "SMP IT MADANI <br /> SUKABUMI",
                        "Welcomes You",
                      ],
                      autoStart: true,
                      loop: true,
                      pauseFor: 1000,
                      delay: "natural",
                    }}
                  />
                </Typography.Title>
                <Typography.Text
                  strong
                  className="text-light"
                  style={{
                    fontSize: 20,
                    // position: "absolute",
                    // top: "50%",
                    // left: "20%",
                    // zIndex: 9,
                  }}
                >
                <Typewriter
                    options={{
                      strings: "Berprestasi Unggul, Berakhlakul Karimah",
                      autoStart: true,
                      loop: false,
                      pauseFor: 1000,
                      delay: "natural",
                    }}
                  />
                </Typography.Text>
              </Col>
              <Col span={11} offset={1}>
                <Image
                  src="/jumbotron/model_1.png"
                  fallback="/error-img.png"
                  width={'100%'}
                  height={"auto"}
                  preview={false}
                  // className="vh-100"
                />
              </Col>
            </Row>
          </Container>
        </div>
      ) : isMobile ? (
        <div
          className="position-relative"
          style={{
            backgroundImage: "url(/jumbotron/jumbotron.svg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            objectFit: "contain",
            width: "100%",
            height: "auto",
            aspectRatio: "16/9",
            zIndex: "1",
          }}
        >
          <Container className="pt-5">
            <Row
              justify={"space-around"}
              align={"middle"}
              style={{ height: "60vh" }}
            >
              <Col span={12}>
                <Typography.Title
                  className="text-light"
                  style={{
                    fontSize: "2rem",
                  }}
                >
                <Typewriter
                    options={{
                      strings: [
                        "SMP IT MADANI <br /> SUKABUMI",
                        "Welcomes You",
                      ],
                      autoStart: true,
                      loop: true,
                      pauseFor: 1000,
                      delay: "natural",
                    }}
                  />
                </Typography.Title>
                <Typography.Text
                  strong
                  className="text-light"
                  style={{
                    fontSize: 16,
                    // position: "absolute",
                    // top: "50%",
                    // left: "20%",
                    // zIndex: 9,
                  }}
                >
                  <Typewriter
                    options={{
                      strings: "Berprestasi Unggul, Berakhlakul Karimah",
                      autoStart: true,
                      loop: false,
                      pauseFor: 1000,
                      delay: "natural",
                    }}
                  />
                </Typography.Text>
              </Col>
              <Col span={11} offset={1}>
                <Image
                  src="/jumbotron/model_1.png"
                  fallback="/error-img.png"
                  width={'100%'}
                  height={"auto"}
                  preview={false}
                  // className="vh-100"
                />
              </Col>
            </Row>
          </Container>
        </div>
      ) : isSmallMobile ? (
        <div
          className="position-relative"
          style={{
            backgroundImage: "url(/jumbotron/jumbotron.svg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            objectFit: "cover",
            width: "100%",
            height: "600px",
            // aspectRatio: "16/9",
            zIndex: "1",
          }}
        >
          <Container>
            <Row
              justify={"center"}
              align={"bottom"}
              style={{ height: "600px" }}
            >
              <Col span={24}>
                <Typography.Title
                  className="text-light text-center"
                  style={{
                    fontSize: "2.5rem",
                    marginTop: "60px",
                  }}
                >
                  <Typewriter
                    options={{
                      strings: [
                        "SMP IT MADANI SUKABUMI",
                        "Welcomes You",
                      ],
                      autoStart: true,
                      loop: true,
                      pauseFor: 1000,
                      delay: "natural",
                    }}
                  />
                </Typography.Title>
                <Typography.Paragraph
                  strong
                  className="text-light text-center"
                  style={{
                    fontSize: 20,
                    // position: "absolute",
                    // top: "50%",
                    // left: "20%",
                    // zIndex: 9,
                  }}
                >
                 <Typewriter
                    options={{
                      strings: "Berprestasi Unggul, Berakhlakul Karimah",
                      autoStart: true,
                      loop: false,
                      pauseFor: 1000,
                      delay: "natural",
                    }}
                  />
                </Typography.Paragraph>
              </Col>
              <Col span={20}>
                <Image
                  src="/jumbotron/model_1.png"
                  fallback="/error-img.png"
                  width={'100%'}
                  height={"auto"}
                  preview={false}
                  style={{ marginTop: "-50px" }}
                  // className="vh-100"
                />
              </Col>
            </Row>
          </Container>
        </div>
      ) : null}
    </div>
  );
}

export default LandingJumbotron;

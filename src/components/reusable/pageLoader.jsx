import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../config/loading.json";
import { Fade } from "react-awesome-reveal";
import { Col, Row, Typography } from "antd";
import Typewriter from "typewriter-effect";
import { Container } from "react-bootstrap";
function PageLoader() {
  return (
    <Fade>
      <Container>
        <Row
          justify={"center"}
          align={"middle"}
          className="min-vh-100 gap-2"
          style={{ backgroundColor: "transparent" }}
        >
          {" "}
          <Col span={10}>
            <Lottie
              animationData={loadingAnimation}
              style={{ backgroundColor: "transparent" }}
            />{" "}
          </Col>
          <Col span={10}>
            <Typography.Title>
              <Typewriter
                options={{
                  strings: ["Selamat Datang Admin"],
                  autoStart: true,
                  loop: true,
                  pauseFor: 500,
                  delay: "natural",
                }}
              />
            </Typography.Title>
          </Col>
        </Row>
      </Container>
    </Fade>
  );
}

export default PageLoader;

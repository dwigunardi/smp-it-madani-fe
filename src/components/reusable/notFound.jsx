import { Button, Col, Image, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate()
  return (
    <Row
      justify={"space-around"}
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <Col lg={{ span: 5 }}>
        <div
          style={{
            position: "relative",
            height: "100vh",
            width: "100%",
          }}
        >
          <div
            style={{
              position: "absolute",
              backgroundImage: "url(/notFound/bg-bawah.png)",
              backgroundRepeat: "no-repeat",
              objectFit: "cover",
              width: "477.83px",
              height: "477.83px",
              zIndex: "1",
              bottom: "-35%",
              left: "-10%",
            }}
          ></div>
          <Button
            type="ghost"
            className="px-5 py-2"
            style={{
              width: 310,
              height: 61,
              backgroundColor: "#2E5894",
              borderRadius: "10px",
              position: "absolute",
              bottom: "10%",
              left: "30%",
              zIndex: 2,
            }}
            onClick={() => navigate(-1)}
          >
            <h3 style={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 800,
                color: "#FFFFFF",
                marginTop:5
            }}>GO Back</h3>
          </Button>
        </div>
      </Col>
      <Col lg={{ span: 17 }}>
        <div
          className="vh-100"
          style={{
            position: "relative",
            backgroundImage: "url(/notFound/bg-not-found.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            objectFit: "contain",
            width: "100%",
            height: "auto",
            aspectRatio: "1/1",
            zIndex: "1",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: "30%",
              right: "-10%",
            }}
          >
            <Image
              src="/notFound/fg-not-found.png"
              width={"90%"}
              height={"auto"}
              preview={false}
              style={{
                filter: "drop-shadow(0px 10px 4px rgba(0, 0, 0, 0.25))",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "10%",
            }}
          >
            <p
              style={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 800,
                fontSize: "50px",
                lineHeight: "75px",
                color: "#FFFFFF",
                textShadow: "6px 5px 4px rgba(0, 0, 0, 0.25)",
                transform: "rotate(-33.63deg)",
              }}
            >
              Oops! Page is <br /> unavailable :(
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default NotFound;

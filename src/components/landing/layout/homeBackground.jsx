import { Image } from "antd";
import React from "react";
import {
  useLaptopQuery,
  useSmallMobileQuery,
  useTabletQuery,
  useLargeDekstopQuery,
} from "../../../hooks/useMediaQuery";

function HomeBackground({ children }) {
  //responsive
  const isSmallMobile = useSmallMobileQuery();
  const isLaptop = useLaptopQuery();
  const isTablet = useTabletQuery();
  const isLargeDekstop = useLargeDekstopQuery();

  return (
    <div>
      {isLargeDekstop ? (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "auto",
          }}
        >
          {" "}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Image
              src="/home-background/bg-kiri.svg"
              width={"25%"}
              height={"auto"}
              preview={false}
              style={{
                position: "absolute",
                top: "200px",
                left: 0,
                zIndex: "-1",
              }}
            />

            <Image
              src="/home-background/bg-kanan.svg"
              width={"25%"}
              height={"auto"}
              preview={false}
              style={{
                position: "absolute",
                right: 0,
                top: "400px",
                zIndex: "-1",
              }}
            />
          </div>
          {children}
        </div>
      ) : isLaptop ? (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "auto",
          }}
        >
          {" "}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Image
              src="/home-background/bg-kiri.svg"
              width={"35%"}
              height={"auto"}
              preview={false}
              style={{
                position: "absolute",
                top: "200px",
                left: 0,
                zIndex: "-1",
              }}
            />

            <Image
              src="/home-background/bg-kanan.svg"
              width={"35%"}
              height={"auto"}
              preview={false}
              style={{
                position: "absolute",
                right: 0,
                top: "400px",
                zIndex: "-1",
              }}
            />
          </div>
          {children}
        </div>
      ) : isTablet ? (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "auto",
          }}
        >
          {" "}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                position: "absolute",
                top: "200px",
                left: 0,
                width: "50%",
                height: "1600px",
                backgroundImage: "url(/home-background/bg-kiri.svg)",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                zIndex: "-1",
              }}
            />

            <div
              style={{
                position: "absolute",
                top: "1000px",
                right: 0,
                width: "40%",
                height: "1000px",
                backgroundImage: "url(/home-background/bg-kanan.svg)",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                zIndex: "-1",
              }}
            />
          </div>
          {children}
        </div>
      ) : isSmallMobile ? (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "auto",
          }}
        >
          {" "}
          <div>
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: 0,
                width: "90%",
                height: "1600px",
                backgroundImage: "url(/home-background/bg-kiri.svg)",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                zIndex: "-1",
              }}
            />

            {/* <div
              style={{
                position: "absolute",
                top: "1050px",
                right: 0,
                width: "78%",
                height: "700px",
                backgroundImage: "url(/home-background/bg-kanan.svg)",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                zIndex: "-1",
              }}
            /> */}
          </div>
          {children}
        </div>
      ) : null}
    </div>
  );
}

export default HomeBackground;

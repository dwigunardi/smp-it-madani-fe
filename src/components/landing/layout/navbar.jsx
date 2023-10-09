import {
  Nav,
  Navbar,
  Container,
  NavDropdown,
  Form,
  Button,
  Offcanvas,
} from "react-bootstrap";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Image } from "antd";
import { ColorPallete } from "../../../utils/colorPalette";
import { RxHamburgerMenu } from "react-icons/rx";
import { Slide } from "react-awesome-reveal";
import {
  useDekstopQuery,
  useLaptopQuery,
  useLargeDekstopQuery,
  useMobileQuery,
  useSmallMobileQuery,
  useTabletQuery,
} from "../../../hooks/useMediaQuery";

function NavbarLanding() {
  const [colorChange, setColorchange] = useState(false);
  const [isOpen, setOffcanvasOpen] = useState(false);
  const Navigate = useNavigate();
  const location = useLocation();
  const ref = useRef(null);

  //responsive
  const isSmallMobile = useSmallMobileQuery();
  const isMobile = useMobileQuery();
  const isLargeDekstop = useLargeDekstopQuery();
  const isDekstop = useDekstopQuery();
  const isLaptop = useLaptopQuery();
  const isTablet = useTabletQuery();

  // function scrollToTargetAdjusted(targetId) {
  //   console.log(targetId)
  //   const element = document.querySelector(`${targetId}`).addEventListener('click', doScrolling.bind(null, '#top', 1000))
  //   const headerOffset = 100;
  //   const elementPosition = element.getBoundingClientRect().top;
  //   const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  //   window.scrollTo({
  //     top: offsetPosition,
  //     behavior: "smooth",
  //   });
  // }

  //testing scroll effect
  function getElementY(query) {
    return (
      window.pageYOffset +
      document.querySelector(query).getBoundingClientRect().top -
      100 //100 = offset position
    );
  }

  function doScrolling(element, duration) {
    if (location.pathname.includes("/home")) {
      Navigate("/");
      setTimeout(() => {
        var startingY = window.pageYOffset;
        var elementY = getElementY(element);
        // If element is close to page's bottom then window will scroll only to some position above the element.
        var targetY =
          document.body.scrollHeight - elementY < window.innerHeight
            ? document.body.scrollHeight - window.innerHeight
            : elementY;
        var diff = targetY - startingY;
        // Easing function: easeInOutCubic
        // From: https://gist.github.com/gre/1650294
        var easing = function (t) {
          return t < 0.5
            ? 4 * t * t * t
            : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };
        var start;

        if (!diff) return;

        // Bootstrap our animation - it will get called right before next frame shall be rendered.
        window.requestAnimationFrame(function step(timestamp) {
          if (!start) start = timestamp;
          // Elapsed miliseconds since start of scrolling.
          var time = timestamp - start;
          // Get percent of completion in range [0, 1].
          var percent = Math.min(time / duration, 1);
          // Apply the easing.
          // It can cause bad-looking slow frames in browser performance tool, so be careful.
          percent = easing(percent);

          window.scrollTo(0, startingY + diff * percent, {
            behavior: "smooth",
          });

          // Proceed with animation as long as we wanted it to.
          if (time < duration) {
            window.requestAnimationFrame(step);
          }
        });
      }, 1000);
    } else {
      var startingY = window.pageYOffset;
      var elementY = getElementY(element);
      // If element is close to page's bottom then window will scroll only to some position above the element.
      var targetY =
        document.body.scrollHeight - elementY < window.innerHeight
          ? document.body.scrollHeight - window.innerHeight
          : elementY;
      var diff = targetY - startingY;
      // Easing function: easeInOutCubic
      // From: https://gist.github.com/gre/1650294
      var easing = function (t) {
        return t < 0.5
          ? 4 * t * t * t
          : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };
      var start;

      if (!diff) return;

      // Bootstrap our animation - it will get called right before next frame shall be rendered.
      window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp;
        // Elapsed miliseconds since start of scrolling.
        var time = timestamp - start;
        // Get percent of completion in range [0, 1].
        var percent = Math.min(time / duration, 1);
        // Apply the easing.
        // It can cause bad-looking slow frames in browser performance tool, so be careful.
        percent = easing(percent);

        window.scrollTo(0, startingY + diff * percent, {
          behavior: "smooth",
        });

        // Proceed with animation as long as we wanted it to.
        if (time < duration) {
          window.requestAnimationFrame(step);
        }
      });
    }
    setOffcanvasOpen(false)
  }
  const handleSelect = (item) => {
    if (item == "beranda" && location.pathname == "/") {
      doScrolling("#beranda", 500);
    } else if (item == "beranda" && location.pathname != "/") {
      Navigate("/");
    }
  };
  const changeNavbarColor = () => {
    if (window.scrollY >= 300) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  useLayoutEffect(() => {
    window.addEventListener("scroll", changeNavbarColor);

    return () => {
      removeEventListener("scroll", changeNavbarColor);
    };
  }, [colorChange]);

  return (
    <div className="position-relative">
      <Navbar
        // bg={colorChange ? "#000" : "transparent"}
        expand="md"
        fixed="top"
        // collapseOnSelect
        style={{
          transition: "all 0.5s ease-in-out",
          backgroundColor: colorChange
            ? `${ColorPallete.primary}`
            : "transparent",
          boxShadow: colorChange ? "-1px 13px 36px -1px rgba(0,0,0,0.7)" : null,
        }}
      >
        <Container>
          <Navbar.Brand className={"text-light"} onClick={() => Navigate("/")}>
            <Image
              src="/logo.png"
              preview={false}
              width={"30%"}
              height={"auto"}
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-lg`}
            className="border border-white"
            children={<RxHamburgerMenu color="white" />}
            onClick={() => setOffcanvasOpen(true)}
          />
          <Navbar.Offcanvas
            backdrop={true}
            scroll={true}
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
            show={isOpen}
            onHide={() => setOffcanvasOpen(false)}
            onShow={() => setOffcanvasOpen(true)}
            onExit={() => setOffcanvasOpen(false)}
            style={
              isOpen
                ? {
                    backgroundImage: "url(/home-background/bg-kiri.svg)",
                    backgroundSize: isTablet ? "contain" : "100%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "left",
                  }
                : null
            }
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                <div className="d-flex justify-content-between align-items-center">
                  <Image
                    src="/logo.png"
                    preview={false}
                    width={"30%"}
                    height={"auto"}
                  />
                  <p style={{ color: ColorPallete.primary }}>Smp IT Madani</p>
                </div>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav
                onSelect={(selectedKey) => handleSelect(selectedKey)}
                className="justify-content-center flex-grow-1 me-auto"
                // style={{ maxHeight: "200px" }}
                // navbarScroll
              >
                <Slide cascade damping={0.1}>
                  <Nav.Link
                    // onClick={() => doScrolling("#beranda", 1000)}
                    // href="#why-us"
                    eventKey="beranda"
                    style={{
                      color: isOpen ? ColorPallete.primary : "white",
                      borderBottom: isOpen ? "2px solid white" : null,
                    }}
                  >
                    Beranda
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => doScrolling("#why-us", 500)}
                    // href="#why-us"
                    style={{
                      color: isOpen ? ColorPallete.primary : "white",
                      borderBottom: isOpen ? "2px solid white" : null,
                    }}
                  >
                    Tentang Kami
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => doScrolling("#visiMisi", 500)}
                    // href="#why-us"
                    style={{
                      color: isOpen ? ColorPallete.primary : "white",
                      borderBottom: isOpen ? "2px solid white" : null,
                    }}
                  >
                    Visi & Misi
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => doScrolling("#galeri", 500)}
                    style={{
                      color: isOpen ? ColorPallete.primary : "white",
                      borderBottom: isOpen ? "2px solid white" : null,
                    }}
                  >
                    Galeri
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => doScrolling("#berita", 500)}
                    style={{
                      color: isOpen ? ColorPallete.primary : "white",
                      borderBottom: isOpen ? "2px solid white" : null,
                    }}
                  >
                    Berita
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => doScrolling("#kontak-kami", 500)}
                    style={{
                      color: isOpen ? ColorPallete.primary : "white",
                      borderBottom: isOpen ? "2px solid white" : null,
                    }}
                  >
                    Kontak Kami
                  </Nav.Link>
                </Slide>
              </Nav>
              <Nav.Link
                onClick={() => Navigate('/auth/login')}
                style={{
                  color: isOpen ? ColorPallete.primary : "white",
                  borderBottom: isOpen ? "2px solid white" : null,
                }}
              >
                Masuk
              </Nav.Link>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarLanding;

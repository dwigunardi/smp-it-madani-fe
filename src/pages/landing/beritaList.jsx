import { Image } from "antd";
import React, { Suspense, useEffect, useState } from "react";
import { TiNews } from "react-icons/ti";
import "./style/section-list.css";
import { useBeritaStore } from "../../store/beritaStore";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Fade, Slide } from "react-awesome-reveal";
import SkeletonLoader from "../../components/reusable/skeletonLoader";

function BeritaList() {
  const { dataBerita, pager, fetch, hasErrors, loading } = useBeritaStore(
    (state) => state
  );
  const [changeColor, setChange] = useState(false);
  const [hover, setOnHover] = useState(false);

  useEffect(() => {
    let sub = true;
    fetch();
    return () => {
      sub = false;
    };
  }, []);
  // console.log(dataBerita);
  const trim = (text) => {
    if (text.length > 100) {
      //   const format = ReactHtmlParser(text)
      //   return format
      return text.slice(0, 100) + "...";
    }
  };

  return (
    <div className="w-100">
      <div
        style={{
          backgroundImage: "url('/section-berita/News-Banner-Image.png')",
          backgroundRepeat: "no-repeat",
          width: "100%",
          backgroundSize: "cover",
          height: "450px",
          backgroundPosition: "center center",
          objectPosition: "center",
          position: "relative",
          zIndex: "-1",
        }}
      >
        <div
          className="w-100 h-100 position-absolute"
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
            top: 0,
            left: 0,
            zIndex: "-1",
          }}
        />
        <section style={{ paddingTop: 200 }}>
          <h4 className="text-center" style={{ color: "white" }}>
            Berita Terkini
          </h4>
          <div className="d-flex justify-content-center align-items-center gap-3">
            <div style={{ width: 30, height: 5, backgroundColor: "white" }} />
            <TiNews size={50} style={{ color: "white" }} />
            <div style={{ width: 30, height: 5, backgroundColor: "white" }} />
          </div>
          <h6 className="text-center" style={{ color: "white" }}>
            Meliput Berita Seputar Pendidikan
          </h6>
        </section>
      </div>
      <section className="container py-5">
        <div className="row justify-content-center">
          <Suspense fallback={<SkeletonLoader />}>
            {dataBerita.map((items, idx) => {
              const parser = new DOMParser().parseFromString(
                items.body,
                "text/html"
              );
              const getChild = parser.firstChild.childNodes;
              const text = getChild[1].childNodes[0].innerHTML;
              return (
                <Slide direction="up" triggerOnce key={idx}>
                  <Fade damping={0.5} triggerOnce>
                    <div
                      className="col-lg-11"
                      onMouseEnter={() => setChange(true)}
                      onMouseLeave={() => setChange(false)}
                    >
                      <div className="card single-article">
                        <div className="row no-gutters">
                          <div className="col-sm-5">
                            <div className="article-thumb">
                              <Image
                                className="card-img"
                                src={items.image}
                                alt=""
                                preview={false}
                                width={"100%"}
                                height={250}
                                style={{
                                  filter: changeColor
                                    ? "grayscale(0)"
                                    : "grayscale(1)",
                                  transition: "ease-in-out 0.5s",
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-sm-7">
                            <div className="card-body display-table">
                              <div className="article-body">
                                <h5 className="card-title">{items.title}</h5>
                                <div className="article-meta">
                                  <span
                                    href="#"
                                    className="author text-small text-primary"
                                  >
                                    Author : {items.author}
                                  </span>
                                  <div className="article-date">
                                    {items.created_at.slice(0, 10)}
                                  </div>
                                </div>
                                <p className="card-text">{text ? trim(text) : ' '}</p>
                                <Link
                                  to={`/home/berita/${items.slug}`}
                                  className="btn btn-primary"
                                >
                                  Baca Selengkapnya <BsArrowBarRight />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Fade>
                </Slide>
              );
            })}
          </Suspense>
        </div>
      </section>
    </div>
  );
}

export default BeritaList;

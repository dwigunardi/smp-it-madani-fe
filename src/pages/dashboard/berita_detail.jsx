import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardDashboard from "../../components/reusable/cardDashboard";
import { Button, Image } from "antd";
import { useBeritaStore } from "../../store/beritaStore";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import { BsArrowBarLeft } from "react-icons/bs";

function BeritaDetail(props) {
  let { beritaId } = useParams();
  const Navigate = useNavigate()
  const { fetchBySlug, dataBeritaDetail } = useBeritaStore((state) => state);
  const parser = new DOMParser().parseFromString(
    dataBeritaDetail.body,
    "text/html"
  );
  const getChild = parser.firstChild.childNodes;
  const each = getChild.forEach((item, idx) => item.firstChild);
  const create = document.createElement("div");
 
  useEffect(() => {
    let sub = true;
    fetchBySlug(beritaId);
    return () => {
      sub = false;
    };
  }, []);
// console.log(dataBeritaDetail)
  return (
    <div>
      <CardDashboard
        extraButton={false}
        titleCard={"Detail Berita"}
        mode="detailBerita"
      >
        <div className="d-flex justify-content-center container">
          <Image
            src={dataBeritaDetail.image}
            preview={false}
            width={300}
            height={300}
            style={{ backgroundSize: "cover", objectFit: "contain" }}
          />
        </div>
        <h2
          style={{
            fontFamily: "Nunito, Segoe UI, arial",
            color: "#6c757d",
          }}
        >
          {dataBeritaDetail.title}
        </h2>
        <h5>Di tulis Oleh : {dataBeritaDetail.author}</h5>
        {ReactHtmlParser(dataBeritaDetail.body)}
        <div className="pt-5 d-flex justify-content-end">
          <Button icon={<BsArrowBarLeft />} size="large" onClick={() => Navigate(-1)}>Kembali</Button>
        </div>
      </CardDashboard>
    </div>
  );
}

export default BeritaDetail;

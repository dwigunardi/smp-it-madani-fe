import { Col, Row, Typography } from "antd";
import React from "react";
import { Container } from "react-bootstrap";
import CardHome from "../../reusable/cardHome";

function WhyUs() {
  
  return (
    <Container className="my-5">
      <Row justify={"space-around"}>
        <Col span={22}>
          <Typography.Title className="text-center">
            Kenapa Harus SMP IT MADANI
          </Typography.Title>
          <Typography.Paragraph className="text-center fs-4">
            Alasan kenapa kalian harus bergabung dengan SMP IT MADANI SUKABUMI
          </Typography.Paragraph>
        </Col>
      </Row>
      <div className="my-5">
        {" "}
        <CardHome />
      </div>
    </Container>
  );
}

export default WhyUs;

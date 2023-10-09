import { GoogleLogin } from "@react-oauth/google";
import {
  Checkbox,
  Col,
  Image,
  Input,
  Row,
  Typography,
  Button,
  message,
  Form,
} from "antd";
import jwtDecode from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { googleClient } from "../../config/google";
import { useAuthPersist } from "../../store/authPersist";
import { ColorPallete } from "../../utils/colorPalette";
import {
  useLaptopQuery,
  useSmallMobileQuery,
  useTabletQuery,
} from "../../hooks/useMediaQuery";
import { usersRepository } from "../../repository/auth";
import axios from "axios";
import { baseurl } from "../../config/baseUrl";

function LoginPage() {
  const [isLoading, setLoading] = useState(false);
  const { data, create, remove, update, clear, isAuthenticated } =
    useAuthPersist();
  let Navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const checkboxRef = useRef();

  //responsive
  const isSmallMobile = useSmallMobileQuery();
  const isLaptop = useLaptopQuery();
  const isTablet = useTabletQuery();

  let dataLogin = "";
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const formData = {
        username: values.username,
        password: values.password,
      };
      const result = await usersRepository.api.useLogin(formData);
      await create(true, {
        id: new Date().toISOString(),
        isAuthenticated: true,
        data: jwtDecode(result.data.access_token),
        accessToken: result.data.access_token,
      });
      dataLogin = jwtDecode(result.data.access_token);
      if (dataLogin.role == "ADMIN") {
        message.success("Selamat Datang Admin");
        await Navigate("/dashboard");
        await setLoading(false);
      } else if (dataLogin.role == "STUDENT") {
        message.success("Selamat Datang Siswa");
        await Navigate(`/siswa/dashboard/${dataLogin.username}`);
        setLoading(false);
      } else {
        await setLoading(false);
      }
    } catch (error) {
      console.log("ini error => ", error);
      message.info(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isAuthenticated && data[0].credential.data.role == "ADMIN") {
        message.info("Anda sudah login");
        Navigate("/dashboard");
      } else if (isAuthenticated && data[0].credential.data.role == "SISWA") {
        message.info("Anda SISWA sudah login");
      }
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isAuthenticated]);

  return (
    <div>
      <Row justify={"center"} align={"middle"} className="position-relative">
        <Col lg={{ span: 16 }} md={{ span: 16 }} sm={{ span: 24 }}>
          <div className="min-vh-100">
            <Row
              justify={"start"}
              align={"middle"}
              className={`${
                isLaptop ? "min-vh-100" : isSmallMobile ? "" : null
              }`}
            >
              <Col
                lg={{ span: 12, offset: 4 }}
                md={{ span: 16, offset: 2 }}
                sm={{ span: 22, offset: 1 }}
                xs={{ span: 24 }}
              >
                <Typography.Title className="text-center mb-5 mt-5">
                  Wellcome Back!
                </Typography.Title>
                <Form
                  name="basic"
                  initialValues={{
                    remember: false,
                  }}
                  onFinish={handleSubmit}
                  onFinishFailed={(e) => console.log(e)}
                  autoComplete="off"
                  layout="vertical"
                >
                  <Form.Item
                    label="Username atau NIS"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input
                      className="border border-2 border-primary"
                      placeholder="Masukan Username atau Nomer Induk Siswa"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      className="border border-2 border-primary"
                      placeholder="Masukan Password"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="w-100"
                      loading={isLoading}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        </Col>
        <Col lg={{ span: 8 }} md={{ span: 8 }} sm={{ span: 8 }}>
          {isLaptop ? (
            <div
              className="min-vh-100"
              style={{ backgroundColor: ColorPallete.primary }}
            />
          ) : isTablet ? (
            <div
              className="min-vh-100"
              style={{ backgroundColor: ColorPallete.primary }}
            />
          ) : isSmallMobile ? null : null}
        </Col>
        {isLaptop ? (
          <div>
            <div className="position-absolute top-50 start-50 translate-middle-y">
              <Image src="/laptop.svg" preview={false} alt="laptop" />
            </div>
            <div className="position-absolute bottom-0 start-0 translate-bottom-y">
              <Image
                src="/Rectangle-login1.svg"
                preview={false}
                width={"65%"}
                height={"auto"}
                alt="laptop"
              />
            </div>
            <div className="position-absolute bottom-0 start-0 translate-bottom-y">
              <Image
                src="/Rectangle-login2.svg"
                preview={false}
                width={"65%"}
                height={"auto"}
                alt="laptop"
              />
            </div>
          </div>
        ) : isTablet ? (
          <div>
            <div className="position-absolute top-50 start-50 translate-middle-y">
              <Image src="/laptop.svg" preview={false} alt="laptop" />
            </div>
            <div className="position-absolute bottom-0 start-0 ">
              <Image
                src="/Rectangle-login1.svg"
                preview={false}
                width={"65%"}
                height={"auto"}
                alt="laptop"
              />
            </div>
            <div className="position-absolute bottom-0 start-0 ">
              <Image
                src="/Rectangle-login2.svg"
                preview={false}
                width={"65%"}
                height={"auto"}
                alt="laptop"
              />
            </div>
          </div>
        ) : null}
      </Row>
    </div>
  );
}

export default LoginPage;

import { Button, Form, Input, Modal, Upload, Image } from "antd";
import React, { Suspense, useEffect, useState } from "react";
import { useModalUpdateStore } from "../../store/storeModal";
import { Container } from "react-bootstrap";
import { InboxOutlined } from "@ant-design/icons";
import { useGetTextEditor } from "../../store/textEditorStore";
import SkeletonLoader from "./skeletonLoader";
import TextEditor from "./textEditor";
const { Dragger } = Upload;
const ModalUpdate = (props) => {
  const {
    handleCancel,
    modalData,
    onFinishFailed,
    onFinish,
    handleUpload,
    isFormReady,
    fileUpload,
  } = props;
  const { isUpdateOpen, mode, isUpdateLoading } = useModalUpdateStore(
    (state) => state
  );
  const { modeText, setUpdateMode } = useGetTextEditor((state) => state);
  const [form] = Form.useForm();
  const [componentDisabled, setComponentDisabled] = useState(false);

  useEffect(() => {
    let subcribe = true;
    if (isFormReady == "ready") {
      form.setFieldsValue({
        judul: modalData.title,
        isi: modalData.body,
        foto: modalData.image,
      });
      setUpdateMode();
    }
    return () => {
      subcribe = false;
    };
  }, [isFormReady]);
  return (
    <Modal
      title="Update Data Berita"
      open={isUpdateOpen}
      onOk={() => console.log("clicked on oke")}
      confirmLoading={isUpdateLoading}
      onCancel={handleCancel}
      width={800}
      footer={false}
    >
      {/* <p>Apakah anda yakin ingin mengupdate {modalText?.title}</p> */}

      {mode == "berita" ? (
        <Container className="mt-2 position-relative">
          <Form
            name="update"
            form={form}
            // initialValues={{
            //   remember: false,
            // }}
            disabled={componentDisabled}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label={
                <h5 style={{ color: "#0F123F", fontSize: "15px" }}>Judul</h5>
              }
              name="judul"
              rules={[
                {
                  required: true,
                  message: "panjang karakter minimal 10",
                  min: 10,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={
                <h5 style={{ color: "#0F123F", fontSize: "15px" }}>Foto</h5>
              }
              name="foto"
              rules={[
                {
                  required: false,
                  message: "Tolong upload poto terlebih dahulu",
                },
              ]}
              valuePropName="filelist"
            >
              <div>
                <Dragger {...handleUpload}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited
                    from uploading company data or other banned files.
                  </p>
                </Dragger>
                <div className="d-flex justify-content-start mx-2 align-items-center gap-4 w-100">
                  <h6 className="text-center font-weight-bold">
                    Foto sebelumnya :{" "}
                  </h6>
                  <Image
                    src={modalData.image}
                    width={"10%"}
                    height={"auto"}
                    preview={false}
                    className=""
                  />
                </div>
              </div>
            </Form.Item>
            <Form.Item
              label={
                <h5 style={{ color: "#0F123F", fontSize: "15px" }}>
                  Isi Berita
                </h5>
              }
              name="isi"
              rules={[
                {
                  required: false,
                  message: "Tolong Masukan Isi Berita",
                },
              ]}
            >
              {/* <Input.TextArea rows={4} /> */}
              <Suspense fallback={<SkeletonLoader />}>
                <TextEditor mode={"update"} data={modalData.body} />
              </Suspense>
            </Form.Item>
            <Form.Item>
              <div className="d-flex justify-content-between align-items-center">
                <Button onClick={handleCancel}>Batal</Button>
                <Button type="primary" htmlType="submit">
                  Posting
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Container>
      ) : null}
    </Modal>
  );
};
export default ModalUpdate;

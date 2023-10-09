import { Button, Modal, Typography, Form, Input, Upload, message } from "antd";
import React, { Suspense, useEffect, useState } from "react";
import { useModalTambahStore } from "../../store/storeModal";
import { Container } from "react-bootstrap";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { useBeritaStore } from "../../store/beritaStore";
import { useAuthPersist } from "../../store/authPersist";
import { useGetTextEditor } from "../../store/textEditorStore";
import SkeletonLoader from "./skeletonLoader";
import TextEditor from "./textEditor";
function ModalTambah(props) {
  const {
    mode,
    open,
    handleOk,
    handleCancel,
    onFinishFailed,
    onFinish,
    handleUpload,
    loadingBtn,
  } = props;
  const { Dragger } = Upload;
  //state management modal tambah
  const openModal = useModalTambahStore((state) => state.setOpenModal);
  const closeModal = useModalTambahStore((state) => state.setCloseModal);
  const modalState = useModalTambahStore((state) => state.isOpen);
  const { setResetModal, isReset } = useModalTambahStore((state) => state);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const { pesan, post, hasErrors, resetState } = useBeritaStore(
    (state) => state
  );
  const { accessToken, data } = useAuthPersist();
  const [form] = Form.useForm();
  const handleCancelTambahModal = () => {
    console.log("Clicked cancel button");
    setResetModal(true);
    closeModal();
  };
  const { setTambahMode, setIsiBerita } = useGetTextEditor((state) => state);
  useEffect(() => {
    let sub = true;
    if (isReset) {
      form.resetFields();
      setTambahMode();
    }
    return () => {
      sub = false;
    };
  }, [isReset]);

  return (
    <div>
      <Modal
        title={
          <div>
            {" "}
            <Typography.Title level={3}>Tambah Berita</Typography.Title>
            <hr />
          </div>
        }
        open={modalState}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={800}
        footer={false}
      >
        {mode == "berita" ? (
          <Container className="mt-2">
            <Form
              name="tambah"
              // initialValues={{
              //   remember: false,
              // }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
              form={form}
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
                <Input placeholder="Minimal 10 karakter" />
              </Form.Item>

              <Form.Item
                label={
                  <h5 style={{ color: "#0F123F", fontSize: "15px" }}>Foto</h5>
                }
                name="foto"
                rules={[
                  {
                    required: true,
                    message: "Tolong upload poto terlebih dahulu",
                  },
                ]}
                valuePropName="filelist"
              >
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
                    // message: "Tolong Masukan Isi Berita",
                  },
                ]}
              >
                {/* <Input.TextArea rows={6} placeholder="Minimal 100 karakter" showCount={true} /> */}
                <Suspense fallback={<SkeletonLoader />}>
                  <TextEditor mode={"tambah"} bodyBerita={setIsiBerita} />
                </Suspense>
              </Form.Item>
              <Form.Item>
                <div className="d-flex justify-content-end align-items-center mt-3 gap-4">
                  <Button onClick={handleCancelTambahModal} size="large">
                    Batal
                  </Button>
                  <Button type="primary" htmlType="submit" size="large" loading={loadingBtn}>
                    Posting
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Container>
        ) : null}
      </Modal>
    </div>
  );
}

export default ModalTambah;

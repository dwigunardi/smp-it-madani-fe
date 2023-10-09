import { Button, Modal } from "antd";
import { useState } from "react";
import { useModalDeleteStore } from "../../store/storeModal";
const ModalDelete = (props) => {
  const {handleCancel, handleOk, modalText} = props
  const {isOpen, mode, isLoading} = useModalDeleteStore((state) => state)

  return (
    <Modal
      title="Hapus Data Berita"
      open={isOpen}
      onOk={handleOk}
      confirmLoading={isLoading}
      onCancel={handleCancel}
    >
      <p>Apakah anda yakin ingin menghapus {modalText?.title}</p>
    </Modal>
  );
};
export default ModalDelete;

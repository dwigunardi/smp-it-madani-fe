import { Button, Card, Layout, Space, Table, Image, message } from "antd";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ModalTambah from "../../components/reusable/modalTambah";
import {
  useModalDeleteStore,
  useModalTambahStore,
  useModalUpdateStore,
} from "../../store/storeModal";
import { useAuthPersist } from "../../store/authPersist";
import { useBeritaStore } from "../../store/beritaStore";
import { FcInfo } from "react-icons/fc";
import { FaTrash } from "react-icons/fa";
import { BsFillCursorFill } from "react-icons/bs";
import { ColorPallete } from "../../utils/colorPalette";
import ModalDelete from "../../components/reusable/modalDelete";
import ModalUpdate from "../../components/reusable/modalUpdate";
import { useGetTextEditor } from "../../store/textEditorStore";
import TableView from "../../components/reusable/tableView";
import CardDashboard from "../../components/reusable/cardDashboard";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../../config/baseUrl";
const { Content } = Layout;

function DashboardBerita() {
  // data dari local storage
  const { data, accessToken } = useAuthPersist();
  //state managejement berita
  const {
    dataBerita,
    pager,
    deleteNews,
    fetch,
    pesan,
    post,
    putNews,
    hasErrors,
    resetState,
    status,
    fetchBySlug,
  } = useBeritaStore((state) => state);

  //handle modal tambah menggunakan state management
  const openModal = useModalTambahStore((state) => state.setOpenModal);
  const closeModal = useModalTambahStore((state) => state.setCloseModal);
  const { setResetModal, isReset } = useModalTambahStore((state) => state);
  const [fileUpload, setFileUpload] = useState([]);
  const [fileUpdate, setUpdateUpload] = useState([]);
  //handle mode modal
  const modalMode = useModalTambahStore((state) => state.mode);
  const setModalMode = useModalTambahStore((state) => state.setModeModal);

  // handle modal delete
  const { openModalDelete, closeModalDelete, setLoading, setDeleteModalMode } =
    useModalDeleteStore((state) => state);
  // handle modal update
  const {
    openModalUpdate,
    closeModalUpdate,
    setLoadingUpdate,
    setUpdateModalMode,
    setUpdateResetModal,
    isUpdateReset,
  } = useModalUpdateStore((state) => state);

  // hover button
  const [onHover, setHover] = useState(false);

  //table
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });
  const [page, setPage] = useState(1);
  const [isReadMore, setReadMore] = useState(true);

  //state delete modal
  const [deleteSlug, setDeleteSlug] = useState("initial state");
  const [isModalDeleteVisible, setVisibleModalDelete] = useState(false);

  // state updateModal
  const [updateSlug, setUpdateSlug] = useState("initial state");
  const [isUpdateVisible, setVisibleModalUpdate] = useState(false);

  // state text editor
  const { isiBerita, setIsiBerita, removeIsi } = useGetTextEditor(
    (state) => state
  );

  //state loading
  const [loadingPost, setLoadingPost] = useState(false)
  const columns = (deleteModal, updateModal) => {
    return [
      {
        key: "no",
        dataIndex: "no",
        title: "No",
        align: 'center',
        render: (t, r, index) => `${(page - 1) * pager.perPage + index + 1}`,
      },
      {
        title: "Judul",
        dataIndex: "title",
        key: "title",
        // render: (text) => <a>{text}</a>,
      },
      {
        title: "Author",
        dataIndex: "author",
        key: "author",
      },
      // {
      //   title: "Isi Berita",
      //   dataIndex: "body",
      //   key: "body",
      //   render: (_, record, idx) => {
      //     const toggleReadMore = () => {
      //       setReadMore(!isReadMore);
      //     };
      //     return (
      //       <div key={_}>
      //         <p>
      //           {isReadMore ? record?.body?.slice(0, 50) : record.body}
      //           <span
      //             onClick={toggleReadMore}
      //             style={{ color: "rgb(192,192,192)", cursor: "pointer" }}
      //           >
      //             {isReadMore ? "...read more" : " show less"}
      //           </span>
      //         </p>
      //       </div>
      //     );
      //   },
      // },
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
        width: "10%",
        render: (_, record) => {
          return (
            <div key={record.id} className="d-flex justify-content-center">
              <Image src={record.image} width={"100%"} height={"auto"} />
            </div>
          );
        },
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle" key={record.id}>
            <Link to={`/dashboard/berita/${record.slug}`}>
            <Button
              type="primary"
              icon={<FcInfo size={18} style={{ marginRight: 4 }} />}
              style={{ fontWeight: 500 }}
            >
              Detail
            </Button>
            </Link>
            <Button
              type="primary"
              onClick={() => updateModal(record)}
              icon={
                <BsFillCursorFill
                  size={18}
                  style={{ marginRight: 4, color: "white" }}
                />
              }
              style={{
                fontWeight: 500,
                borderColor: ColorPallete.darkPurple,
                color: "white",
                backgroundColor: ColorPallete.darkPurple,
              }}
            >
              Update
            </Button>
            <Button
              type="default"
              onClick={() => deleteModal(record)}
              icon={<FaTrash size={18} style={{ marginRight: 4 }} />}
              style={{
                fontWeight: 500,
                borderColor: ColorPallete.rose,
                backgroundColor: ColorPallete.rose,
                color: "white",
              }}
              className="ripple shadow-1-strong rounded"
              data-mdb-ripple-color="light"
            >
              Delete
            </Button>
          </Space>
        ),
      },
    ];
  };

  // handle tambah modal
  const handleCancelTambahModal = () => {
    console.log("Clicked cancel button");
    setResetModal(true);
    closeModal();
  };
  //handle form
  
  //handle upload tambah
  const handleUpload = {
    name: "file",
    multiple: false,
    action: false,
    listType: "picture",
    maxCount: 1,
    customRequest: (options) => {
      const { onSuccess, onError, file, onProgress } = options;
      setTimeout(() => {
        onSuccess("ok", "ini dummy upload");
      }, 0);
    },
    beforeUpload: (file) => {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png";
      if (!isJPG) {
        message.error("You can only upload JPG or PNG file!");
        return false;
      } else {
        return true;
      }
    },
    onChange(info) {
      const { status } = info.file;
      // if (status !== "uploading") {
      //   console.log(info.file, info.fileList);
      // }
      // if (status === "done") {
      //   message.success(`${info.file.name} file uploaded successfully.`);
      // } else if (status === "error") {
      //   message.error(`${info.file.name} file upload failed.`);
      // }
      console.log("ini info upload =>", info);
      setFileUpload(info.file.originFileObj);
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const deleteModal = (slug) => {
    // console.log(slug)
    if (slug) {
      setDeleteSlug(slug);
      openModalDelete();
    } else {
      closeModalDelete();
    }
  };

  const handleOkModalDelete = async () => {
    setLoading(true);
    try {
      await deleteNews(deleteSlug.slug, accessToken);
      await fetch();
      await setLoading(false);
      setTimeout(() => {
        message.success(pesan);
      }, 2000);
      closeModalDelete();
    } catch (error) {
      console.log(error);
      closeModalDelete();
      fetch();
      setLoading(false);
    }
  };
  const handleCancelModalDelete = () => {
    console.log("Clicked cancel button");
    closeModalDelete();
  };

  // handle update
  const handleCancelModalUpdate = () => {
    console.log("Clicked cancel button update");
    setUpdateSlug("initial state");
    setResetModal(true);
    closeModalUpdate();
  };

  const updateModal = (slug) => {
    // console.log(slug)
    if (slug) {
      fetchBySlug(slug.slug).then(res => setIsiBerita(res.data.body))
      setUpdateSlug(slug);
      openModalUpdate();
      setResetModal(false);
    } else {
      setUpdateSlug("initial state");
      closeModalUpdate();
    }
  };
  const handleUploadUpdate = {
    name: "file",
    multiple: false,
    action: false,
    listType: "picture",
    maxCount: 1,
    customRequest: (options) => {
      const { onSuccess, onError, file, onProgress } = options;
      setTimeout(() => {
        onSuccess("ok", "ini dummy upload");
      }, 0);
    },
    beforeUpload: (file) => {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png";
      if (!isJPG) {
        message.error("You can only upload JPG or PNG file!");
        return false;
      } else {
        return true;
      }
    },
    onChange(info) {
      const { status } = info.file;
      console.log("ini info upload =>", info);
      setUpdateUpload(info.file.originFileObj);
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const onFinishUpdateModal = async (values) => {
    try {
      console.log("Success:", values);
      const formData = new FormData();
      await formData.append("title", values.judul);
      await formData.append("body", values.isi);
      await formData.append("_method", "put");
      await formData.append("image", fileUpdate || values.foto);
      const data = {
        title: values.judul,
        body: isiBerita,
        _method: "put",
        image: fileUpdate || values.foto,
      };
      setUpdateSlug("initial state");
      await putNews(data, accessToken, updateSlug.slug);
      if (hasErrors) {
        await message.warning(
          pesan?.message ||
            pesan?.errors.body ||
            pesan?.errors.title ||
            pesan?.message
        );
      } else {
        message.success("Berita Berhasil Di Update!");
        fetch();
        resetState();
        closeModalUpdate();
      }
    } catch (error) {
      if (error.status == 400 || error.status == 401) {
        console.log(error, "ini axios");
        message.error(
          error.response.data.errors.title ||
            error.response.data.errors.body ||
            "Bidang judul dan isi harus di ubah"
        );
        setUpdateSlug("initial state");
        resetState();
      } else {
        setUpdateSlug("initial state");
        resetState();
        closeModalUpdate();
      }
    }
  };
  const onFinishTambahModal = async (values) => {
    try {
      setLoadingPost(true)
      console.log("Success:", values);
      const formData = new FormData();
      formData.append("title", values.judul);
      formData.append("body", isiBerita);
      formData.append("image", values.foto.file.originFileObj);
      await axios.post(baseurl + '/news', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then(res => {
        if(res.status == 200 || res.status == 201){
          console.log(res)
          fetch();
          removeIsi();
          setLoadingPost(false)
          message.success(res.data.message)
          closeModal()
        }
      })
      // await post(formData, accessToken);
      // // console.log(pesan)
      // if (hasErrors) {
      //   await message.warning(pesan.body || pesan.title || pesan.image);
      //   await removeIsi();
      // } else if(status == 'berhasil') {
      //   await message.success("Berita Berhasil Di Buat!");
      //   await fetch();
      //   await resetState();
      //   await removeIsi();
      //   await closeModal();
      // }
    } catch (error) {
      if (error) {
        console.log(error, "ini axios");
        let msg = error.response.data.errors
        message.error(msg?.body || msg?.title || msg?.image)
        resetState();
        removeIsi();
        setLoadingPost(false)
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setLoadingPost(false)
  };
  const handleOpenTambah = () => {
    setResetModal(false);
    openModal();
  };


  useEffect(() => {
    let mount = true;
    fetch();
    return () => {
      mount = false;
    };
  }, [pesan, status]);
  // console.log(accessToken, "baahaha");
  return (
    <div>
      <CardDashboard titleCard={"Berita"} extraButton={true} actionModal={openModal} mode="berita" >
        <TableView
          columns={columns(deleteModal, updateModal)}
          dataSource={dataBerita}
          pagination={{
            onChange(current) {
              console.log(current, "ini pagination");
              setPage(current);
            },
          }}
          mode="berita"
        />
      </CardDashboard>
      <ModalTambah
        mode={modalMode}
        onFinishFailed={onFinishFailed}
        onFinish={onFinishTambahModal}
        handleUpload={handleUpload}
        handleCancel={handleCancelTambahModal}
        loadingBtn={loadingPost}
      />
      <ModalDelete
        mode={"berita"}
        handleCancel={handleCancelModalDelete}
        handleOk={handleOkModalDelete}
        modalText={deleteSlug}
      />
      <ModalUpdate
        mode={"berita"}
        handleCancel={handleCancelModalUpdate}
        onFinish={onFinishUpdateModal}
        onFinishFailed={onFinishFailed}
        modalData={updateSlug}
        isFormReady={updateSlug.id ? "ready" : "belum"}
        handleUpload={handleUploadUpdate}
        fileUpload={fileUpdate}
      />
    </div>
  );
}

export default DashboardBerita;

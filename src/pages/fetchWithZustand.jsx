import { Spin, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useStore } from "../store/example";
function FetchWithZustand() {
  const data = useStore((state) => state.data);
  const loading = useStore((state) => state.loading);
  const hasErrors = useStore((state) => state.hasErrors);
  const fetchData = useStore((state) => state.fetch);

  useEffect(() => {
    let mount = true
    if(data.length < 2){
      fetchData()
    }
   
    return () => {
      mount = false
    };
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "Phone",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "Username",
    },
    // {
    //   title: 'Company',
    //   key: 'company',
    //   dataIndex: 'company',
    //   render: (_, record) => (
    //     <>
    //       {record.map((data) => {
    //        return (
    //         <Row>
    //             <Col><Typography.Text>{data.name}</Typography.Text></Col>
    //             <Col><Typography.Text>{data.bs}</Typography.Text></Col>
    //             <Col><Typography.Text>{data.catchPhrase}</Typography.Text></Col>
    //         </Row>
    //        )
    //       })}
    //     </>
    //     )
    // },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a>Invite {record.name}</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];
  if(loading){
    return <div style={{display:'flex', justifyContent:'center', justifySelf:'center', alignSelf:'center', alignItems:'center', alignContent:'center', height:'100vh',}}><Spin  size="large" /></div>
  }else if(hasErrors){
    return <Typography.Title>There some error</Typography.Title>
  }
  return (
    <div>
      <Typography.Title code>Fetch with zustand example</Typography.Title>
      <Table dataSource={data} columns={columns}  rowKey="id" />
      <Link to={"/"}>
        <p>Back to home</p>
      </Link>
    </div>
  );
}

export default FetchWithZustand;

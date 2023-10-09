import React, { useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";
import { ColorPallete } from "../../utils/colorPalette";
import FormatRupiah from "../reusable/formatNumber";
import { useEffect } from "react";
import { baseurl } from "../../config/baseUrl";
import axios from "axios";
import { useAuthPersist } from "../../store/authPersist";
function PieChartDashboard(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dataPie, setDataPie] = useState([
    { name: "Kas", value: 400 },
    { name: "Penerimaan", value: 300 },
    { name: "Pengeluaran", value: 300 },
  ]);
  const { data } = useAuthPersist();
  const accessToken = data[0].credential.accessToken;
  const totalValue = dataPie.reduce((sum, entry) => sum + entry.value, 0);
  const positiveValues = dataPie.filter((entry) => entry.value > 0); // Filter out positive values only
  const totalPositiveValue = positiveValues.reduce(
    (sum, entry) => sum + entry.value,
    0
  ); // Calculate total positive value
  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 20) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
    const positivePercentage = (value / totalPositiveValue) * 100;
    const percentage = Math.min(positivePercentage, 100);
    const newEndAngle = startAngle + (Math.PI * 2 * percentage) / 100;
    return (
      <g>
        <text
          x={cx}
          y={cy}
          dy={1}
          textAnchor="middle"
          fill={fill}
          style={{ fontWeight: "bold" }}
        >
          {payload.name == "Pemasukan" ? "Penerimaan" : payload.name}
        </text>
        <text x={cx} y={cy} dy={20} textAnchor="middle" fill={fill}>
          {/* {`(Rate ${(percent * 100).toFixed(2)}%)`} */}
          {`(Rate ${percentage.toFixed(2)}%)`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={newEndAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 2}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >
          {`(${FormatRupiah(value)})`}
        </text>
        {/* <text
          x={ex + (cos >= 0 ? 1 : -1) * 5}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text> */}
      </g>
    );
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  const pieColor = [
    ColorPallete.lightBlue,
    ColorPallete.green,
    ColorPallete.rose,
  ];

  useEffect(() => {
    let controler = new AbortController();
    const fetchData = async () => {
      try {
        const requests = axios
          .get(baseurl + "/dashboard/pie-chart", {
            headers: { Authorization: `Bearer ${accessToken}` },
            signal: controler.signal,
          })
          .then((res) => {
            if (res.status == 200 || res.status == 201) {
              setDataPie(res.data.data);
            }
          });
        // axios.get(baseurl + "/dashboard/all-total", {
        //   headers: { Authorization: `Bearer ${accessToken}` },
        //   signal: controler.signal,
        // }),
        // axios.get(baseurl + "/rekapitulasi?status=success|pending&kelas=3", {
        //   headers: { Authorization: `Bearer ${accessToken}` },
        //   signal: controler.signal,
        // }),
        // ];
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    return () => {
      controler.abort();
    };
  }, []);

  // console.log(dataPie);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={200} height={300}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={dataPie}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill={pieColor}
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
          {dataPie.map((entry, index) => (
            <Cell fill={pieColor[index % pieColor.length]} key={index} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieChartDashboard;

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ColorPallete } from "../../utils/colorPalette";
import axios from "axios";
import { baseurl } from "../../config/baseUrl";
import { useAuthPersist } from "../../store/authPersist";
import FormatRupiah from "../reusable/formatNumber";

function LineChartDashboard() {
  const [dataLine, setDataLine] = useState([
    {
      name: "Januari",
      pemasukan: 376,
      pengeluran: 302,
      kas: 70,
    },
    {
      name: "Februari",
      pemasukan: 300,
      pengeluran: 120,
      kas: 90,
    },
    {
      name: "Maret",
      pemasukan: 278,
      pengeluran: 189,
      kas: 20,
    },
    {
      name: "April",
      pemasukan: 330,
      pengeluran: 279,
      kas: 120,
    },
    {
      name: "Mei",
      pemasukan: 456,
      pengeluran: 220,
      kas: 99,
    },
    {
      name: "Juni",
      pemasukan: 222,
      pengeluran: 78,
      kas: 10,
    },
    {
      name: "Juli",
      pemasukan: 300,
      pengeluran: 20,
      kas: 109,
    },
    {
      name: "Agustus",
      pemasukan: 392,
      pengeluran: 107,
      kas: 200,
    },
    {
      name: "September",
      pemasukan: 203,
      pengeluran: 228,
      kas: 200,
    },
    {
      name: "Oktober",
      pemasukan: 40,
      pengeluran: 300,
      kas: 150,
    },
    {
      name: "November",
      pemasukan: 500,
      pengeluran: 40,
      kas: 400,
    },
    {
      name: "Desember",
      pemasukan: 400,
      pengeluran: 302,
      kas: 398,
    },
  ]);
  const { data } = useAuthPersist();
  const accessToken = data[0].credential.accessToken;

  const customXTick = (props) => {
    const { x, y, stroke, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    );
  };
  useEffect(() => {
    let controler = new AbortController();
    const fetchData = async () => {
      try {
        const requests = axios
          .get(baseurl + "/dashboard/line-chart", {
            headers: { Authorization: `Bearer ${accessToken}` },
            signal: controler.signal,
          })
          .then((res) => {
            if (res.status == 200 || res.status == 201) {
              setDataLine(res.data.data);
            }
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    return () => {
      controler.abort();
    };
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      console.log(payload);
      return (
        <div className="custom-tooltip bg-white border border-primary p-3">
          <p className="label">{`${label}`}</p>
          <p style={{ color: payload[0].color }}>{`kas: ${FormatRupiah(
            payload[0].value
          )}`}</p>
          <p style={{ color: payload[1].color }}>{`penerimaan:  ${FormatRupiah(
            payload[1].value
          )}`}</p>
          <p style={{ color: payload[2].color }}>{`pengeluaran: ${FormatRupiah(
            payload[2].value
          )}`}</p>
        </div>
      );
    }

    return null;
  };
  const formatYAxisTick = (value) => {
    if (value >= 1e9) {
      return "Rp." + (value / 1e9).toFixed(1) + " Miliar";
    } else if (value >= 1e6) {
      return "Rp." + (value / 1e6).toFixed(1) + " Juta";
    } else if (value >= 1e3) {
      return "Rp." + (value / 1e3).toFixed(1) + " Ribu";
    } else {
      return "Rp." + value.toFixed(0);
    }
  };
  return (
    <ResponsiveContainer minWidth={200} height={"100%"} maxHeight={500}>
      <LineChart
        width={600}
        height={400}
        data={dataLine}
        margin={{
          top: 5,
          right: 10,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" height={90} interval={0} tick={customXTick} />
        <YAxis width={100} tickFormatter={formatYAxisTick} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="kas"
          name="Kas"
          stroke={ColorPallete.lightBlue}
          strokeWidth={"3px"}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="pemasukan"
          name="Penerimaan"
          stroke={ColorPallete.green}
          strokeWidth={"3px"}
        />
        <Line
          type="monotone"
          dataKey="pengeluran"
          name="Pengeluaran"
          stroke={ColorPallete.rose}
          strokeWidth={"3px"}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineChartDashboard;

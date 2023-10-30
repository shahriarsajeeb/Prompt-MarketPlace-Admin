import { generateLast12MonthsOrderData } from "@/actions/analytics/ordersAnalytics";
import { styles } from "@/utils/styles";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  isDashboard?: boolean;
};

export default function OrdersAnalytics({ isDashboard }: Props) {
  const [data, setData] = useState<any>();

  useEffect(() => {
    generateLast12MonthsOrderData()
      .then((res) => {
        setData(res.last12Months);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  data?.last12Months?.forEach((item: any) => {
    data?.last12Months?.push({ month: item.month, count: item.count });
  });

  return (
    <>
      {" "}
      <div className={isDashboard ? "h-[30vh]" : "h-screen"}>
        <div className={isDashboard ? "mt-[0px] pl-[40px] mb-2" : "mt-[50px]"}>
          <h1
            className={`${styles.title} ${
              isDashboard && "!text-[20px]"
            } px-5 !text-start`}
          >
            Orders Analytics
          </h1>
        </div>
        <div
          className={`w-full ${
            !isDashboard ? "h-[90%]" : "h-full"
          } flex items-center justify-center`}
        >
          {data ? (
            <>
              <ResponsiveContainer width={"100%"} height={"100%"}>
                <LineChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </>
          ) : (
            <div>Loading....</div>
          )}
        </div>
      </div>
    </>
  );
}

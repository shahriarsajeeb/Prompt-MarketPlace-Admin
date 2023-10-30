"use client";
import React, { FC, useEffect, useState } from "react";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import AllInvoices from "./AllInvoices";
import UserAnalytics from "@/components/Admin/UserAnalytics";
import OrdersAnalytics from "@/components/Admin/OrdersAnalytics";
import { generateLast12MonthsOrderData } from "@/actions/analytics/ordersAnalytics";
import { generateLast12MonthsUserData } from "@/actions/analytics/userAnalytics";

type Props = {
  open?: boolean;
  value?: number;
  data?: any;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open, data }) => {
  const [ordersComparePercentage, setOrdersComparePercentage] = useState<any>();
  const [userComparePercentage, setuserComparePercentage] = useState<any>();
  const [ordersData, setordersData] = useState<any>();
  const [usersData, setUsersData] = useState<any>();

  useEffect(() => {
    generateLast12MonthsOrderData()
      .then((res) => {
        setordersData(res.last12Months);
        const ordersLastTwoMonths = res.last12Months.slice(-2);
        if (ordersLastTwoMonths.length === 2) {
          const ordersCurrentMonth = ordersLastTwoMonths[1].count;
          const ordersPreviousMonth = ordersLastTwoMonths[0].count;

          const ordersPercentChange =
            ordersPreviousMonth !== 0
              ? ((ordersCurrentMonth - ordersPreviousMonth) /
                  ordersPreviousMonth) *
                100
              : 100;
          setOrdersComparePercentage({
            currentMonth: ordersCurrentMonth,
            previousMonth: ordersPreviousMonth,
            percentChange: ordersPercentChange,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    generateLast12MonthsUserData()
      .then((res: any) => {
        setUsersData(res.last12Months);

        const usersLastTwoMonths = res.last12Months.slice(-2);
        if (usersLastTwoMonths.length === 2) {
          const usersCurrentMonth = usersLastTwoMonths[1].count;
          const usersPreviousMonth = usersLastTwoMonths[0].count;

          const usersPercentChange =
            usersPreviousMonth !== 0
              ? ((usersCurrentMonth - usersPreviousMonth) /
                  usersPreviousMonth) *
                100
              : 100;
          setuserComparePercentage({
            currentMonth: usersCurrentMonth,
            previousMonth: usersPreviousMonth,
            percentChange: usersPercentChange,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="mt-[5px] min-h-screen">
        <div className="grid grid-cols-[75%,25%]">
          <div className="p-8">
            <UserAnalytics isDashboard={true} />
          </div>

          <div className="pt-[80px] pr-8">
            <div className="w-full bg-[#111C43] rounded-sm shadow">
              <div className="flex items-center p-5 justify-between">
                <div className="">
                  <BiBorderLeft className="text-[#45CBA0] text-[30px]" />
                  <h5 className="pt-2 font-Poppins text-[#fff] text-[20px]">
                    {ordersData
                      ? ordersData[ordersData?.length - 1].count
                      : "..."}
                  </h5>
                  <h5 className="py-2 font-Poppins text-[#45CBA0] text-[17px] font-[400]">
                    Sales Obtained
                  </h5>
                </div>
                <div>
                  <CircularProgressWithLabel
                    value={ordersComparePercentage?.percentChange > 0 ? 100 : 0}
                    open={open}
                  />
                  <h5 className="text-center text-[15px] pt-4">
                    {!ordersComparePercentage && "..."}
                    {ordersComparePercentage?.percentChange > 0
                      ? "+" + ordersComparePercentage?.percentChange.toFixed(2)
                      : ordersComparePercentage?.percentChange.toFixed(2)}{" "}
                    {ordersComparePercentage && "%"}
                  </h5>
                </div>
              </div>
            </div>

            <div className="w-full bg-[#111C43] rounded-sm shadow my-8">
              <div className="flex items-center p-5 justify-between">
                <div className="">
                  <PiUsersFourLight className="text-[#45CBA0] text-[30px]" />
                  <h5 className="pt-2 font-Poppins text-[#fff]  text-[20px]">
                    {usersData ? usersData[usersData?.length - 1].count : "..."}
                  </h5>
                  <h5 className="py-2 font-Poppins text-[#45CBA0] text-[17px] font-[400]">
                    New Users
                  </h5>
                </div>
                <div>
                  <CircularProgressWithLabel
                    value={userComparePercentage?.percentChange > 0 ? 100 : 0}
                    open={open}
                  />
                  <h5 className="text-center text-[15px] pt-4">
                    {!userComparePercentage && "..."}
                    {userComparePercentage?.percentChange > 0
                      ? "+" + userComparePercentage?.percentChange.toFixed(2)
                      : userComparePercentage?.percentChange.toFixed(2)}{" "}
                    {userComparePercentage && "%"}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[65%,34%] mt-[-20px]">
          <div className="bg-[#111c43] w-[94%] mt-[30px] h-[43vh] shadow-sm m-auto">
            <OrdersAnalytics isDashboard={true} />
          </div>
          <div className="p-3">
            <h5 className="text-[#fff] text-[20px] font-[400] font-Poppins pb-3">
              Recent Transactions
            </h5>
            <AllInvoices isDashboard={true} data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardWidgets;

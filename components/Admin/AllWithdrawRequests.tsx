"use client";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Modal } from "@mui/material";
import { BsPencil } from "react-icons/bs";
import { IoMdPaper } from "react-icons/io";
import { styles } from "@/utils/styles";
import { format } from "timeago.js";
import { updateWithDrawStatus } from "@/actions/withdraws/updateWithdrawStatus";
import toast from "react-hot-toast";

const AllWithdrawRequests = ({ withdraws }: { withdraws: any }) => {
  const [open, setOpen] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [status, setStatus] = useState("");
  const [activeShop, setActiveShop] = useState<any>();
  const [withdraw, setWithdraw] = useState<any>();

  const handleUpdateStatus = async () => {
    if (status === "") {
      return;
    } else {
      await updateWithDrawStatus({ id: withdraw?.id, status }).then(
        (res: any) => {
          if (res) {
            toast.success("Status updated successfully!");
            window.location.reload();
          } else {
            toast.error("Something went wrong!");
          }
        }
      );
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.3 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "amount", headerName: "Amount", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "",
      headerName: "Update status",
      flex: 0.5,
      renderCell: (params: any) => {
        return (
          <div
            className="w-full flex items-center"
            onClick={() => {
              setOpen(!open);
              setWithdraw(params.row);
            }}
          >
            <span>{params?.row.status}</span>
            <BsPencil className="text-sm cursor-pointer ml-2" />
          </div>
        );
      },
    },
    {
      field: " ",
      headerName: "Payment Details",
      flex: 0.5,
      renderCell: (params: any) => {
        return (
          <div className="w-[60%] flex justify-center">
            <IoMdPaper
              className="text-xl cursor-pointer"
              onClick={() => {
                setWithdrawModal(!withdrawModal);
                setActiveShop(params.row.shop);
              }}
            />
          </div>
        );
      },
    },
  ];

  const rows: any = [];

  withdraws &&
    withdraws.forEach((withdraw: any) => {
      rows.push({
        id: withdraw.id,
        name: withdraw?.shop.name,
        email: withdraw?.shop.emailAddress,
        status: withdraw?.status,
        amount: "US$" + withdraw.amount,
        created_at: format(withdraw.createdAt),
        shop: withdraw?.shop,
      });
    });

  return (
    <>
      <Box m="20px">
        <Box
          m="40px 0 0 0"
          height="90vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              outline: "none",
            },
            "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
              color: "#fff",
            },
            "& .MuiDataGrid-sortIcon": {
              color: "#fff",
            },
            "& .MuiDataGrid-row": {
              color: "#fff",
              borderBottom: "1px solid #ffffff30!important",
            },
            "& .MuiTablePagination-root": {
              color: "#fff",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none!important",
            },
            "& .name-column--cell": {
              color: "#fff",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#3e4396",
              borderBottom: "none",
              color: "#fff",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#1F2A40",
            },
            "& .MuiDataGrid-footerContainer": {
              color: "dark",
              borderTop: "none",
              backgroundColor: "#3e4396",
            },
            "& .MuiCheckbox-root": {
              color: `#b7ebde !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `#fff !important`,
            },
          }}
        >
          <DataGrid checkboxSelection rows={rows} columns={columns} />
        </Box>
      </Box>

      {open && (
        <Modal
          open
          onClose={() => setOpen(!open)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="w-full flex fixed top-0 left-0 h-screen z-[999999999999]"
        >
          <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-slate-900 rounded-[8px] shadow p-4 outline-none">
            <h1 className="text-2xl font-bold text-center text-white">
              Update Withdraw Status
            </h1>
            <select
              name=""
              id=""
              value={withdraw?.status}
              className={`${styles.input} !mt-6 bg-transparent border rounded p-2`}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Processing">Processing</option>
              <option value="Sent">Sent</option>
            </select>
            <br />
            <button
              className={`${styles.button} bg-[#3f4cda] my-6 !h-[35px]`}
              onClick={handleUpdateStatus}
            >
              Submit
            </button>
          </Box>
        </Modal>
      )}
      {withdrawModal && (
        <Modal
          open
          onClose={() => setWithdrawModal(!withdrawModal)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="w-full flex fixed top-0 left-0 h-screen z-[999999999999]"
        >
          <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-slate-900 rounded-[8px] shadow p-4 outline-none">
            <h1 className="text-2xl font-bold text-center text-white">
              Payment Details
            </h1>
            <br />
            <p className={`${styles.label}`}>
              Account Holder Name: {activeShop?.bank?.account_holder_name}
            </p>
            <p className={`${styles.label}`}>
              Bank Name: {activeShop?.bank?.bank_name}
            </p>
            <p className={`${styles.label}`}>
              Account Number: {activeShop?.bank?.account_number}
            </p>
            <p className={`${styles.label}`}>
              Routing Number: {activeShop?.bank?.routing_number}
            </p>
            <p className={`${styles.label}`}>
              Swift Code: {activeShop?.bank?.swift_code}
            </p>
            <p className={`${styles.label}`}>
              Bank Address: {activeShop?.bank?.bank_address}
            </p>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default AllWithdrawRequests;

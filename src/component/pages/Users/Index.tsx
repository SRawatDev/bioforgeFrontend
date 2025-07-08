// Index.tsx
import React, { useEffect, useState } from "react";
import ErrorMessage from "../../../helpers/ErrorMessage";
import SuccessMessage from "../../../helpers/Success";
import { callAPI } from "../../../utils/apicall.utils";
import { apiUrls } from "../../../utils/api.utils";
import { TablePagination } from "@mui/material";
import LoadScreen from "../../loaderScreen";
import Delete from "./Delete";

export interface Welcome {
  _id: string;
  username: string;
  email: string;
  status: string;
  reportStatus: string;
}

const Index = () => {
  const [users, setUsers] = useState<Welcome[]>([]);
  const [selectedUser, setSelectedUser] = useState<Welcome | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [loader, setLoader] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const getUser = async (currentPage: number, perPage: number) => {
    const query = {
      page: currentPage + 1,
      limit: perPage,
    };
    setLoader(true);
    try {
      const response = await callAPI(apiUrls.getAllUser, query, "GET", {});
      setLoader(false);
      if (!response?.data?.status) {
        ErrorMessage(response?.data?.message);
      } else {
        setUsers(response?.data?.data?.getData || []);
        setTotalUsers(response?.data?.data?.count || 0);
      }
    } catch (err: any) {
      setLoader(false);
      ErrorMessage(err.message || "Something went wrong");
    }
  };
  const confirmStatus = async (item: Welcome) => {
    try {
      setLoader(true);
      const res = await callAPI(
        apiUrls.userStatusUpdate,
        { _id: item._id },
        "GET",
        {}
      );
      setLoader(false);
      if (res?.data?.status) {
        SuccessMessage(res.data.message);
        getUser(page, rowsPerPage);
      } else {
        ErrorMessage(res.data.message);
      }
    } catch (err: any) {
      setLoader(false);
      ErrorMessage(err.message || "Status update failed");
    }
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;
    try {
      setLoader(true);
      const res = await callAPI(
        apiUrls.admindeleteUser,
        { _id: selectedUser._id },
        "DELETE",
        {}
      );
      setLoader(false);
      if (res?.data?.status) {
        SuccessMessage(res.data.message);
        setDeleteOpen(false);
        getUser(page, rowsPerPage);
      } else {
        ErrorMessage(res.data.message);
      }
    } catch (err: any) {
      setLoader(false);
      ErrorMessage(err.message || "Delete failed");
    }
  };

  useEffect(() => {
    getUser(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (user: Welcome) => {
    setSelectedUser(user);
    setDeleteOpen(true);
  };
  const userReport = (item: string) => {
    if (item == "true") {
      return "Report";
    } else {
      return "Not Report";
    }
  };

  return (
    <>
      {loader && <LoadScreen />}
      <div className="container mt-4">
        <h4 className="mb-3">User List</h4>
        {users.length > 0 ? (
          <>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>User Report</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id}>
                      <td>{page * rowsPerPage + index + 1}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td
                        onClick={() => confirmStatus(user)}
                        style={{
                          cursor: "pointer",
                          color: user.status === "active" ? "#07bc0c" : "red",
                        }}
                      >
                        {user.status}
                      </td>
                      <td
                        style={{
                          cursor: "pointer",
                          color:
                            user.reportStatus === "active" ? "#07bc0c" : "red",
                        }}
                      >
                        {userReport(user.reportStatus)}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(user)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 25, 100]}
              component="div"
              count={totalUsers}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        ) : (
          <p>No users found.</p>
        )}
      </div>
      {selectedUser && (
        <Delete
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          confirmDetail={confirmDelete}
          linkDetail={selectedUser}
        />
      )}
    </>
  );
};

export default Index;

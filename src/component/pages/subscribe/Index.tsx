import React, { useEffect, useState } from "react";
import { callAPI } from "../../../utils/apicall.utils";
import ErrorMessage from "../../../helpers/ErrorMessage";
import { apiUrls } from "../../../utils/api.utils";
import { FiLink2 } from "react-icons/fi";
import LinkShimmer from "../../LinkShimmer";
import { TablePagination } from "@mui/material";

interface LinkItem {
  email?: string;
}

const Index: React.FC = () => {
  const [non_socialData, setnonSocialData] = useState<LinkItem[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [paginatedItems, setPaginatedItems] = useState<number>(0);
  const [loader, setLoader] = useState(false);
  const [search] = useState<string>(""); // optional search param

  const Detail = async (
    newPage: number = 1,
    limit: number = 10,
    searchText: string = ""
  ) => {
    setLoader(true);
    try {
      const response = await callAPI(
        apiUrls.getAllsubscribe,
        { page: newPage, limit, search: searchText },
        "GET",
        {}
      );
      setLoader(false);
      if (response?.data?.status) {

        setnonSocialData(response?.data?.data?.subscribersEmail || []);
        setPaginatedItems(response?.data?.data?.totalSubscriber || 0); // total items for pagination
      } else {
        ErrorMessage(response?.data?.message);
      }
    } catch (err: any) {
      setLoader(false);
    }
  };

  useEffect(() => {
    Detail(page, rowsPerPage, search);
  }, [page, rowsPerPage, search]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1); 
  };

  return (
    <div className="links-page-container">
      <div className="links-page-content">
        <div className="links-header">
          <div className="header-top">
            <div className="header-brand">
              <img
                className="links-logo"
                src="/assets/logo.png"
                alt="BioForge Logo"
              />
            
            </div>
          </div>
        </div>
        {loader ? (
          <LinkShimmer />
        ) : (
          <div className="links-sections">
            {non_socialData.length > 0 && (
              <div className="links-section">
                <div className="links-list social-links-list gap-2">
                  {non_socialData.map((item, i) => (
                    <div key={i} className="link-item active sublinkeitem">
                      <div className="link-item-content">
                        <div className="link-item-details">
                          <div className="link-title-container">
                            <div className=" d-flex justify-content-unset gap-2">

                            <p>{i+1}:</p>
                            <h3 className="link-title">{item.email}</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {non_socialData.length > 0 && (
              <div className="d-flex align-items-center justify-content-end bottom_nav">
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15, 25, 100]}
                  component="div"
                  count={paginatedItems}
                  rowsPerPage={rowsPerPage}
                  page={page - 1}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
            )}

            {non_socialData.length === 0 && !loader && (
              <div className="no-links">
                <div className="no-links-content">
                  <div className="empty-state-icon">
                    <FiLink2 />
                  </div>
                  <h3>No Subscriber</h3>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

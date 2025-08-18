import React, { useEffect, useState } from "react";
import { callAPI } from "../../../utils/apicall.utils";
import ErrorMessage from "../../../helpers/ErrorMessage";
import { apiUrls } from "../../../utils/api.utils";
import { useDebounce } from "use-debounce";
import { FiLink2, FiUsers, FiMail, FiSearch, FiX } from "react-icons/fi";
import LinkShimmer from "../../LinkShimmer";
import { TablePagination } from "@mui/material";
import "./subscribe.css"; // Import the CSS file

interface LinkItem {
  email?: string;
}

const Index: React.FC = () => {
  const [non_socialData, setnonSocialData] = useState<LinkItem[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [paginatedItems, setPaginatedItems] = useState<number>(0);
  const [loader, setLoader] = useState(false);

  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [debouncedSearch] = useDebounce(searchInput, 500); 
  useEffect(() => {
    setSearch(debouncedSearch.trim());
    setPage(1); 
  }, [debouncedSearch]);

  // Search change handler
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  // Clear search
  const clearSearch = () => {
    setSearchInput("");
    setSearch("");
    setPage(1);
  };



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
        setPaginatedItems(response?.data?.data?.totalSubscriber || 0);
      } else {
        ErrorMessage(response?.data?.message);
      }
    } catch (err: any) {
      setLoader(false);
    }
  };

  ;

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
    <div className="subscribes-page-container">
      <div className="subscribes-page-content">
        <div className="subscribes-header">
          <div className="header-top">
            <div className="header-brand">
              <img
                className="subscribes-logo"
                src="/assets/logo.png"
                alt="BioForge Logo"
              />
              <div className="brand-text">Subscribers</div>
            </div>
            <div className="header-stats">
              <div className="subscriber-count">
                <h2>
                  <FiUsers className="count-icon" />
                  Total Subscribers: <span className="count-number">{paginatedItems}</span>
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="search-section">
          <div className="search-container">
            <div className="search-input-wrapper">
              <FiSearch className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search subscribers by email..."
                value={searchInput}
                onChange={handleSearchChange}
              />
              {searchInput && (
                <button
                  className="clear-search-btn"
                  onClick={clearSearch}
                  aria-label="Clear search"
                >
                  <FiX />
                </button>
              )}
            </div>
            {search && (
              <div className="search-results-info">
                <span>Showing results for: "<strong>{search}</strong>"</span>
                <button onClick={clearSearch} className="clear-search-text">
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
        {loader ? (
          <LinkShimmer />
        ) : (
          <div className="subscribes-sections">
            {non_socialData.length > 0 && (
              <div className="subscribes-section">
                <div className="subscribes-list social-subscribes-list gap-2">
                  {non_socialData.map((item, i) => (
                    <div key={i} className="subscribe-item active sublinkeitem">
                      <div className="subscribe-item-content">
                        <div className="subscribe-item-details">
                          <div className="subscribe-title-container">
                            <div className="serial-number">{i + 1}</div>
                            <FiMail className="email-icon" />
                            <h3 className="subscribe-title">{item.email}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {non_socialData.length > 0 && (
              <div className="d-flex align-items-center justify-content-end ">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 15, 25, 100]}
                      component="div"
                      count={paginatedItems}
                      rowsPerPage={rowsPerPage}
                      page={page - 1}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </ul>
                </nav>
              </div>
            )}

            {non_socialData.length === 0 && !loader && (
              <div className="no-subscribes">
                <div className="no-subscribes-content">
                  <div className="empty-state-icon">
                    {search ? <FiSearch /> : <FiUsers />}
                  </div>
                  <h3>{search ? `No results found for "${search}"` : "No Subscribers Yet"}</h3>
                  <p>{search ? "Try adjusting your search terms or check the spelling." : "When users subscribe to your content, they'll appear here."}</p>
                  {search && (
                    <button className="clear-search-btn-large" onClick={clearSearch}>
                      Clear Search
                    </button>
                  )}
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
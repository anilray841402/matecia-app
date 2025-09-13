import {
  CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilCheckCircle } from '@coreui/icons';

import { useState, useEffect } from 'react';
import apiClient from '../../service/apiClient';

const ReopenRequest = () => {

  const [reopenRequest, setReopenRequest] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [successUpdateMessage, setSuccessUpdateMessage] = useState('');
  const [errorUpdateMessage, setErrorUpdateMessage] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchReopenRequestData();
  }, []);

  const fetchReopenRequestData = async () => {
    try {
      const res = await apiClient.fetchReopenRequest();
      if (res.success) {
        setReopenRequest(res.data);
      }
    } catch (err) {
      console.error('Error fetching booth design:', err);
    }
  };

  const handleApprove = async (id) => {
    const res = await apiClient.updateReopenRequest(id, 3);
    if (res.success) {
      fetchReopenRequestData();
      setSuccessUpdateMessage('Request Approved succesfuly');
      setTimeout(() => {
        setSuccessUpdateMessage('');
      }, 3000);
    } else {
      setErrorUpdateMessage('Some thing went wrong, please try again')
      setTimeout(() => {
        setErrorUpdateMessage('');
      }, 3000);
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredReopenRequest = reopenRequest.filter((item) =>
    item.details?.companyName?.toLowerCase().includes(searchText.toLowerCase()) ||
    item.details?.brandName?.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalPages = Math.ceil(filteredReopenRequest.length / itemsPerPage);

  const currentReopenRequest = filteredReopenRequest.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  return (
    <>
      <CCard className="mbb-4">
        <CCardHeader>
          {/* <strong>Booth Design List</strong> */}
          <div className="d-flex justify-content-end mb-1 mt-1 ">
            <input
              type="text"
              className="form-control w-25"
              placeholder="Search by company or brand"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

        </CCardHeader>
        {successUpdateMessage && (
          <div
            style={{
              color: 'green',
              marginTop: '7px',
              marginLeft: '15px',
            }}
          >
            {successUpdateMessage}
          </div>
        )}

        {errorUpdateMessage && (
          <div
            style={{
              color: 'red',
              marginTop: '7px',
              marginLeft: '15px',
            }}
          >
            {errorUpdateMessage}
          </div>
        )}
        <CCardBody>
          <CTable bordered>

            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Company Name</CTableHeaderCell>
                <CTableHeaderCell>Re-Open Request for</CTableHeaderCell>
                <CTableHeaderCell>Action </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentReopenRequest.map((item, index) => (
                <CTableRow key={item._id}>
                  <CTableDataCell>{index + 1 + (currentPage - 1) * itemsPerPage}</CTableDataCell>
                  <CTableDataCell>{item.details.companyName}</CTableDataCell>
                  <CTableDataCell>{item.type}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="primary" className="me-2" onClick={() => handleApprove(item._id)}><CIcon icon={cilCheckCircle} className="me-1" />Approve</CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>

          <CPagination align="center">
            {[...Array(totalPages).keys()].map((_, i) => (
              <CPaginationItem
                key={i}
                active={i + 1 === currentPage}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </CPaginationItem>
            ))}
          </CPagination>

        </CCardBody>
      </CCard>
    </>
  );
};

export default ReopenRequest;

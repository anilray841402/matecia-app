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
import { cilCheckCircle, cilXCircle } from '@coreui/icons';

import { useState, useEffect } from 'react';
import apiClient from '../../service/apiClient';

const BoothDesign = () => {

  const [boothDesign, setBoothDesign] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [successUpdateMessage, setSuccessUpdateMessage] = useState('');
  const [errorUpdateMessage, setErrorUpdateMessage] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchBoothDesignData();
  }, []);

  const fetchBoothDesignData = async () => {
    try {
      const res = await apiClient.fetchBoothDesignOperation();
      if (res.success) {
        setBoothDesign(res.data);
      }
    } catch (err) {
      console.error('Error fetching booth design:', err);
    }
  };

  const handleApprove = async (id) => {
    const res = await apiClient.updateBoothDesignOperation(id, 'Approved');
    if (res.success) {
      fetchBoothDesignData();
      setSuccessUpdateMessage('design Approved succesfuly');
      setTimeout(() => {
        setSuccessUpdateMessage('');
      }, 3000);
    } else {
      setErrorUpdateMessage('Some thing went wrong, please try again')
    }
  }

  const handleReject = async (id) => {
    const res = await apiClient.updateBoothDesign(id, 'Rejected');
    if (res.success) {
      fetchBoothDesignData();
      setSuccessUpdateMessage('design rejected succesfuly');
      setTimeout(() => {
        setSuccessUpdateMessage('');
      }, 3000);
    } else {
      setErrorUpdateMessage('Some thing went wrong, please try again');
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredBoothDesign = boothDesign.filter((item) =>
    item.details?.companyName?.toLowerCase().includes(searchText.toLowerCase()) ||
    item.details?.brandName?.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBoothDesign.length / itemsPerPage);

  const currentBoothDesign = filteredBoothDesign.slice(
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
                <CTableHeaderCell>Booth No</CTableHeaderCell>
                <CTableHeaderCell>Hall No </CTableHeaderCell>
                <CTableHeaderCell>Stall size</CTableHeaderCell>
                <CTableHeaderCell>Fabri Company</CTableHeaderCell>
                <CTableHeaderCell>Phone No</CTableHeaderCell>
                <CTableHeaderCell>Design </CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Action </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentBoothDesign.map((item, index) => (
                <CTableRow key={item._id}>
                  <CTableDataCell>{index + 1 + (currentPage - 1) * itemsPerPage}</CTableDataCell>
                  <CTableDataCell>{item.details.companyName}</CTableDataCell>
                  <CTableDataCell>{item.details.boothNumber}</CTableDataCell>
                  <CTableDataCell>{item.details.hallNumber}</CTableDataCell>
                  <CTableDataCell>{item.details.stall_size}</CTableDataCell>
                  <CTableDataCell>{item.fabricatorCompanyName}</CTableDataCell>
                  <CTableDataCell>{item.details.mobileNumber}</CTableDataCell>
                  <CTableDataCell> <a href={item.boothDesignPath}>view</a></CTableDataCell>
                  <CTableDataCell>{item.status}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="primary" className="me-2" onClick={() => handleApprove(item._id)}><CIcon icon={cilCheckCircle} className="me-1" /></CButton>
                    <CButton color="primary" className="me-2" onClick={() => handleReject(item._id)}><CIcon icon={cilXCircle} className="me-1" /></CButton>
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

export default BoothDesign;

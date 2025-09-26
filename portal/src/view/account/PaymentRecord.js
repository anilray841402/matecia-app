import {
    CCard,
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
    CButton
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPencil, cilTrash } from '@coreui/icons';

import { useState, useEffect } from 'react';
import apiClient from '../../service/apiClient';

const PaymentRecord = () => {

    const [paymentRecord, setPaymentRecord] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        fetchPaymentRecord();
    }, []);

    const fetchPaymentRecord = async () => {
        try {
            const res = await apiClient.fetchPaymentRecordAccount();
            if (res.success) {
                setPaymentRecord(res.data);
            }
        } catch (err) {
            console.error('Error fetching booth design:', err);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const filteredPaymentRecord = paymentRecord.filter((item) =>
        item.details?.companyName?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.details?.brandName?.toLowerCase().includes(searchText.toLowerCase())
    );

    const totalPages = Math.ceil(filteredPaymentRecord.length / itemsPerPage);

    const currentPaymentRecord = filteredPaymentRecord.slice(
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
                <CCardBody>
                    <CTable bordered>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell>#</CTableHeaderCell>
                                <CTableHeaderCell>Company Name</CTableHeaderCell>
                                <CTableHeaderCell>Stall Pay</CTableHeaderCell>
                                <CTableHeaderCell>Branding Pay</CTableHeaderCell>
                                <CTableHeaderCell>Power Pay</CTableHeaderCell>
                                <CTableHeaderCell>TDS</CTableHeaderCell>
                                <CTableHeaderCell>Pay Date</CTableHeaderCell>
                                <CTableHeaderCell>CHE/NEFT Ref</CTableHeaderCell>
                                <CTableHeaderCell>Action</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {currentPaymentRecord.map((item, index) => (
                                <CTableRow key={item._id}>
                                    <CTableDataCell>{index + 1 + (currentPage - 1) * itemsPerPage}</CTableDataCell>
                                    <CTableDataCell>{item.details.companyName}</CTableDataCell>
                                    <CTableDataCell>{item.stallPayment ? item.stallPayment : 0}</CTableDataCell>
                                    <CTableDataCell>{item.brandingPayment ? item.brandingPayment : 0}</CTableDataCell>
                                    <CTableDataCell>{item.powerPayment ? item.powerPayment : 0}</CTableDataCell>
                                    <CTableDataCell>{item.tdsDductions ? item.tdsDductions : 0}</CTableDataCell>
                                    <CTableDataCell>
                                        {new Date(item.updatedAt).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric"
                                        })}
                                    </CTableDataCell>
                                    <CTableDataCell>{item.refNumber ? item.refNumber : "N/A"}</CTableDataCell>
                                    <CTableDataCell>
                                        <CButton color="primary" className="me-2">
                                            <CIcon icon={cilPencil} />
                                        </CButton>
                                        <CButton color="primary" className="me-2">
                                            <CIcon icon={cilTrash} />
                                        </CButton>
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

export default PaymentRecord;

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
} from '@coreui/react';

import { useState, useEffect } from 'react';
import apiClient from '../../service/apiClient';

const PowerOrder = () => {

    const [powerOrder, setPowerOrder] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        fetchPowerOrderData();
    }, []);

    const fetchPowerOrderData = async () => {
        try {
            const res = await apiClient.fetchPowerOrderOperation();
            if (res.success) {
                setPowerOrder(res.data);
            }
        } catch (err) {
            console.error('Error fetching booth design:', err);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const filteredPowerOrder = powerOrder.filter((item) =>
        item.details?.companyName?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.details?.brandName?.toLowerCase().includes(searchText.toLowerCase())
    );

    const totalPages = Math.ceil(filteredPowerOrder.length / itemsPerPage);

    const currentPowerOrder = filteredPowerOrder.slice(
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
                                <CTableHeaderCell>Rate</CTableHeaderCell>
                                <CTableHeaderCell>Show unit</CTableHeaderCell>
                                <CTableHeaderCell>Setup unit</CTableHeaderCell>
                                <CTableHeaderCell>Last Update</CTableHeaderCell>
                                <CTableHeaderCell>Amount</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {currentPowerOrder.map((item, index) => (
                                <CTableRow key={item._id}>
                                    <CTableDataCell>{index + 1 + (currentPage - 1) * itemsPerPage}</CTableDataCell>
                                    <CTableDataCell>{item.details.companyName}</CTableDataCell>
                                    <CTableDataCell>4000.00</CTableDataCell>
                                    <CTableDataCell>{item.showDays}</CTableDataCell>
                                    <CTableDataCell>{item.setUpDays}</CTableDataCell>
                                    <CTableDataCell>
                                        {new Date(item.updatedAt).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric"
                                        })}
                                    </CTableDataCell>
                                    <CTableDataCell>{item.total}</CTableDataCell>
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

export default PowerOrder;

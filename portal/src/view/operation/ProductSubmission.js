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
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilEyedropper } from '@coreui/icons';
import { useState, useEffect } from 'react';
import apiClient from '../../service/apiClient';

const ProductSubmission = () => {

    const [productSubmission, setProductSubmission] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [visible, setVisible] = useState(false);
    const [selectedExhibitor, setSelectedExhibitor] = useState(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        fetchProductSubmissionData();
    }, []);

    const fetchProductSubmissionData = async () => {
        try {
            const res = await apiClient.fetchProductSubmission();
            if (res.success) {
                setProductSubmission(res.data);
            }
        } catch (err) {
            console.error('Error fetching booth design:', err);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };



    console.log(productSubmission)

    const filteredProductSubmission = productSubmission.filter((item) =>
        item.details?.companyName?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.details?.brandName?.toLowerCase().includes(searchText.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProductSubmission.length / itemsPerPage);

    const currentProductSubmission = filteredProductSubmission.slice(
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
                                {/* <CTableHeaderCell>Company Name</CTableHeaderCell> */}
                                <CTableHeaderCell>Innovation</CTableHeaderCell>
                                <CTableHeaderCell>Category</CTableHeaderCell>
                                <CTableHeaderCell>Inno Type</CTableHeaderCell>
                                <CTableHeaderCell>Why Should</CTableHeaderCell>
                                <CTableHeaderCell>Product1</CTableHeaderCell>
                                <CTableHeaderCell>Product2</CTableHeaderCell>
                                <CTableHeaderCell>Product3</CTableHeaderCell>
                                <CTableHeaderCell>Product4</CTableHeaderCell>
                                <CTableHeaderCell>Product5</CTableHeaderCell>
                                <CTableHeaderCell>View</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {currentProductSubmission.map((item, index) => (
                                <CTableRow key={item._id}>
                                    <CTableDataCell>{index + 1 + (currentPage - 1) * itemsPerPage}</CTableDataCell>
                                    {/* <CTableDataCell>{item.details.companyName}</CTableDataCell> */}
                                    <CTableDataCell>{item.productInnovation}</CTableDataCell>
                                    <CTableDataCell>{item.productCategory}</CTableDataCell>
                                    <CTableDataCell>{item.innovationType}</CTableDataCell>
                                    <CTableDataCell>{item.productSuperior}</CTableDataCell>
                                    <CTableDataCell><a href={item.products[0]?.productImg}>{item.products[0] ? 'View' : 'N/A'}</a></CTableDataCell>
                                    <CTableDataCell><a href={item.products[1]?.productImg}>{item.products[1] ? 'View' : 'N/A'}</a></CTableDataCell>
                                    <CTableDataCell><a href={item.products[2]?.productImg}>{item.products[2] ? 'View' : 'N/A'}</a></CTableDataCell>
                                    <CTableDataCell><a href={item.products[3]?.productImg}>{item.products[3] ? 'View' : 'N/A'}</a></CTableDataCell>
                                    <CTableDataCell><a href={item.products[4]?.productImg}>{item.products[4] ? 'View' : 'N/A'}</a></CTableDataCell>
                                    <CTableDataCell>
                                        <CButton color="primary" className="me-2" onClick={() => {
                                            setSelectedExhibitor(item);
                                            setVisible(true);
                                        }}><CIcon icon={cilEyedropper} /></CButton>
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
                    {/* Modal Start*/}
                    <CModal visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                            <CModalTitle>Fabricator Details</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            {selectedExhibitor && (
                                <>
                                    <p><strong>Company Name:</strong> {selectedExhibitor.details?.companyName || "N/A"}</p>
                                    {/* <p><strong>Email:</strong> {selectedExhibitor.email || "N/A"}</p> */}
                                    <p><strong>Contact Person:</strong> {selectedExhibitor.details?.contactPerson || "N/A"}</p>
                                    <p><strong>Phone No:</strong> {selectedExhibitor.details?.mobileNumber || "N/A"}</p>
                                    <p><strong>Booth No:</strong> {selectedExhibitor.details?.boothNumber || "N/A"}</p>
                                    <p><strong>Stall Size:</strong> {selectedExhibitor.details?.stall_size || "N/A"}</p>
                                    <p><strong>Hall No:</strong> {selectedExhibitor.details?.hallNumber || "N/A"}</p>
                                </>
                            )}
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="secondary" onClick={() => setVisible(false)}>
                                Close
                            </CButton>
                        </CModalFooter>
                    </CModal>
                    {/* Modal End*/}
                </CCardBody>
            </CCard>
        </>
    );
};

export default ProductSubmission;

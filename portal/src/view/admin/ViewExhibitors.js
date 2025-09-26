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
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CFormLabel,
    CFormInput,
    CFormSelect,
    CFormTextarea,
    CSpinner
} from '@coreui/react';
import { Formik, Form, Field } from 'formik';
import CIcon from '@coreui/icons-react';
import { cilPencil, cilEnvelopeClosed, cilTrash } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import apiClient from '../../service/apiClient';

const ViewExhibitors = () => {

    const [exhibitors, setExhibitors] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [visible, setVisible] = useState(false);
    const [modelVisible, setModelVisible] = useState(false);
    const [selectedExhibitor, setSelectedExhibitor] = useState(null);
    const [successUpdateMessage, setSuccessUpdateMessage] = useState('');
    const [errorUpdateMessage, setErrorUpdateMessage] = useState('');
    const [emailLoadingId, setEmailLoadingId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const navigate = useNavigate();

    useEffect(() => {
        fetchExhibitorsData();
    }, []);

    const fetchExhibitorsData = async () => {
        try {
            const res = await apiClient.fetchExhibitors();
            if (res.success) {
                setExhibitors(res.data);
            }
        } catch (err) {
            console.error('Error fetching exhibitors:', err);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleExhibitorLogin = async (exhibitor) => {
        try {
            const res = await apiClient.exhibitorLogin(exhibitor._id);
            if (res.success) {
                window.open('/exhibitor', '_blank');
            }
        } catch (err) {
            console.error('Impersonation failed:', err);
            alert('Failed to login as exhibitor');
        }
    };


    const handleSubmit = async (values) => {
        const formData = new FormData();
        formData.append("piNumber", values.piNumber);
        formData.append("companyName", values.companyName);
        formData.append("brandName", values.brandName);
        formData.append("boothNumber", values.boothNumber);
        formData.append("stallSize", values.stallSize);
        formData.append("standType", values.standType);
        formData.append("hallNumber", values.hallNumber);
        formData.append("mobileNumber", values.mobileNumber);
        formData.append("additionalMobile", values.additionalMobile);
        formData.append("additionalEmail", values.additionalEmail);
        formData.append("address", values.address);
        formData.append("websiteUrl", values.websiteUrl);
        formData.append("gstNumber", values.gstNumber);
        formData.append("companyProfile", values.companyProfile);
        formData.append("imgSrc", values.imgSrc);

        const res = await apiClient.updateExhibitor(formData, selectedExhibitor._id);
        if (res.success) {
            setModelVisible(false);
            fetchExhibitorsData();
            setSuccessUpdateMessage("Data Updated Successfully");
            setTimeout(() => {
                setSuccessUpdateMessage("");
            }, 3000);

        } else {
            setErrorUpdateMessage("Somthing went wrong, Please try after some time");
            setTimeout(() => {
                setErrorUpdateMessage("");
            }, 3000);
        }
    }

    const handleEmail = async (id) => {
        setEmailLoadingId(id);
        try {
            const res = await apiClient.emailExhibitor(id);
            if (res.success) {
                setSuccessUpdateMessage("Email Sent Successfully");
                setTimeout(() => setSuccessUpdateMessage(""), 3000);
            } else {
                setErrorUpdateMessage("Something went wrong, Please try again later");
                setTimeout(() => setErrorUpdateMessage(""), 3000);
            }
        } catch (err) {
            setErrorUpdateMessage("Something went wrong, Please try again later");
            setTimeout(() => setErrorUpdateMessage(""), 3000);
        } finally {
            setEmailLoadingId(null);
        }
    };

    const handleDelete = async (item) => {
        if (window.confirm("Do you really want to delete this item?")) {
            try {
                const res = await apiClient.deleteExhibitor(item._id);
                if (res.success) {
                    fetchExhibitorsData();
                    setSuccessUpdateMessage("Data Deleted Successfully");
                    setTimeout(() => {
                        setSuccessUpdateMessage("");
                    }, 3000);
                } else {
                    setErrorUpdateMessage("Something went wrong, Please try after some time");
                    setTimeout(() => {
                        setErrorUpdateMessage("");
                    }, 3000);
                }
            } catch (error) {
                console.error("Delete error:", error);
                setErrorUpdateMessage("Something went wrong, Please try after some time");
                setTimeout(() => {
                    setErrorUpdateMessage("");
                }, 3000);
            }
        }
    };


    const filteredExhibitors = exhibitors.filter((item) =>
        item.details?.companyName?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.details?.brandName?.toLowerCase().includes(searchText.toLowerCase())
    );

    const totalPages = Math.ceil(filteredExhibitors.length / itemsPerPage);

    const currentExhibitors = filteredExhibitors.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    return (
        <>
            <CCard className="mbb-4">
                <CCardHeader>
                    {/* <strong>Exhibitors List</strong> */}
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
                                <CTableHeaderCell>Brand Name</CTableHeaderCell>
                                <CTableHeaderCell>Power Order </CTableHeaderCell>
                                <CTableHeaderCell>Stall Design</CTableHeaderCell>
                                <CTableHeaderCell>Action Button</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {currentExhibitors.map((item, index) => (
                                <CTableRow key={item._id}>
                                    <CTableDataCell>{index + 1 + (currentPage - 1) * itemsPerPage}</CTableDataCell>
                                    <CTableDataCell>{item.details.companyName}</CTableDataCell>
                                    <CTableDataCell>{item.details.brandName}</CTableDataCell>
                                    <CTableDataCell><CButton color="success">{item.powerorder
                                        ? "Recieved"
                                        : "Pending"}</CButton></CTableDataCell>
                                    <CTableDataCell><CButton color="success">{item.boothdesign && item.boothdesign.status
                                        ? item.boothdesign.status
                                        : "Awaiting"}</CButton></CTableDataCell>
                                    <CTableDataCell>
                                        <CButton color="primary" className="me-2" onClick={() => {
                                            setSelectedExhibitor(item);
                                            setModelVisible(true);
                                        }}><CIcon icon={cilPencil} /></CButton>

                                        <CButton
                                            color="primary"
                                            className="me-2"
                                            onClick={() => handleEmail(item._id)}
                                            disabled={emailLoadingId === item._id}
                                        >
                                            {emailLoadingId === item._id ? (
                                                <CSpinner component="span" size="sm" aria-hidden="true" />
                                            ) : (
                                                <CIcon icon={cilEnvelopeClosed} />
                                            )}
                                        </CButton>

                                        <CButton color="primary" className="me-2" onClick={() => {
                                            setSelectedExhibitor(item);
                                            setVisible(true);
                                        }}>View</CButton>
                                        <CButton color="primary" onClick={() => handleExhibitorLogin(item)} className="me-2">Login</CButton>

                                        <CButton color="primary" className="me-2" onClick={() => {
                                            handleDelete(item);
                                        }}><CIcon icon={cilTrash} />
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
                    {/* Modal Start*/}
                    <CModal visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                            <CModalTitle>Fabricator Details</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            {selectedExhibitor && (
                                <>
                                    <p><strong>Company Name:</strong> {selectedExhibitor.details?.companyName || "N/A"}</p>
                                    <p><strong>Email:</strong> {selectedExhibitor.email || "N/A"}</p>
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

                    {/* Modal 2 Start*/}
                    <CModal visible={modelVisible} onClose={() => setModelVisible(false)}>
                        <CModalHeader>
                            <CModalTitle>Exhibitor Details</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    piNumber: selectedExhibitor?.details.piNumber || '',
                                    companyName: selectedExhibitor?.details.companyName || '',
                                    brandName: selectedExhibitor?.details.brandName || '',
                                    boothNumber: selectedExhibitor?.details.boothNumber || '',
                                    stallSize: selectedExhibitor?.details.stallSize || '',
                                    standType: selectedExhibitor?.details.standType || '',
                                    hallNumber: selectedExhibitor?.details.hallNumber || '',
                                    mobileNumber: selectedExhibitor?.details.mobileNumber || '',
                                    additionalMobile: selectedExhibitor?.details.additionalMobile || '',
                                    additionalEmail: selectedExhibitor?.details.additionalEmail || '',
                                    address: selectedExhibitor?.details.address || '',
                                    websiteUrl: selectedExhibitor?.details.websiteUrl || '',
                                    gstNumber: selectedExhibitor?.details.gstNumber || '',
                                    companyProfile: selectedExhibitor?.details.companyProfile || '',
                                    file: null,
                                }}
                                onSubmit={handleSubmit}
                            >
                                {({ setFieldValue }) => (
                                    <Form>
                                        <div className="mb-3">
                                            <CFormLabel>PI Number</CFormLabel>
                                            <Field name="piNumber">
                                                {({ field }) => <CFormInput {...field} readOnly />}
                                            </Field>
                                        </div>

                                        <div className="mb-3">
                                            <CFormLabel>Company Name</CFormLabel>
                                            <Field name="companyName">
                                                {({ field }) => <CFormInput {...field} />}
                                            </Field>
                                        </div>

                                        <div className="mb-3">
                                            <CFormLabel>Brand Name</CFormLabel>
                                            <Field name="brandName">
                                                {({ field }) => <CFormInput {...field} />}
                                            </Field>
                                        </div>

                                        <div className="mb-3">
                                            <CFormLabel>Booth Number</CFormLabel>
                                            <Field name="boothNumber">
                                                {({ field }) => <CFormInput {...field} readOnly />}
                                            </Field>
                                        </div>

                                        <div className="mb-3">
                                            <CFormLabel>Stall Size</CFormLabel>
                                            <Field name="stallSize" type="number">
                                                {({ field }) => <CFormInput {...field} readOnly />}
                                            </Field>
                                        </div>

                                        <div className="mb-3">
                                            <CFormLabel>Stand Type</CFormLabel>
                                            <Field name="standType" as="select">
                                                {({ field }) => (
                                                    <CFormSelect {...field} options={[
                                                        { label: 'Select Stand Type', value: '' },
                                                        { label: 'Bare', value: 'Bare' },
                                                        { label: 'Shell', value: 'Shell' },
                                                    ]} />
                                                )}
                                            </Field>
                                        </div>

                                        <div className="mb-3">
                                            <CFormLabel>Hall Number</CFormLabel>
                                            <Field name="hallNumber">
                                                {({ field }) => <CFormInput {...field} readOnly />}
                                            </Field>
                                        </div>

                                        <div className="mb-3">
                                            <CFormLabel>Mobile Number</CFormLabel>
                                            <Field name="mobileNumber">
                                                {({ field }) => <CFormInput {...field} />}
                                            </Field>
                                        </div>

                                        <div className="mb-3">
                                            <CFormLabel>Additional Mobile Number</CFormLabel>
                                            <Field name="additionalMobile">
                                                {({ field }) => <CFormInput {...field} />}
                                            </Field>
                                        </div>

                                        <div className="mb-3">
                                            <CFormLabel>Additional Email address</CFormLabel>
                                            <Field name="additionalEmail" type="email">
                                                {({ field }) => <CFormInput {...field} />}
                                            </Field>
                                        </div>

                                        <div className="mb-3">
                                            <CFormLabel>Company Address</CFormLabel>
                                            <Field name="address">
                                                {({ field }) => <CFormTextarea {...field} rows={3} />}
                                            </Field>
                                        </div>

                                        <div className="mb-3">
                                            <CFormLabel>Website URL</CFormLabel>
                                            <Field name="websiteUrl">
                                                {({ field }) => <CFormInput {...field} />}
                                            </Field>
                                        </div>

                                        <div className="mb-3">
                                            <CFormLabel>GST No</CFormLabel>
                                            <Field name="gstNumber">
                                                {({ field }) => <CFormInput {...field} />}
                                            </Field>
                                        </div>

                                        <div className="mb-3">
                                            <CFormLabel>Company Profile</CFormLabel>
                                            <Field name="companyProfile">
                                                {({ field }) => <CFormTextarea {...field} rows={3} />}
                                            </Field>
                                        </div>

                                        <div className="mb-3">
                                            <CFormLabel>Upload File</CFormLabel>
                                            <input
                                                id="formFile"
                                                name="imgSrc"
                                                type="file"
                                                className="form-control"
                                                onChange={(event) => {
                                                    setFieldValue("imgSrc", event.currentTarget.files[0]);
                                                }}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <CButton color="primary" type="submit">
                                                Update Information
                                            </CButton>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="secondary" onClick={() => setModelVisible(false)}>
                                Close
                            </CButton>
                        </CModalFooter>
                    </CModal>
                    {/* Modal 2 End*/}
                </CCardBody>
            </CCard>
        </>
    );
};

export default ViewExhibitors;

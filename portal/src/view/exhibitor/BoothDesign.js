import React, { useState, useEffect } from 'react';
import {
    CRow,
    CCol,
    CButton,
    CCard,
    CCardBody,
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CAlert,
    CFormLabel,
    CCardHeader,
} from '@coreui/react';
import apiClient from '../../service/apiClient';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const BoothDesign = () => {

    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [reopenStatus, setReopenStatus] = useState(0);
    const [reopenId, setReopenId] = useState();
    const [boothDesignData, setBoothDesignData] = useState();
    const [boothDesignId, setBoothDesignId] = useState();
    const [fieldReadOnly, setFieldReadOnly] = useState(false);
    const [chooseFabricator, setChoosefabricator] = useState("");
    const [fieldData, setFieldData] = useState({
        fabricatorType: "",
        fabricatorCompanyName: "",
        contactPerson: "",
        email: "",
        mobile: "",
        gst: ""
    });

    const handleTypeChange = (e) => {
        setFieldData(prev => ({
            ...prev,
            fabricatorType: e.target.value,
        }));
    }

    const handleFabricatorChange = (e) => {
         setChoosefabricator(e.target.value);
        if (e.target.value === "Abc Pvt Ltd") {
            setFieldData(prev => ({
                ...prev, fabricatorCompanyName: "Abc Pvt Ltd", contactPerson: "Rajesh Bajaj", email: "rajeshbajaj@gmail.com", mobile: 8002571892, gst: "GISTINGG443GH"
            }))
        } else if (e.target.value === "Xyz Pvt Ltd") {
            setFieldData(prev => ({
                ...prev, fabricatorCompanyName: "Xyz Pvt Ltd", contactPerson: "Dharmesh Kumar", email: "dharmeshkumar@gmail.com", mobile: 8002571892, gst: "GISTINGG443GH"
            }))
        } else {
            setFieldData(prev => ({
                ...prev,
            }))
        }
    }

    const handleSubmit = async (values) => {
        const formData = new FormData();
        setVisible(false);

        try {
            let res;
            if (reopenStatus === 0) {
                formData.append("fabricatorType", values.fabricatorType);
                formData.append("fabricatorCompanyName", values.fabricatorCompanyName);
                formData.append("contactPerson", values.contactPerson);
                formData.append("email", values.email);
                formData.append("mobile", values.mobile);
                formData.append("gst", values.gst);
                formData.append("status", "Pending");
                formData.append("reopenStatus", 1);
                formData.append("boothDesignPath", values.boothDesignPath);
                res = await apiClient.submitBoothDesign(formData, 1);
            } else if (reopenStatus === 1) {
                res = await apiClient.reopenBoothDesign( 2, reopenId);
            } else if (reopenStatus === 3) {
                formData.append("fabricatorType", values.fabricatorType);
                formData.append("fabricatorCompanyName", values.fabricatorCompanyName);
                formData.append("contactPerson", values.contactPerson);
                formData.append("email", values.email);
                formData.append("mobile", values.mobile);
                formData.append("gst", values.gst);
                formData.append("status", "Pending");
                formData.append("reopenStatus", 1);
                formData.append("boothDesignPath", values.boothDesignPath);
                formData.append("oldBoothDesignPath", boothDesignData.boothDesignPath);
                formData.append("reopenId", reopenId);

                res = await apiClient.updateBoothDesign(formData, boothDesignId );
            }

            if (res.success) {
                getBoothDesign();
                setSuccessMessage("Booth Design Submited Successfully");
                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000);

            } else {
                setErrorMessage("Somthing went wrong, Please try after some time");
            }
        } catch (error) {
            setErrorMessage("Somthing went wrong, Please try after some time");
            console.log("error is ", error);
        }
    }

    const getBoothDesign = async () => {
        const res = await apiClient.fetchBoothDesign();
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
            const data = res.data[0];
            setBoothDesignData(data);
            setReopenStatus(res.reOpenRequest[0].status);
            setReopenId(res.reOpenRequest[0]._id);
            setBoothDesignId(data._id);
        } else {
            console.warn("Booth design data not available or empty");
        }
    };

    useEffect(() => {
        getBoothDesign();
    }, []);

    useEffect(() => {
        if (fieldData.fabricatorType === "yourOwnFabricators") {
            setFieldReadOnly(false);
            setFieldData(prev => ({ ...prev, fabricatorType: "yourOwnFabricators" }));
        } else if (fieldData.fabricatorType === "empanelledFabricators") {
            setFieldReadOnly(true);
            setFieldData(prev => ({ ...prev, fabricatorType: "empanelledFabricators" }));
        } else {
            setFieldData(prev => ({ ...prev, fabricatorType: "" }));
        }
    }, [fieldData.fabricatorType, chooseFabricator]);

    const getButtonLabel = () => {
        switch (reopenStatus) {
            case 1: return "Re-Open ";
            case 2: return "Wait for admin approval";
            case 3: return "Edit Booth Design";
            default: return "Submit";
        }
    };

    const initialValues = {
        fabricatorCompanyName: fieldData.fabricatorCompanyName,
        contactPerson: fieldData.contactPerson || null,
        email: fieldData.email || null,
        mobile: fieldData.mobile || null,
        gst: fieldData.gst || null,
    }

    return (

        <>
            {boothDesignData ? (
                <CCard className="mb-4 mt-3 rounded-4 shadow-sm">
                    <CCardHeader>
                        <strong>Booth Design and Fabricator</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CTable bordered>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Company Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Contact Person</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Email Id</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Mobile Number</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Booth Design</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow>
                                    <CTableDataCell>
                                        {boothDesignData.fabricatorCompanyName}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        {boothDesignData.contactPerson}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        {boothDesignData.email}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        {boothDesignData.mobile}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <a href={`https://www.abc.com/${boothDesignData.boothDesignPath}`}> View/Download </a>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        {boothDesignData.status}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CButton color="primary" type="button" disabled={reopenStatus === 2} onClick={() => (reopenStatus === 3 ? setVisible(true) : handleSubmit())}>
                                            {getButtonLabel()}
                                        </CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            ) : (
                <CCard className="mb-4 rounded-4 shadow-sm">
                    <CCardBody>
                        <CRow className="mb-3 mt-3">
                            <CCol sm={6}>
                                <strong><h4>Haven’t submitted booth design yet? Submit it now!</h4></strong>
                            </CCol>
                            <CCol sm={6}>
                                <CButton color="primary" onClick={() => setVisible(true)}>
                                    Submit
                                </CButton>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            )}

            <CCard className="mb-5 mt-4 rounded-4 shadow-sm">
                <CCardBody>
                    <h5 className="mb-4">Mandatory submission of Refundable Security Deposit by all Fabricators</h5>
                    <CTable bordered hover responsive>
                        <CTableHead color="dark">
                            <CTableRow>
                                <CTableHeaderCell>Stall Size</CTableHeaderCell>
                                <CTableHeaderCell>Non-Empanelled Fabricators</CTableHeaderCell>
                                <CTableHeaderCell>Empanelled Fabricators</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            <CTableRow>
                                <CTableDataCell>Upto 50 Sq Mtrs</CTableDataCell>
                                <CTableDataCell>₹40,000</CTableDataCell>
                                <CTableDataCell>₹20,000</CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableDataCell>More than 50 Sq Mtrs to 100 Sq Mtrs</CTableDataCell>
                                <CTableDataCell>₹60,000</CTableDataCell>
                                <CTableDataCell>₹40,000</CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableDataCell>More than 100 Sq Mtrs to 200 Sq Mtrs</CTableDataCell>
                                <CTableDataCell>₹80,000</CTableDataCell>
                                <CTableDataCell>₹60,000</CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableDataCell>More than 200 Sq Mtrs</CTableDataCell>
                                <CTableDataCell>₹1,00,000</CTableDataCell>
                                <CTableDataCell>₹80,000</CTableDataCell>
                            </CTableRow>
                        </CTableBody>
                    </CTable>
                    <div className="mt-3 mb-2">
                        <p>
                            <strong>As a security deposit</strong> and in case of any damage, delay, or destruction to the property,
                            all the vendors must submit a DD according to the above table. The DD must be submitted before space is
                            allotted at BIEC, Bengaluru Exhibition Halls. This DD will be returned by the company after event completion
                            and once trucks are out of the gate.
                        </p>
                        <p>
                            <strong>When to pay:</strong> Immediately. DD in favour of <em>Bigsea Marcom India Pvt Ltd</em>, on or
                            before <strong>31 January 2025</strong>.
                        </p>

                        <h6 className="mt-4"><strong>Important information for exhibitors and fabricators</strong></h6>
                        <ol>
                            <li>
                                <strong>How to avoid power failures / issues during the exhibition?</strong>
                                <p className="text-danger fw-semibold">CAUTION</p>
                                <p>
                                    Exhibitors & fabricators are hereby informed to kindly buy sufficient power requirements and keep a
                                    little extra to avoid power trips or fluctuations. Even a slight power difference can lead to power
                                    failure. These fluctuations can waste valuable time and affect business.
                                </p>
                                <p>
                                    <strong>Note:</strong> Any such issue will be the responsibility of the fabricator, not the organizer.
                                    Fabricators must calculate the power load properly. A penalty of <strong>INR 20,000</strong> will be
                                    levied on fabricators who fail to submit proper electricity load requirements.
                                </p>
                            </li>
                            <li>
                                <strong>Penalty for incomplete/improper Dismantling</strong>
                                <p>
                                    Some fabricators have irresponsibly left stalls to scrap dealers without proper dismantling. This led
                                    to leftover material on-site. Such unprofessional behavior reflects poorly on the exhibitor’s company
                                    and brand.
                                </p>
                                <p>
                                    Organizers had to pay for removal last year. This year, strict action will be taken and a penalty of
                                    <strong> INR 20,000</strong> will be charged to any fabricator who fails to clear the space within
                                    the stipulated time.
                                </p>
                            </li>
                        </ol>
                    </div>
                </CCardBody>
            </CCard>
            {/* Modal */}
            <CModal visible={visible} onClose={() => setVisible(false)} backdrop="static">
                <CModalHeader>
                    <CModalTitle>Fabricator Details</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <Formik
                        enableReinitialize
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                    >
                        {({ setFieldValue }) => (
                            <Form>
                                {/* Success and Error Messages */}
                                {successMessage && <CAlert color="success">{successMessage}</CAlert>}
                                {errorMessage && <CAlert color="danger">{errorMessage}</CAlert>}

                                {/* Fabricator Type */}
                                <CRow className="mb-3">
                                    <CFormLabel className="col-sm-5 col-form-label">
                                        Fabricator Type <span style={{ color: 'red' }}>*</span>
                                    </CFormLabel>
                                    <CCol sm={7}>
                                        <Field as="select" name="fabricatorType" className="form-control" onChange={handleTypeChange} required>
                                            <option value="">Select Type</option>
                                            <option value="empanelledFabricators">Empanlled Fabricators</option>
                                            <option value="yourOwnFabricators">Your Own Fabricator</option>
                                        </Field>
                                        <ErrorMessage name="fabricatorType" component="div" className="text-danger" />
                                    </CCol>
                                </CRow>
                                {/* Show if empanelledFabricators */}
                                {fieldData.fabricatorType === 'empanelledFabricators' && (
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-5 col-form-label">Select Fabricator <span style={{ color: 'red' }}>*</span></CFormLabel>
                                        <CCol sm={7}>
                                            <Field as="select" name="empanelledFabricatorName" className="form-control" onChange={handleFabricatorChange} required>
                                                <option value="">Select Company</option>
                                                <option value="Abc Pvt Ltd">Abc Pvt Ltd</option>
                                                <option value="Xyz Pvt Ltd">xyz pvt ltd</option>
                                            </Field>
                                        </CCol>
                                    </CRow>
                                )}
                                <CRow className="mb-3">
                                    <CFormLabel className="col-sm-5 col-form-label">Fabricator Company <span style={{ color: 'red' }}>*</span></CFormLabel>
                                    <CCol sm={7}>
                                        <Field type="text" name="fabricatorCompanyName" placeholder="Company Name" className="form-control" required readOnly={fieldReadOnly} />
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CFormLabel className="col-sm-5 col-form-label" >Contact Person <span style={{ color: 'red' }}>*</span></CFormLabel>
                                    <CCol sm={7}>
                                        <Field type="text" name="contactPerson" placeholder="Contact Person Name" className="form-control" required readOnly={fieldReadOnly} />
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CFormLabel className="col-sm-5 col-form-label">Email Id <span style={{ color: 'red' }}>*</span></CFormLabel>
                                    <CCol sm={7}>
                                        <Field type="text" name="email" placeholder="Email ID" className="form-control" required readOnly={fieldReadOnly} />
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CFormLabel className="col-sm-5 col-form-label">Mobile Number <span style={{ color: 'red' }}>*</span></CFormLabel>
                                    <CCol sm={7}>
                                        <Field type="text" name="mobile" placeholder="Mobile Number" className="form-control" required readOnly={fieldReadOnly} />
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CFormLabel className="col-sm-5 col-form-label">Fabricator GST <span style={{ color: 'red' }}>*</span></CFormLabel>
                                    <CCol sm={7}>
                                        <Field type="text" name="gst" placeholder="GST No" className="form-control" readOnly={fieldReadOnly} />
                                        <ErrorMessage name="gst" component="div" className="text-danger" />
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CFormLabel className="col-sm-5 col-form-label">
                                        Upload Booth Design <span style={{ color: 'red' }}>*</span>
                                    </CFormLabel>
                                    <CCol sm={7}>
                                        <input
                                            type="file"
                                            name="boothDesignPath"
                                            accept="application/pdf"
                                            onChange={(event) =>
                                                setFieldValue(`boothDesignPath`, event.currentTarget.files[0])
                                            }
                                        />
                                    </CCol>
                                </CRow>
                                {/* Submit Button */}
                                <CRow className="mb-3">
                                    <CCol sm={3} className="text-end">
                                    </CCol>
                                    <CCol sm={9} className="text-end">
                                        <CButton color="primary" type="submit" className="text-end" >Submit Booth Design</CButton>
                                    </CCol>
                                </CRow>
                            </Form>
                        )}
                    </Formik>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    );
};

export default BoothDesign;

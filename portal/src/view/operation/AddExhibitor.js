import React, { useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormTextarea,
    CRow,
    CFormSelect,
    CSpinner,
    CAlert,
} from '@coreui/react'
import DocsComponents from '../../components/DocsComponents'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import apiClient from '../../service/apiClient'
import { useNavigate } from 'react-router-dom';

const AddExhibitor = () => {
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState();
    const [errorMessage, setErrorMessage] = useState();

    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        const formData = new FormData();
        // Loop through all fields in values
        for (const key in values) {
            if (key === 'file') {
                // Handle file separately
                if (values.file) {
                    formData.append('file', values.file);
                }
            } else {
                formData.append(key, values[key]);
            }
        }

        const res = await apiClient.submitExhibitor(formData);

        if (res.success) {
            alert("Exhibitor Added Successfully");
            navigate('/operation/view-exhibitors');
            // setSuccessMessage("Exhibitor Submited Successfully")
            // setTimeout(() => {
            //     setSuccessMessage("");
            // }, 4000)
        } else {
            setErrorMessage(res.message);
            setTimeout(() => {
                setErrorMessage("");
            }, 4000)
        }
    }

    const initialValues = {
        piNumber: '',
        name: '',
        companyName: '',
        brandName: '',
        boothNumber: '',
        stallSize: '',
        standType: '',
        hallNumber: '',
        email: '',
        password: '',
        mobileNumber: '',
        additionalMobile: '',
        additionalEmail: '',
        address: '',
        websiteUrl: '',
        gstNumber: '',
        companyProfile: '',
        file: null,
    };

    const validationSchema = Yup.object().shape({
        companyName: Yup.string().required('Required'),
        brandName: Yup.string().required('Required'),
        // Add more validations as needed
    });

    if (loading) {
        return (
            <div className="text-center p-5">
                <CSpinner color="primary" />
                <p>Loading your information...</p>
            </div>
        )
    }

    return (
        <CRow>
            <CCol xs={12}>
                <DocsComponents
                    href="/"
                    description="Some sensitive information—such as the PI number, email ID, hall number, and booth number—cannot be edited from the exhibitor's side. Please ensure these details are entered carefully. Contact the accounts team in case of any confusion."
                    button="Support"
                />
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Add All Exhibitors Information Here</strong>
                    </CCardHeader>
                    <CCardBody>
                        {/* Success and Error Messages */}
                        {successMessage && <CAlert color="success">{successMessage}</CAlert>}
                        {errorMessage && <CAlert color="danger">{errorMessage}</CAlert>}
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ values, handleChange, handleSubmit, setFieldValue }) => (
                                <CForm onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <CFormLabel>PI Number</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name="piNumber"
                                            value={values.piNumber}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <CFormLabel>Contact Persion Name</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <CFormLabel>Company Name</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name="companyName"
                                            value={values.companyName}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <CFormLabel>Brand Name</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name="brandName"
                                            value={values.brandName}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <CFormLabel>Booth Number</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name="boothNumber"
                                            value={values.boothNumber}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <CFormLabel>Stall Size</CFormLabel>
                                        <CFormInput
                                            type="number"
                                            name="stallSize"
                                            value={values.stallSize}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <CFormLabel>Stand Type</CFormLabel>
                                        <CFormSelect
                                            name="standType"
                                            value={values.standType}
                                            onChange={handleChange}
                                            options={[
                                                { label: 'Select Stand Type', value: '' },
                                                { label: 'Bare', value: 'Bare' },
                                                { label: 'Shell', value: 'Shell' },
                                            ]}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <CFormLabel>Hall Number</CFormLabel>
                                        <CFormInput
                                            type="number"
                                            name="hallNumber"
                                            value={values.hallNumber}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <CFormLabel>Email Id</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <CFormLabel>Password</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <CFormLabel>Mobile Number</CFormLabel>
                                        <CFormInput
                                            type="number"
                                            name="mobileNumber"
                                            value={values.mobileNumber}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <CFormLabel>Additional Mobile Number</CFormLabel>
                                        <CFormInput
                                            type="number"
                                            name="additionalMobile"
                                            value={values.additionalMobile}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <CFormLabel>Additional Email address</CFormLabel>
                                        <CFormInput
                                            type="email"
                                            name="additionalEmail"
                                            value={values.additionalEmail}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <CFormLabel>Company Address</CFormLabel>
                                        <CFormTextarea
                                            name="address"
                                            rows={3}
                                            value={values.address}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <CFormLabel>Website URL</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name="websiteUrl"
                                            value={values.websiteUrl}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <CFormLabel>GST No</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name="gstNumber"
                                            value={values.gstNumber}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <CFormLabel>Company Profile</CFormLabel>
                                        <CFormTextarea
                                            name="companyProfile"
                                            rows={3}
                                            value={values.companyProfile}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <CFormLabel>Upload File</CFormLabel>
                                        <CFormInput
                                            type="file"
                                            name="file"
                                            onChange={(event) => {
                                                setFieldValue('file', event.currentTarget.files[0]);
                                            }}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <CButton color="primary" type="submit" className="mb-3">
                                            Add Exhibitor
                                        </CButton>
                                    </div>
                                </CForm>
                            )}
                        </Formik>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default AddExhibitor

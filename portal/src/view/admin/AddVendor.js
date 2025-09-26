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
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import apiClient from '../../service/apiClient'
import { useNavigate } from 'react-router-dom';

const AddVendor = () => {
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState();
    const [errorMessage, setErrorMessage] = useState();

    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        const formData = new FormData();

        for (const key in values) {
            if (key === 'file') {
                if (values.file) {
                    formData.append('file', values.file);
                }
            } else {
                formData.append(key, values[key]);
            }
        }
        
        try {
            const res = await apiClient.submitVendor(formData);
            if (res.success) {
                alert("Vendor Added Successfully");
                navigate('/admin/view-vendors');
            } else {
                setErrorMessage(res.message);
                setTimeout(() => {
                    setErrorMessage("");
                }, 4000)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const initialValues = {
        name: '',
        companyName: '',
        type: '',
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
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Add Vendor Information Here</strong>
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
                                        <CFormLabel>Type</CFormLabel>
                                        <CFormSelect
                                            name="type"
                                            value={values.type}
                                            onChange={handleChange}
                                            options={[
                                                { label: 'Select Vendor Type', value: '' },
                                                { label: 'Fabricator', value: 'Fabricator' },
                                                { label: 'Faight Forwarder', value: 'Faight Forwarder' },
                                                { label: 'Food and Beverage', value: 'Food and Beverage' },
                                            ]}
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
                                        <CButton color="primary" type="submit" className="mb-3">
                                            Add Vendor
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

export default AddVendor

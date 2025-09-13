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
    CRow,
    CFormSelect,
    CSpinner,
    CAlert,
} from '@coreui/react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import apiClient from '../../service/apiClient'
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const [loading, setLoading] = useState(false)
    // const [successMessage, setSuccessMessage] = useState();
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

        const res = await apiClient.submitUser(formData);

        if (res.success) {
            alert("User Added Successfully");
            navigate('/admin/view-users');
        } else {
            setErrorMessage(res.message);
            setTimeout(() => {
                setErrorMessage("");
            }, 4000)
        }
    }

    const initialValues = {
        name: '',
        email: '',
        password: '',
        role: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        email: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
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
                        <strong>Add User Here below</strong>
                    </CCardHeader>
                    <CCardBody>
                        {/* Success and Error Messages */}
                       
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
                                        <CFormLabel>Role</CFormLabel>
                                        <CFormSelect
                                            name="role"
                                            value={values.role}
                                            onChange={handleChange}
                                            options={[
                                                { label: 'Role', value: '' },
                                                { label: 'operation', value: 'operation' },
                                                { label: 'account', value: 'account' },
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
                                        <CButton color="primary" type="submit" className="mb-3">
                                            Add User
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

export default AddUser

import React, { useEffect, useState } from 'react'
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
} from '@coreui/react'
import DocsComponents from '../../components/DocsComponents'
import apiClient from '../../service/apiClient'

const EditInformation = () => {
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiClient.fetchExhibitor();
        if (data.success) { 
          setFormData(data.data);
        } else {
          console.warn('API responded with failure:', data.message);
        }
      } catch (error) {
        console.error('Error while fetching exhibitor:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);  
  

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

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
          description="Some sensitive information, such as the PI number, email ID, hall number, and booth number, cannot be edited. If you need to make changes to this information, please contact the admin."
          button="Support"
        />
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit Your Information Here</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel>PI Number</CFormLabel>
                <CFormInput
                  type="text"
                  value={formData?.piNumber || ''}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <CFormLabel>Company Name</CFormLabel>
                <CFormInput
                  type="text"
                  value={formData?.companyName || ''}
                />
              </div>
              <div className="mb-3">
                <CFormLabel>Brand Name</CFormLabel>
                <CFormInput type="text" name="brandName" value={formData?.brandName || ''} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <CFormLabel>Booth Number</CFormLabel>
                <CFormInput type="text" value={formData?.boothNumber || ''} readOnly />
              </div>
              <div className="mb-3">
                <CFormLabel>Stall Size</CFormLabel>
                <CFormInput type="number" value={formData?.stallSize || ''} readOnly />
              </div>
              <div className="mb-3">
                <CFormLabel>Stand Type</CFormLabel>
                <CFormSelect
                  name="standType"
                  value={formData?.standType || ''}
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
                <CFormInput type="number" value={formData?.hallNumber || ''} readOnly />
              </div>
              <div className="mb-3">
                <CFormLabel>Mobile Number</CFormLabel>
                <CFormInput type="number" name="mobileNumber" value={formData?.mobileNumber || ''} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <CFormLabel>Additional Mobile Number</CFormLabel>
                <CFormInput type="number" name="additionalMobile" value={formData?.additionalMobile || ''} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <CFormLabel>Additional Email address</CFormLabel>
                <CFormInput type="email" name="additionalEmail" value={formData?.additionalEmail || ''} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <CFormLabel>Company Address</CFormLabel>
                <CFormTextarea name="address" rows={3} value={formData?.address || ''} onChange={handleChange}></CFormTextarea>
              </div>
              <div className="mb-3">
                <CFormLabel>Website URL</CFormLabel>
                <CFormInput type="text" name="websiteUrl" value={formData?.websiteUrl || ''} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <CFormLabel>GST No</CFormLabel>
                <CFormInput type="text" name="gstNumber" value={formData?.gstNumber || ''} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <CFormLabel>Company Profile</CFormLabel>
                <CFormTextarea name="companyProfile" rows={3} value={formData?.companyProfile || ''} onChange={handleChange}></CFormTextarea>
              </div>
              <div className="mb-3">
                <CFormLabel>Default file input example</CFormLabel>
                <CFormInput type="file" id="formFile" />
              </div>
              <div className="mb-3">
                <CButton color="primary" type="submit" className="mb-3">
                  Update Information
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EditInformation

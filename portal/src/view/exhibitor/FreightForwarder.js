import React from 'react'
import { 
    CRow, 
    CCol,
    CCard,
    CCardBody, 
} from '@coreui/react'

const FreightForwarder = () => {
  return (
    <CRow>
        <CCard className="mb-4 mt-4">
            <CCardBody>
                <CRow className="mb-4 mt-3">
                    <CCol xs={12} md={3}>
                    <strong>Vendor Name:-</strong>
                    </CCol>
                    <CCol xs={12} md={9}>
                    R.E. Rogers India
                    </CCol>
                </CRow>

                <CRow className="mb-4">
                    <CCol xs={12} md={3}>
                    <strong>Contact Person:-</strong>
                    </CCol>
                    <CCol xs={12} md={9}>
                    Mr Abhilash
                    </CCol>
                </CRow>

                <CRow className="mb-4">
                    <CCol xs={12} md={3}>
                    <strong>Email Id:-</strong>
                    </CCol>
                    <CCol xs={12} md={9}>
                    abhilash@rogersworldwideindia.com
                    </CCol>
                </CRow>

                <CRow className="mb-4">
                    <CCol xs={12} md={3}>
                    <strong>Contact Number:-</strong>
                    </CCol>
                    <CCol xs={12} md={9}>
                    9902950946
                    </CCol>
                </CRow>

                <CRow className="mb-4">
                    <CCol xs={12} md={3}>
                    <strong>Website:-</strong>
                    </CCol>
                    <CCol xs={12} md={9}>
                    https://rogersworldwideindia.com/
                    </CCol>
                </CRow>

                <CRow className="mb-4">
                    <CCol xs={12} md={3}>
                    <strong>Address:-</strong>
                    </CCol>
                    <CCol xs={12} md={9}>
                    R.E.Rogers India Pvt Ltd, No.53, 19th Mile, Tumkur Road, Next to Swamy Petrol Pump, Madanayakanahalli, Bangalore - 562123.
                    </CCol>
                </CRow>

                <CRow className="mb-4">
                    <CCol xs={12} md={3}>
                    <strong>Description:-</strong>
                    </CCol>
                    <CCol xs={12} md={9}>  
                    R.E. Rogers India (RERI) is a market leader in the fields of domestic and overseas logistics. Incepted in 1986, it was established with the vision of handling exhibition cargo in India and abroad.
                    </CCol>
                </CRow>

            </CCardBody>
        </CCard>
    </CRow>
  )
}

export default FreightForwarder

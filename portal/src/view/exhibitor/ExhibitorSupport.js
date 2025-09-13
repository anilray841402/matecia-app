import React from 'react'
import { 
    CRow, 
    CCol,
    CCard,
    CCardBody, 
} from '@coreui/react'

const ExhibitorSupport = () => {
  return (
    <CRow>
        <CCard className="mb-4 mt-4">
            <CCardBody>
                <CRow className="mb-4">
                    <CCol xs={12} md={3}>
                    <strong>Contact Person : -</strong>
                    </CCol>
                    <CCol xs={12} md={9}>
                    Mr Benjamin Joshef
                    </CCol>
                </CRow>

                <CRow className="mb-4">
                    <CCol xs={12} md={3}>
                    <strong>Email Id : -</strong>
                    </CCol>
                    <CCol xs={12} md={9}>
                    exhibitor@matecia.com
                    </CCol>
                </CRow>

                <CRow className="mb-4">
                    <CCol xs={12} md={3}>
                    <strong>Contact Number : -</strong>
                    </CCol>
                    <CCol xs={12} md={9}>
                    +91 8178655044
                    </CCol>
                </CRow>

                <CRow className="mb-4 mt-3">
                    <CCol xs={12} md={3}>
                    <strong> Address : - </strong>
                    </CCol>
                    <CCol xs={12} md={9}>
                    Harkesh Nagar Okhla, Industrial Area, Delhi 10092
                    </CCol>
                </CRow>

            </CCardBody>
        </CCard>
    </CRow>
  )
}

export default ExhibitorSupport

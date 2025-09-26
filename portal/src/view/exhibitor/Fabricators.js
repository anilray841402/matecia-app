import React, { useState } from 'react'
import {
  CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'

const Fabricators = () => {
  const [visible, setVisible] = useState(false)

  const description = 'Propshop redefines exhibition stall design. We are not just building spaces; were creating immersive experiences that resonate with your audience.'
  const address = 'Propshop Events & Exhibitions Pvt Ltd Plot No.837, Opp INEZ Tower 6, Mori Road, Mahim (W),Postal Code: 400016, Mumbai, India'
  const gst = ''

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Fabricators List</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              You can take the data from the table below and reach out to the fabricators.
            </p>
            <CTable bordered>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Company Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Contact Person</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Mobile Number</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email Id</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Website</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Detail</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableHeaderCell scope="row">1</CTableHeaderCell>
                  <CTableDataCell>Propshop Events & Exhibitions Pvt Ltd</CTableDataCell>
                  <CTableDataCell>Mr Prathamesh Pusalkar</CTableDataCell>
                  <CTableDataCell>9820669889</CTableDataCell>
                  <CTableDataCell>prathamesh@thepropshop.co.in</CTableDataCell>
                  <CTableDataCell>
                    <a href="https://abc.com/" target="_blank" rel="noreferrer">  
                      https://abc.com/
                    </a>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton color="primary" onClick={() => setVisible(true)}>
                      View More
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>

            {/* Modal */}
            <CModal visible={visible} onClose={() => setVisible(false)}>
              <CModalHeader>
                <CModalTitle>Fabricator Details</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <p><strong>Address:</strong> {address}</p>
                <p><strong>Description:</strong> {description}</p>
                <p><strong>GST:</strong> {gst}</p>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setVisible(false)}>
                  Close
                </CButton>
              </CModalFooter>
            </CModal>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Fabricators

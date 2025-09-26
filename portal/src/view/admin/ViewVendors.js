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

} from '@coreui/react';
import { Formik, Form, Field } from 'formik';
import CIcon from '@coreui/icons-react';
import { cilPencil, cilTrash } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import apiClient from '../../service/apiClient';

const ViewVendors = () => {

  const [vendors, setVendors] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [modelVisible, setModelVisible] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [successUpdateMessage, setSuccessUpdateMessage] = useState('');
  const [errorUpdateMessage, setErrorUpdateMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    fetchVendorsData();
  }, []);

  const fetchVendorsData = async () => {
    try {
      const res = await apiClient.fetchVendors();
      if (res.success) {
        setVendors(res.data);
      }
    } catch (err) {
      console.error('Error fetching vendors:', err);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (item) => {
    setSelectedVendor(item);
    if (window.confirm("Do you really want to delete this item?")) {
      try {
        const res = await apiClient.deleteVendor(item._id);
        if (res.success) {
          fetchVendorsData();
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

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("companyName", values.companyName);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("type", values.type);
    formData.append("mobileNumber", values.mobileNumber);
    formData.append("additionalMobile", values.additionalMobile);
    formData.append("additionalEmail", values.additionalEmail);
    formData.append("address", values.address);
    formData.append("websiteUrl", values.websiteUrl);
    formData.append("gstNumber", values.gstNumber);
    formData.append("companyProfile", values.companyProfile);
    formData.append("imgSrc", values.imgSrc);

    const res = await apiClient.updateVendor(formData, selectedVendor._id);
    if (res.success) {
      setModelVisible(false);
      fetchVendorsData();
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

  const filteredVendors = vendors.filter((item) =>
    item.details?.companyName?.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);

  const currentVendors = filteredVendors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  return (
    <>
      <CCard className="mbb-4">
        <CCardHeader>
          {/* <strong>Vendors List</strong> */}
          <div className="d-flex justify-content-end mb-1 mt-1 ">
            <input
              type="text"
              className="form-control w-25"
              placeholder="Search by company name"
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
                <CTableHeaderCell>Contect Person</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Mobile</CTableHeaderCell>
                <CTableHeaderCell>Type</CTableHeaderCell>
                <CTableHeaderCell>Action Button</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentVendors.map((item, index) => (
                <CTableRow key={item._id}>
                  <CTableDataCell>{index + 1 + (currentPage - 1) * itemsPerPage}</CTableDataCell>
                  <CTableDataCell>{item.details.companyName}</CTableDataCell>
                  <CTableDataCell>{item.name}</CTableDataCell>
                  <CTableDataCell>{item.email}</CTableDataCell>
                  <CTableDataCell>{item.details.mobileNumber}</CTableDataCell>
                  <CTableDataCell>{item.details.type}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="primary" className="me-2" onClick={() => {
                      setSelectedVendor(item);
                      setModelVisible(true);
                    }}><CIcon icon={cilPencil} />
                    </CButton>
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

          {/* Modal 2 Start*/}
          <CModal visible={modelVisible} onClose={() => setModelVisible(false)}>
            <CModalHeader>
              <CModalTitle>Vendor Details</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <Formik
                enableReinitialize
                initialValues={{
                  companyName: selectedVendor?.details.companyName || '',
                  name: selectedVendor?.name || '',
                  email: selectedVendor?.email || '',
                  mobileNumber: selectedVendor?.details.mobileNumber || '',
                  type: selectedVendor?.details.type || '',
                  additionalMobile: selectedVendor?.details.additionalMobile || '',
                  additionalEmail: selectedVendor?.details.additionalEmail || '',
                  address: selectedVendor?.details.address || '',
                  websiteUrl: selectedVendor?.details.websiteUrl || '',
                  gstNumber: selectedVendor?.details.gstNumber || '',
                  companyProfile: selectedVendor?.details.companyProfile || '',
                  file: null,
                }}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue }) => (
                  <Form>
                    <div className="mb-3">
                      <CFormLabel>Company Name</CFormLabel>
                      <Field name="companyName">
                        {({ field }) => <CFormInput {...field} />}
                      </Field>
                    </div>

                    <div className="mb-3">
                      <CFormLabel>Contact Person</CFormLabel>
                      <Field name="name">
                        {({ field }) => <CFormInput {...field} />}
                      </Field>
                    </div>

                    <div className="mb-3">
                      <CFormLabel>Type</CFormLabel>
                      <Field name="type" as="select">
                        {({ field }) => (
                          <CFormSelect {...field} options={[
                            { label: 'Select Type', value: '' },
                            { label: 'Fabricator', value: 'fabricator' },
                            { label: 'Faight Forwarder', value: 'faightForwarder' },
                            { label: 'Food and Beverage', value: 'Food and beverage' },
                          ]} />
                        )}
                      </Field>
                    </div>

                    <div className="mb-3">
                      <CFormLabel>Email Id</CFormLabel>
                      <Field name="email">
                        {({ field }) => <CFormInput {...field} />}
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

export default ViewVendors;

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

} from '@coreui/react';
import { Formik, Form, Field } from 'formik';
import CIcon from '@coreui/icons-react';
import { cilPencil } from '@coreui/icons';
// import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import apiClient from '../../service/apiClient';

const ViewUsers = () => {

  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [modelVisible, setModelVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [successUpdateMessage, setSuccessUpdateMessage] = useState('');
  const [errorUpdateMessage, setErrorUpdateMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    try {
      const res = await apiClient.fetchUsers();
      if (res.success) {
        setUsers(res.data);
      }
    } catch (err) {
      console.error('Error fetching Users:', err);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("role", values.role);
 
    const res = await apiClient.updateUser(formData, selectedUser._id);
    if (res.success) {
      setModelVisible(false);
      fetchUsersData();
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

  const handleLogin = (role)=> {
    // navigate("/operation", "_blank");
    if (role === "operation") {
      window.open("/operation", "_blank");
    } else {
      window.open("/account", "_blank");
    }
  }

  const filteredUsers = users.filter((item) =>
    item?.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  return (
    <>
      <CCard className="mbb-4">
        <CCardHeader>
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
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Role</CTableHeaderCell>
                <CTableHeaderCell>Action Button</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentUsers.map((item, index) => (
                <CTableRow key={item._id}>
                  <CTableDataCell>{index + 1 + (currentPage - 1) * itemsPerPage}</CTableDataCell>
                  <CTableDataCell>{item.name}</CTableDataCell>
                  <CTableDataCell>{item.email}</CTableDataCell>
                  <CTableDataCell>{item.role}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="primary" className="me-2" onClick={() => {
                      setSelectedUser(item);
                      setModelVisible(true);
                    }}><CIcon icon={cilPencil} />
                    </CButton>
                    <CButton color="primary" onClick={()=>{handleLogin(item.role);}} className="me-2">Login</CButton>
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
              <CModalTitle>User Details</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <Formik
                enableReinitialize
                initialValues={{
                  name: selectedUser?.name || '',
                  email: selectedUser?.email || '',
                  role: selectedUser?.role || '',
                }}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue }) => (
                  <Form>
                    <div className="mb-3">
                      <CFormLabel>Contact Person</CFormLabel>
                      <Field name="name">
                        {({ field }) => <CFormInput {...field} />}
                      </Field>
                    </div>

                    <div className="mb-3">
                      <CFormLabel>Role</CFormLabel>
                      <Field name="role" as="select">
                        {({ field }) => (
                          <CFormSelect {...field} options={[
                            { label: 'Select Type', value: '' },
                            { label: 'operation', value: 'operation' },
                            { label: 'account', value: 'account' },
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

export default ViewUsers;

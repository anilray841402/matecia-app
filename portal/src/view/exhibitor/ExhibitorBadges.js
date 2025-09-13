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
  CFormInput,
  CForm,
  CPagination,
  CPaginationItem,
} from '@coreui/react';
import { useState, useEffect } from 'react';
import apiClient from '../../service/apiClient';

const ExhibitorBadges = () => {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [badges, setBadges] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successUpdateMessage, setSuccessUpdateMessage] = useState('');
  const [errorUpdateMessage, setErrorUpdateMessage] = useState('');
  const [editingBadgeId, seteditingBadgeId] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchBadges();
  }, []);

  const fetchBadges = async () => {
    try {
      const res = await apiClient.fetchBadges();
      if (res.success) {
        setBadges(res.data);
      }
    } catch (err) {
      console.error('Error fetching badges:', err);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      let res;

      if (editingBadgeId) {
        res = await apiClient.updateBadges(editingBadgeId, name, designation, companyName, email, mobile);
      } else {
        res = await apiClient.submitBadges(name, designation, companyName, email, mobile);
      }

      if (res.success) {
        setName("");
        setDesignation("");
        setCompanyName("");
        setEmail("");
        setMobile("");
        fetchBadges();
        setSuccessMessage(editingBadgeId ? 'Badge Updated successfully!' : 'Badge added successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage(editingBadgeId ? 'Failed to update badge.' : 'Failed to add badge.');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred.');
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      seteditingBadgeId(null);
      setLoading(false);
    }
  };

  const handleDelete = async (badgeId) => {
    setLoading(true);
    try {
      const res = await apiClient.deletedBadge(badgeId);
      if (res.success) {
        setBadges(prevBadges => prevBadges.filter(badge => badge._id !== badgeId));
        setSuccessUpdateMessage('Badge deleted successfully!');
        setTimeout(() => setSuccessUpdateMessage(''), 3000);
      } else {
        setErrorUpdateMessage('An error occurred while deleting badge.');
        setTimeout(() => setErrorUpdateMessage(''), 3000);
      }
    } catch (error) {
      console.error(error);
      setErrorUpdateMessage('An error occurred while deleting badge.');
      setTimeout(() => setErrorUpdateMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const currentBadges = badges.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(badges.length / itemsPerPage);

  const handleEdit = async (badgeId) => {
    const singleBadge = badges.find(b => b._id === badgeId);
    setName(singleBadge.name);
    setDesignation(singleBadge.designation);
    setCompanyName(singleBadge.companyName);
    setEmail(singleBadge.email);
    setMobile(singleBadge.mobile);
    seteditingBadgeId(badgeId);
  };

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Add Your Badges Here</strong>
        </CCardHeader>

        {successMessage && (
          <div
            style={{
              color: 'green',
              marginTop: '7px',
              marginLeft: '15px',
            }}
          >
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div
            style={{
              color: 'red',
              marginTop: '7px',
              marginLeft: '15px',
            }}
          >
            {errorMessage}
          </div>
        )}

        <CForm onSubmit={handleSubmit}>
          <CCardBody>
            <CTable bordered>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Company Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email Id</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Mobile Number</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell>
                    <CFormInput
                      type="text"
                      maxLength={35}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="text"
                      maxLength={35}
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="text"
                      maxLength={35}
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="text"
                      maxLength={35}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="text"
                      inputMode="numeric"
                      pattern="\d*"
                      maxLength={10}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton color="primary" type="submit" disabled={loading}>
                      {loading ? (editingBadgeId ? "Updating..." : "Submitting...") : (editingBadgeId ? "Update" : "Submit")}
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CForm>
      </CCard>
      <CCard className="mbb-4">
        <CCardHeader>
          <strong>Your Badges Here</strong>
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
                <CTableHeaderCell>Designation</CTableHeaderCell>
                <CTableHeaderCell>Company Name</CTableHeaderCell>
                <CTableHeaderCell>Email Id</CTableHeaderCell>
                <CTableHeaderCell>Mobile Number</CTableHeaderCell>
                <CTableHeaderCell>Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentBadges.map((item, index) => (
                <CTableRow key={item._id}>
                  <CTableDataCell>{index + 1 + (currentPage - 1) * itemsPerPage}</CTableDataCell>
                  <CTableDataCell>{item.name}</CTableDataCell>
                  <CTableDataCell>{item.designation}</CTableDataCell>
                  <CTableDataCell>{item.companyName}</CTableDataCell>
                  <CTableDataCell>{item.email}</CTableDataCell>
                  <CTableDataCell>{item.mobile}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="primary" onClick={() => handleEdit(item._id)}>Edit</CButton>
                    <CButton color="danger" onClick={() => {if (window.confirm("Are you sure you want to delete this record?")) {handleDelete(item._id)}} } style={{ marginLeft: '10px' }}>Delete</CButton>
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
        </CCardBody>
      </CCard>
    </>
  );
};

export default ExhibitorBadges;

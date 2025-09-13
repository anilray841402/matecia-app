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
  CFormInput,
  CForm,
  CPagination,
  CPaginationItem
} from '@coreui/react';
import { useState, useEffect } from 'react';
import apiClient from '../../service/apiClient';

const PaymentRecord = () => {
  const [date, setDate] = useState("");
  const [stallPayment, setStallPayment] = useState("");
  const [brandingPayment, setBrandingPayment] = useState("");
  const [powerPayment, setPowerPayment] = useState("");
  const [tdsDeductions, setTdsDeductions] = useState("");
  const [refNumber, setRefNumber] = useState("");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentRecord, setPaymentRecord] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successUpdateMessage, setSuccessUpdateMessage] = useState('');
  const [errorUpdateMessage, setErrorUpdateMessage] = useState('');
  const [editingPaymentRecordId, setEditingPaymentRecordId] = useState(null);
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchPaymentRecord();
  }, []);

  const fetchPaymentRecord = async () => {
    try {
      const res = await apiClient.fetchPaymentRecord();
      if (res.success) {
        setPaymentRecord(res.data);
      }
    } catch (err) {
      console.error('Error fetching payment Record:', err);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentPaymentRecord = paymentRecord.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(paymentRecord.length / itemsPerPage);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      let res;

      if (editingPaymentRecordId) {
        res = await apiClient.updatePaymentRecord(editingPaymentRecordId, date, stallPayment, brandingPayment, powerPayment, tdsDeductions, refNumber, remarks);
      } else {
        res = await apiClient.submitPaymentRecord(date, stallPayment, brandingPayment, powerPayment, tdsDeductions, refNumber, remarks);
      }

      if (res.success) {
        setDate("");
        setStallPayment("");
        setBrandingPayment("");
        setPowerPayment("");
        setTdsDeductions("");
        setRefNumber("");
        setRemarks("");

        // Re-fetch the full list from server
        fetchPaymentRecord();

        setSuccessMessage(editingPaymentRecordId ? 'Payment Record Updated successfully!' : 'Payment Record added successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage(editingPaymentRecordId ? 'Failed to update Payment Record.' : 'Failed to add Payment Record.');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred.');
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      setEditingPaymentRecordId(null);
      setLoading(false);
    }
  };

  const handleDelete = async (paymentRecordId) => {
    setLoading(true);
    try {
      const res = await apiClient.deletePaymentRecord(paymentRecordId);
      if (res.success) {
        // console.log("Payment Record deleted success");
        setPaymentRecord(prevPaymentRecord => prevPaymentRecord.filter(paymentRecord => paymentRecord._id !== paymentRecordId));
        setSuccessUpdateMessage('Payment Record deleted successfully!');
        setTimeout(() => {
          setSuccessUpdateMessage('');
        }, 3000);
      } else {
        setErrorUpdateMessage('An error occurred while deleting paymentRecord.');
        setTimeout(() => {
          setErrorUpdateMessage('');
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setErrorUpdateMessage('An error occurred while deleting paymentRecord.');
      setTimeout(() => {
        setErrorUpdateMessage('');
      }, 3000);
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = async (paymentRecordId) => {
    const singlePaymentRecord = paymentRecord.find(b => b._id === paymentRecordId);
    setDate(singlePaymentRecord.date);
    setStallPayment(singlePaymentRecord.stallPayment);
    setBrandingPayment(singlePaymentRecord.brandingPayment);
    setPowerPayment(singlePaymentRecord.powerPayment);
    setTdsDeductions(singlePaymentRecord.tdsDeductions);
    setRefNumber(singlePaymentRecord.refNumber);
    setRemarks(singlePaymentRecord.remarks);
    setEditingPaymentRecordId(paymentRecordId);
  }

  const {
  totalStallPayment,
  totalBrandingPayment,
  totalPowerPayment,
  totalTds
} = paymentRecord.reduce(
  (acc, curr) => {
    acc.totalStallPayment += Number(curr.stallPayment) || 0;
    acc.totalBrandingPayment += Number(curr.brandingPayment) || 0;
    acc.totalPowerPayment += Number(curr.powerPayment) || 0;
    acc.totalTds += Number(curr.tdsDeductions) || 0;
    return acc;
  },
  {
    totalStallPayment: 0,
    totalBrandingPayment: 0,
    totalPowerPayment: 0,
    totalTds: 0,
  }
);


  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Your Payment Details Here</strong>
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
                    <CTableHeaderCell scope="col">Payment Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Stall Payment	</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Branding Payment</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Power Payment</CTableHeaderCell>
                    <CTableHeaderCell scope="col">TDS Deductions</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Cheque/NEFT/RTGS Ref</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Remarks</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell>
                      <CFormInput
                        type="text"
                        value={date}
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="yyyy-mm-dd"
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        maxLength={10}
                        value={stallPayment}
                        onChange={(e) => setStallPayment(e.target.value)}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        maxLength={10}
                        value={brandingPayment}
                        onChange={(e) => setBrandingPayment(e.target.value)}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        maxLength={10}
                        value={powerPayment}
                        onChange={(e) => setPowerPayment(e.target.value)}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        maxLength={10}
                        value={tdsDeductions}
                        onChange={(e) => setTdsDeductions(e.target.value)}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        type="text"
                        value={refNumber}
                        onChange={(e) => setRefNumber(e.target.value)}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        type="text"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton color="primary" type="submit" disabled={loading}>
                        {loading ? (editingPaymentRecordId ? "Updating..." : "Submitting...") : (editingPaymentRecordId ? "Update" : "Submit")}
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
          </CForm>
        </CCard>
        <CCard className="mb-4 mt-4">
          <CCardHeader>
            <strong>List of Your payment details</strong>
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
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Payment Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Stall Payment	</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Branding Payment</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Power Payment</CTableHeaderCell>
                  <CTableHeaderCell scope="col">TDS Deductions</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Cheque/NEFT/RTGS Ref</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Remarks</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentPaymentRecord.length ? (
                  currentPaymentRecord.map((item, index) => (
                    <CTableRow key={item._id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{item.date}</CTableDataCell>
                      <CTableDataCell>{item.stallPayment}</CTableDataCell>
                      <CTableDataCell>{item.brandingPayment}</CTableDataCell>
                      <CTableDataCell>{item.powerPayment}</CTableDataCell>
                      <CTableDataCell>{item.tdsDeductions}</CTableDataCell>
                      <CTableDataCell>{item.refNumber}</CTableDataCell>
                      <CTableDataCell>{item.remarks}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="primary" onClick={() => handleEdit(item._id)} >
                          Edit
                        </CButton>
                        <CButton color="danger" style={{ marginLeft: '10px' }} onClick={() => {
                          if (window.confirm("Are you sure you want to delete this record?")) {
                            handleDelete(item._id)
                          }
                        }}
                        >
                          Delete
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan="7" className="text-center">
                      Payment Record Not Added
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
              <CTableBody>
                <CTableRow >
                  <CTableHeaderCell scope="row">**</CTableHeaderCell>
                  <CTableDataCell><strong>Sub Total</strong></CTableDataCell>
                  <CTableDataCell><strong>{ totalStallPayment }</strong></CTableDataCell>
                  <CTableDataCell><strong>{ totalBrandingPayment }</strong></CTableDataCell>
                  <CTableDataCell><strong>{ totalPowerPayment }</strong></CTableDataCell>
                  <CTableDataCell><strong>{ totalTds }</strong></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                </CTableRow>
              </CTableBody>
              <CTableBody>
                <CTableRow >
                  <CTableHeaderCell scope="row">**</CTableHeaderCell>
                  <CTableDataCell><strong>Grand Total</strong></CTableDataCell>
                  <CTableDataCell><strong>{ totalStallPayment + totalBrandingPayment + totalPowerPayment }</strong></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                </CTableRow>
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
      </CCol>
    </CRow>
  );
};

export default PaymentRecord;

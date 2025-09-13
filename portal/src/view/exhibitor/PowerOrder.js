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
  CListGroup,
  CListGroupItem,
  CAlert,
} from '@coreui/react';
import { useState, useEffect } from 'react';
import html2pdf from "html2pdf.js";
import apiClient from '../../service/apiClient';
import invoiceLogo from '../../assets/images/invoice-logo.jpg'
import bigseaStamp from '../../assets/images/bigsea-stamp.jpg'

const PowerOrder = () => {
  const [setUpDays, setSetUpDays] = useState(1);
  const [showDays, setShowDays] = useState(1);
  const [date, setDate] = useState();
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState();
  const [status, setStatus] = useState(0);
  const [powerOrderId, setPowerOrderId] = useState();
  const [reopenId, setReopenId] = useState();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [piNumber, setPiNumber] = useState();
  const [companyName, setCompanyName] = useState();
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState();
  const [gst, setGst] = useState();

  useEffect(() => {
    const totalValue = (Number(setUpDays) + Number(showDays)) * 4000;
    setTotal(totalValue);
  }, [setUpDays, showDays]);

  const getPowerOrder = async () => {

    try {
      const res = await apiClient.fetchPowerOrder();
      if (res.success) {
        // console.log("Data is ", res.data[0].userId);
        setShowDays(res.data.showDays);
        setSetUpDays(res.data.setUpDays);
        setStatus(res.reOpenRequest.status);
        setReopenId(res.reOpenRequest._id);
        setPowerOrderId(res.data._id);
        setDate(res.data.updatedAt);
        setPiNumber(res.exhibitor.piNumber);
        setCompanyName(res.exhibitor.companyName)
        setMobile(res.exhibitor.mobileNumber)
        setEmail(res.exhibitor.additionalEmail)
        setGst(res.exhibitor.gstNumber)
        
      } else {
        // console.log("hi");
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPowerOrder();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res;
      if (status === 0) {
        res = await apiClient.submitPowerOrder(setUpDays, showDays, total, 1);
      } else if (status === 1) {
        res = await apiClient.reopenPowerOrder(2, reopenId)
      } else if (status === 3) {
        res = await apiClient.updatePowerOrder(powerOrderId, reopenId, setUpDays, showDays, total, 1);
      }
      if (res.success) {
        console.log("Data Submited Successfully");
        setSuccessMessage("Request Submited Successfully");
        getPowerOrder();
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000)
      } else {
        console.log(res.message);
        setErrorMessage("Error While Submiting The Request");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000)
      }
    } catch (error) {
      setErrorMessage("Error While Submiting The Request");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000)
    } finally {
      setLoading(false);
    }
  }

  const handleDownloadPI = () => {
    const element = document.getElementById('pi-template');
    element.style.display = 'block';
    const opt = {
      margin: 0.5,
      filename: 'Power_Order_PI.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    setTimeout(() => {
      html2pdf().set(opt).from(element).save().then(() => {
        element.style.display = 'none';
      });
    }, 100); 
  };

  const getButtonLabel = () => {
    switch (status) {
      case 0: return "Submit Power Order";
      case 1: return "Re-Open Request";
      case 2: return "Wait for admin approval";
      case 3: return "Update Power Order";
      default: return "Submit";
    }
  };

  const cellStyle = {
    border: '1px solid #ddd',
    padding: '0.5em',
    borderRadius: '0.25em',
    textAlign: 'left',
    fontSize: 13,
  };
  const thStyle = {
    border: '1px solid #ddd',
    padding: '0.5em',
    borderRadius: '0.25em',
    background: '#eee',
    borderColor: '#bbb',
    textAlign: 'left',
    fontSize: 13,
  };
  
  const tdStyle = {
    border: '1px solid #ddd',
    padding: '0.5em',
    borderRadius: '0.25em',
    textAlign: 'right',
  };
  
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4 rounded-4 shadow-sm">
            <CCardHeader>
              <strong>Add Your Power Order Here</strong>
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
                      <CTableHeaderCell scope="col">Required Item</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Rate(INR)</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Show Days Unit(21-24 Aug)</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Set Up Days Unit(18-20 Aug)</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Total Amount</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow>
                      <CTableDataCell>
                        <strong>Power Requirement</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong>4000/KW</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormInput
                          type="number"
                          min={1}
                          max={10}
                          value={showDays}
                          onChange={(e) => setShowDays(e.target.value)}
                          readOnly={status === 1 || status === 2}
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormInput
                          type="number"
                          min={1}
                          max={12}
                          value={setUpDays}
                          onChange={(e) => setSetUpDays(e.target.value)}
                          readOnly={status === 1 || status === 2}
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong>{total}</strong>
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
                <CRow>
                  <CCol sm={6}>
                  </CCol>
                  <CCol sm={3} className="text-end">
                    <CButton color="primary" className="text-end" onClick={handleDownloadPI} disabled={status === 0 || loading} hidden={status === 0}>Download PI</CButton>
                  </CCol>
                  <CCol sm={3} className="text-center">
                    <CButton color="primary" type="submit" disabled={status === 2 || loading}>
                      {loading ? "Requesting..." : getButtonLabel()}
                    </CButton>
                  </CCol>
                </CRow>
              </CCardBody>
            </CForm>
          </CCard>
          <CCard className="mb-4 rounded-4 shadow-sm">
            <CCardBody>
              <h4 className="mb-3"><strong>Payment Details:</strong></h4>
              <CListGroup flush>
                <CListGroupItem><strong>Account Name:</strong> BIG SEA MARCOM INDIA PVT LTD</CListGroupItem>
                <CListGroupItem><strong>Bank Name:</strong> HDFC Bank Ltd</CListGroupItem>
                <CListGroupItem><strong>Account No:</strong> 16622560000381</CListGroupItem>
                <CListGroupItem><strong>RTGS/NEFT IFSC:</strong> HDFC0001662</CListGroupItem>
                <CListGroupItem><strong>Bank Swift Code:</strong> HDFCINBB</CListGroupItem>
                <CListGroupItem><strong>Address:</strong> N-13, Kalkaji, New Delhi-110019</CListGroupItem>
              </CListGroup>

              <CAlert color="info" className="mt-4">
                <strong>Note:</strong> Event Days Min. Power: 5 KW, Set Up Days Min. Power: 1 KW<br />
                If you feel any difficulty, please call us at <strong>+91 8178655044</strong>
              </CAlert>

              <h5 className="mt-4"><strong>Power Requirement Guidelines:</strong></h5>
              <CListGroup flush>
                <CListGroupItem>Exhibiting Companies <strong>below 20 Sq Mtrs</strong> need to order a minimum of <strong>1KW</strong> for Set Up Days and <strong>1 KW</strong> for Show days.</CListGroupItem>
                <CListGroupItem>Exhibiting Companies <strong>below 36 Sq Mtrs</strong> need to order a minimum of <strong>1KW</strong> for Set Up Days and <strong>2 KW</strong> for Show days.</CListGroupItem>
                <CListGroupItem>Exhibiting Companies participating in <strong>Bare Scheme</strong> and are <strong>above 36 Sq Mtrs</strong> need to order a Minimum of <strong>1 KW</strong> for Set Up Days and <strong>5 KW</strong> for Show Days.</CListGroupItem>
              </CListGroup>

              <h5 className="mt-4"><strong>Specifications:</strong></h5>
              <CListGroup flush>
                <CListGroupItem><strong>Three Phase:</strong> 415 Volts (±10%)</CListGroupItem>
                <CListGroupItem><strong>Frequency:</strong> 50 Hz (±3%)</CListGroupItem>
                <CListGroupItem><strong>Single Phase:</strong> 230 V (±10%)</CListGroupItem>
              </CListGroup>

              <CAlert color="warning" className="mt-4">
                Kindly note that we will provide the junction box at your stand, internal cabling to the machines shall be done by yourself.
              </CAlert>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <div id="pi-template" style={{ fontFamily: 'Arial, sans-serif', margin: 20, display: 'none' }}>
        <h1
          style={{
            fontWeight: 'bold',
            fontSize: '100%',
            letterSpacing: '0.5em',
            textAlign: 'center',
            textTransform: 'uppercase',
            background: '#000',
            color: '#fff',
            padding: '10px 0',
            margin: 0,
          }}
        >
          Proforma Invoice
        </h1>

        <img src={invoiceLogo} alt="Logo" style={{ width: '100%', marginTop: '20px', marginBottom: '40px' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div style={{ fontSize: 14, lineHeight: 1.25  }}>
            <p style={{ margin: '0.5em' }}><strong>Big Sea Marcom India Pvt. Ltd.</strong></p>
            <p style={{ margin: '0.5em' }}>3rd Floor No 160, 1st Main Road Seshadripuram, Bangalore</p>
            <p style={{ margin: '0.5em' }}>Mob. No. +91 9310612992/6</p>
            <p style={{ margin: '0.5em' }}>Email: accounts@bigsea.in</p>
            <p style={{ margin: '0.5em' }}>Company's GST NO: 29AADCB7594C1ZH</p>
          </div>

          <div style={{ fontSize: 14, lineHeight: 1.25, textAlign: 'right' }}>
            <p style={{ margin: '0.5em' }}><strong>Buyer</strong></p>
            <p style={{ margin: '0.5em' }}><strong>{companyName}</strong></p>
            <p style={{ margin: '0.5em' }}>Mob. No.: {mobile}</p>
            <p style={{ margin: '0.5em' }}>Email: {email}</p>
            <p style={{ margin: '0.5em' }}>GST: {gst}</p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20 }}>
          <div style={{ flex: 1, fontSize: 14 }}>
            <p><strong>Our Bank Details as Below:</strong></p>
            <p>
              BIG SEA MARCOM INDIA PVT LTD<br />
              Account No.: 16622560000381<br />
              Bank: HDFC Bank Ltd.<br />
              RTGS/NEFT IFSC: HDFC0001662<br />
              Bank Swift Code: HDFCINBB<br />
              Branch Address: N-13, Kalkaji, New Delhi-110019 India
            </p>
          </div>
          <div style={{ flex: 1 }}>
            <table style={{ fontSize: '75%', tableLayout: 'fixed', width: '100%', borderCollapse: 'separate', borderSpacing: 2 }}>
              <tbody>
                <tr>
                  <th style={thStyle}>PI Number</th>
                  <td style={tdStyle}>{piNumber}</td>
                </tr>
                <tr>
                  <th style={thStyle}>Date</th>
                  <td style={tdStyle}>{date?.slice(0, 10) || 'N/A'}</td>
                </tr>
                <tr>
                  <th style={thStyle}>Amount Due</th>
                  <td style={tdStyle}>Rs. {(total * 0.18) + total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <table style={{ fontSize: '75%', tableLayout: 'fixed', width: '100%', borderCollapse: 'separate', borderSpacing: 2, marginTop: 40 }}>
          <thead>
            <tr>
              {['S.No.', 'Description', 'HSN Code', 'Power KW', 'Rate', 'Amount'].map((heading) => (
                <th key={heading} style={thStyle}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={cellStyle}>1</td>
              <td style={cellStyle}>Electricity Charges in MATECIA 2025</td>
              <td style={cellStyle}>998596</td>
              <td style={cellStyle}>{showDays + setUpDays}</td>
              <td style={cellStyle}>Rs. 4000</td>
              <td style={cellStyle}>Rs. {total}</td>
            </tr>
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20 }}>
          <div style={{ flex: 1, fontSize: 14 }}>
          </div>
          <div style={{ flex: 1 }}>
            <table style={{ float: 'right', width: '60%', marginTop: 20, fontSize: 13 }}>
              <tbody>
                <tr>
                  <th style={thStyle} >Sub Total</th>
                  <td style={tdStyle} >Rs. {total}</td>
                </tr>
                <tr>
                  <th style={thStyle} >GST @ 18%</th>
                  <td style={tdStyle} >Rs. {total * 0.18}</td>
                </tr>
                <tr>
                  <th style={thStyle} >G. Total</th>
                  <td style={tdStyle} >Rs. {(total * 0.18) + total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #000', paddingTop: 30, marginTop: 40, display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 14 }}>
            <p><strong>Company's PAN: AADCB7594C</strong></p><br />
            <p><strong>All cheques to be sent to:</strong></p>
            <p>BIG SEA MARCOM INDIA PVT. LTD.</p>
            <p>F-1118, L.G.F. C.R. PARK, NEW DELHI-110019</p>
          </div>

          <div style={{ fontSize: 14, textAlign: 'right' }}>
            <p><strong>For Big Sea Marcom India Pvt. Ltd.</strong></p>
            <p><strong>Authorised Signatory</strong></p>
            <img src={bigseaStamp} alt="Stamp" style={{ maxWidth: 100 }} />
          </div>
        </div>
      </div>

    </>
  );
};

export default PowerOrder;

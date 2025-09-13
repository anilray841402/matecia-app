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
} from '@coreui/react';
import { useState, useEffect } from 'react';
import apiClient from '../../service/apiClient';
import * as html2pdf from 'html2pdf.js';
import nocHeader from '../../assets/images/noc_header.jpg'
import pcHeader from '../../assets/images/pc_header.jpg'
import nocFooter from '../../assets/images/noc_footer.jpg'
import bigseaStamp from '../../assets/images/bigsea-stamp.jpg'
import QRCode from 'react-qr-code';


const CertificateInvoice = () => {

    const [exhibitors, setExhibitors] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        fetchExhibitorsData();
    }, []);

    const fetchExhibitorsData = async () => {
        try {
            const res = await apiClient.fetchExhibitors();
            if (res.success) {
                setExhibitors(res.data);
            }
        } catch (err) {
            console.error('Error fetching exhibitors:', err);
        }
    };

    const handleDownloadNoc = () => {
        const element = document.getElementById('noc-template');
        element.style.display = 'block';

        const opt = {
            margin: 0.5,
            filename: 'Power_Order_PI.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        setTimeout(() => {
            html2pdf.default().set(opt).from(element).save().then(() => {
                element.style.display = 'none';
            });
        }, 10);
    };

    const handleDownloadPc = () => {
        const element = document.getElementById('pc-template');
        element.style.display = 'block';

        const opt = {
            margin: 0.5,
            filename: 'Power_Order_PI.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        setTimeout(() => {
            html2pdf.default().set(opt).from(element).save().then(() => {
                element.style.display = 'none';
            });
        }, 10);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const filteredExhibitors = exhibitors.filter((item) =>
        item.details?.companyName?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.details?.brandName?.toLowerCase().includes(searchText.toLowerCase())
    );

    const totalPages = Math.ceil(filteredExhibitors.length / itemsPerPage);

    const currentExhibitors = filteredExhibitors.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    return (
        <>
            <CCard className="mbb-4">
                <CCardHeader>
                    {/* <strong>Exhibitors List</strong> */}
                    <div className="d-flex justify-content-end mb-1 mt-1 ">
                        <input
                            type="text"
                            className="form-control w-25"
                            placeholder="Search by company or brand"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                </CCardHeader>
                <CCardBody>
                    <CTable bordered>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell>#</CTableHeaderCell>
                                <CTableHeaderCell>Company Name</CTableHeaderCell>
                                <CTableHeaderCell>Download NOC</CTableHeaderCell>
                                <CTableHeaderCell>Download PC</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {currentExhibitors.map((item, index) => (
                                <CTableRow key={item._id}>
                                    <CTableDataCell>{index + 1 + (currentPage - 1) * itemsPerPage}</CTableDataCell>
                                    <CTableDataCell>{item.details.companyName}</CTableDataCell>
                                    <CTableDataCell><CButton color="success" onClick={handleDownloadNoc} >Download NOC</CButton></CTableDataCell>
                                    <CTableDataCell><CButton color="success" onClick={handleDownloadPc} >Download PC</CButton></CTableDataCell>
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
            <div id="noc-template" style={{ fontFamily: 'Calibri, sans-serif', margin: '20px', display: 'none' }}>
                <div style={{
                    fontFamily: 'Calibri, sans-serif',
                    background: '#FFF',
                    boxShadow: '0 0 1in -0.25in rgba(0, 0, 0, 0.5)',
                    margin: '0 auto',
                    padding: '0.1in',
                    width: '100%',
                    maxWidth: '800px',
                    boxSizing: 'border-box'
                }}>
                    {/* Header Image */}
                    <div style={{ marginTop: '-15px' }}>
                        <img src={nocHeader} alt="Header" width="100%" />
                    </div>

                    {/* Text Section */}
                    <p style={{
                        fontSize: '18px',
                        lineHeight: '45px'
                    }}>
                        Received Possession of Stall No:
                        <strong style={{ borderBottom: '2px dotted #666666', padding: '0px 70px' }}>A64</strong>
                        {' '}Hall No.:
                        <strong style={{ borderBottom: '2px dotted #666666', padding: '0px 60px' }}>2</strong>
                        {' '}Company Name:
                        <strong style={{ borderBottom: '2px dotted #666666', padding: '0px 70px' }}>Eyeq Tech</strong>
                        {' '}Mobile Number:
                        <strong style={{ borderBottom: '2px dotted #666666', padding: '0px 50px' }}>8002571892</strong>
                        {' '}Email:
                        <strong style={{ borderBottom: '2px dotted #666666', padding: '0px 50px' }}>eyeq@gmail.com</strong>
                    </p>

                    {/* QR and Stamp Section */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '30px' }}>
                        <div>
                            <QRCode
                                value={`Hall No: 2, Stall No: A26`}
                                size={100}
                            />
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <img src={bigseaStamp} alt="Stamp" width="100px" />
                            <p style={{ fontWeight: 700, marginTop: '50px' }}>Accountant</p>
                        </div>
                    </div>

                    {/* Footer Image */}
                    <div style={{ marginTop: '15px' }}>
                        <img src={nocFooter} alt="Footer" width="100%" />
                    </div>
                </div>
            </div>



            <div id="pc-template" style={{ fontFamily: 'Calibri, sans-serif', margin: '20px', display: 'none' }}>
                <article style={{ marginTop: "-15px" }}>
                    <img src={pcHeader} alt="PC Header" style={{ width: "100%" }} />
                </article>

                <header>
                    <address style={{ width: "100%", fontStyle: "normal", fontSize: "14px" }}>
                        <p>
                            Big Sea Marcom India Pvt Ltd is organising MATECIA 2025 along with WADE ASIA
                            and India Interior Retailing conferences. MATECIA Exhibition is for Wood
                            Panel, Interior and Decorative Surfaces during 21, 22, 23 and 24 Aug, 2025 at
                            Yashobhoomi (IICC), Delhi India.
                        </p>
                        <br />
                        <p>
                            This is to certify that the below mentioned company/firm/organization is
                            participating at MATECIA 2025 as an Exhibitor.
                        </p>
                    </address>
                </header>

                <article>
                    <span>
                        <p style={{ fontSize: "14px", fontWeight: 700 }}>
                            COMPANY NAME / BRAND : Big Sea Marcom
                        </p>
                        <p
                            style={{
                                fontSize: "14px",
                                fontWeight: 700,
                                float: "left",
                            }}
                        >
                            HALL NO : 2 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            STALL NO : CA2
                        </p>
                    </span>
                </article>

                <header>
                    <address style={{ width: "100%", fontSize: "14px", fontStyle: "normal" }}>
                        <p>
                            This certificate is issued to facilitate entry of exhibits in Yashobhoomi
                            (IICC), Delhi and the clearance of your goods for displaying at MATECIA 2025.
                            Entry inside Yashobhoomi will be subject to showing the No Dues Certificate /
                            No Objection Certificate at the venue gate.
                        </p>
                    </address>
                </header>

                <header>
                    <address style={{ width: "50%", fontSize: "14px", fontStyle: "normal" }}>
                        <p style={{ fontWeight: 700, textAlign: "left" }}>Authorised Signatory</p>
                        <br />
                        <p style={{ float: "left", width: "40%" }}>
                            <img src={bigseaStamp} alt="Stamp" style={{ width: "100%" }} />
                        </p>
                    </address>
                </header>

                <p style={{ fontWeight: 700 }}>Anil Kumar</p>
                <p style={{ fontWeight: 700 }}>Account Dept.</p>
                <br />
                <p
                    style={{
                        width: "100%",
                        paddingTop: "5px",
                        textAlign: "center",
                        fontSize: "14px",
                    }}
                >
                    Email: exhibitor@matecia.com | Mob: +91 8178655044
                </p>

            </div>
        </>
    );
};

export default CertificateInvoice;

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

const ExitPass = () => {

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

    const handleDownloadPI = () => {
        const element = document.getElementById('pass-template');
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
                                <CTableHeaderCell>Download Exit Pass</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {currentExhibitors.map((item, index) => (
                                <CTableRow key={item._id}>
                                    <CTableDataCell>{index + 1 + (currentPage - 1) * itemsPerPage}</CTableDataCell>
                                    <CTableDataCell>{item.details.companyName}</CTableDataCell>
                                    <CTableDataCell><CButton color="success" onClick={handleDownloadPI} >Download Exit Pass</CButton></CTableDataCell>
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
            <div id="pass-template" style={{ fontFamily: 'Calibri, sans-serif', margin: '20px', display: 'none' }}>
                <p style={{ lineHeight: 'normal', fontSize: '15px', marginLeft: '60px' }}>
                    <strong><u><span style={{ fontSize: '21px' }}>EXIT PASS FOR MATECIA EXHIBITION 2025 Delhi</span></u></strong>
                </p>

                <p style={{ fontSize: '16px' }}>To,</p>

                <p style={{ fontSize: '16px' }}>
                    <strong>Name of the Company:</strong> Eyeq Tech
                </p>

                <p style={{ fontSize: '16px' }}>
                    <strong>Hall No. &amp; Booth No:</strong> 2 &amp; A23
                </p>

                <p style={{ fontSize: '16px' }}>Dear Sir,</p>

                <p style={{ fontSize: '16px' }}>
                    This is in reference to our participation in the <strong><u>MATECIA EXHIBITION 2025</u> Delhi</strong> in Yashobhoomi.
                    Please find below the details of the goods to return after the event. We further acknowledge that if there is any dues
                    pending from our side for any services, we will clear the dues post event.
                </p>

                <p style={{ fontSize: '16px' }}>
                    Therefore, please allow us to take out the following goods, which we bring for the event.
                </p>

                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black', padding: '5px' }}>Sr. No.</th>
                            <th style={{ border: '1px solid black', padding: '5px' }}>Description of items</th>
                            <th style={{ border: '1px solid black', padding: '5px' }}>No. of Packing Cases</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid black', padding: '5px' }}>1</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>&nbsp;</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>&nbsp;</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid black', padding: '5px' }}>2</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>&nbsp;</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>&nbsp;</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid black', padding: '5px' }}>3</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>&nbsp;</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>&nbsp;</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid black', padding: '5px' }}>4</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>&nbsp;</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>&nbsp;</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid black', padding: '5px' }}>5</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>&nbsp;</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>&nbsp;</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid black', padding: '5px' }}>6</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>&nbsp;</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>&nbsp;</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid black', padding: '5px' }}>7</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>&nbsp;</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>&nbsp;</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid black', padding: '5px' }}>8</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>&nbsp;</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>&nbsp;</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid black', padding: '5px' }}>9</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>&nbsp;</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>&nbsp;</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid black', padding: '5px' }}>10</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>&nbsp;</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>&nbsp;</td>
                        </tr>
                    </tbody>
                </table>
                <p style={{ margin: '0cm 0cm 0.0001pt 0cm', lineHeight: 'normal' }}><strong><span style={{ fontSize: 16 }}>&nbsp;</span></strong></p>
                <p>&nbsp;</p>
                <p><span style={{ fontSize: 16 }}>Name:&nbsp;</span></p>
                <p>&nbsp;</p>
                <p><span style={{ fontSize: 16 }}>Designation:&nbsp;</span></p>
                <p>&nbsp;</p>
                <p><span style={{ fontSize: 16 }}>Company Name:&nbsp;&nbsp;</span></p>
                <p>&nbsp;</p>
                <p><span style={{ fontSize: 16 }}>Stall No.: &nbsp; -------------------------------------------------</span></p>
                <p>&nbsp;</p>
                <br />
                <p>
                    <span style={{ fontSize: 16 }}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                </p>
                <div style={{ float: 'right', marginLeft: '6.75pt', marginRight: '6.75pt' }}>
                    <table style={{ borderCollapse: 'collapse', border: 'none' }}>
                        <tbody>
                            <tr>
                                <td style={{ width: '363.9pt', border: '1pt solid black', padding: '0cm 5.4pt', height: '76.65pt', verticalAlign: 'top' }}>
                                    <p style={{ textAlign: 'right', fontSize: 15 }}><strong><span style={{ fontSize: 16 }}>For :- &nbsp;BIG SEA MARCOM INDIA PVT LIMITED</span></strong></p>
                                    <p style={{ textAlign: 'right' }}><span style={{ fontSize: 16 }}>&nbsp;</span></p>
                                    <p style={{ textAlign: 'right' }}><span style={{ fontSize: 16 }}>&nbsp;</span></p>
                                    <p style={{ textAlign: 'right' }}><span style={{ fontSize: 16 }}>&nbsp;</span></p>
                                    <p style={{ textAlign: 'right' }}><span style={{ fontSize: 16 }}>&nbsp;</span></p>
                                    <p style={{ textAlign: 'right' }}><span style={{ fontSize: 16 }}>(With P.I. official Sign &amp; Seal)</span></p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ExitPass;

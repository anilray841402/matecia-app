import React, { useState, useEffect } from 'react';
import {
    CRow,
    CCol,
    CButton,
    CCard,
    CCardBody,
    CSpinner,
} from '@coreui/react';
import apiClient from '../../service/apiClient';

const CertificateAndInvoice = () => {

    const [loading, setLoading] = useState(null);
    const [noc, setNoc] = useState(null);
    const [pc, setPc] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiClient.fetchExhibitor();
                if (res.success) {
                    setNoc(res.data.noc);
                    setPc(res.data.pc);
                    console.log(res.data.pc);
                } else {
                    console.warn('API responded with failure:', res.message);
                }
            } catch (error) {
                console.error('Error while fetching exhibitor:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="text-center p-5">
                <CSpinner color="primary" />
                Loading your information...
            </div>
        )
    }

    return (

        <>
            {noc === 1 && (
                <CCard className="mb-4 rounded-5 shadow-sm">
                    <CCardBody>
                        <CRow className="mb-3 mt-3">
                            <CCol sm={6} className="text-end">
                                <strong><h4>Download your No Objection Certificate here.</h4></strong>
                            </CCol>
                            <CCol sm={3} className="text-end">
                                <CButton color="primary" type="submit" >
                                    View PDF
                                </CButton>
                            </CCol>
                            <CCol sm={3} className="text-start">
                                <CButton color="primary" type="submit" className="text-start">
                                    Download PDF
                                </CButton>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            )}

            { pc === 1 && (
                <CCard className="mb-4 rounded-5">
                <CCardBody>
                    <CRow className="mb-3 mt-3">
                        <CCol sm={6} className="text-end">
                            <strong><h4>Download your Participation Certificate here.</h4></strong>
                        </CCol>
                        <CCol sm={3} className="text-end">
                            <CButton color="primary" type="submit" >
                                View PDF
                            </CButton>
                        </CCol>
                        <CCol sm={3} className="text-start">
                            <CButton color="primary" type="submit" className="text-start">
                                Download PDF
                            </CButton>
                        </CCol>
                    </CRow>
                   
                </CCardBody>
            </CCard>
            )}
        </>
    );
};

export default CertificateAndInvoice;

import React from 'react'
import DocsComponents from '../../components/DocsComponents'
import { CRow, CCol } from '@coreui/react'

const DownloadManual = (props) => {
    return (
        <CRow>
            <CCol xs={12}>
                <DocsComponents href='/pdf/exhibitors-manual.pdf' description='The updated Exhibitor Manual has been published successfully. Please download it now by clicking on the Download Manual button provided here in the same page.' button='Download Manual' />
            </CCol>
        </CRow>
    );
}

export default DownloadManual
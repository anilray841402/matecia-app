import React from 'react'
import DocsComponents from '../../components/DocsComponents'
import { CRow, CCol } from '@coreui/react'

const InternetRequirement = (props) => {
    return (
        <CRow>
            <CCol xs={12}>
                <DocsComponents href='/pdf/exhibitors-manual.pdf' description='The updated Internet Requirement detail has been published successfully. Please download it now by clicking on the Download PDF button provided here in the same page.' button='Download PDF' />
            </CCol>
        </CRow>
    );
}

export default InternetRequirement
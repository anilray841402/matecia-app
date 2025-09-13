import React from "react";


const InvoicePreview = () => {
    // const [setUpDays, setSetUpDays] = useState(3);
    // const [showDays, setShowDays] = useState(2);
    // const [total, setTotal] = useState(20000);

    const styles = `
    h1 {
        font-weight: bold;
        font-size: 100%;
        letter-spacing: 0.5em;
        text-align: center;
        text-transform: uppercase;
        background: #000;
        color: #fff;
        padding: 10px 0;
        margin: 1;
    }

    table {
        font-size: 75%;
        table-layout: fixed;
        width: 100%;
        border-collapse: separate;
        border-spacing: 2px;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 0.5em;
        border-radius: 0.25em;
        text-align: left;
    }

    th {
        background: #eee;
        border-color: #bbb;
    }

    header {
        margin-bottom: 1em;
    }

    header:after, article:after {
        content: '';
        display: table;
        clear: both;
    }

    header address {
        float: left;
        font-size: 14px;
        line-height: 1.25;
        margin-bottom: 1em;
    }

    header address p {
        margin: 0 0 0.25em;
    }

    header img {
        float: right;
        max-width: 150px;
        max-height: 100px;
    }

    .meta, .balance {
        float: right;
        width: 36%;
        margin-top: 20px;
    }

    .meta th, .meta td, .balance th, .balance td {
        width: 50%;
        font-size: 13px;
        text-align: right;
    }

    .inventory {
        clear: both;
        width: 100%;
        margin-top: 40px;
    }

    .inventory th, .inventory td {
        font-size: 13px;
    }

    .footer-section {
        border-top: 1px solid #000;
        padding-top: 30px;
        margin-top: 40px;
        display: flex;
        justify-content: space-between;
    }

    .footer-section address {
        font-size: 14px;
    }

    .footer-section img {
        max-width: 100px;
    }`;


    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: styles }} />
            <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
                <h1>Proforma Invoice</h1>
                <img src="logo-placeholder.jpg" alt="Logo" width="100%" />
                <header>
                    <address>
                        <p><strong>Big Sea Marcom India Pvt. Ltd.</strong></p>
                        <p>3rd Floor No 160, 1st Main Road Seshadripuram, Bangalore 560020</p>
                        <p>Mob. No. +91 9310612992/6</p>
                        <p>Email: accounts@bigsea.in</p>
                        <p>Company's GST NO: 29AADCB7594C1ZH</p>
                    </address>

                    <address>
                        <p><strong>Buyer</strong></p>
                        <p><strong>XYZ Company Pvt. Ltd.</strong></p>
                        <p>Mob. No.: 9876543210</p>
                        <p>Email: buyer@example.com</p>
                        <p>GST: 29XYZ1234L9Z5</p>
                    </address>
                </header>

                <article>
                    <p><strong>Our Bank Details as Below:</strong></p>
                    <p>BIG SEA MARCOM INDIA PVT LTD<br />
                        Account No.: 16622560000381<br />
                        Bank: HDFC Bank Ltd.<br />
                        RTGS/NEFT IFSC: HDFC0001662<br />
                        Bank Swift Code: HDFCINBB<br />
                        Branch Address: N-13, Kalkaji, New Delhi-110019 India
                    </p>

                    <table class="meta">
                        <tr>
                            <th>PI Number</th>
                            <td>PI2025-001</td>
                        </tr>
                        <tr>
                            <th>Date</th>
                            <td>28-04-25</td>
                        </tr>
                        <tr>
                            <th>Amount Due</th>
                            <td>Rs. 23600</td>
                        </tr>
                    </table>

                    <table class="inventory">
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Description</th>
                                <th>HSN Code</th>
                                <th>Power KW</th>
                                <th>Rate</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Electricity Charges in MATECIA 2025 Event</td>
                                <td>998596</td>
                                <td>5</td>
                                <td>Rs. 4000</td>
                                <td>Rs. 20000</td>
                            </tr>
                        </tbody>
                    </table>

                    <table class="balance">
                        <tr>
                            <th>Sub Total</th>
                            <td>Rs. 20000</td>
                        </tr>
                        <tr>
                            <th>GST @ 18%</th>
                            <td>Rs. 3600</td>
                        </tr>
                        <tr>
                            <th>G. Total</th>
                            <td>Rs. 23600</td>
                        </tr>
                    </table>
                </article>

                <div class="footer-section">
                    <address>
                        <p><strong>Company's PAN: AADCB7594C</strong></p><br />
                        <p><strong>All cheques to be sent to:</strong></p>
                        <p>BIG SEA MARCOM INDIA PVT. LTD.</p>
                        <p>F-1118, L.G.F. C.R. PARK, NEW DELHI-110019</p>
                    </address>

                    <address style={{ textAlign: 'right' }}>
                        <p><strong>For Big Sea Marcom India Pvt. Ltd.</strong></p>
                        <p><strong>Authorised Signatory</strong></p>
                        <img src="stamp-placeholder.jpg" alt="Stamp" />
                    </address>
                </div>
            </div>
        </>
    );
};

export default InvoicePreview;
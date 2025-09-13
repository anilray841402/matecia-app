import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CFormLabel,
  CButton,
  CAlert,
  CImage,
  CCardText,
  CInputGroup
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilDescription } from '@coreui/icons';
import apiClient from '../../service/apiClient';

const MaterialsAddaForm = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState('');
  const [status, setStatus] = useState(0);
  const [productSubmissionId, setProductSubmissionId] = useState()

  const getMaterialAdda = async () => {
    try {
      const res = await apiClient.fetchMaterialAdda();
      if (res.success) {
        setData(res.data[0]);
        setStatus(res.data[0].status);
        setProductSubmissionId(res.data[0]._id);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMaterialAdda();
  }, [])

  const initialValues = {
    brandName: data?.brandName || '',
    productCategory: data?.productCategory || '',
    innovationType: data?.innovationType || '',
    productSuperior: data?.productSuperior || '',
    productInnovation: data?.productInnovation || '',
    productName1: data?.products?.[0]?.productName || '',
    productDescription1: data?.products?.[0]?.productDescription || '',
    productDimension1: data?.products?.[0]?.productDimension || '',
    productImg1: data?.products?.[0]?.productImg || '',
    productName2: data?.products?.[1]?.productName || '',
    productDescription2: data?.products?.[1]?.productDescription || '',
    productDimension2: data?.products?.[1]?.productDimension || '',
    productImg2: data?.products?.[1]?.productImg || '',
    productName3: data?.products?.[2]?.productName || '',
    productDescription3: data?.products?.[2]?.productDescription || '',
    productDimension3: data?.products?.[2]?.productDimension || '',
    productImg3: data?.products?.[2]?.productImg || '',
    productName4: data?.products?.[3]?.productName || '',
    productDescription4: data?.products?.[3]?.productDescription || '',
    productDimension4: data?.products?.[3]?.productDimension || '',
    productImg4: data?.products?.[3]?.productImg || '',
    productName5: data?.products?.[4]?.productName || '',
    productDescription5: data?.products?.[4]?.productDescription || '',
    productDimension5: data?.products?.[4]?.productDimension || '',
    productImg5: data?.products?.[4]?.productImg || '',
  };

  const handleSubmit = async (values) => {

    const formData = new FormData();
    formData.append("brandName", values.brandName);
    formData.append("productCategory", values.productCategory);
    formData.append("innovationType", values.innovationType);
    formData.append("productInnovation", values.productInnovation);
    formData.append("productSuperior", values.productSuperior);
    formData.append("status", 1);

    // Collect products into an array
    const products = [1, 2, 3, 4, 5].map((index) => ({
      productName: values[`productName${index}`],
      productDescription: values[`productDescription${index}`],
      productDimension: values[`productDimension${index}`],
    }));

    formData.append("products", JSON.stringify(products));

    // Append each product image to FormData separately
    [1, 2, 3, 4, 5].forEach((index) => {
      const file = values[`productImg${index}`];
      if (file) {
        formData.append(`productImg${index}`, file);
      }
    });

    // Append old product image to FormData separately
    const oldProductImg = data.products.map((value, index) => ({
      productImg: value.productImg || null,
    }));

    formData.append("oldProductImg", JSON.stringify(oldProductImg));

    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
    try {
      let res;
      if (status === 0) {
        res = await apiClient.submitMaterialAdda(formData);
      } else if (status === 1) {
        res = await apiClient.reopenMaterialAdda(2, productSubmissionId)
      } else if (status === 3) {
        res = await apiClient.updateMaterialAdda(productSubmissionId, formData);
      }
      if (res.success) {
        setSuccessMessage('Request Submitted Successfully!');
        getMaterialAdda();
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        setErrorMessage('Something went wrong, please try again.');
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to submit. Please check your network and try again.');
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const getButtonLabel = () => {
    switch (status) {
      case 0: return "Submit Your Products";
      case 1: return "Re-Open Request";
      case 2: return "Wait for admin approval";
      case 3: return "Update Your Products";
      default: return "Submit";
    }
  };

  return (
    <>
      <CCard className="rounded-4 shadow-sm mb-4">
        <CCardBody>
          <CImage
            src="https://matecia.com/portal/public/assets/images/banner/matecia-ino.jpg"
            alt="MATECIA Materials Adda Banner"
            className="mb-3 d-block w-100"
          />
          <CCardText>
            Curated by <strong>SURFACES REPORTER</strong>, the <strong>MATECIA Materials Adda</strong> is a platform to
            showcase groundbreaking ideas, cutting-edge technologies and innovative products in the construction and
            building materials industry.

            Exhibitors can submit their most innovative products through this form. The jury will evaluate the entries
            based on innovation, prototypes and relevant criteria. No fees are charged for selected entries. Exhibitors
            will be responsible for logistics. While exhibitors are encouraged not to stand with the products,
            SURFACES REPORTER’s team will handle the zone display.
            <br /><br />
            <strong>Grab this opportunity now!</strong>
            <br />
            <strong style={{ color: 'red' }}>NOMINATIONS CLOSING BY JANUARY 29</strong>
          </CCardText>
        </CCardBody>
      </CCard>
      <CCard className="rounded-4 shadow-sm mt-2">
        <CCardBody>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form>
                {/* Success and Error Messages */}
                {successMessage && <CAlert color="success">{successMessage}</CAlert>}
                {errorMessage && <CAlert color="danger">{errorMessage}</CAlert>}

                {/* Brand Name */}
                <CRow className="mb-3 mt-3">
                  <CFormLabel className="col-sm-3 col-form-label">
                    Brand Name <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CCol sm={9}>
                    <Field type="text" name="brandName" placeholder="Brand Name" className="form-control" readOnly={status === 1 || status === 2} />
                    <ErrorMessage name="brandName" component="div" className="text-danger" />
                  </CCol>
                </CRow>

                {/* Product Category */}
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-3 col-form-label">
                    Product Category <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CCol sm={9}>
                    <Field type="text" name="productCategory" placeholder="Product Category" className="form-control" readOnly={status === 1 || status === 2} />
                    <ErrorMessage name="productCategory" component="div" className="text-danger" />
                  </CCol>
                </CRow>

                {/* Innovation Type */}
                <CRow className="mb-4">
                  <CFormLabel className="col-sm-3 col-form-label">
                    Innovation Type <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CCol sm={9}>
                    <Field as="select" name="innovationType" className="form-control" >
                      <option value="">Select Innovation Type</option>
                      <option value="Design">Design</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Application">Application</option>
                      <option value="Technology">Technology</option>
                    </Field>
                    <ErrorMessage name="innovationType" component="div" className="text-danger" />
                  </CCol>
                </CRow>

                {/* Product Superior */}
                <CRow className="mb-1">
                  <CFormLabel className="col-sm-3 col-form-label">
                    How is your product superior to similar competitive products? <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CCol sm={9}>
                    <Field type="text" name="productSuperior" placeholder="Product Superior" className="form-control" readOnly={status === 1 || status === 2} />
                    <ErrorMessage name="productSuperior" component="div" className="text-danger" />
                  </CCol>
                </CRow>

                {/* Product Innovation */}
                <CRow className="mb-4">
                  <CFormLabel className="col-sm-3 col-form-label">
                    What is the innovation in the product? <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CCol sm={9}>
                    <Field type="text" name="productInnovation" placeholder="Product Innovation" className="form-control" readOnly={status === 1 || status === 2} />
                    <ErrorMessage name="productInnovation" component="div" className="text-danger" />
                  </CCol>
                </CRow>

                {/* Product Fields */}
                {[1, 2, 3, 4, 5].map((index) => (
                  <CRow className="mb-3" key={index}>
                    <CFormLabel className="col-sm-3 col-form-label">
                      Upload Product {index}
                    </CFormLabel>

                    <CCol sm={2}>
                      <Field
                        type="text"
                        name={`productName${index}`}
                        placeholder="Product Name"
                        className="form-control"
                        readOnly={status === 1 || status === 2}
                      />
                    </CCol>

                    <CCol sm={3}>
                      <Field
                        type="text"
                        name={`productDescription${index}`}
                        placeholder="Description in 150-200 words"
                        className="form-control"
                        readOnly={status === 1 || status === 2}
                      />
                    </CCol>

                    <CCol sm={2}>
                      <Field
                        type="text"
                        name={`productDimension${index}`}
                        placeholder="Dimension (LxBxH)"
                        className="form-control"
                        readOnly={status === 1 || status === 2}
                      />
                    </CCol>

                    <CCol sm={2}>
                      <CInputGroup>
                        {initialValues[`productImg${index}`] && (
                          <CButton
                            href={`https://www.abc.com/${initialValues[`productImg${index}`]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            color="secondary"
                            variant="outline"
                            className="me-2"  // Adds some space to the right
                          >
                            <CIcon icon={cilDescription} />
                          </CButton>
                        )}
                        <input
                          type="file"
                          name={`productImg${index}`}
                          accept="application/pdf"
                          className="form-control"
                          onChange={(event) =>
                            setFieldValue(`productImg${index}`, event.currentTarget.files[0])
                          }
                          onClick={(e) => (status === 1 || status === 2 ? e.preventDefault() : "")}
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                ))}
                {/* Submit Button */}
                <CRow className="mb-3 mt-4">
                  <CCol sm={{ offset: 3, span: 9 }} className="d-flex justify-content-end">
                    <CButton color="primary" type="submit" disabled={status === 2 || loading}>
                      {loading ? 'Submitting...' : getButtonLabel()}
                    </CButton>
                  </CCol>
                </CRow>
              </Form>
            )}
          </Formik>
        </CCardBody>
      </CCard>
      <CCard className="mb-5 mt-4 rounded-4 shadow-sm">
        <CCardBody>
          <CCardText>
            <strong>Disclaimer:</strong> Submission of a product does not guarantee space in the innovation area, subject to jury discretion
            <br /><br />
            <strong>FOR ANY QUERY (Response Time: 9AM - 9PM): </strong> Benjamin Joseph: Email: exhibitor@matecia.com, Mobile: +91 8178655044
          </CCardText>
        </CCardBody>
      </CCard>
    </>
  );
};

export default MaterialsAddaForm;

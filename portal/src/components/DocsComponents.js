import PropTypes from 'prop-types'
import React from 'react'

import ComponentsImg from '../assets/images/matecia-logo.png'

const DocsComponents = (props) => (
  <div className="bg-primary bg-opacity-10 border border-2 border-primary rounded mb-4">
    <div className="row d-flex align-items-center p-3 px-xl-4 flex-xl-nowrap">
      <div className="col-xl-auto col-12 d-none d-xl-block p-0">
        <img
          className="img-fluid"
          src={ComponentsImg}
          width="130px"
          height="130px"
          alt=""
        />
      </div>
      <div className="col-md col-12 px-lg-4">
        {props.description ? props.description : "Description is not avilable" }
      </div>
      <div className="col-md-auto col-12 mt-3 mt-lg-0">
        <a
          className="btn btn-primary text-nowrap text-white"
          href={props.href}
          download="Exhibitor_Manual.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.button ? props.button : "N/A" }
        </a>
      </div>
    </div>
  </div>
)

DocsComponents.propTypes = {
  href: PropTypes.string,
}

export default DocsComponents

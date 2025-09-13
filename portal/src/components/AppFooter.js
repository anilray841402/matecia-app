import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://matecia.com/" target="_blank" rel="noopener noreferrer">
          Matecia Event
        </a>
        <span className="ms-1">&copy; 2025 Building Material Exhibiton.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://matecia.com/" target="_blank" rel="noopener noreferrer">
          BigSea Marcome Imdia Private limited
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)

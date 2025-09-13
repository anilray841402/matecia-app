import React from 'react'
import classNames from 'classnames'

import {
  CCard,
  CCardFooter,
  CCol,
  CProgress,
  CRow,
} from '@coreui/react'
import WidgetsBrand from '../widgets/WidgetsBrand'

const Dashboard = () => {
  const progressExample = [
    { title: 'Visitors(2024)', value: 'Increased', percent: 46, color: 'success' },
    { title: 'Visitors(2023)', value: 'Increased', percent: 40, color: 'info' },
    { title: 'Visitors(2022)', value: 'Increased', percent: 43, color: 'success' },
    { title: 'Visitors(2021)', value: 'Increased', percent: 10, color: 'info' },
    { title: 'Visitors(2020)', value: 'Increased', percent: 15, color: 'success' },

  ]
  
  return (
    <>
      <WidgetsBrand className="mb-4" withCharts />
      <CCard className="mb-4">
        <CCardFooter>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            xl={{ cols: 5 }}
            className="mb-2 text-center"
          >
            {progressExample.map((item, index, items) => (
              <CCol
                className={classNames({
                  'd-none d-xl-block': index + 1 === items.length,
                })}
                key={index}
              >
                <div className="text-body-secondary">{item.title}</div>
                <div className="fw-semibold text-truncate">
                  {item.value} ({item.percent}%)
                </div>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>
    </>
  )
}
export default Dashboard

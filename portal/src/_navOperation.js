import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilClipboard,
  cilUserPlus,
  cilTask,
} from '@coreui/icons'
import { CNavItem,  CNavGroup, CNavTitle } from '@coreui/react'

const _navOperation = [
  {
    component: CNavItem,
    name: 'Operation Dashboard',
    to: '/operation',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavTitle,
    name: 'Matecia 2025',
  },
  {
    component: CNavGroup,
    name: 'Exhibitors data',
    to: '/operation/exhibitor',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'View Exhibitor',
        to: '/operation/view-exhibitors',
      },
      {
        component: CNavItem,
        name: 'Add Exhibitor',
        to: '/operation/add-exhibitor',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Reports',
    to: '/operation',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Booth Design',
        to: '/operation/booth-design',
      },
      {
        component: CNavItem,
        name: 'Power Orders',
        to: '/operation/power-order',
      },
      {
        component: CNavItem,
        name: 'Product Submission',
        to: '/operation/product-submission',
      },
      // {
      //   component: CNavItem,
      //   name: 'Brand Promotion',
      //   to: '/operation/brand-promotion',
      // },
    ],
  },
  {
    component: CNavItem,
    name: 'Re-Open Request',
    to: '/operation/reopen-request',
    icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
  },
]

export default _navOperation

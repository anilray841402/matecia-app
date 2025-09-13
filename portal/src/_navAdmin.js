import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilClipboard,
  cilUserPlus,
  cilTask,
} from '@coreui/icons'
import { CNavItem, CNavGroup, CNavTitle } from '@coreui/react'

const _navAdmin = [
  {
    component: CNavItem,
    name: 'Admin Dashboard',
    to: '/admin',
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
    to: '/admin/exhibitor',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'View Exhibitor',
        to: '/admin/view-exhibitors',
      },
      {
        component: CNavItem,
        name: 'Add Exhibitor',
        to: '/admin/add-exhibitor',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Vendors Data',
    to: '/admin/exhibitor',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'View Vendor',
        to: '/admin/view-vendors',
      },
      {
        component: CNavItem,
        name: 'Add Vendor',
        to: '/admin/add-vendor',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Reports',
    to: '/admin',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Booth Design',
        to: '/admin/booth-design',
      },
      {
        component: CNavItem,
        name: 'Power Orders',
        to: '/admin/power-order',
      },
      {
        component: CNavItem,
        name: 'Product Submission',
        to: '/admin/product-submission',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Users',
    to: '/admin/users',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'View Users',
        to: '/admin/view-users',
      },
      {
        component: CNavItem,
        name: 'Add User',
        to: '/admin/add-user',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Re-Open Request',
    to: '/admin/reopen-request',
    icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
  },
]

export default _navAdmin

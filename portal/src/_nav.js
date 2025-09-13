import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCalculator,
  cilChartPie,
  cilSpeedometer,
  cilPencil,
  cilCloudDownload,
  cilHouse,
  cilDescription,
  cilPowerStandby,
  cilCarAlt,
  cilTags,
  cilShieldAlt,
  cilHeadphones,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Exhibitor Dashboard',
    to: '/exhibitor',
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
    component: CNavItem,
    name: 'Exhibitors Manual',
    to: '/exhibitor/download-manual',
    icon: <CIcon icon={cilCloudDownload} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Internet Requirement',
    to: '/exhibitor/internet-requirement',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Edit Information',
    to: '/exhibitor/edit-information',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: 'Empanelled Fabricators',
    to: '/exhibitor/view-fabricators',
    icon: <CIcon icon={cilHouse} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Freight Forwarder',
    to: '/exhibitor/freight-forwarder',
    icon: <CIcon icon={cilCarAlt} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: 'Certificate and invoices',
    to: '/exhibitor/certificate-and-invoice',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Power Orders',
    to: '/exhibitor/power-order',
    icon: <CIcon icon={cilPowerStandby} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Payment Record',
    to: '/exhibitor/payment-record',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Booth Design/Fabricator',
    to: '/exhibitor/booth-design',
    icon: <CIcon icon={cilHouse} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Material Adda Product',
    to: '/exhibitor/materials-adda',
    icon: <CIcon icon={cilTags} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Exhibitor Badges',
    to: '/exhibitor/badges',
    icon: <CIcon icon={cilShieldAlt} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Help and Support',
    to: '/exhibitor/support',
    icon: <CIcon icon={cilHeadphones} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Notification',
    to: '/exhibitor/notification',
    icon: <CIcon icon={cilHeadphones} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },

]

export default _nav

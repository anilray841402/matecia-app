import React from 'react'
import CIcon from '@coreui/icons-react'
import {
    cilSpeedometer,
    cilPowerStandby,
    cilUserPlus,
    cilTask,
    cilCalculator,
    cilDescription,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _navAccount = [
    {
        component: CNavItem,
        name: 'Account Dashboard',
        to: '/account',
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
        name: 'Add Exhibitor',
        to: '/account/add-exhibitor',
        icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Exhibitors List',
        to: '/account/view-exhibitors',
        icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Power Order',
        to: '/account/power-order',
        icon: <CIcon icon={cilPowerStandby} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Additional Power',
        to: '/account/additional-power-order',
        icon: <CIcon icon={cilPowerStandby} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Payment Record',
        to: '/account/payment-record',
        icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Certificate & Invoice',
        to: '/account/certificate',
        icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    },
     {
        component: CNavItem,
        name: 'Exhibitor Exit Pass',
        to: '/account/exit-pass',
        icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
    },
]

export default _navAccount

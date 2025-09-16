import React from 'react';
const Login = React.lazy(() => import('./components/Login'));
const Signup = React.lazy(() => import('./components/Signup'));
const ExhibitorLayout = React.lazy(() => import('./layout/ExhibitorLayout'));
const EditInformation = React.lazy(() => import('./view/exhibitor/EditInformation'));
const Dashboard = React.lazy(() => import('./view/exhibitor/Dashboard'));
const Fabricators = React.lazy(() => import('./view/exhibitor/Fabricators'));
const DownloadManual = React.lazy(() => import('./view/exhibitor/DownloadManual'));
const InternetRequirement = React.lazy(() => import('./view/exhibitor/InternetRequirement'));
const FreightForwarder = React.lazy(() => import('./view/exhibitor/FreightForwarder'));
const ExhibitorBadges = React.lazy(() => import('./view/exhibitor/ExhibitorBadges'));
const ExhibitorSupport = React.lazy(() => import('./view/exhibitor/ExhibitorSupport'));
const MaterialsAdda = React.lazy(() => import('./view/exhibitor/MaterialsAdda'));
const BoothDesign = React.lazy(() => import('./view/exhibitor/BoothDesign'));
const CertificateAndInvoice = React.lazy(() => import('./view/exhibitor/CertificateAndInvoice'));
const PowerOrder = React.lazy(() => import('./view/exhibitor/PowerOrder'));
const PaymentRecord = React.lazy(() => import('./view/exhibitor/PaymentRecord'));
const NotificationSystem = React.lazy(() => import('./view/exhibitor/NotificationSystem'));
const InvoicePreview = React.lazy(() => import('./components/InvoicePreview'));


const OperationLayout = React.lazy(() => import('./layout/OperationLayout'));
const ViewExhibitors = React.lazy(() => import('./view/operation/ViewExhibitors'));
const ViewBoothDesign = React.lazy(() => import('./view/operation/BoothDesign'));
const ViewPowerOrder = React.lazy(() => import('./view/operation/PowerOrder'));
const ProductSubmission = React.lazy(() => import('./view/operation/ProductSubmission'));
const ReopenRequest = React.lazy(() => import('./view/operation/ReopenRequest'));
const AddExhibitor = React.lazy(() => import('./view/operation/AddExhibitor'));

const AccountLayout = React.lazy(() => import('./layout/AccountLayout'));
const ViewExhibitorsAccount = React.lazy(() => import('./view/account/ViewExhibitors'));
const AdditionalPowerOrder = React.lazy(() => import('./view/account/AdditionalPowerOrder'));
const PaymentRecordAccount = React.lazy(() => import('./view/account/PaymentRecord'));
const ExitPass = React.lazy(() => import('./view/account/ExitPass'));
const CretificateInvoice = React.lazy(() => import('./view/account/CretificateInvoice'));

const AdminLayout = React.lazy(() => import('./layout/AdminLayout'));
const ViewExhibitorsAdmin = React.lazy(() => import('./view/admin/ViewExhibitors'));
const AddVendor = React.lazy(() => import('./view/admin/AddVendor'));
const ViewVendors = React.lazy(() => import('./view/admin/ViewVendors'));
const ViewUsers = React.lazy(() => import('./view/admin/ViewUsers'));
const AddUser = React.lazy(() => import('./view/admin/AddUser'));
const AddExhibitorAdmin = React.lazy(() => import('./view/admin/AddExhibitor'));



const routes = [
  { path: '/', name: '', element: Login },
  { path: '/signup', name: 'Signup', element: Signup },
  { path: '/pi', name: 'Pi', element: InvoicePreview },
  { path: '/login', name: 'Login', element: Login },
  { path: '/exhibitor', name: 'Dashboard', element: ExhibitorLayout, component: Dashboard },
  { path: '/exhibitor/edit-information', name: 'Edit Information', element: ExhibitorLayout, component: EditInformation },
  { path: '/exhibitor/view-fabricators', name: 'Fabricators', element: ExhibitorLayout, component: Fabricators },
  { path: '/exhibitor/download-manual', name: 'Exhibitor Manual', element: ExhibitorLayout, component: DownloadManual },
  { path: '/exhibitor/internet-requirement', name: 'Internet Requirement', element: ExhibitorLayout, component: InternetRequirement },
  { path: '/exhibitor/freight-forwarder', name: 'Freight Forwarder', element: ExhibitorLayout, component: FreightForwarder },
  { path: '/exhibitor/badges', name: 'Exhibitor Badges', element: ExhibitorLayout, component: ExhibitorBadges },
  { path: '/exhibitor/support', name: 'Exhibitor Support', element: ExhibitorLayout, component: ExhibitorSupport },
  { path: '/exhibitor/materials-adda', name: 'Materials Adda', element: ExhibitorLayout, component: MaterialsAdda },
  { path: '/exhibitor/booth-design', name: 'Booth Design', element: ExhibitorLayout, component: BoothDesign },
  { path: '/exhibitor/certificate-and-invoice', name: 'Certificate and invoice', element: ExhibitorLayout, component: CertificateAndInvoice },
  { path: '/exhibitor/power-order', name: 'Power Order', element: ExhibitorLayout, component: PowerOrder },
  { path: '/exhibitor/payment-record', name: 'Payment Record', element: ExhibitorLayout, component: PaymentRecord },
  { path: '/exhibitor/notification', name: 'Notifications', element: ExhibitorLayout, component: NotificationSystem },

  { path: '/operation', name: 'Dashboard', element: OperationLayout, component: Dashboard },
  { path: '/operation/view-exhibitors', name: 'View Exhibitors', element: OperationLayout, component: ViewExhibitors },
  { path: '/operation/booth-design', name: 'View Booth Design', element: OperationLayout, component: ViewBoothDesign },
  { path: '/operation/power-order', name: 'View Power Order', element: OperationLayout, component: ViewPowerOrder },
  { path: '/operation/product-submission', name: 'Product Submission', element: OperationLayout, component: ProductSubmission },
  { path: '/operation/reopen-request', name: 'Reopen Request', element: OperationLayout, component: ReopenRequest },
  { path: '/operation/add-exhibitor', name: 'Add Exhibitor', element: OperationLayout, component: AddExhibitor },

  { path: '/account', name: 'Dashboard', element: AccountLayout, component: Dashboard },
  { path: '/account/view-exhibitors', name: 'View Exhibitor', element: AccountLayout, component: ViewExhibitorsAccount },
  { path: '/account/add-exhibitor', name: 'Add Exhibitor', element: AccountLayout, component: AddExhibitor },
  { path: '/account/power-order', name: 'Power Order', element: AccountLayout, component: ViewPowerOrder },
  { path: '/account/additional-power-order', name: 'Additional Power Order', element: AccountLayout, component: AdditionalPowerOrder },
  { path: '/account/payment-record', name: 'Payment Record', element: AccountLayout, component: PaymentRecordAccount },
  { path: '/account/exit-pass', name: 'Exit Pass', element: AccountLayout, component: ExitPass },
  { path: '/account/certificate', name: 'Exit Pass', element: AccountLayout, component: CretificateInvoice },

  { path: '/admin', name: 'Dashboard', element: AdminLayout, component: Dashboard },
  { path: '/admin/view-exhibitors', name: 'View Exhibitor', element: AdminLayout, component: ViewExhibitorsAdmin },
  { path: '/admin/add-exhibitor', name: 'Add Exhibitor', element: AdminLayout, component: AddExhibitorAdmin },
  { path: '/admin/booth-design', name: 'View Booth Design', element: AdminLayout, component: ViewBoothDesign },
  { path: '/admin/power-order', name: 'Power Order', element: AdminLayout, component: ViewPowerOrder },
  { path: '/admin/product-submission', name: 'Product Submission', element: AdminLayout, component: ProductSubmission },
  { path: '/admin/add-vendor', name: 'Add Vendor', element: AdminLayout, component: AddVendor },
  { path: '/admin/view-vendors', name: 'View Vendor', element: AdminLayout, component: ViewVendors },
  { path: '/admin/view-users', name: 'View Users', element: AdminLayout, component: ViewUsers },
  { path: '/admin/add-user', name: 'Add User', element: AdminLayout, component: AddUser },
  { path: '/admin/reopen-request', name: 'Reopen Request', element: AdminLayout, component: ReopenRequest },
  
];

export default routes;

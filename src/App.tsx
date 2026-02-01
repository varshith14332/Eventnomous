import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from './features/auth/components/AuthLayout';
import { LoginPage } from './features/auth/pages/LoginPage';
import { SignupPage } from './features/auth/pages/SignupPage';
import { RequireAuth } from './components/auth/RequireAuth';
import { DashboardLayout } from './features/dashboard/components/DashboardLayout';
import { CustomerHome, VendorHome, ManagerHome, AdminHome } from './features/dashboard/pages/HomePages';
import { MarketplacePage } from './features/marketplace/pages/MarketplacePage';
import { VendorDetailsPage } from './features/marketplace/pages/VendorDetailsPage';
import { DashboardRedirect } from './features/dashboard/components/DashboardRedirect';

// Customer Pages
import { CustomerOverview } from './features/dashboard/pages/customer/CustomerOverview';
import { CustomerEventsPage } from './features/dashboard/pages/customer/CustomerEventsPage';
import { CustomerBudgetPage } from './features/dashboard/pages/customer/CustomerBudgetPage';
import { CustomerSettingsPage } from './features/dashboard/pages/customer/CustomerSettingsPage';

import { ComingSoon } from './components/ui/ComingSoon';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<RequireAuth><DashboardLayout /></RequireAuth>}>
          {/* Redirect root dashboard to specific role based on auth logic */}
          <Route index element={<DashboardRedirect />} />

          {/* Customer Routes */}
          <Route path="customer" element={<CustomerOverview />} />
          <Route path="customer/events" element={<CustomerEventsPage />} />
          <Route path="customer/budget" element={<CustomerBudgetPage />} />
          <Route path="customer/settings" element={<CustomerSettingsPage />} />

          {/* Vendor Routes */}
          <Route path="vendor" element={<VendorHome />} />
          <Route path="vendor/*" element={<ComingSoon />} />

          {/* Manager Routes */}
          <Route path="manager" element={<ManagerHome />} />
          <Route path="manager/*" element={<ComingSoon />} />

          {/* Admin Routes */}
          <Route path="admin" element={<AdminHome />} />
          <Route path="admin/*" element={<ComingSoon />} />
        </Route>

        {/* Marketplace Routes */}
        <Route path="/marketplace" element={<RequireAuth><DashboardLayout /></RequireAuth>}>
          <Route index element={<MarketplacePage />} />
          <Route path="vendor/:id" element={<VendorDetailsPage />} />
        </Route>

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

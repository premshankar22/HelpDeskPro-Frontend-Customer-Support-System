import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import ProtectedRoute from "./ProtectedRoute";

import AdminLayout from "../layouts/AdminLayout";
import CustomerLayout from "../layouts/CustomerLayout";


/* ===== ADMIN ===== */

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminTickets from "../pages/admin/AdminTickets";
import AdminAssignments from "../pages/admin/AdminAssignments";
import AdminCustomers from "../pages/admin/AdminCustomers";
import AdminAgents from "../pages/admin/AdminAgents";
import AdminChats from "../pages/admin/AdminChats";
import AdminReports from "../pages/admin/AdminReports";
import AdminSettings from "../pages/admin/AdminSettings";
import AdminLogs from "../pages/admin/AdminLogs";
import AdminTools from "../pages/admin/AdminTools";


/* ===== CUSTOMER ===== */
import CustomerDashboard from "../pages/customer/Dashboard";
import MyTickets from "../pages/customer/MyTickets";
import CreateTicket from "../pages/customer/CreateTicket";
import SupportChat from "../pages/customer/SupportChat";
import Profile from "../pages/customer/Profile";
import Settings from "../pages/customer/Settings";
import HelpAndFAQ from "../pages/customer/HelpAndFAQ";


export default function AppRoutes() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
          <Route index element={<AdminDashboard />} />
        <Route path="admin_dashboard" element={<AdminDashboard />} />
        <Route path="admin_tickets" element={<AdminTickets />} />
        <Route path="admin_assignments" element={<AdminAssignments />} />
        <Route path="admin_customers" element={<AdminCustomers />} />
        <Route path="admin_agents" element={<AdminAgents />} />
        <Route path="admin_chats" element={<AdminChats />} />
        <Route path="admin_reports" element={<AdminReports />} />
        <Route path="admin_settings" element={<AdminSettings />} />
        <Route path="admin_logs" element={<AdminLogs />} />
        <Route path="admin_tools" element={<AdminTools />} />
      </Route>

      {/* CUSTOMER */}
      <Route
        path="/customer"
        element={
          <ProtectedRoute role="customer">
            <CustomerLayout />
          </ProtectedRoute>
        }
      >
          <Route index element= {<CustomerDashboard />} />
          <Route path="dashboard" element={<CustomerDashboard />} />
          <Route path="tickets" element={<MyTickets />} />
          <Route path="create-ticket" element={<CreateTicket />} /> 
          <Route path="support-chat" element={<SupportChat />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<HelpAndFAQ />} />


      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}

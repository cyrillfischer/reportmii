// src/App.tsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

// 🔐 Protected
import { ProtectedRoute } from "./components/ProtectedRoute";

// 🌍 Public Pages
import { LandingPage } from "./pages/LandingPage";
import BusinessPage from "./pages/BusinessPage";
import InsidePage from "./pages/InsidePage";
import PartnerPage from "./pages/PartnerPage";
import AffiliatePage from "./pages/AffiliatePage";
import { AffiliateRegisterPage } from "./pages/AffiliateRegisterPage";

// 💳 Checkout Pages
import BusinessCheckoutPage from "./pages/BusinessCheckoutPage";
import InsideCheckoutPage from "./pages/InsideCheckoutPage";
import PartnerCheckoutPage from "./pages/PartnerCheckoutPage";
import CheckoutAnalysis from "./pages/checkout/CheckoutAnalysis"; // ✅ NEU

// 🎉 Success Pages
import SuccessBusinessPage from "./pages/SuccessBusinessPage";
import SuccessInsidePage from "./pages/SuccessInsidePage";
import SuccessPartnerPage from "./pages/SuccessPartnerPage";
import SuccessAffiliatePage from "./pages/SuccessAffiliatePage";
import SuccessRegisterPage from "./pages/SuccessRegisterPage";

// 🔑 Auth Pages
import { Login } from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// 📊 Dashboards
import DashboardRedirect from "./pages/dashboard/DashboardRedirect";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardBusiness from "./pages/dashboard/DashboardBusiness";
import DashboardInside from "./pages/dashboard/DashboardInside";
import DashboardAnalyses from "./pages/dashboard/DashboardAnalyses";
import DashboardReports from "./pages/dashboard/DashboardReports";
import DashboardTeam from "./pages/dashboard/DashboardTeam";
import DashboardBilling from "./pages/dashboard/DashboardBilling";
import DashboardAccount from "./pages/DashboardAccount";

// 🧠 Analyse Workflow
import NewAnalysis from "./pages/NewAnalysis";
import AnalysisLayout from "./layouts/AnalysisLayout";
import { AnalysisConfiguration } from "./pages/AnalysisConfiguration";
import AnalysisBlocks from "./pages/analysis/AnalysisBlocks";
import Questionnaire from "./pages/Questionnaire";
import AnalysisStep3 from "./pages/analysis/AnalysisStep3";
import AnalysisStep4 from "./pages/analysis/AnalysisStep4";
import AnalysisStep5 from "./pages/analysis/AnalysisStep5";
import AnalysisSuccess from "./pages/analysis/AnalysisSuccess";

// 📄 Legal
import ImpressumPage from "./pages/ImpressumPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import ContactPage from "./pages/ContactPage";

// 🧩 Layout
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { DashboardLayout } from "./layouts/DashboardLayout";

// 🌐 Context
import { LanguageProvider } from "./contexts/LanguageContext";

// ✅ Inside Invite Page
import InsideInvitePage from "./pages/inside/InsideInvitePage";

// ==============================
// Layouts
// ==============================
function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">{children}</main>
    </div>
  );
}

// ==============================
// App
// ==============================
export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      {/* 🌍 Public */}
      <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
      <Route path="/business" element={<BusinessPage />} />
      <Route path="/inside" element={<InsidePage />} />
      <Route path="/partner" element={<PublicLayout><PartnerPage /></PublicLayout>} />
      <Route path="/affiliate" element={<PublicLayout><AffiliatePage /></PublicLayout>} />
      <Route path="/affiliate-register" element={<PublicLayout><AffiliateRegisterPage /></PublicLayout>} />

      {/* 💳 Checkout */}
      <Route path="/business-checkout" element={<PublicLayout><BusinessCheckoutPage /></PublicLayout>} />
      <Route path="/inside-checkout" element={<PublicLayout><InsideCheckoutPage /></PublicLayout>} />
      <Route path="/partner-checkout" element={<PublicLayout><PartnerCheckoutPage /></PublicLayout>} />

      {/* ✅ Analyse Checkout (NEU, FIX) */}
      <Route
        path="/checkout/analysis"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <CheckoutAnalysis />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* 🎉 Success */}
      <Route path="/success-business" element={<AuthLayout><SuccessBusinessPage /></AuthLayout>} />
      <Route path="/success-inside" element={<AuthLayout><SuccessInsidePage /></AuthLayout>} />
      <Route path="/success-partner" element={<AuthLayout><SuccessPartnerPage /></AuthLayout>} />
      <Route path="/success-affiliate" element={<AuthLayout><SuccessAffiliatePage /></AuthLayout>} />
      <Route path="/success-register" element={<AuthLayout><SuccessRegisterPage /></AuthLayout>} />

      {/* 🔑 Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<AuthLayout><ForgotPassword /></AuthLayout>} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ✅ Inside Invite */}
      <Route path="/inside/invite" element={<InsideInvitePage />} />

      {/* Öffentlicher Questionnaire */}
      <Route
        path="/inside/questionnaire/:id"
        element={
          <LanguageProvider>
            <Questionnaire />
          </LanguageProvider>
        }
      />

      {/* 📊 Dashboard */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardRedirect /></ProtectedRoute>} />
      <Route path="/dashboard/home" element={<ProtectedRoute><DashboardLayout><DashboardHome /></DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/business" element={<ProtectedRoute><DashboardLayout><DashboardBusiness /></DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/inside" element={<ProtectedRoute><DashboardLayout><DashboardInside /></DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/analyses" element={<ProtectedRoute><DashboardLayout><DashboardAnalyses /></DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/reports" element={<ProtectedRoute><DashboardLayout><DashboardReports /></DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/team" element={<ProtectedRoute><DashboardLayout><DashboardTeam /></DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/billing" element={<ProtectedRoute><DashboardLayout><DashboardBilling /></DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/account" element={<ProtectedRoute><DashboardLayout><DashboardAccount /></DashboardLayout></ProtectedRoute>} />

      {/* 🧠 Analyse – START */}
      <Route
        path="/analysis/new"
        element={
          <DashboardLayout>
            <NewAnalysis />
          </DashboardLayout>
        }
      />

      {/* 🧠 Analyse – Steps */}
      <Route
        path="/analysis/:analysisId/step/1"
        element={<ProtectedRoute><DashboardLayout><AnalysisLayout step={1}><AnalysisConfiguration /></AnalysisLayout></DashboardLayout></ProtectedRoute>}
      />
      <Route
        path="/analysis/:analysisId/step/2"
        element={<ProtectedRoute><DashboardLayout><AnalysisLayout step={2}><AnalysisBlocks /></AnalysisLayout></DashboardLayout></ProtectedRoute>}
      />

{/* 🧠 Analyse – Step 2 Alias (NEU, Architektur-FIX) */}
<Route
  path="/analysis/:analysisId/blocks"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <AnalysisLayout step={2}>
          <AnalysisBlocks />
        </AnalysisLayout>
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

  <Route
  path="/analysis/:analysisId/step/3"
  element={
    <ProtectedRoute>
      <LanguageProvider>
        <AnalysisLayout step={3}>
          <AnalysisStep3 />
        </AnalysisLayout>
      </LanguageProvider>
    </ProtectedRoute>
  }
/>


      <Route
        path="/analysis/:analysisId/step/4"
        element={<ProtectedRoute><DashboardLayout><AnalysisLayout step={4}><AnalysisStep4 /></AnalysisLayout></DashboardLayout></ProtectedRoute>}
      />
      <Route
        path="/analysis/:analysisId/step/5"
        element={<ProtectedRoute><DashboardLayout><AnalysisLayout step={5}><AnalysisStep5 /></AnalysisLayout></DashboardLayout></ProtectedRoute>}
      />

<Route
  path="/analysis/success"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <AnalysisSuccess />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>


      {/* 📄 Legal */}
      <Route path="/impressum" element={<PublicLayout><ImpressumPage /></PublicLayout>} />
      <Route path="/privacy" element={<PublicLayout><PrivacyPage /></PublicLayout>} />
      <Route path="/terms" element={<PublicLayout><TermsPage /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />

      {/* ❌ Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

import { Route, Routes } from "react-router-dom";

import HomePage from "@/pages/HomePage";
import WizardPage from "@/pages/WizardPage";
import PaymentPage from "@/pages/PaymentPage";
import TransactionResultPage from "@/pages/TransactionResultPage";
import CompleteInfoPageWrapper from "@/pages/CompleteInfoPageWrapper"; // 👈 Nuevo import
import TermsOfUsePage from "./pages/TermsOfUsePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/wizard" element={<WizardPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/payment-result" element={<TransactionResultPage />} />
      <Route path="/complete-info" element={<CompleteInfoPageWrapper />} /> {/* 👈 Nueva ruta */}
      <Route path="/terms-of-use" element={<TermsOfUsePage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      {/* Puedes agregar más rutas aquí */}
    </Routes>
  );
}

export default App;


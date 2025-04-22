import { Route, Routes } from "react-router-dom";

import HomePage from "@/pages/HomePage";
import WizardPage from "@/pages/WizardPage";
import PaymentPage from "@/pages/PaymentPage";
import TransactionResultPage from "@/pages/TransactionResultPage";
import CompleteInfoPageWrapper from "@/pages/CompleteInfoPageWrapper"; // 👈 Nuevo import

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/wizard" element={<WizardPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/payment-result" element={<TransactionResultPage />} />
      <Route path="/complete-info" element={<CompleteInfoPageWrapper />} /> {/* 👈 Nueva ruta */}
    </Routes>
  );
}

export default App;


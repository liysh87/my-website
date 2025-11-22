import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import ProductCatalog from "@/pages/ProductCatalog";
import KnowledgeTest from "@/pages/KnowledgeTest";
import ServiceSOP from "@/pages/ServiceSOP";
import KnowledgeBase from "@/pages/KnowledgeBase";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // 默认已登录状态

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductCatalog />} />
        <Route path="/test" element={<KnowledgeTest />} />
        <Route path="/sop" element={<ServiceSOP />} />
        <Route path="/knowledge" element={<KnowledgeBase />} />
      </Routes>
    </AuthContext.Provider>
  );
}

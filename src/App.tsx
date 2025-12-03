import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Dashboard from "./pages/Dashboard"
// import Category from "./pages/Category"
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <Router>
      <div className="flex">
        <Navbar />
        <main className="flex-1 p-6 bg-slate-100 min-h-screen">
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/categorias" element={<Category />} /> */}
            {/* <Route path="/tags" element={<Tags />} />
            <Route path="/recompensas" element={<Recompensas />} />
            <Route path="/impedimentos" element={<Impedimentos />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  )
}

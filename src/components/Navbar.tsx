import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Link } from "react-router-dom"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [cadastroOpen, setCadastroOpen] = useState(false)

  return (
    <nav className="bg-slate-900 text-white w-64 min-h-screen p-4 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Gerenciador</h1>
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <ul className="space-y-2">
        <li>
          <Link to="/" className="block px-2 py-2 rounded hover:bg-slate-700">
            🏠 Dashboard
          </Link>
        </li>

        {/* Menu Cadastro */}
        <li>
          <button
            onClick={() => setCadastroOpen(!cadastroOpen)}
            className="w-full flex items-center justify-between px-2 py-2 rounded hover:bg-slate-700"
          >
            <span>🗂️ Cadastro</span>
            <ChevronDown
              className={`transition-transform ${cadastroOpen ? "rotate-180" : ""}`}
              size={18}
            />
          </button>

          {cadastroOpen && (
            <ul className="pl-6 mt-2 space-y-1 text-sm">
              <li>
                <Link to="/categorias" className="block px-2 py-1 rounded hover:bg-slate-700">
                  Categorias
                </Link>
              </li>
              <li>
                <Link to="/tags" className="block px-2 py-1 rounded hover:bg-slate-700">
                  Tags
                </Link>
              </li>
              <li>
                <Link to="/recompensas" className="block px-2 py-1 rounded hover:bg-slate-700">
                  Recompensas
                </Link>
              </li>
              <li>
                <Link to="/impedimentos" className="block px-2 py-1 rounded hover:bg-slate-700">
                  Impedimentos
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  )
}

import { useState } from "react"
import { Plus, Eye, Pencil, Trash2, CheckCircle, Clock } from "lucide-react"

interface ListaTarefa {
  id: number
  nome: string
  tarefas: number
  status: "concluido" | "andamento"
}

export default function Dashboard() {
  const [listas, setListas] = useState<ListaTarefa[]>([
    { id: 1, nome: "Trabalho", tarefas: 12, status: "andamento" },
    { id: 2, nome: "Pessoal", tarefas: 8, status: "concluido" },
    { id: 3, nome: "Estudos", tarefas: 5, status: "andamento" },
  ])

  function handleExcluir(id: number) {
    setListas(listas.filter((l) => l.id !== id))
  }

  return (
    <div>
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Minhas Listas de Tarefas</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <Plus size={18} /> Nova Lista
        </button>
      </div>

      {/* Grid de Listas */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {listas.map((lista) => (
          <div
            key={lista.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-md transition border border-slate-200"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">{lista.nome}</h2>
              {lista.status === "concluido" ? (
                <CheckCircle className="text-green-500" size={20} />
              ) : (
                <Clock className="text-yellow-500" size={20} />
              )}
            </div>

            <p className="text-slate-600 mb-3">{lista.tarefas} tarefas</p>

            <div className="flex justify-end gap-2">
              <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200">
                <Eye size={16} />
              </button>
              <button className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200">
                <Pencil size={16} />
              </button>
              <button
                onClick={() => handleExcluir(lista.id)}
                className="p-2 rounded-lg bg-red-100 hover:bg-red-200"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {listas.length === 0 && (
        <div className="text-center text-slate-500 mt-12">
          Nenhuma lista cadastrada ainda. Clique em <strong>“Nova Lista”</strong> para começar.
        </div>
      )}
    </div>
  )
}

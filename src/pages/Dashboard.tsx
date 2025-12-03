import { useEffect, useState } from "react"
import { Plus, Eye, Pencil, Trash2, CheckCircle, Clock } from "lucide-react"
import NovaTarefaForm from "../components/NovaTarefaForm";
import type { TarefaInterface } from "../interfaces/tarefa";
import toast from "react-hot-toast";
import ModalSubtarefas from "../components/ModalSubTarefas";

export default function Dashboard() {
  const [buttonText, setButtonText] = useState("Salvar");
  const [numTarefa, setNumTarefa] = useState(0);
  const [mostrarForm, setMostrarForm] = useState(false);

  const [mostrarSubTarefas, setMostrarSubTarefas] = useState(false);
  const [titulo, setTitulo] = useState("")

  const [listas, setListas] = useState<TarefaInterface[]>([])

  async function loadTarefas() {
      const resp = await fetch("http://localhost:3333/v1/api/tarefas/");
      const json = await resp.json();
      setListas(json.data);
  }

  async function handleExcluir(numero: number) {
    const dados = { ativo : false };
    
    await fetch(`http://localhost:3333/v1/api/tarefas/${numero}`,{
      method: "PUT",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(dados)
    }).then(()=>{
      toast.success("Lista de tarefas excluída!");
      loadTarefas();
    });
  }

  useEffect(() => {
    loadTarefas();
  }, []);

  return (
    <div>
      {/* cabeçalho */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Minhas Listas de Tarefas</h1>
        <button type="submit" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition" onClick={() => { setNumTarefa(0); setButtonText("Salvar"); setMostrarForm(true);}}>
          <Plus size={18} /> Nova Lista
        </button>
      </div>

      {/* mostrar model do cadastro de tarefa */}
      {mostrarForm && (
        <NovaTarefaForm onClose={() => setMostrarForm(false) } reloadTarefas={loadTarefas} buttonType={buttonText} numeroTarefa={numTarefa}/>
      )}

      {
        mostrarSubTarefas && (
          <ModalSubtarefas show={true} onClose={()=> setMostrarSubTarefas(false)} tarefa={numTarefa} titulo={titulo}></ModalSubtarefas>
        )
      }


      {/* grid de Listas */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {listas.map((lista) => (
          <div
            key={lista.numero}
            className="bg-white p-4 rounded-xl shadow hover:shadow-md transition border border-slate-200"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">{lista.titulo}</h2>
              {lista.status === "CONCLUIDA" ? (
                <CheckCircle className="text-green-500" size={20} />
              ) : (
                <Clock className="text-yellow-500" size={20} />
              )}
            </div>

            <div className="flex justify-end gap-2">
              <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200" onClick={()=> {setNumTarefa(lista.numero? lista.numero : 0); setTitulo(lista.titulo? lista.titulo : ""); setMostrarSubTarefas(true)}}>
                <Eye size={16} />
              </button>
              <button className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200" onClick={() => { setButtonText("Atualizar"); setNumTarefa(lista.numero? lista.numero : 0); setMostrarForm(true);}}>
                <Pencil size={16} />
              </button>
              <button
                onClick={() => handleExcluir(lista.numero? lista.numero : 0)}
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

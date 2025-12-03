import { useEffect, useState } from "react";
import type { SubTarefaInterface } from "../interfaces/sub_tarefa";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  tarefa: any; // você pode substituir pela sua interface ITarefa,
  titulo: string
}

export default function ModalSubtarefas({ show, onClose, tarefa, titulo }: ModalProps) {

  const [subtarefas, setSubtarefas] = useState<SubTarefaInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  // Fecha e limpa tudo
  function handleClose() {
    setSubtarefas([]);
    setErro("");
    onClose();
  }

  // Busca subtarefas da tarefa selecionada
  async function loadSubtarefas() {
    if (!tarefa) return;

    setLoading(true);
    setErro("");

    try {
      const resp = await fetch(`http://localhost:3333/v1/api/subTarefas/${tarefa}`);
      const json = await resp.json();

      if (!json.status) {
        setErro("Erro ao carregar subtarefas.");
      } else {
        setSubtarefas(json.data);
      }
    } catch (e) {
      setErro("Falha na comunicação com o servidor.");
    }

    setLoading(false);
  }

  async function handleExcluir(numero: number) {
    const dados = { ativo : false };
    
    if(numero>0){
        await fetch(`http://localhost:3333/v1/api/subTarefas/${numero}`,{
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(dados)
      }).then(()=>{
        toast.success("subtarefa excluída!");
        loadSubtarefas()
      });
    }
  }

  // Carrega subtarefas sempre que o modal abrir
  useEffect(() => {
    if (show) {
      loadSubtarefas();
    }
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={handleClose}
    >
      <div
        className="bg-white w-[450px] rounded-xl shadow p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">
          Subtarefas de: <span className="text-blue-600">{titulo}</span>
        </h2>

        {/* Loading */}
        {loading && <p>Carregando subtarefas...</p>}

        {/* Erro */}
        {erro && <p className="text-red-600">{erro}</p>}

        {/* Lista */}
        {(!loading && !erro && subtarefas.length === 0) && (
          <p className="text-gray-500">Nenhuma subtarefa encontrada.</p>
        )}

        <ul className="space-y-3">
          {subtarefas.map((s) => (
            <li
              key={s.numero}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{s.titulo}</p>
                <p className="text-sm text-gray-500">{s.descricao}</p>
              </div>

              <span
                className={`px-2 py-1 text-xs rounded 
                  ${s.status == "CONCLUIDA" ? "bg-green-200 text-green-700" : "bg-yellow-200 text-yellow-700"}
                `}
              >
                {s.status == "CONCLUIDA"? "CONCLUÍDA" : "PENDENTE"}
              </span>

              <button
                onClick={() => handleExcluir(s.numero? s.numero : 0)}
                className="p-2 rounded-lg bg-red-100 hover:bg-red-200"
              >
                <Trash2 size={12}/>
              </button>
            </li>
          ))}
        </ul>

        {/* Botões */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={handleClose}
          >
            Fechar
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => alert("Aqui abrirá modal de nova subtarefa!")}
          >
            Nova subtarefa
          </button>
        </div>
      </div>
    </div>
  );
}

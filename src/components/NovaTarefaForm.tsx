import { useEffect, useState } from "react";
import type { TarefaInterface } from "../interfaces/tarefa";
import toast from "react-hot-toast";
import { formatarData } from "../util/formatDate";

type Props = {
  onClose: () => void;
  reloadTarefas: () => void;
  buttonType: string;
  numeroTarefa: number;
};

const defaultTarefa: TarefaInterface = {
  titulo: "",
  descricao: "",
  status: "PENDENTE",
  prazo: "",
  frequencia: "UNICA",
  nivel_energia_fisica: 1,
  nivel_energia_mental: 1,
  num_categoria: 1,
  num_recompensa: 1,
  sub_tarefas: []
}

export default function NovaTarefaForm({ onClose , reloadTarefas, buttonType, numeroTarefa}: Props) {
    const [loadedTarefa, setLoadedTarefa] = useState(false);
    const [valueF, setValueF] = useState(2);
    const [valueM, setValueM] = useState(2);

    // cálculo da porcentagem
    const percentF = ((valueF - 1) / 4) * 100;
    const percentM = ((valueM - 1) / 4) * 100;

    const [novaTarefa, setNovaTarefa] = useState<TarefaInterface>(defaultTarefa);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
      const name = e.target.name;
      let value: string= e.target.value;

        if(name === "nivel_energia_fisica"){
            let F = parseInt(value);
            setValueF(F);
            F = F-1;
            value = F.toString();
        }

        if(name === "nivel_energia_mental"){
            let M = parseInt(value);
            setValueM(M);
            M = M-1;
            value = M.toString();
        }
            
        setNovaTarefa((prev) => ({
          ...prev,
          [name]: value,
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();

      try {
          if(buttonType == "Salvar"){
            await fetch("http://localhost:3333/v1/api/tarefas/criar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novaTarefa),
          }).then(()=>{
              toast.success("Tarefa criada!");
              onClose();
              reloadTarefas();
          });
        }else{
          console.log(novaTarefa)
          await fetch(`http://localhost:3333/v1/api/tarefas/${numeroTarefa}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novaTarefa),
          }).then(()=>{
              toast.success("Tarefa atualizada!");
              onClose();
              reloadTarefas();
          });
        }
      } catch(error) {
          console.log(error);
          toast.error("Erro ao salvar.");
      } 
    }

    async function loadTarefa(){
      const resp = await fetch(`http://localhost:3333/v1/api/tarefas/${numeroTarefa}`,{
        method: "GET"
      });
      const json = await resp.json();
      json.data.prazo = await formatarData(json.data.prazo);
      json.data.nivelEnergiaFisica=parseInt(json.data.nivelEnergiaFisica)+1;
      json.data.nivelEnergiaMental=parseInt(json.data.nivelEnergiaMental)+1;

      novaTarefa.sub_tarefas = json.data.sub_tarefas;
      setNovaTarefa(json.data);
      setValueF(json.data.nivelEnergiaFisica);
      setValueM(json.data.nivelEnergiaMental);

      setLoadedTarefa(true);
    }

    useEffect(()=>{
      if(numeroTarefa>0 && !loadedTarefa)  
        loadTarefa();
    })
    
  return (
    // Fundo escuro
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" >
      {/* Container branco */}
      <div className="bg-white p-6 rounded-xl w-[400px] shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Criar Nova Tarefa</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Título"
            value={novaTarefa.titulo}
            name = "titulo"
            onChange={handleChange}
            className="border rounded p-2"
          />

          <textarea
            placeholder="Descrição"
            value={novaTarefa.descricao}
            onChange={handleChange}
            name = "descricao"
            className="border rounded p-2 h-24"
          />

          <label>Prazo</label>
          <input
            type="date"
            value={novaTarefa.prazo}
            name = "prazo"
            onChange={handleChange}
            className="border rounded p-2"
          />

          <label htmlFor="frequencia">Repetir:</label>
          <select id="frequencia" name="frequencia" size={1} className="border rounded p-2" value={novaTarefa.frequencia}
            onChange={handleChange}>
            <option value="DIARIA">Diariamente</option>
            <option value="SEMANAL">Semanalmente</option>
            <option value="MENSAL">Mensalmente</option>
            <option value="UNICA">Uma vez</option>
          </select>

          <label htmlFor="nivel_energia_fisica">Nível de energia física requerida [1 a 4]:</label>
          <input type="range" id="nivel_energia_fisica" name="nivel_energia_fisica" min={1} max={5}
          onChange={handleChange} className="
            w-full h-2 rounded-lg appearance-none cursor-pointer
            bg-gradient-to-r from-yellow-200 to-orange-600
            [background-size:var(--percent)_100%]
            bg-no-repeat bg-yellow-200

            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-orange-600
           "
           style={{ "--percent": `${percentF}%`} as React.CSSProperties}
           value={valueF}
           ></input>

          <label htmlFor="nivel_energia_mental">Nível de energia mental requerida [1 a 4]:</label>
          <input type="range" id="nivel_energia_mental" name="nivel_energia_mental" min={1} max={5} value={valueM}
            onChange={handleChange} className="
            w-full h-2 rounded-lg appearance-none cursor-pointer
            bg-gradient-to-r from-blue-200 to-purple-600
            [background-size:var(--percent)_100%]
            bg-no-repeat bg-blue-200

            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-purple-600
           "
            style={{ "--percent": `${percentM}%` } as React.CSSProperties}>
            </input>

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            >Cancelar
            </button>

            <button
              type="submit"
              className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
            >{ buttonType }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

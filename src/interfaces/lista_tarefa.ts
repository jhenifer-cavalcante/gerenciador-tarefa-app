export interface ListaTarefaInterface {
  id: number
  nome: string
  tarefas: number
  status: 'PENDENTE' | 'EM ANDAMENTO' |'CONCLUIDA'
}
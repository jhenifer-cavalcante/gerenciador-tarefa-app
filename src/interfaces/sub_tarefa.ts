export interface SubTarefaInterface{
    numero?: number,
    titulo?: string,
    ordem?: number,
    status?: 'PENDENTE' | 'EM ANDAMENTO' |'CONCLUIDA',
    descricao?: string,
    frequencia?: "DIARIA" | "SEMANAL" | "MENSAL" | "ANUAL" | "UNICA",
    nivel_energia_fisica?: number,
    nivel_energia_mental?: number,
    num_motivacao?: number,
    num_tarefa?: number,
    criado_por?: number,
    ativo?: boolean
}
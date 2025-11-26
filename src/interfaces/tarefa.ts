export interface TarefaInterface{
    numero?: number,
    titulo?: string,
    status?: 'PENDENTE' | 'EM ANDAMENTO' |'CONCLUIDA',
    descricao?: string,
    prazo?: string,
    frequencia?: "DIARIA" | "SEMANAL" | "MENSAL" | "ANUAL" | "UNICA", 
    nivel_energia_fisica?: number,
    nivel_energia_mental?:  number,
    num_categoria?: number,
    num_recompensa?: number,
    criado_por?: number,
    ativo?: boolean
}
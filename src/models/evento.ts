
export interface Evento{
    id : string,
    status:  string,
    dataInicio: Date,
    dataFim: Date,
    numeroSorteadoLoteria: string,
    qtdApostas:  number,
    vlrAdmin: number,
    vlrParticipacao: number,
    concursoIniciar: string,
    vlrBruto: number,
    vlrLiquido: number,
    tipoJogo: {
       
        tipoJogo: string,
        qtdApostar: number,
        qtdAcertar: number,
        totalApostar: number,
        endPoint: string
    },
    dataCriacao: Date,
    dataAtualizacao: Date
}
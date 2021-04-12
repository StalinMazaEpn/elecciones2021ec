export interface ICNERequest {
    datos: IDatoCNE[];
    fechaCorte: string;
    informacion: string;
    linkresultados: string;
    viewProcesamiento: string;
    conInformacion: boolean;
}

export interface IDatoCNE {
    strNomPartido: string;
    strNomLista: string;
    strNomCandidato: string;
    intVotos: number;
    intVotosM: number;
    intVotosH: number;
    intOrdCandidato: number;
    porcentaje?: number;
    porcentajeReal?: number;
    porcentajeRealStr?: string;
}
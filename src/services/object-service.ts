export interface Category {
    kategoriid: number;
    kategorinavn: string;
    kategoribeskrivelse: string;
    id: string;
    logoPath?: string; 
}

export interface Item {
    gjenstandid: number;
    gjenstandnavn: string;
    kategoriid: number;
    gjenstandbeskrivelse: string;
    id: string;
}

export interface Rule {
    regelverkid: number,
    kategoriid: number,
    betingelse: string,
    verdi: string,
    tillatthandbagasje: boolean,
    tillattinnsjekketbagasje: boolean,
    regelverkbeskrivelse: string,
    id: string;
}

export interface RuleTag {
    gjenstandid: number;
    regelverkid: number;
    regelverktagid: number;
    id: string;
}

export interface Category {
    kategoriid: number;
    kategorinavn: string;
    kategoribeskrivelse: string;
    logoPath?: string; 
}

export interface CreateCategoryData {
    kategorinavn: string;
    kategoribeskrivelse: string;
}

export interface UpdateCategoryData {
    kategorinavn: string;
    kategoribeskrivelse: string;
}

export interface Item {
    gjenstandid: number;
    gjenstandnavn: string;
    kategoriid: number;
    gjenstandbeskrivelse: string;
}

export interface Rule {
    regelverkid: number,
    kategoriid: number,
    betingelse: string,
    verdi: string,
    tillatthandbagasje: boolean,
    tillattinnsjekketbagasje: boolean,
    regelverkbeskrivelse: string,
}

export interface RuleTag {
    gjenstandid: number;
    regelverkid: number;
    regelverktagid: number;
}

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

export interface CreateItem {
    gjenstandnavn: string;
    gjenstandbeskrivelse: string;
    kategoriid: number;
}

export interface UpdateItem {
    gjenstandnavn: string;
    gjenstandbeskrivelse: string;
    kategoriid: number;
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

export interface CreateRule {
    kategoriid: number,
    betingelse: string,
    verdi: string,
    tillatthandbagasje: boolean,
    tillattinnsjekketbagasje: boolean,
    regelverkbeskrivelse: string,
}

export interface UpdateRule {
    kategoriid: number,
    betingelse: string,
    verdi: string,
    tillatthandbagasje: boolean,
    tillattinnsjekketbagasje: boolean,
    regelverkbeskrivelse: string,
}

export interface RuleTag {
    regelverktagid: number;
    gjenstandid: number;
    regelverkid: number;
}

export interface CreateRuleTag {
    gjenstandid: number;
    regelverkid: number;
}

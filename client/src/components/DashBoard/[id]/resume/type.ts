// Define el tipo para una habilidad
export type Skill = {
  name: string;
  level: 'Principiante' | 'Intermedio' | 'Avanzado';
};

// Define el tipo para la educación
export type Education = {
  degree: string;
  institution: string;
  years: string;
  description: string;
};


type Language = {
  name: string;
  level: string;
};
// Define el tipo para el estado de la página de currículum
export type PageResume = {
  title: string;
  role: string;
  location: string;
  phone: string;
  email: string;
  experiences: Experience[];
  skills: Skill[];
  languages: Language[]; // Agregar lenguajes
  education: Education[];
};

export type Experience = {
  position: string;
  years: string;
  company: string;
  description: string;
};

export enum EnumEditInfo {
  PERSONAL_DETAIL = "Personal-Detail",
  EDUCATION = "Education",
  ABILITIES = "Abilities",
  LANGUAGES = "Languages",
  WORK_EXPERIENCE = "Work-Exprience",
}

export interface ComponentEdit {
  id: EnumEditInfo;
  component: JSX.Element;
  title: string;
}

export interface IBaseItem {
  id: string;
  name: string;
}

export interface IEducationItem extends IBaseItem {
  institution: string;
  studyType: string;
  area: string;
  score: string;
  date: string;
  summary: string;
  url: IUrl;
}

export interface ILanguageItem extends IBaseItem {
  description: string;
  level: string;
}
export interface IExperienceItem extends IBaseItem {
  company: string;
  position: string;
  location: string;
  date: string;
  summary: string;
  url: IUrl;
}

export interface IProjectItem extends IBaseItem {
  description: string;
  date: string;
  summary: string;
  keywords: string[];
  url: IUrl;
}

export interface ISkillItem extends IBaseItem {
  description: string;
  level: number;
}

export interface ISections<T extends IBaseItem> {
  id: string;
  name: string;
  visible: boolean;
  items: T[];
}

export type SectionKeys = "experience" | "education" | "skills" | "languages";

export type SectionItem =
  | IEducationItem
  | IExperienceItem
  | ILanguageItem
  | IProjectItem
  | ISkillItem;

export interface IPicture {
  url: string;
  size: string;
  borderRadius: string;
}

export interface IUrl {
  label: string;
  href: string;
}

export interface IBasics {
  name: string;
  headline: string;
  phone: string;
  email: string;
  location: string;
  url: IUrl;
  picture: IPicture;
}
/* METADATA */

export type ILayout = SectionKeys[][][];

export interface ICss {
  value: string;
  visible: boolean;
}

export interface IPage {
  margin: number;
  format: "a4";
}

export interface ITheme {
  background: string;
  color: string;
}

export type TVariants = string[];

export interface Ifont {
  family: string;
  subset: string;
  variants: TVariants;
  size: number;
}

export interface ITypography {
  font: Ifont;
  lineHeight: number;
}

export interface IMetada {
  template: string;
  layout: ILayout;
  css: ICss;
  page: IPage;
  theme: ITheme | undefined;
  typography: ITypography | undefined;
}

export interface ILayoutSection {
  experience: ISections<IExperienceItem>;
  education: ISections<IEducationItem>;
  skills: ISections<ISkillItem>;
  languages: ISections<ILanguageItem>;
}

export interface IResumeBuilder {
  basics: IBasics;
  sections: ILayoutSection;
  metadata: IMetada;
}

export interface IResume {
  id: number;
  title: string;
  locked: boolean;
  userId: string;
  data: IResumeBuilder;
  image: string;
}

export interface IToken {
  token: string;
  message: string;
}

import get from "lodash.get";
import React, { Fragment } from "react";

import { useArtboardStore } from "@/store/resumeStore";
import { cn } from "@/lib/utils";
import { linearTransform } from "@/lib/number";
import { isEmptyString } from "@/lib/string";
import {
  IBaseItem,
  IEducationItem,
  IExperienceItem,
  ILanguageItem,
  ISections,
  ISkillItem,
  SectionKeys,
} from "@/interfaces/SResume";
import { TemplateProps } from "@/pages/type";

const Header = () => {
  const basics = useArtboardStore((state) => state.resume?.data.basics);
  const image = useArtboardStore((state) => state.resume.image);

  return (
    <div className="flex flex-col items-center justify-center space-y-2 pb-2 text-center">
      <div className=" w-20 h-20">
        <img src={image} alt="" className="w-full h-full object-contain" />
      </div>
      <div>
        <div className="text-2xl font-bold">{basics?.name}</div>
        <div className="text-base">{basics?.headline}</div>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm">
        {basics?.location && (
          <div className="flex items-center gap-x-1.5">
            <i className="ph ph-bold ph-map-pin text-primary" />
            <div>{basics?.location}</div>
          </div>
        )}
        {basics?.phone && (
          <div className="flex items-center gap-x-1.5">
            <i className="ph ph-bold ph-phone text-primary" />
            <a href={`tel:${basics?.phone}`} target="_blank" rel="noreferrer">
              {basics?.phone}
            </a>
          </div>
        )}
        {basics?.email && (
          <div className="flex items-center gap-x-1.5">
            <i className="ph ph-bold ph-at text-primary" />
            <a
              href={`mailto:${basics?.email}`}
              target="_blank"
              rel="noreferrer"
            >
              {basics.email}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

type RatingProps = { level: number };

const Rating = ({ level }: RatingProps) => (
  <div className="relative h-1 w-[128px] group-[.sidebar]:mx-auto">
    <div className="absolute inset-0 h-1 w-[128px] rounded bg-primary opacity-25" />
    <div
      className="absolute inset-0 h-1 rounded bg-primary"
      style={{ width: linearTransform(level, 0, 5, 0, 228) }}
    />
  </div>
);

type LinkProps = {
  icon?: React.ReactNode;
  iconOnRight?: boolean;
  label?: string;
  className?: string;
};

const Link = ({ icon, iconOnRight, className }: LinkProps) => {
  return (
    <div className="flex items-center gap-x-1.5">
      {!iconOnRight &&
        (icon ?? <i className="ph ph-bold ph-link text-primary" />)}
      <a
        target="_blank"
        rel="noreferrer noopener nofollow"
        className={cn("inline-block", className)}
      ></a>
      {iconOnRight &&
        (icon ?? <i className="ph ph-bold ph-link text-primary" />)}
    </div>
  );
};

type LinkedEntityProps = {
  name: string;
  className?: string;
};

const LinkedEntity = ({ name, className }: LinkedEntityProps) => {
  return (
    <Link
      label={name}
      icon={<i className="text-black text-primary" />}
      iconOnRight={true}
      className={className}
    />
  );
};

type SectionProps<T extends IBaseItem> = {
  section: ISections<T>;
  children?: (item: T) => React.ReactNode;
  className?: string;
  urlKey?: keyof T;
  levelKey?: keyof T;
  summaryKey?: keyof T;
  keywordsKey?: keyof T;
};

const Section = <T extends IBaseItem>({
  section,
  children,
  className,
  levelKey,
  summaryKey,
  keywordsKey,
}: SectionProps<T>) => {
  if (!section.visible || section.items.length === 0) return null;

  return (
    <section id={section.id} className="grid">
      <div className="mb-2 hidden font-bold text-primary group-[.main]:block">
        <h4>{section.name}</h4>
      </div>

      <div className="mx-auto mb-2 hidden items-center gap-x-2 text-center font-bold text-primary group-[.sidebar]:flex">
        <div className="size-1.5 rounded-full border border-primary" />
        <h4>{section.name}</h4>
        <div className="size-1.5 rounded-full border border-primary" />
      </div>

      <div className="grid gap-x-6 gap-y-3 group-[.sidebar]:mx-auto group-[.sidebar]:text-center">
        {section.items.map((item) => {
          const level = (levelKey && get(item, levelKey, 0)) as
            | number
            | undefined;
          const summary = (summaryKey && get(item, summaryKey, "")) as
            | string
            | undefined;
          const keywords = (keywordsKey && get(item, keywordsKey, [])) as
            | string[]
            | undefined;

          return (
            <div
              key={item.id}
              className={cn(
                "relative space-y-2",
                "border-primary group-[.main]:border-l group-[.main]:pl-4",
                className
              )}
            >
              <div>{children?.(item as T)}</div>

              {summary !== undefined && !isEmptyString(summary) && (
                <div
                  dangerouslySetInnerHTML={{ __html: summary }}
                  className="wysiwyg"
                />
              )}

              {level !== undefined && level > 0 && <Rating level={level} />}

              {keywords !== undefined && keywords.length > 0 && (
                <p className="text-sm">{keywords.join(", ")}</p>
              )}

              <div className="absolute left-[-4.5px] top-px hidden size-[8px] rounded-full bg-primary group-[.main]:block" />
            </div>
          );
        })}
      </div>
    </section>
  );
};

const Experience = () => {
  const section = useArtboardStore(
    (state) => state.resume?.data.sections.experience
  );

  return (
    section && (
      <Section<IExperienceItem>
        section={section}
        urlKey="url"
        summaryKey="summary"
      >
        {(item) => (
          <div>
            <LinkedEntity name={item.company} className="font-bold" />
            <div>{item.company}</div>
            <div>{item.position}</div>
            <div>{item.location}</div>
            <div className="font-bold">{item.date}</div>
          </div>
        )}
      </Section>
    )
  );
};

const Education = () => {
  const section = useArtboardStore(
    (state) => state.resume?.data.sections.education
  );

  return (
    section && (
      <Section<IEducationItem> section={section} summaryKey="summary">
        {(item) => (
          <div>
            <LinkedEntity name={item.institution} className="font-bold" />
            <div>{item.area}</div>
            <div>{item.score}</div>
            <div>{item.studyType}</div>
            <div className="font-bold">{item.date}</div>
          </div>
        )}
      </Section>
    )
  );
};

const Skills = () => {
  const section = useArtboardStore(
    (state) => state.resume?.data.sections.skills
  );

  return (
    section && (
      <Section<ISkillItem> section={section} levelKey="level">
        {(item) => (
          <div className="flex justify-between gap-x-4">
            <div className="font-bold">{item.name}</div>
            <div>{item.description}</div>
          </div>
        )}
      </Section>
    )
  );
};

const Languages = () => {
  const section = useArtboardStore(
    (state) => state.resume?.data.sections.languages
  );

  return (
    section && (
      <Section<ILanguageItem> section={section}>
        {(item) => (
          <div className="flex justify-between gap-x-4 w-[200px] ">
            <div className="font-bold">{item.name}</div>
            <div>{item.description}</div>
          </div>
        )}
      </Section>
    )
  );
};

const mapSectionToComponent = (section: SectionKeys) => {
  switch (section) {
    case "experience": {
      return <Experience />;
    }
    case "education": {
      return <Education />;
    }

    case "skills": {
      return <Skills />;
    }

    case "languages": {
      return <Languages />;
    }
    default: {
      return null;
    }
  }
};

export const Onyx = ({ columns, isFirstPage = false }: TemplateProps) => {
  const margin = useArtboardStore(
    (state) => state.resume?.data.metadata.page.margin
  );
  const background = useArtboardStore(
    (state) => state.resume?.data.metadata.theme?.background
  );
  const color = useArtboardStore(
    (state) => state.resume?.data.metadata.theme?.color
  );
  const fontSize = useArtboardStore(
    (state) => state.resume?.data.metadata.typography?.font.size
  );
  const lineHeight = useArtboardStore(
    (state) => state.resume?.data.metadata.typography?.lineHeight
  );
  const [main, sidebar] = columns;

  return (
    <div
      className="p-custom space-y-3"
      style={{
        margin,
        background,
        color,
        fontSize,
        lineHeight,
      }}
    >
      {isFirstPage && <Header />}

      <div className="grid grid-cols-3 gap-x-4">
        <div className="sidebar group space-y-4">
          {sidebar.map((section) => (
            <Fragment key={section}>{mapSectionToComponent(section)}</Fragment>
          ))}
        </div>

        <div className="main group col-span-2 space-y-4">
          {main.map((section) => (
            <Fragment key={section}>{mapSectionToComponent(section)}</Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

import {
  IBaseItem,
  IEducationItem,
  SectionItem,
  SectionKeys,
} from "@/interfaces/SResume";
import Education from "@/components/sidebar/left/education/Education";
import LanguagesEdit from "@/components/sidebar/left/languages/Languages";
import WorkExperience from "@/components/sidebar/left/work-experience/WorkExperience";
import AbilitiesEdit from "@/components/sidebar/left/abilities/Abilities";
import { useState } from "react";

interface PropsSection<T extends IBaseItem> {
  onClose: () => void;
  section: SectionKeys | null;
  itemEditSection: T 
  onConfirm: (values: T) => void | null;
}

const SectionDialog = ({
  onClose,
  section,
  itemEditSection,
  onConfirm,
}: PropsSection<SectionItem>) => {
  const [, setIsOpenSection] = useState(false);

  const searchSectionOpen = (key: SectionKeys) => {
    switch (key) {
      case "education":
        return (
          <Education
            setIsOpenSection={setIsOpenSection}
            mode={"edit"}
            itemEditSection={itemEditSection as unknown as IEducationItem }
            onConfirm={onConfirm}
            onClosed={onClose}
          />
        );
      case "languages":
        return (
          <LanguagesEdit
            setIsOpenSection={setIsOpenSection} /* mode={'edit'}  */
          />
        );
      case "experience":
        return (
          <WorkExperience
            setIsOpenSection={setIsOpenSection} /* mode={'edit'} */
          />
        );
      case "skills":
        return (
          <AbilitiesEdit
            setIsOpenSection={setIsOpenSection} /* mode={'edit'} */
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg  w-[900px]">
        <h2 className="text-lg font-semibold mb-4">test</h2>
        {section && searchSectionOpen(section)}
      </div>
    </div>
  );
};

export default SectionDialog;

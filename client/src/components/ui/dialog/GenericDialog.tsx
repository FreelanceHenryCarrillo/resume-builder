import { useDialogStore } from "@/store/dialog";
import React from "react";
import { Button } from "../button";
import SectionDialog from "./SectionDialog";
import { SectionItem } from "@/interfaces/SResume";

const Dialog: React.FC = () => {
  const {
    isOpen,
    title,
    type,
    section,
    itemEditSection,
    content,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
    closeDialog,
  } = useDialogStore();

  if (!isOpen) return null;

  if(type === 'delete'){
    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-lg font-semibold mb-4">{title}</h2>
          <p className="mb-4">{content}</p>
          <div className="flex justify-end space-x-4">
            <Button
              variant={"outline"}
              onClick={() => {
                onCancel();
                closeDialog();
              }}
            >
              {cancelText}
            </Button>
            <Button
              variant={"default"}
              onClick={() => {
                onConfirm();
                closeDialog();
              }}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    );
  }


  return  (
    <SectionDialog onClose={closeDialog}  section={section ?? null} itemEditSection={itemEditSection ?? {} as SectionItem} onConfirm={onConfirm} />
  );
};

export default Dialog;

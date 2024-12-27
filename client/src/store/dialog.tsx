import { SectionItem, SectionKeys } from "@/interfaces/SResume";
import {create} from "zustand";

type TypeDialog = "delete" | "update" | "create";

interface DialogState<T> {
  isOpen: boolean;
  title: string;
  content: string;
  section?: SectionKeys | null;
  itemEditSection?: T | null;
  type: TypeDialog;
  confirmText: string;
  cancelText: string;
  onConfirm: (values?: T) => void;
  onCancel: () => void;
  openDialog: (params: {
    title: string;
    content: string;
    type: TypeDialog;
    section?: SectionKeys | null;
    itemEditSection?: T | null;
    confirmText: string;
    cancelText: string;
    onConfirm: (values?: T) => void;
    onCancel?: () => void;
  }) => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogState<SectionItem> >((set) => ({
  isOpen: false,
  title: "",
  content: "",
  section: null,
  itemEditSection: null,
  type: "delete",
  confirmText: "Confirm",
  cancelText: "Cancel",
  onConfirm: () => {},
  onCancel: () => {},
  openDialog: ({
    title,
    content,
    type,
    section,
    itemEditSection = type !== "update" ? null : {} as SectionItem,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
  }) =>
    set({
      isOpen: true,
      title,
      type,
      section,
      itemEditSection,
      content,
      confirmText,
      cancelText,
      onConfirm,
      onCancel: onCancel ? onCancel : () => set({ isOpen: false }),
    }),
  closeDialog: () => set({ isOpen: false }),
}));

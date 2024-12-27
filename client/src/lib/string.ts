import { LayoutLocator, SortablePayload } from "./types";

export const parseLayoutLocator = (
  payload: SortablePayload | null
): LayoutLocator => {
  if (!payload) return { page: 0, column: 0, section: 0 };

  const section = payload.index;
  const [page, column] = payload.containerId.split(".").map(Number);

  return { page, column, section };
};

export const isUrl = (string: string | null | undefined) => {
  if (!string) return false;

  const urlRegex = /https?:\/\/[^\n ]+/i;

  return urlRegex.test(string);
};

export const isEmptyString = (string: string) => {
  if (string === "<p></p>") return true;
  return string.trim().length === 0;
};

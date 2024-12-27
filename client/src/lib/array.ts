import { LayoutLocator } from "./types";

export const moveItemInLayout = (
  current: LayoutLocator,
  target: LayoutLocator,
  layout: string[][][]
): string[][][] => {
  try {
    const newLayout = JSON.parse(JSON.stringify(layout));

    const item = newLayout[current.page][current.column][current.section];

    newLayout[current.page][current.column].splice(current.section, 1);

    newLayout[target.page][target.column].splice(target.section, 0, item);

    return newLayout;
  } catch {
    return layout;
  }
};

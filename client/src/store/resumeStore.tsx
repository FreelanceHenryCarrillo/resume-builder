import { IResume } from "@/interfaces/SResume";
import { create } from "zustand";
import _set from "lodash.set";
import { devtools } from "zustand/middleware";
import { produce } from "immer";
import { debouncedUpdateResume } from "@/services/resume/updateResume";
import { sampleResume } from "@/schemas/sample";

export type ArtboardStore = {
  resume: IResume;
  setResume: (resume: IResume) => void;
  setValues: (path: string, value: unknown) => void;
};

export const useArtboardStore = create<ArtboardStore>()(
  devtools(
    (set) => ({
      resume: {
        id: new Date().getSeconds(),
        title: "",
        locked: false,
        userId: "",
        data: sampleResume,
        image: ""
      },

      setResume: (resume) => {
        set({ resume });
      },

      setValues: (path, value) => {
        set(
          produce((state) => {
            state.resume = _set({ ...state.resume }, path, value);

            void debouncedUpdateResume(
              JSON.parse(JSON.stringify(state.resume))
            );
          })
        );
      },
    }),
    {
      name: "ArtboardStore",
      limit: 100,
    }
  )
);

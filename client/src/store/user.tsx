import { IUser } from "@/interfaces/User";
import { create } from "zustand";

interface UserState {
  user: IUser | null;
  isAuthenticated: boolean;
  token: string | null;
  setAuth: (token: string | null, isAuthenticated: boolean) => void;
}

export const useAuthStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  token: null,
  setAuth: (token: string | null, isAuthenticated: boolean) =>
    set({ token, isAuthenticated }),
}));

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  role: string | null;
  fullName: string | null;
  userId: number | null;
  deviceBound: boolean | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  role: null,
  fullName: null,
  userId: null,
  deviceBound: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        token: string;
        role: string;
        fullName: string;
        userId: number;
        deviceBound?: boolean | null;
      }>
    ) => {
      const { token, role, fullName, userId, deviceBound = null } = action.payload;
      state.token = token;
      state.role = role;
      state.fullName = fullName;
      state.userId = userId;
      state.deviceBound = deviceBound;
      state.isAuthenticated = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("attendance_token", token);
        localStorage.setItem(
          "attendance_user",
          JSON.stringify({ role, fullName, userId, deviceBound })
        );
      }
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.fullName = null;
      state.userId = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("attendance_token");
        localStorage.removeItem("attendance_user");
      }
    },
    loadFromStorage: (state) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("attendance_token");
        const userStr = localStorage.getItem("attendance_user");
        if (token && userStr) {
          try {
            const user = JSON.parse(userStr);
            state.token = token;
            state.role = user.role;
            state.fullName = user.fullName;
            state.userId = user.userId;
            state.deviceBound = user.deviceBound ?? null;
            state.isAuthenticated = true;
          } catch {
            localStorage.removeItem("attendance_token");
            localStorage.removeItem("attendance_user");
          }
        }
      }
    },
  },
});

export const { setCredentials, logout, loadFromStorage } = authSlice.actions;
export default authSlice.reducer;

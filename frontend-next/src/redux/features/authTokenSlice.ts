import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface AuthType {
  token: string;
}

interface AuthStateType {
  id: string;
  iat?: number;
}

const AuthData: AuthStateType = {
  id: "",
}

const authTokenSlice = createSlice({
  name: 'auth',
  initialState: { AuthData },
  reducers: {
    setAuthTokenCookies(state, action: PayloadAction<AuthType>) {
      const token = action.payload.token;
      const oneHourFromNow = new Date(new Date().getTime() + 60 * 60 * 1000);
      const decodedToken = jwtDecode<AuthStateType>(token);
      Cookies.set(
        "token",
        token,
        {
          secure: true,
          expires: oneHourFromNow,
          path: "/"
        }
      );
      state.AuthData.id = decodedToken.id;
      state.AuthData.iat = decodedToken.iat;
    },
    removeAuthTokenCookies() {
      Cookies.remove("token", { path: "/" }
      );
    },
    setAuthState(state) {
      const token = Cookies.get("token") || "";
      const decodedToken = jwtDecode<AuthStateType>(token);
      state.AuthData.id = decodedToken.id;
    }
  },
})

export const { setAuthTokenCookies, removeAuthTokenCookies, setAuthState } = authTokenSlice.actions;
export default authTokenSlice.reducer

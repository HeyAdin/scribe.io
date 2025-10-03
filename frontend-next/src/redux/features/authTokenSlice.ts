import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

interface AuthType {
  token: string;
}

const authTokenSlice = createSlice({
  name: 'counter',
  initialState: {},
  reducers: {
    setAuthTokenCookies(state, action: PayloadAction<AuthType>) {
      const token = action.payload.token;
      const oneHourFromNow = new Date(new Date().getTime() + 60 * 60 * 1000);
      Cookies.set(
        "token",
        token,
        {
          secure: true,
          expires: oneHourFromNow,
          path: "/"
        }
      );
    },
    removeAuthTokenCookies() {
      Cookies.remove("token", { path: "/" }
      );
    }
  },
})

export const { setAuthTokenCookies, removeAuthTokenCookies } = authTokenSlice.actions;
export default authTokenSlice.reducer

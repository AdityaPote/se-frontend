import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  updateProfile,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const userName = localStorage.getItem("userName");
const userId = localStorage.getItem("userId");

const initialState = {
  isLoggedIn: userId || false,
  userName: userName || "",
  userId: userId || "",
  isError: false,
  isLoading: false,
  errorMessage: "",
  searchValues: {
    trainNo: "",
    classType: "",
    quota: "",
    date: "",
    fromStationCode: "",
    toStationCode: "",
  },
  checkAvailablitityResponse: [],
};

export const continueWithGoogle = createAsyncThunk(
  "se/continueWithGoogle",
  async (thunkAPI) => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  "se/register",
  async ({ email, password }, thunkAPI) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "se/login",
  async ({ name, email, password }, thunkAPI) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const onLogout = createAsyncThunk("se/onLogout", async (thunkAPI) => {
  try {
    await signOut(auth);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const checkAvailablitity = createAsyncThunk(
  "se/checkAvailablitity",
  async (
    // { trainNo, classType, quota, fromStationCode, toStationCode, date },
    thunkAPI
  ) => {
    return [
      {
        total_fare: 1795,
        date: "25-11-2022",
        confirm_probability_percent: "",
        confirm_probability: "",
        current_status: "NOT AVAILABLE.",
      },
      {
        total_fare: 1795,
        date: "26-11-2022",
        confirm_probability_percent: "96",
        confirm_probability: "High",
        current_status: "RLWL27/WL25.",
      },
      {
        total_fare: 475,
        date: "27-11-2022",
        current_status: "AVAILABLE-0095.",
      },
      {
        total_fare: 475,
        date: "28-11-2022",
        current_status: "AVAILABLE-0108.",
      },
      {
        total_fare: 475,
        date: "29-11-2022",
        current_status: "AVAILABLE-0108.",
      },
      {
        total_fare: 475,
        date: "30-11-2022",
        current_status: "AVAILABLE-0108.",
      },
    ];
  }
);

const se = createSlice({
  name: "se",
  initialState,
  reducers: {
    setSearchValues: (state, action) => {
      state.searchValues = action.payload;
    },
  },
  extraReducers: {
    [continueWithGoogle.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.isError = false;
      state.isLoading = false;
      state.errorMessage = "";
      state.userId = auth.currentUser.uid;
      state.userName = auth.currentUser.displayName;
      localStorage.setItem("userId", auth.currentUser.uid);
      localStorage.setItem("userName", auth.currentUser.displayName);
    },
    [continueWithGoogle.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = "";
    },
    [continueWithGoogle.rejected]: (state, { payload }) => {
      state.isError = true;
      state.isLoading = false;
      state.errorMessage = payload;
    },

    [onLogout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.isError = false;
      state.isLoading = false;
      state.errorMessage = "";
      state.userId = "";
      state.userName = "";
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
    },
    [onLogout.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = "";
    },
    [onLogout.rejected]: (state, { payload }) => {
      state.isError = true;
      state.isLoading = false;
      state.errorMessage = payload;
    },

    [checkAvailablitity.fulfilled]: (state, { payload }) => {
      state.isError = false;
      state.isLoading = false;
      state.errorMessage = "";
      state.checkAvailablitityResponse = payload;
    },
    [checkAvailablitity.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = "";
    },
    [checkAvailablitity.rejected]: (state, { payload }) => {
      state.isError = true;
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});

export const { setSearchValues } = se.actions;

export default se.reducer;

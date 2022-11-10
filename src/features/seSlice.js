import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../firebase";
import { getAdditionalUserInfo } from "firebase/auth";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  updateProfile,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import axios from "axios";
import qs from "qs";
import { setDoc, doc, getDoc } from "firebase/firestore";

const userName = localStorage.getItem("userName");
const userId = localStorage.getItem("userId");

const initialState = {
  isLoggedIn: userId || false,
  userName: userName || "",
  userId: userId || "",
  isError: false,
  isLoading: false,
  errorMessage: "",
  checkAvailablitityResponse: [],
  selectedTrain: {},
  passengerDetails: [],
  history: [],
  selectedTicket: {},
};

export const continueWithGoogle = createAsyncThunk(
  "se/continueWithGoogle",
  async (thunkAPI) => {
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);
      if (getAdditionalUserInfo(response).isNewUser) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        await setDoc(docRef, {
          userName: auth.currentUser.displayName,
          tickets: [],
        });
      }
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
      const docRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(docRef, {
        userName: auth.currentUser.displayName,
        tickets: [],
      });
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
  async (searchValues, thunkAPI) => {
    try {
      const {
        fromStationCode,
        toStationCode,
        date,
        quota,
        classType,
        trainNo,
      } = searchValues;
      if (
        !trainNo ||
        !fromStationCode ||
        !toStationCode ||
        !quota ||
        !classType ||
        !date
      ) {
        return thunkAPI.rejectWithValue("Please fill all the fields");
      }
      const data = qs.stringify({
        classType: classType.value,
        date: date,
        fromStationCode: fromStationCode,
        quota: quota.value,
        toStationCode: toStationCode,
        trainNo: trainNo,
      });
      const config = {
        method: "post",
        url: "http://localhost:5000/api/checkavailability",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      const response = await axios(config);
      return await response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const checkout = createAsyncThunk(
  "se/checkout",
  async ({ amount, passengers }, thunkAPI) => {
    try {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const tickets = docSnap.data().tickets;
        tickets.push({
          ...thunkAPI.getState().se.selectedTrain,
          passengers,
        });
        await setDoc(docRef, {
          tickets: tickets,
        });
      }
      const reponse = await axios.post("http://localhost:5000/api/checkout", {
        amount,
      });
      window.location.assign(reponse.data.url);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getHistory = createAsyncThunk(
  "se/getHistory",
  async (thunkAPI) => {
    try {
      const docRef = doc(db, "users", localStorage.getItem("userId"));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return await docSnap.data().tickets;
      } else {
        return thunkAPI.rejectWithValue("No tickets found");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const se = createSlice({
  name: "se",
  initialState,
  reducers: {
    setSelectedTrain: (state, action) => {
      state.selectedTrain = action.payload;
    },
    setSelectedTicket: (state, action) => {
      state.selectedTicket = action.payload;
    },
    resetValues: (state, action) => {
      state.selectedTrain = {};
      state.passengerDetails = [];
      state.checkAvailablitityResponse = [];
      state.selectedTicket = {};
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
      state.checkAvailablitityResponse = payload;
      state.isError = false;
      state.errorMessage = "";
    },
    [checkAvailablitity.pending]: (state, action) => {
      state.isError = false;
      state.errorMessage = "";
    },
    [checkAvailablitity.rejected]: (state, { payload }) => {
      state.isError = true;
      state.errorMessage = payload;
      state.checkAvailablitityResponse = [];
    },

    [checkout.fulfilled]: (state, action) => {
      state.isError = false;
      state.errorMessage = "";
    },
    [checkout.pending]: (state, action) => {
      state.isError = false;
      state.errorMessage = "";
      state.isLoading = true;
    },
    [checkout.rejected]: (state, { payload }) => {
      state.isError = true;
      state.errorMessage = payload;
    },

    [getHistory.fulfilled]: (state, { payload }) => {
      state.isError = false;
      state.errorMessage = "";
      state.history = payload;
    },
    [getHistory.pending]: (state, action) => {
      state.isError = false;
      state.errorMessage = "";
    },
    [getHistory.rejected]: (state, { payload }) => {
      state.isError = true;
      state.errorMessage = payload;
    },
  },
});

export const { setSelectedTrain, setSelectedTicket, resetValues } = se.actions;

export default se.reducer;

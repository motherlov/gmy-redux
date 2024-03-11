import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../Helper/Helper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const initialState= {
  redirect: null
};

export const login = createAsyncThunk("/login", async (formData) => {
    let res = await AxiosInstance.post(`/login/`, formData);
    let resData = res?.data;
    return resData;
  }
);

export const signup = createAsyncThunk("signup", async (formData) => {
    let res = await AxiosInstance.post(`/register/`, formData, {
        headers: {
        'content-type': 'multipart/form-data',     // image upload korar jono  headers use 
      }
    });
    let resData = res?.data;
    return resData;
  }
);


export const AuthSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    reset_redirect: (state, { payload }) => {
      state.redirect = payload;
      },
      logout :(state) => {
        localStorage.removeItem("token");
      }
  },

  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(login.fulfilled, (state, { payload }) => {
        if(payload.status===200){
          state.status = "idle";
          state.redirect="/";
          localStorage.setItem("token",payload?.token)
          toast(payload?.message)
        }
        // else if (payload.status === 400) {
        //     toast.error(payload?.message);
        //   }

          // else{
          //    state.status = "Rejected";
          //  toast(payload?.message)
          // }
  
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "idle";
        toast.success("Invalid Credentials");
      })


//////////////////////////////////////      signup   //////////////////////////////////      
      .addCase(signup.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        console.log("hi",payload);

        if(payload.status === 200){
          state.status = "idle";
           state.redirect="/login"
          localStorage.setItem("name",payload?.data.name)
          toast(payload?.message)
        } 
      
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "idle";
        //   toast.success("This email already exist");
      });
  },
});


export const {reset_redirect,logout} = AuthSlice.actions;
export default AuthSlice;
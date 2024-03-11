import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../AuthSlice/AuthSlice";

//  import CrudSlice from "../CrudSlice/CrudSlice";

const Store =configureStore({
    reducer: {
       
        Auth:AuthSlice.reducer,
        // Crud: CrudSlice.reducer,
       
       
      },
})
export default Store
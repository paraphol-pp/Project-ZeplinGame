import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./gamesSlice"; // ✅ import จากไฟล์ที่คุณสร้างไว้

// ✅ สร้าง store หลักของ Redux
export const store = configureStore({
  reducer: {
    games: gamesReducer, // 👈 เก็บ state ของ slice ชื่อ "games"
  },
});

// ✅ สร้าง type สำหรับใช้กับ useSelector / useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

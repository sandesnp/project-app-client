import { configureStore } from '@reduxjs/toolkit';
import timerSlice from './timerSlice';

const store = configureStore({
	reducer: {
		Timer: timerSlice,
	},
	devTools: true,
});
export default store;

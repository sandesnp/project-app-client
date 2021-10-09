import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';

export const getTimers = createAsyncThunk(
	'timer/fetchTimers',
	async (param, { rejectWithValue }) => {
		try {
			const token = await Axios.post('/api/login/', {
				email: 'admin@email.com',
				password: 'admin',
			});
			const { access } = token.data;
			const response = await Axios.get('/api/task/', {
				headers: { Authorization: `Bearer ${access}` },
			});

			const timers = response.data;
			return timers;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const postTimer = createAsyncThunk(
	'timer/postTimer',
	async (timerBody, { rejectWithValue }) => {
		try {
			const token = await Axios.post('/api/login/', {
				email: 'admin@email.com',
				password: 'admin',
			});
			const { access } = token.data;
			const response = await Axios.post('/api/task/', timerBody, {
				headers: { Authorization: `Bearer ${access}` },
			});

			const timer = response.data;
			return timer;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
export const deleteTimer = createAsyncThunk(
	'timer/deleteTimer',
	async (timerId, { rejectWithValue }) => {
		try {
			const token = await Axios.post('/api/login/', {
				email: 'admin@email.com',
				password: 'admin',
			});
			const { access } = token.data;
			await Axios.delete(`/api/task/${timerId}`, {
				headers: { Authorization: `Bearer ${access}` },
			});
			return timerId;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
export const patchTimer = createAsyncThunk(
	'timer/patchTimer',
	async ({ timerId, timer }, { rejectWithValue }) => {
		try {
			const token = await Axios.post('/api/login/', {
				email: 'admin@email.com',
				password: 'admin',
			});
			const { access } = token.data;
			const response = await Axios.patch(`/api/task/${timerId}`, timer, {
				headers: { Authorization: `Bearer ${access}` },
			});
			const patchedTimer = response.data;
			if (timer.hasOwnProperty('title')) {
				patchedTimer.type = 'formUpdate';
			}
			return patchedTimer;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const initialState = {
	activeTimer: null,
	allTimers: [],
	counter: 0,
};

const timerSlice = createSlice({
	name: 'timer',
	initialState: initialState,
	reducers: {
		currentTimer: (state, action) => ({ currentTimerId: action.payload }),
		addCount: (state, action) => {
			return { ...state, counter: state.counter + action.payload };
		},
	},
	extraReducers: (builder) => {
		//get
		builder.addCase(getTimers.fulfilled, (state, action) => {
			return { ...state, allTimers: action.payload };
		});
		builder.addCase(getTimers.rejected, (state, action) => {
			console.log(action.payload);
		});

		//post
		builder.addCase(postTimer.fulfilled, (state, action) => {
			return {
				...state,
				allTimers: [...state.allTimers, action.payload],
				activeTimer: action.payload,
			};
		});
		builder.addCase(postTimer.rejected, (state, action) => {
			console.log(action.payload);
		});

		//delete
		builder.addCase(deleteTimer.fulfilled, (state, action) => {
			//if the deleted item is being counted, stop the count and also remove it from initially fetched list
			if (state.activeTimer?.id === action.payload) {
				return {
					...state,
					activeTimer: null,
					allTimers: state.allTimers.filter(
						(item) => item.id !== action.payload
					),
				};
			}
			return {
				...state,
				allTimers: state.allTimers.filter((item) => item.id !== action.payload),
			};
		});
		builder.addCase(deleteTimer.rejected, (state, action) => {
			console.log(action.payload);
		});

		//patch
		builder.addCase(patchTimer.fulfilled, (state, action) => {
			//if the patched item is the one being counted then update the object in activeTimer too
			//if it has property 'type' then it is in active.
			if (
				action.payload.hasOwnProperty('type') &&
				state.activeTimer?.id === action.payload.id
			) {
				const timerObj = action.payload;
				delete timerObj.type;
				return {
					...state,
					activeTimer:
						state.activeTimer.id === action.payload.id
							? timerObj
							: state.activeTimer,
					allTimers: state.allTimers.map((item) =>
						item.id === action.payload.id ? action.payload : item
					),
				};
			}
			return {
				...state,
				activeTimer: null,
				allTimers: state.allTimers.map((item) =>
					item.id === action.payload.id ? action.payload : item
				),
			};
		});
		builder.addCase(patchTimer.rejected, (state, action) => {
			console.log(action.payload);
		});
	},
});

export const { currentTimer, addCount } = timerSlice.actions;
export default timerSlice.reducer;

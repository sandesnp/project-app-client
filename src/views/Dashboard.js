import React, { useState, useEffect } from 'react';
import SideNav from '../layout/SideNav';
import TopNav from '../layout/TopNav';
import darkTheme from '../theme/darkTheme.json';
import lightTheme from '../theme/lightTheme.json';
import TimeList from '../layout/TimeList';
import { useSelector, useDispatch } from 'react-redux';
import { addCount } from '../redux/timerSlice';
import MstoTime from '../functions/mstoTime';

export default function Dashboard() {
	const [theme, setTheme] = useState(false); //false =light, true =dark
	const TimerList = useSelector((state) => state.Timer.allTimers);
	const [duration, setDuration] = useState(0);
	const Timer = useSelector((state) => state.Timer);
	const dispatch = useDispatch();
	const { activeTimer, counter } = Timer;
	let root = document.querySelector(':root');

	const handleDuration = () => {
		if (activeTimer) {
			const timer = setTimeout(() => {
				dispatch(addCount(1000));
				const mstoTime = MstoTime(counter);
				setDuration(mstoTime);
			}, 1000);
			// this will clear Timeout
			// when component unmount like in willComponentUnmount
			return () => {
				clearTimeout(timer);
			};
		}
	};

	useEffect(handleDuration, [counter]);

	if (theme) {
		for (let i in darkTheme) {
			root.style.setProperty(i, darkTheme[i]);
		}
	} else {
		for (let i in lightTheme) {
			root.style.setProperty(i, lightTheme[i]);
		}
	}

	return (
		<div className='dashboard'>
			<TopNav setTheme={setTheme} theme={theme} duration={duration} />
			<SideNav />
			<div className='dashboard__container'>
				<TimeList timerList={TimerList} />
			</div>
		</div>
	);
}

import React, { useState } from 'react';
import SideNav from '../layout/SideNav';
import TopNav from '../layout/TopNav';
import darkTheme from '../theme/darkTheme.json';
import lightTheme from '../theme/lightTheme.json';
import TimeList from '../layout/TimeList';
import { useSelector } from 'react-redux';

export default function Dashboard() {
	const [theme, setTheme] = useState(false); //false =light, true =dark
	const TimerList = useSelector((state) => state.Timer.allTimers);
	let root = document.querySelector(':root');

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
			<TopNav setTheme={setTheme} theme={theme} />
			<SideNav />
			<div className='dashboard__container'>
				<TimeList timerList={TimerList} />
			</div>
		</div>
	);
}

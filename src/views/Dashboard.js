import React, { useState, useEffect } from 'react';
import SideNav from '../layout/SideNav';
import TopNav from '../layout/TopNav';
import darkTheme from '../theme/darkTheme.json';
import lightTheme from '../theme/lightTheme.json';
import TimeList from '../layout/TimeList';
import Axios from 'axios';

export default function Dashboard() {
	const [theme, setTheme] = useState(false); //false =light, true =dark
	const [timerList, setTimerList] = useState([]);
	const [refresh, setRefresh] = useState(false);

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

	const getTimerList = async () => {
		const Token = await Axios.post('/api/login/', {
			email: 'admin@email.com',
			password: 'admin',
		});

		if (Token.data.hasOwnProperty('access')) {
			const { access } = Token.data;
			const response = await Axios.get('/api/task/', {
				headers: { Authorization: `Bearer ${access}` },
			});
			setTimerList(response.data);
		}
	};

	useEffect(getTimerList, [refresh]);

	return (
		<div className='dashboard'>
			<TopNav setTheme={setTheme} theme={theme} setRefresh={setRefresh} />
			<SideNav />
			<div className='dashboard__container'>
				<TimeList timerList={timerList} />
			</div>
		</div>
	);
}

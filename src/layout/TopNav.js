import React from 'react';
import IconBtn from '../components/IconBtn';
import DarkLogo from '../images/logo_dark.png';
import LightLogo from '../images/logo_light.png';
import TopNavPop from './TopNavPop';

export default function TopNav({ setTheme, theme }) {
	//theme true is dark , false is light
	return (
		<div className='topnav'>
			<figure className='topnav__image'>
				<img src={theme ? LightLogo : DarkLogo} alt='random image' />
			</figure>

			<TopNavPop icon={'fas fa-tachometer-alt'} />
			<IconBtn icon={'fas fa-tasks'} />
			<IconBtn icon={'fas fa-search'} />
			<IconBtn icon={'far fa-sun'} onClick={() => setTheme((prev) => !prev)} />
			<IconBtn icon={'fas fa-expand-arrows-alt'} />
		</div>
	);
}

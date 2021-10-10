import React, { useState } from 'react';
import IconBtn from '../components/IconBtn';
import DarkLogo from '../images/logo_dark.png';
import LightLogo from '../images/logo_light.png';
import TopNavPop from './TopNavPop';
import { InputGroup, Input, InputGroupAddon, InputGroupText } from 'reactstrap';

export default function TopNav({ setTheme, theme, duration }) {
	function toggleFullScreen() {
		if (
			(document.fullScreenElement && document.fullScreenElement !== null) ||
			(!document.mozFullScreen && !document.webkitIsFullScreen)
		) {
			if (document.documentElement.requestFullScreen) {
				document.documentElement.requestFullScreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullScreen) {
				document.documentElement.webkitRequestFullScreen(
					Element.ALLOW_KEYBOARD_INPUT
				);
			}
		} else {
			if (document.cancelFullScreen) {
				document.cancelFullScreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			}
		}
	}

	// const searchInput = document.querySelector(
	// 	'#root > div > div > div.topnav > div.input-group > input'
	// );
	// const searchIconContainer = document.querySelector(
	// 	'#root > div > div > div.topnav > div.search-container.input-group > div > span'
	// );
	// const searchContainer = document.querySelector(
	// 	'#root > div > div > div.topnav > div.input-group'
	// );

	// const handleSearchMaximize = () => {};
	// const handleSearchMinimize = () => {};

	//theme true is dark , false is light

	const SearchBar = () => {
		const [toggle, setToggle] = useState(false);

		return toggle ? (
			<InputGroup className='search-container search-container__toggle'>
				<Input className='search-container__input' />
				<InputGroupAddon addonType='append'>
					<InputGroupText className='search-container__container-icon'>
						<IconBtn
							icon={'fas fa-search'}
							onClick={() => setToggle((prev) => !prev)}
						/>
					</InputGroupText>
				</InputGroupAddon>
			</InputGroup>
		) : (
			<IconBtn
				icon={'fas fa-search'}
				onClick={() => setToggle((prev) => !prev)}
			/>
		);
	};

	return (
		<div className='topnav'>
			<figure className='topnav__image'>
				<img src={theme ? LightLogo : DarkLogo} alt='random image' />
			</figure>
			<TopNavPop icon={'fas fa-tachometer-alt'} duration={duration} />
			<IconBtn icon={'fas fa-tasks'} />
			<SearchBar />
			<IconBtn icon={'far fa-sun'} onClick={() => setTheme((prev) => !prev)} />
			<IconBtn icon={'fas fa-expand-arrows-alt'} onClick={toggleFullScreen} />
		</div>
	);
}

import React from 'react';
import IconBtn from '../components/IconBtn';

export default function SideNav() {
	return (
		<div className='sidenav'>
			<IconBtn icon={'fas fa-sign-out-alt'} />
			<IconBtn icon={'fas fa-bell'} />
			<IconBtn icon={'fas fa-calendar'} />
			<IconBtn icon={'fas fa-comment-alt'} />
		</div>
	);
}

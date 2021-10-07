import React from 'react';

export default function IconBtn({ icon = '', ...executable }) {
	return (
		<div className='iconbtn'>
			<i className={icon + ' iconbtn__icon'} {...executable}></i>
		</div>
	);
}

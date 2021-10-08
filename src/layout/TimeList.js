import React, { useState } from 'react';
import TimeList_Item from './TimeListItem';

export default function TimeList({ timerList = [] }) {
	//lists timelistitem based on day it was created.
	return (
		<div className='timelist'>
			<h1 className='timelist__title'>Time entries</h1>
			<div className='timelist__container'>
				<EntryItem timerList={timerList} />
			</div>
		</div>
	);
}

const EntryItem = ({ timerList }) => {
	const [toggle, setToggle] = useState(false);
	return (
		<div className='timelist-entryitem'>
			<details className='timelist-entryitem__container'>
				<summary
					className='timelist-entryitem__date'
					onClick={() => setToggle((prev) => !prev)}
				>
					<h3>Today</h3> <h4>08:00:16</h4>{' '}
					<i
						className={toggle ? 'fas fa-chevron-down' : 'fas fa-chevron-right'}
					></i>{' '}
				</summary>
				<div className='timelist-entryitem__container-inner'>
					{timerList.map((item, key) => (
						<TimeList_Item
							listId={key}
							key={key}
							toggler={toggle}
							item={item}
						/>
					))}
				</div>
			</details>
		</div>
	);
};

import React, { useState, useEffect } from 'react';
import { Popover, PopoverBody, FormGroup, Input } from 'reactstrap';

export default function TimeList_Item({ listId, toggler, item }) {
	const [popoverOpen, setPopoverOpen] = useState(false);
	const toggle = () => setPopoverOpen(!popoverOpen);
	const [duration, setDuration] = useState(0);

	function msToTime(duration) {
		let seconds = Math.floor((duration / 1000) % 60);
		let minutes = Math.floor((duration / (1000 * 60)) % 60);
		let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

		hours = hours < 10 ? '0' + hours : hours;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = seconds < 10 ? '0' + seconds : seconds;
		return hours + ':' + minutes + ':' + seconds;
	}

	const handleDuration = () => {
		const newDate = new Date().getTime();
		const itemDate = new Date(item.started_at).getTime();
		const difference = newDate - itemDate;
		const mstoTime = msToTime(difference);
		const timer = setTimeout(() => {
			setDuration(mstoTime);
		}, 1000);
		// this will clear Timeout
		// when component unmount like in willComponentUnmount
		return () => {
			clearTimeout(timer);
		};
	};

	useEffect(handleDuration, [duration]);

	return (
		<>
			<div
				className='timelistitem'
				id={'PopoverTimeEdit' + listId}
				type='button'
			>
				<div className='timelistitem__left'>
					<h2 className='timelistitem__title'>{item.title}</h2>
					<h5 className='timelistitem__subtitle'>
						<span>• Rocket Science</span> - Rocket Inc
					</h5>
				</div>
				<h2 className='timelistitem__right'>{duration}</h2>
			</div>
			<Popover
				placement='bottom'
				target={'PopoverTimeEdit' + listId}
				toggle={toggle}
				isOpen={popoverOpen}
			>
				<PopoverBody>
					<PopoverContent toggler={toggler} duration={duration} item={item} />
				</PopoverBody>
			</Popover>
		</>
	);
}

const PopoverContent = ({ toggler, duration, item }) => {
	const [create, setCreate] = useState({
		title: '',
		buttonState: false,
	});
	if (toggler === false) {
		setPopoverOpen(false);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		setCreate((prev) => ({ ...prev, buttonState: !prev.buttonState }));
	};
	const ProjectContent = () => {
		return (
			<div className='topnav-popovercontent__container-project'>
				<FormGroup>
					<Input type='select' name='select' id='exampleSelect'>
						<option>Project 1</option>
						<option>Project 2</option>
						<option>Project 3</option>
						<option>Project 4</option>
					</Input>
				</FormGroup>
				<FormGroup>
					<Input type='select' name='select' id='exampleSelect'>
						<option>Tag A</option>
						<option>Tag B</option>
						<option>Tag C</option>
						<option>Tag D</option>
					</Input>
				</FormGroup>
				<h3>Duration</h3>
				<div className='topnav-popovercontent__container-duration'>
					<h6 type='text'>{duration} </h6>
					<h6 type='text'>{item.started_at.split('T')[1].split('.')[0]} </h6>
					<i className='fas fa-arrow-right'></i>
					<h6 type='text'>00:00:00 </h6>
				</div>
				<FormGroup>
					<Input
						type='date'
						name='date'
						id='exampleDate'
						placeholder='date placeholder'
						disabled
						value={item.started_at.split('T')[0]}
					/>
				</FormGroup>
			</div>
		);
	};

	const PopoverUpper = () => {
		return (
			<div className='topnav-popovercontent'>
				<form onSubmit={handleSubmit}>
					<div className='topnav-popovercontent__create'>
						<input
							type='text'
							placeholder='What are you doing right now?'
							className='topnav-popovercontent__create-input'
							name='title'
						/>
						<button
							className='topnav-popovercontent__create-button'
							style={{
								backgroundColor: create.buttonState
									? 'var(--color-red'
									: 'var(--color-green)',
							}}
						>
							<i
								style={{
									backgroundColor: create.buttonState
										? 'var(--color-red'
										: 'var(--color-green)',
								}}
								className={create.buttonState ? 'fas fa-pause' : 'fas fa-play'}
							></i>
						</button>
					</div>
					<ProjectContent />
				</form>
			</div>
		);
	};
	return <PopoverUpper />;
};

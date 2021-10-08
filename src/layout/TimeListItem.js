import React, { useState, useEffect } from 'react';
import { Popover, PopoverBody, FormGroup, Input, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTimer } from '../redux/timerSlice';
import MstoTime from '../functions/mstoTime';

export default function TimeList_Item({ listId, toggler, item }) {
	const [popoverOpen, setPopoverOpen] = useState(false);
	const toggle = () => setPopoverOpen(!popoverOpen);
	const [duration, setDuration] = useState(item.time_taken);
	const TimerID = useSelector((state) => state.Timer.activeTimer?.id);

	const handleDuration = () => {
		if (item.id === TimerID) {
			const newDate = new Date().getTime();
			const itemDate = new Date(item.started_at).getTime();
			const difference = newDate - itemDate;
			const mstoTime = MstoTime(difference);
			const timer = setTimeout(() => {
				setDuration(mstoTime);
			}, 1000);
			// this will clear Timeout
			// when component unmount like in willComponentUnmount
			return () => {
				clearTimeout(timer);
			};
		}
	};

	useEffect(handleDuration, [duration]);

	const handleUpdate = () => {};

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
					<PopoverContent
						toggler={toggler}
						duration={duration}
						item={item}
						setPopoverOpen={setPopoverOpen}
					/>
				</PopoverBody>
			</Popover>
		</>
	);
}

const PopoverContent = ({ toggler, duration, item, setPopoverOpen }) => {
	const [toggleBtn, setToggleBtn] = useState(false);
	const dispatch = useDispatch();
	if (toggler === false) {
		//when the outer summary element is collapsed popup should close.
		setPopoverOpen(false);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		setToggleBtn((prev) => !prev);
	};

	const handleDelete = (e, timerID) => {
		e.preventDefault();
		setPopoverOpen(false);
		dispatch(deleteTimer(timerID));
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
				<div className='topnav-popovercontent__container-button'>
					<Button
						outline
						color='danger'
						style={{
							padding: '.5rem 2rem',
							fontSize: '1.4rem',
							fontWeight: '400',
							color: 'var(--color-red)',
						}}
						onClick={(e) => handleDelete(e, item.id)}
					>
						Delete
					</Button>
					<button className='btn__primary'>Save</button>
				</div>
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
						<h4 className='topnav-popovercontent__create-timer'> {duration}</h4>
						<button
							className='topnav-popovercontent__create-button'
							style={{
								backgroundColor: toggleBtn
									? 'var(--color-red'
									: 'var(--color-green)',
							}}
						>
							<i
								style={{
									backgroundColor: toggleBtn
										? 'var(--color-red'
										: 'var(--color-green)',
								}}
								className={toggleBtn ? 'fas fa-pause' : 'fas fa-play'}
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

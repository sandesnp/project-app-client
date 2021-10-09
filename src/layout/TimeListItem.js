import React, { useState, useEffect } from 'react';
import { Popover, PopoverBody, FormGroup, Input, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTimer, patchTimer } from '../redux/timerSlice';
import MstoTime from '../functions/mstoTime';

export default function TimeList_Item({ listId, toggler, item }) {
	const [popoverOpen, setPopoverOpen] = useState(false);
	const toggle = () => setPopoverOpen(!popoverOpen);
	const TimerID = useSelector((state) => state.Timer.activeTimer?.id);
	const counter = useSelector((state) => state.Timer.counter);

	const duration = MstoTime(counter);
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
				{item.id === TimerID ? (
					<h2 className='timelistitem__right'>{duration}</h2>
				) : (
					<h2 className='timelistitem__right'>{MstoTime(item.time_taken)}</h2>
				)}
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
						TimerID={TimerID}
					/>
				</PopoverBody>
			</Popover>
		</>
	);
}

const PopoverContent = ({
	toggler,
	duration,
	item,
	setPopoverOpen,
	TimerID,
}) => {
	const dispatch = useDispatch();
	if (toggler === false) {
		//when the outer summary element is collapsed popup should close.
		setPopoverOpen(false);
	}

	const handleDelete = (e, id) => {
		e.preventDefault();
		setPopoverOpen(false);
		dispatch(deleteTimer(id));
	};

	const ProjectContent = () => {
		return (
			<div className='topnav-popovercontent__container-project'>
				<FormGroup>
					<Input type='select' name='select' id='exampleSelect' name='project'>
						<option>Project 1</option>
						<option>Project 2</option>
						<option>Project 3</option>
						<option>Project 4</option>
					</Input>
				</FormGroup>
				<FormGroup>
					<Input type='select' name='select' id='exampleSelect' name='tag'>
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
		const [timerItem, setTimerItem] = useState({ title: item.title });
		const handleChange = (e) => {
			e.preventDefault();
			setTimerItem({ ...timerItem, [e.target.name]: e.target.value });
		};

		const handlePatch = (e) => {
			e.preventDefault();
			console.log(timerItem);
			dispatch(patchTimer({ timerId: item.id, timer: timerItem }));
		};

		const handleResumeTimer = (e) => {
			e.preventDefault();
		};

		const handleStopTimer = (e) => {
			e.preventDefault();

			// console.log(new Date(difference).toISOString());
			const ended_at = new Date();
			dispatch(
				patchTimer({
					timerId: activeTimer.id,
					timer: {
						ended_at,
						time_taken: MstoTime(ended_at.getTime() - new Date(item.st)),
					},
				})
			);
		};

		return (
			<div className='topnav-popovercontent'>
				<form onSubmit={handlePatch}>
					<div className='topnav-popovercontent__create'>
						<input
							type='text'
							className='topnav-popovercontent__create-input'
							name='title'
							value={timerItem.title}
							onChange={handleChange}
						/>

						{item.id === TimerID ? (
							<h3 className='topnav-popovercontent__create-timer'>
								{' '}
								{duration}
							</h3>
						) : (
							<h3 className='topnav-popovercontent__create-timer'>
								{' '}
								{MstoTime(item.time_taken)}
							</h3>
						)}

						<button
							className='topnav-popovercontent__create-button'
							style={{
								backgroundColor:
									TimerID === item.id
										? 'var(--color-red'
										: 'var(--color-green)',
							}}
							onClick={TimerID ? handleStopTimer : handleResumeTimer}
						>
							<i
								style={{
									backgroundColor:
										TimerID === item.id
											? 'var(--color-red'
											: 'var(--color-green)',
								}}
								className={TimerID === item.id ? 'fas fa-pause' : 'fas fa-play'}
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

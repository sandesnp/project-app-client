import React, { useState } from 'react';
import { Popover, PopoverBody, FormGroup, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { postTimer, patchTimer } from '../redux/timerSlice';

export default function TopNavPop({ icon, duration }) {
	const [popoverOpen, setPopoverOpen] = useState(false);
	const dispatch = useDispatch();
	const toggle = () => setPopoverOpen(!popoverOpen);

	const PopoverContent = () => {
		const [project, setProject] = useState(false);
		const Timer = useSelector((state) => state.Timer);
		const { activeTimer, counter } = Timer;

		const handleCreate = (e) => {
			e.preventDefault();
			const timerItem = {
				title: e.target.title.value,
				project: project ? e.target.project.value : '',
				tag: project ? e.target.tag.value : '',
				started_at: new Date(),
				time_taken: '0',
			};

			dispatch(postTimer(timerItem));
		};

		const handleUpdate = (e) => {
			e.preventDefault();

			const ended_at = new Date();
			dispatch(
				patchTimer({
					timerId: activeTimer.id,
					timer: { ended_at, time_taken: counter },
				})
			);
		};

		const ProjectContent = ({ state }) => {
			return !state ? (
				<></>
			) : (
				<div className='topnav-popovercontent__container-project'>
					<FormGroup>
						<Input
							type='select'
							name='select'
							id='exampleSelect'
							name='project'
						>
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
						<h6 type='text'>01:18:24 </h6>
						<h6 type='text'>01:18:24 </h6>
						<i className='fas fa-arrow-right'></i>
						<h6 type='text'>01:18:24 </h6>
					</div>
					<FormGroup>
						<Input
							type='date'
							name='date'
							id='exampleDate'
							placeholder='date placeholder'
						/>
					</FormGroup>
				</div>
			);
		};

		const PreCreate = () => {
			return (
				<>
					<input
						type='text'
						placeholder='What are you doing right now?'
						className='topnav-popovercontent__create-input'
						name='title'
					/>
					<button
						className='topnav-popovercontent__create-button'
						style={{
							backgroundColor: 'var(--color-green)',
						}}
					>
						<i
							style={{
								backgroundColor: 'var(--color-green)',
							}}
							className='fas fa-play'
						></i>
					</button>
				</>
			);
		};
		const PostCreate = () => {
			return (
				<>
					<h4 className='topnav-popovercontent__create-title'>
						{activeTimer.title}
					</h4>

					<h4
						className='topnav-popovercontent__create-timer'
						style={{ flex: '1' }}
					>
						{' '}
						{duration}
					</h4>
					<button
						className='topnav-popovercontent__create-button'
						style={{
							backgroundColor: 'var(--color-red',
						}}
					>
						<i
							style={{
								backgroundColor: 'var(--color-red',
							}}
							className='fas fa-pause'
						></i>
					</button>
				</>
			);
		};

		const PopoverUpper = () => {
			return (
				<div className='topnav-popovercontent'>
					<h2 className='topnav-popovercontent__heading'>Time Tracking</h2>
					<h5 className='topnav-popovercontent__subheading'>
						Start tracking your activities
					</h5>
					<form onSubmit={activeTimer ? handleUpdate : handleCreate}>
						<div className='topnav-popovercontent__create'>
							{activeTimer ? <PostCreate /> : <PreCreate />}
						</div>
						<p
							className='topnav-popovercontent__add'
							onClick={() => setProject((prev) => !prev)}
						>
							+add project
						</p>
						{project && <ProjectContent state={project} />}
					</form>
				</div>
			);
		};
		return <PopoverUpper />;
	};

	return (
		<div className='iconbtn'>
			<i
				id='PopoverTopNav'
				type='button'
				className={icon + ' iconbtn__icon'}
			></i>

			<Popover
				placement='bottom'
				target='PopoverTopNav'
				toggle={toggle}
				isOpen={popoverOpen}
			>
				<PopoverBody>
					<PopoverContent />
				</PopoverBody>
			</Popover>
		</div>
	);
}

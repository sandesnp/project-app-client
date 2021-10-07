import React, { useState } from 'react';
import { Popover, PopoverBody, FormGroup, Input } from 'reactstrap';
import Axios from 'axios';

export default function TopNavPop({ icon, setRefresh }) {
	const [popoverOpen, setPopoverOpen] = useState(false);

	const toggle = () => setPopoverOpen(!popoverOpen);

	const PopoverContent = () => {
		const [toggle, setToggle] = useState(false);
		const [project, setProject] = useState({
			buttonState: false,
		});

		const handleSubmit = async (e) => {
			e.preventDefault();
			setToggle((prev) => !prev);

			const timerItem = {
				title: e.target.title.value,
				project: project ? e.target.project.value : '',
				tag: project ? e.target.tag.value : '',
				started_at: new Date(),
			};

			const Token = await Axios.post('/api/login/', {
				email: 'admin@email.com',
				password: 'admin',
			});

			if (Token.data.hasOwnProperty('access')) {
				const { access } = Token.data;
				const response = await Axios.post('/api/task/', timerItem, {
					headers: { Authorization: `Bearer ${access}` },
				});
				response.data.hasOwnProperty('title') && setRefresh((prev) => !prev);
			}
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

		const PopoverUpper = () => {
			return (
				<div className='topnav-popovercontent'>
					<h2 className='topnav-popovercontent__heading'>Time Tracking</h2>
					<h5 className='topnav-popovercontent__subheading'>
						Start tracking your activities
					</h5>
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
									backgroundColor: toggle
										? 'var(--color-red'
										: 'var(--color-green)',
								}}
							>
								<i
									style={{
										backgroundColor: toggle
											? 'var(--color-red'
											: 'var(--color-green)',
									}}
									className={toggle ? 'fas fa-pause' : 'fas fa-play'}
								></i>
							</button>
						</div>
						<p
							className='topnav-popovercontent__add'
							onClick={() => setProject((prev) => !prev)}
						>
							+add project
						</p>
						<ProjectContent state={project} />
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

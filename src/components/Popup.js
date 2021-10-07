import React, { useState } from 'react';
import { Popover, PopoverBody } from 'reactstrap';
export default function popup(props) {
	const [popoverOpen, setPopoverOpen] = useState(false);

	const toggle = () => setPopoverOpen(!popoverOpen);
	const {
		PopoverContent = () => <div></div>,
		PopoverBtn = ({ ...executables }) => (
			<button {...executables}>button</button>
		),
	} = props;
	return (
		<>
			<PopoverBtn id='PopoverTopNav' onClick={toggle} />
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
		</>
	);
}

/* eslint-disable react/prop-types */
// Sidebar Component
import {useState} from 'react';
import visOn from '../assets/img/visibility-on.svg';
import visOff from '../assets/img/visibility-off.svg';
import arrow from '../assets/img/arrow-down.svg';
import '../styles/Sidebar.css';

function Sidebar({chars, bgs, setShowCards, flipCards}) {
	// Make copy of charData and bgData arrs so the
	// links dont get shuffled everytime the data gets shuffled
	const [copy, setCopy] = useState([chars, bgs]);
	// Which visibility icon to show
	const [visibility, setVisibility] = useState(true);
	const [expand, setExpand] = useState(true); // Is sidebar expanded?

	const otherAttributions = [{
		link: 'https://www.vecteezy.com/free-vector/thor-hammer',
		text: 'Thor Hammer Vectors by Vecteezy',
	}, {
		link: 'https://fonts.google.com/icons?icon.platform=web',
		text: 'Other icons by Google Fonts',
	}];

	return (
		<div className="sidebar">
			<h2> Relevant Links
				<img src={arrow} alt={expand ? 'Minimize Icon' : 'Expand Icon'}
					className={expand ? '' : 'flip'} onClick={() => {
						setExpand(!expand);
						flipCards(); // Trigger card re-render so height doesnt mess up
					}}
					style={{top: !expand ? '1em' : ''}} />
			</h2>

			<div className={`dropdown${expand ? ' open' : ' close'}`}>
				<h3>Characters</h3>
				<ul>
					{copy[0].map((item) => {
						return (
							<li className='attribution' key={item.name || item.title}>
								<a href={item.link} target="_blank" rel="noopener noreferrer">
									{item.name || item.title}
								</a>
							</li>
						);
					})}
				</ul>
				<h3>Events</h3>
				<ul>
					{copy[1].map((item) => {
						return (
							<li className='attribution' key={item.name || item.title}>
								<a href={item.link} target="_blank" rel="noopener noreferrer">
									{item.name || item.title}
								</a>
							</li>
						);
					})}
				</ul>
				<h3>Other</h3>
				<ul>
					{otherAttributions.map((item, i) => {
						return (
							<li className='attribution'
								key={i == 0 ? 'hammer' : i == 2 ? 'goog' : i} >
								<a href={item.link} target="_blank" rel="noopener noreferrer">
									{item.text}
								</a>
							</li>
						);
					})}
				</ul>
			</div>

			<img className='visibility' src={visibility ? visOn : visOff}
				alt={visibility ? 'Show background' : 'Hide background'}
				onClick={() => {
					setShowCards(!visibility);
					setVisibility(!visibility);
				}} />
		</div>
	);
}

export default Sidebar;

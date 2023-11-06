/* eslint-disable react/prop-types */
// Sidebar Component
import {useState} from 'react';
import visOn from '../assets/img/visibility-on.svg';
import visOff from '../assets/img/visibility-off.svg';
import '../styles/Sidebar.css';

function Sidebar({chars, bgs, setShowCards}) {
	// Make copy of charData and bgData arrs so the
	// links dont get shuffled everytime the data gets shuffled
	const [copy, setCopy] = useState([chars, bgs]);
	// Which visibility icon to show
	const [visibility, setVisibility] = useState(true);

	return (
		<div className="sidebar">
			<h2>Relevant Links</h2>
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

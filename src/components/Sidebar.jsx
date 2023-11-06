/* eslint-disable react/prop-types */
// Sidebar Component
import {useState} from 'react';
import '../styles/Sidebar.css';

function Sidebar({chars, bgs}) {
	const [copy, setCopy] = useState([chars, bgs]);

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
		</div>
	);
}

export default Sidebar;

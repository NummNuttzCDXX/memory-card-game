/* eslint-disable react/prop-types */
// Scoreboard component

import {useEffect, useState} from 'react';
import '../styles/Scoreboard.css';

function Scoreboard({score}) {
	const [bestScore, setBestScore] = useState(0);

	// Run on initial render
	useEffect(() => {
		// Get locally stored (old) best score (if there is one)
		const oldBestScore = localStorage.getItem('bestScore');
		// Set `bestScore` to old, locally stored score
		if (oldBestScore != null) setBestScore(oldBestScore);
	}, []);

	// Run everytime score changes
	useEffect(() => {
		if (score > bestScore) {
			setBestScore(score); // Set new best score
			localStorage.setItem('bestScore', score); // Locally store new best score
		}
	}, [score, bestScore]);

	return (
		<div className='scoreboard'>
			<p>Score: {score} </p>
			<p>Best Score: {bestScore} </p>
		</div>
	);
}

export default Scoreboard;

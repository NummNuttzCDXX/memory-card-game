/* eslint-disable react/prop-types */
// Card component
import {useEffect, useState} from 'react';
import '../styles/Card.css';
import logo from '../assets/img/Marvel_Logo.svg';
import MarvelData from '../modules/marvelData';
import {Tilt} from 'react-tilt';

export default function Card({charData, onClick, flipped = false, setFlip}) {
	const [height, setHeight] = useState(250);

	// Calculate img size on every render
	useEffect(() => {
		const imgData = MarvelData.processImg(charData.img);
		charData.img = imgData;
	});

	// Calculate card size on every render
	useEffect(() => {
		const card = document.querySelector('.card');
		if (!card) return; // Error check

		const img = card.querySelector('.card-front img');
		const txt = card.querySelector('.card-front p');
		const txtMarg = Number(getComputedStyle(txt).marginTop.split('px')[0]);

		const total = img.clientHeight + txt.clientHeight + (txtMarg * 2);
		setHeight(total);
	}); // Removed dependency array to prevent height errors

	// Run when `flipped` changes -- Flip cards back if flipped
	useEffect(() => {
		// Flip cards back after delay
		if (flipped) setTimeout(() => setFlip(false), 1000);
	});

	const cardStyles = {height: height + 'px'};

	// Get URL
	const imgUrl = charData.img.path + charData.img.size + charData.img.ext;

	const tiltOptions = {
		reverse: true,
		scale: 1.11,
	};

	return (
		<Tilt options={tiltOptions}>
			<div className={`card${flipped ? ' flip' : ''}`} onClick={onClick}
				style={cardStyles} >
				<div className="flip-card">
					<div className='card-front' >
						<img src={imgUrl} alt={charData.name + ' image'} />
						<p> {!charData ? '' : charData.name} </p>
					</div>
					<div className='card-back' >
						<img src={logo} alt='Marvel Logo' />
					</div>
				</div>
			</div>
		</Tilt>
	);
}

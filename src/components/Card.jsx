/* eslint-disable react/prop-types */
// Card component
import {useEffect} from 'react';
import '../styles/Card.css';
import MarvelData from '../modules/marvelData';

export default function Card({charData, onClick}) {
	// Calculate img size on every render
	useEffect(() => {
		const imgData = MarvelData.processImg(charData.img);
		charData.img = imgData;
	});

	// Get URL
	const imgUrl = charData.img.path + charData.img.size + charData.img.ext;

	return (
		<div className="card" onClick={onClick}>
			<img src={imgUrl} alt={charData.name + ' image'} />
			<p> {!charData ? '' : charData.name} </p>
		</div>
	);
}

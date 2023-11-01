/* eslint-disable react/prop-types */
// Card component
import '../styles/Card.css';

export default function Card({charData}) {
	return (
		<div className="card">
			<img src={!charData ? '' : charData.img} alt={charData.name + ' image'} />
			<p> {!charData ? '' : charData.name} </p>
		</div>
	);
}

// Loading screen component
import mjolnir from '../assets/img/mjolnir.svg';
import '../styles/Loading.css';

export default function Loading() {
	return (
		<div className='loading-screen'>
			<img src={mjolnir} className='loading' alt='Loading Icon' />
			<p>Loading...</p>
		</div>
	);
}

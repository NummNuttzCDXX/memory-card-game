
import {useEffect, useState} from 'react';
import MarvelData from '../modules/marvelData';
import '../styles/App.css';
import Card from './Card';

function App() {
	const [charData, setCharData] = useState([]);
	const [loading, setLoading] = useState(true);

	// Run on mount
	useEffect(() => {
		// Cannot define async function directly on useEffect callback
		async function fetchData() {
			// Define names to fetch
			const names = ['Jean Grey', 'Spider-Man (2099)', 'Thor'];
			/* Fetch data for every name
			Get arr of resolved promises */
			const promises = names.map(async (name) => {
				const data = await MarvelData.get(name);
				return data;
			});

			// Resolve all promises and save to arr of Character Data
			const charData = await Promise.all(promises);
			setCharData(charData); // Update Character Data state
			setLoading(false); // Update loading state
		}

		fetchData();
	}, []);

	return (
		<>
			<header> <h1>Marvel Memory Card Game</h1> </header>
			{ !loading &&
				// If not loading, map through data and return a card for each
				<div className='card-container' >
					{charData.map((data) => <Card key={data.id} charData={data} />)}
				</div>
			}
		</>
	);
}

export default App;

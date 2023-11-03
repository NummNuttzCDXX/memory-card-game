
import {useEffect, useState} from 'react';
import MarvelData from '../modules/marvelData';
import '../styles/App.css';
import Card from './Card';
import Loading from './Loading';

function App() {
	const [charData, setCharData] = useState(null);
	const [bgData, setBgData] = useState(null);
	const [loading, setLoading] = useState(true);

	// Run on mount -- Get character data
	useEffect(() => {
		// Cannot define async function directly on useEffect callback
		async function fetchData() {
			// Define names to fetch
			const names = ['Jean Grey', 'Spider-Man (2099)', 'Thor'];

			// If Data is not set yet
			if (!charData) {
				/* Fetch data for every name
				Get arr of resolved promises */
				const promises = names.map(async (name) => {
					const data = await MarvelData.get(name);
					return data;
				});

				// Resolve all promises and save to arr of Character Data
				const charData = await Promise.all(promises);
				setCharData(charData); // Update Character Data state
			}

			if (bgData) setLoading(false); // Update loading state
		}

		fetchData();
	}, [bgData]);

	// Run on mount -- Get background image
	useEffect(() => {
		const fetchData = async () => {
			const eventNames = [
				'avengers vs x-men',
				'age of ultron',
				'Secret Invasion',
				'atlantis attacks',
			];

			// If bgData is not already set
			if (!bgData) {
				const promises = eventNames.map(async (name) => {
					const data = await MarvelData.get(name, false, false);
					data.img = MarvelData.processImg(data.img, false, true);

					return data;
				});

				const data = await Promise.all(promises);
				setBgData(data);
			}

			if (charData) setLoading(false);
		};

		fetchData();
	}, [charData]);

	// Parse background img url if the data is loaded
	const bgUrl = bgData ?
		bgData[0].img.path + bgData[0].img.size + bgData[0].img.ext :
		'';
	const mainStyles = bgData ? {backgroundImage: `url(${bgUrl})`} : {};

	return (
		<>
			<header> <h1>Marvel Memory Card Game</h1> </header>

			{ loading && <Loading />}

			<main style={mainStyles}>
				{ !loading &&
					// If not loading, map through data and return a card for each
					<div className='card-container' >
						{charData.map((data) => <Card key={data.id} charData={data} />)}
					</div>
				}
			</main>
		</>
	);
}

export default App;

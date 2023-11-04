
import {useEffect, useState} from 'react';
import MarvelData from '../modules/marvelData';
import '../styles/App.css';
import Card from './Card';
import Loading from './Loading';
import Utility from '../modules/utility';

function App() {
	const [charData, setCharData] = useState(null);
	const [bgData, setBgData] = useState(null);
	const [loading, setLoading] = useState(true);

	// Run on mount -- Get character data
	useEffect(() => {
		// Cannot define async function directly on useEffect callback
		async function fetchData() {
			// Define names to fetch
			let names = [
				'Jean Grey',
				'Spider-Man (2099)',
				'Thor',
				'Scarlet Witch',
				'Captain America',
				'Moon Knight',
				'Doctor Strange',
				'Silver Surfer',
				'Thanos',
				'Mephisto',
				'Black Widow',
				'Rocket Raccoon',
				'Nebula',
				'Kang',
				'Wolverine',
			];

			// Shuffle names
			names = Utility.shuffle(names);

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
		}

		fetchData();
	}, []);

	// Run on mount -- Get background image
	useEffect(() => {
		const fetchData = async () => {
			let eventNames = [
				'avengers vs x-men',
				'age of ultron',
				'Secret Invasion',
				'atlantis attacks',
			];

			eventNames = Utility.shuffle(eventNames);

			// If bgData is not already set
			if (bgData === null) {
				const promises = eventNames.map(async (name) => {
					const data = await MarvelData.get(name, false, false);
					data.img = MarvelData.processImg(data.img, false, true);

					return data;
				});

				const data = await Promise.all(promises);
				setBgData(data);
			}
		};

		fetchData();
	}, []);

	// Parse background img url if the data is loaded
	const bgUrl = bgData ?
		bgData[0].img.path + bgData[0].img.size + bgData[0].img.ext :
		'';
	const mainStyles = bgData ? {backgroundImage: `url(${bgUrl})`} : {};

	// Run when charData or bgData change
	useEffect(() => {
		// If charData && bgData are loaded, set loading to false
		if (charData && bgData) setLoading(false);
	}, [charData, bgData]);

	return (
		<>
			<header> <h1>Marvel Memory Card Game</h1> </header>

			{ loading && <Loading />}

			<main style={mainStyles}>
				{ !loading &&
					// If not loading, map through data and return a card for each
					<div className='card-container' >
						{charData.map((data) =>
							<Card key={data.id} charData={data}
								onClick={() => {
									const newArr = charData.slice();
									// Shuffle Character data & set state to re-render
									setCharData(Utility.shuffle(newArr));
								}} />)}
					</div>
				}
			</main>
		</>
	);
}

export default App;

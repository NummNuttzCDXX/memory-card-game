
import {useEffect, useState} from 'react';
import MarvelData from '../modules/marvelData';
import '../styles/App.css';
import Card from './Card';
import Loading from './Loading';
import Utility from '../modules/utility';
import Scoreboard from './Scoreboard';
import Gameover from './Gameover';
import Sidebar from './Sidebar';

function App() {
	const [charData, setCharData] = useState(null);
	const [bgData, setBgData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [showCards, setShowCards] = useState(true);
	const [flipCards, setFlipCards] = useState(false); // Are cards being flipped?

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
	// Yes ik this is frowned upon but I only want this effect to run once
	// eslint-disable-next-line react-hooks/exhaustive-deps
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
	// Yes ik this is frowned upon but I only want this effect to run once
	// eslint-disable-next-line react-hooks/exhaustive-deps
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

	const [score, setScore] = useState(0);
	const [selected, setSelected] = useState([]); // Hold selected characters
	const [gameover, setGameover] = useState(false);

	function reset() {
		// Reset everything for new game
		setSelected([]);
		setGameover(false);
		setScore(0);

		// Shuffle cards
		const copy = charData.slice();
		setCharData(Utility.shuffle(copy));
	}

	return (
		<>
			<header>
				<h1>Marvel Memory Card Game</h1>
				<Scoreboard score={score} />
			</header>

			{ loading && <Loading />}

			<div className="content">
				<main style={mainStyles}>
					{ !loading &&
						// If not loading, map through data and return a card for each
						<div className='card-container' >
							{showCards && charData.map((data) =>
								<Card key={data.id} charData={data}
									onClick={() => {
										// If character HASNT been selected
										if (!selected.includes(data.name)) {
											// Copy `selected` arr and add new char to it
											const copy = selected.slice();
											copy.push(data.name);
											setSelected(copy);
											// Update score
											setScore(score + 1);
										} else setGameover(true);

										setFlipCards(true); // Flip cards

										// Let cards flip and then shuffle, after delay
										setTimeout(() => {
											const newArr = charData.slice(); // Copy Array
											// Shuffle Character data & set state to re-render
											setCharData(Utility.shuffle(newArr));
										}, 500);
									}}
									flipped={flipCards} setFlip={setFlipCards} />)}
						</div>
					}
					{ gameover && <Gameover playAgain={reset} />}
				</main>

				{charData && bgData && <Sidebar chars={charData} bgs={bgData}
					setShowCards={setShowCards} />}
			</div>

			<footer>
				<span>Created by BBirdy</span>

				<a href="http://marvel.com" target="_blank" rel="noopener noreferrer">
					{charData && charData[0].attribution}
				</a>
			</footer>
		</>
	);
}

export default App;


import {useEffect, useState} from 'react';
import MarvelData from '../modules/marvelData';
import '../styles/App.css';
import Card from './Card';
import Loading from './Loading';
import Utility from '../modules/utility';
import Scoreboard from './Scoreboard';
import Gameover from './Gameover';
import Sidebar from './Sidebar';
import Start from './Start';
import Win from './Win';

function App() {
	const [charData, setCharData] = useState(null);
	const [bgData, setBgData] = useState(null);
	const [loading, setLoading] = useState(true);

	const [showCards, setShowCards] = useState(true);
	const [flipCards, setFlipCards] = useState(false); // Are cards being flipped?

	const [start, setStart] = useState(false);
	const [diff, setDiff] = useState(null);
	const [total, setTotal] = useState(null);

	// Start game when difficulty changes
	useEffect(() => {
		if (diff && total) setStart(true);

		return () => setStart(false);
	}, [diff, total]);

	// Run on mount -- Get character data
	useEffect(() => {
		// Cannot define async function directly on useEffect callback
		async function fetchData() {
			// Define names to fetch
			let names = [
				'Jean Grey',
				'Spider-Man (Peter Parker)',
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
				'Ghost Rider (Johnny Blaze)',
				'Daredevil',
				'Mr. Fantastic',
				'Black Knight (Dane Whitman)',
				'Carnage',
				'Venom (ultimate)',
				'Toxin',
				'Human Torch',
				'Professor X',
				'Deadpool',
				'Adam Warlock',
				'Hulk',
				'Star-Lord (Peter Quill)',
				'Black Panther',
				'Loki',
				'Doctor Doom',
				'Morbius',
				'Ultron',
				'Mysterio',
				'Red Hulk',
				'Green Goblin (Norman Osborn)',
				'Taskmaster',
				'Gambit',
				'Maestro',
				'Galactus',
				'Beast',
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
		setStart(false);
		setDiff(null);
		setTotal(null);

		// Shuffle cards
		setFlipCards(true);
		const copy = charData.slice();
		setCharData(Utility.shuffle(copy));
	}

	/**
	 * Get an array of characters to show for different difficulties
	 * - Easy: Show 5 cards
	 * - Medium: Show 10 cards
	 * - Hard: Show 20 cards
	 *
	 * @return {Array} Array of characters to show
	 */
	function getCharacters() {
		// If all characters have been selected (win)
		// Win check
		if (charData.length === selected.length) {
			setGameover(true); // Set gameover (for now)
		}

		let start = 0;
		let chars = charData.slice(start, diff);

		// Make sure theres at least one character that hasnt been selected
		while (chars.every((v) => selected.includes(v.name))) {
			start = start + 1; // Increment `start` twice
			chars = charData.slice(++start, diff + start);
		}

		// Return shuffled array of characters
		return chars;
	}

	return (
		<>
			<header>
				<h1>Marvel Memory Card Game</h1>
				<Scoreboard score={score} total={total} />
			</header>

			{ loading && <Loading />}

			<div className="content">
				<main style={mainStyles}>
					{!start ? <Start setDiff={setDiff}
						total={charData ? charData.length : '...'} setTotal={setTotal} /> :

						!loading && start ?
						// If not loading and game is started, map through data
						// and return a card for each
							<div className='card-container' >
								{showCards && getCharacters().map((data) =>
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
							</div> :
							<Loading />
					}
					{ (gameover && <Gameover playAgain={reset} />) ||
					(selected.length == total && <Win playAgain={reset} total={total} />)}
				</main>

				{charData && bgData && <Sidebar chars={charData} bgs={bgData}
					setShowCards={setShowCards} flipCards={() => setFlipCards(true)} />}
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

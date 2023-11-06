/* eslint-disable react/prop-types */
// Gameover Component
import '../styles/Gameover.css';

function Gameover({playAgain}) {
	return (
		<div className="gameover-wrapper">
			<div className='gameover'>
				<h1>Game Over</h1>

				<form>
					<button type="button" onClick={playAgain}> Play Again? </button>
					<a href='https://github.com/NummNuttzCDXX/memory-card-game' target='_blank'
						rel='noreferrer noopener' >
						<button type="button"> Github Repository </button>
					</a>
				</form>
			</div>
		</div>
	);
}

export default Gameover;

/* eslint-disable react/prop-types */
// Win Component

function Win({playAgain, total}) {
	return (
		<div className='win-wrapper' >
			<div className="win">
				<h2>You Win!</h2>
				<p>You have a good memory!</p>
				<p>You found {total} of {total}</p>

				<div className="btn-container">
					<button type="button" onClick={playAgain}> Play Again </button>
				</div>
			</div>
		</div>
	);
}

export default Win;

/* eslint-disable react/prop-types */
// Starting screen Component -- Select difficulty
import '../styles/Start.css';

function Start({setDiff, total, setTotal}) {
	return (
		<div className='select-diff-container' >
			<div className="select-diff">
				<h2>Select Difficulty</h2>
				<div className="diff-btn-container">
					<button type="button" onClick={() => setDiff(5)} >Easy (5)</button>
					<button type="button"
						onClick={() => setDiff(10)} >Medium (10)</button>
					<button type="button" onClick={() => setDiff(20)} >Hard (20)</button>
				</div>

				<h2>Select total number of matches</h2>
				<div className='total-btn-container' >
					<button type="button" onClick={() => setTotal(10)} > 10 </button>
					<button type="button" onClick={() => setTotal(20)} > 20 </button>
					<button type="button"
						onClick={() => setTotal(total)} > All {total} </button>
				</div>
			</div>
		</div>
	);
}

export default Start;

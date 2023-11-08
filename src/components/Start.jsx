/* eslint-disable react/prop-types */
// Starting screen Component -- Select difficulty
import '../styles/Start.css';

function Start({setDiff}) {
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
			</div>
		</div>
	);
}

export default Start;

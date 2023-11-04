/** Utility Module */
const Utility = (() => {
	/**
	 * Shuffle values in an array
	 *
	 * @param {Array} arr Array to shuffle
	 *
	 * @return {Array} Shuffled array
	 */
	const shuffle = (arr) => {
		function shuffleArray(arr) {
			// Create a copy of the original array to avoid modifying it directly
			const newArray = arr.slice();
			for (let i = newArray.length - 1; i > 0; i--) {
				// Generate a random index between 0 and i
				const j = Math.floor(Math.random() * (i + 1));
				// Swap elements at i and j
				[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
			}

			return newArray;
		}
		// Run shuffle func twice for safe measure
		let newArray = shuffleArray(arr);
		newArray = shuffleArray(newArray);

		return newArray;
	};

	return {shuffle};
})();

export default Utility;

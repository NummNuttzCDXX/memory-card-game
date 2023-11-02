
const MarvelData = (() => {
	const api = {
		base: 'https://gateway.marvel.com:443',
		characters: '/v1/public/characters', // This alone gets all characters
		event: '/v1/public/events',
		key: 'apikey=2b8af97f1adeb0f6f2ccc9d1cbdbb05a',
		byName: 'nameStartsWith=',
	};

	/**
	 * Fetch data from API
	 * @async
	 *
	 * @param {string} name Name of item to fetch
	 * @param {boolean} startsWith Use the `startsWith` query instead of name
	 * - `false` - Returns list of items that start with `name`
	 * - `true` - Returns `name` exactly. Spelling must be perfect and complete
	 * @param {boolean} character - Are you fetching a character (`true`)?
	 * or event (`false`)
	 * @return {object} Processed data object
	 */
	const get = async (name, startsWith = false, character = true) => {
		// Fetch the data from API
		const unprocessed = await fetch(api.base +
			`${character ? api.characters : api.event}` +
			`${startsWith ? '?'+ api.byName : '?name='}` +
			`${name}&${api.key}`,
		{
			mode: 'cors', method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json',
			},
		},
		)
			.catch((err) => {
				throw new Error(err + data);
			});

		const data = await unprocessed.json();
		if (data.data.results.length == 0) {
			throw new Error('Failed to fetch data at query ' + name);
		}

		const landscape = character ? false : true;
		const processed = process(data, !character, landscape);
		return processed;
	};

	const process = (data, maxImg = false, landscape = false) => {
		const results = data.data.results[0];

		// Save img data as its own obj with default size
		// of xlarge (200px)
		const imgData = {
			path: results.thumbnail.path,
			size: '/standard_xlarge.',
			ext: results.thumbnail.extension,
		};

		if (landscape) imgData.size = '/landscape_xlarge.';
		else if (maxImg) imgData.size = '.';

		return {
			id: results.id,
			name: results.name || results.title,
			desc: results.description,
			img: imgData,
			attribution: data.attributionText,
			link: results.urls[0].url,
		};
	};

	/**
	 * Get the img url
	 * - Get the img that is the closest size to the `Card`
	 *
	 * @param {object} imgData Img data from API
	 * @param {boolean} maxSize Do you need the biggest size img
	 * @param {boolean} landscape Is the image landscape?
	 * @return {string} Img url
	 */
	const processImg = (imgData, maxSize = false, landscape = false) => {
		// Save sizes and keywords
		const sizes = [
			{name: 'small', size: [65, 45]},
			{name: 'medium', size: [100, 100]},
			{name: 'large', size: [140, 140]},
			{name: 'xlarge', size: [200, 200]},
			{name: 'fantastic', size: [250, 250]},
			{name: 'amazing', size: [180, 180]},
			{name: 'incredible', size: [464, 261]},
		];

		// Get width of card or main if `landscape`
		const width = landscape ? document.querySelector('main').clientWidth :
			document.querySelector('.card').clientWidth;

		// Sort sizes array from closest size to furthest size
		// Relative to the card
		sizes.sort((a, b) => {
			const dif1 = Math.abs(a.size[0] - width);
			const dif2 = Math.abs(b.size[0] - width);

			if (dif1 > dif2) return 1;
			else if (dif1 < dif2) return -1;
			else if (dif1 == dif2) return 0;
			else throw Error('Error processing image');
		});

		// Get size prefix
		let size = landscape ? '/landscape_' : '/standard_';

		if (landscape && sizes[0].name == 'fantastic') {
			// Change to amazing if landscape
			size += 'amazing.';
		} else if (sizes[0].name == 'incredible' && !landscape) {
			// If not landscape and suffix is 'incredible'
			// change to next closest (only landscape has incredible suffix)
			size += sizes[1].name + '.';
		} else if (maxSize) size = '.';
		else {
			size += sizes[0].name + '.';
		}

		// Return object with new size
		return {...imgData, size: size};
	};

	return {get, processImg};
})();

export default MarvelData;

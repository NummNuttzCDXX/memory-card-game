
const MarvelData = (() => {
	const api = {
		base: 'https://gateway.marvel.com:443',
		characters: '/v1/public/characters', // This alone gets all characters
		key: 'apikey=2b8af97f1adeb0f6f2ccc9d1cbdbb05a',
		byName: 'nameStartsWith=',
	};

	const get = async (name, plural = false) => {
		// Fetch the data from API
		const unprocessed = await fetch(
			`${api.base + api.characters}${plural ? api.byName : '?name='}` +
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

		const processed = process(data);
		return processed;
	};

	const process = (data) => {
		const results = data.data.results[0];
		return {
			id: results.id,
			name: results.name,
			desc: results.description,
			img: `${results.thumbnail.path}` +
				`/standard_xlarge.${results.thumbnail.extension}`,
			attribution: data.attributionHTML,
			link: results.urls[0].url,
		};
	};

	return {get};
})();

export default MarvelData;

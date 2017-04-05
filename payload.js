;(function() {

	const extractor = require('@knod/unfluff');

	const API_BASE = 'http://localhost:8000';

	const extracted = extractor(global.document.querySelector('html').outerHTML);

	const tehAudioPlayer = new Audio();
	console.log('tehAudioPlayer', tehAudioPlayer);
	tehAudioPlayer.controls = true;
	tehAudioPlayer.preload = true;
	tehAudioPlayer.autoplay = true;
	tehAudioPlayer.type = 'tehAudioPlayer/wav';


	// pre generate the audio
	global.fetch(`${API_BASE}/`, {
		method: 'POST',
		headers: {
		   'Content-Type' : 'application/json',
		   'Accept' : 'application/json'
		},
		body: JSON.stringify(extracted)
	})
	.then(x => x.json())
	.then(res => {
		const btn = global.document.createElement('div');
		btn.classList.add('audio-fish-btn');
		const logo = global.document.createElement('i');
		logo.classList.add('audio-fish-logo');
		const text = global.document.createElement('span');
		const textNode = global.document.createTextNode('Narrate Page');
		text.appendChild(textNode);
		btn.appendChild(logo);
		btn.appendChild(text);
		global.document.body.appendChild(btn);
		console.log('extracted', extracted);


		btn.addEventListener('click', (e) => {
			tehAudioPlayer.src = `${API_BASE}/${res.wav}`;
		});
	});
})();

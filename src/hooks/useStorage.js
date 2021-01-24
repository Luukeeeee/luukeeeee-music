import { useState, useEffect } from 'react';
import { sr, fs, timestamp } from '../firebase/config';

const useStorage = (file, setFile, setSelected) => {
	const [ progress, setProgress ] = useState(0);
	const [ error, setError ] = useState(null);
	const [ url, setUrl ] = useState(null);

	useEffect(
		() => {
			if (file) {
				const storageRef = sr.ref(file.name);
				const collectionRef = fs.collection('musics');

				storageRef.put(file).on(
					'state_changed',
					(snap) => {
						let percentage = snap.bytesTransferred / snap.totalBytes * 100;
						setProgress(percentage);
					},
					(err) => {
						setError(err);
					},
					async () => {
						const url = await storageRef.getDownloadURL();
						const createdAt = timestamp();
						if(url){
							let audio = document.createElement('audio');
							let duration;
							audio.src = url;
							audio.addEventListener('canplay', function() {
								const seconds = parseInt(audio.duration) % 60;
								const recordSeconds = seconds < 10 ? "0" + seconds : seconds; 
								duration = Math.floor(parseInt(audio.duration) / 60) + ':' + recordSeconds;
								collectionRef.add({
									url,
									createdAt,
									name: file.name,
									storageRef: file.name,
									duration
								}).then(() => {
									setFile(null);
									setSelected(null);
									setProgress(0);
								})
							});
						}
						setUrl(url);
					}
				);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[file]
	);

	return { progress, error, url };
};

export default useStorage;

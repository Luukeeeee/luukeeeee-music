import React from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import pic from '../img/mymusic.jpg';
import Upload from './Upload';

const MusicPlayer = ({
	songs,
	setCurrentSong,
	currentSong,
	docs,
	setMusics,
	random,
	setRandom,
	setShowPlayingSong,
	setPlay
}) => {
	const next = () => {
		if (random) {
			let n = songs.indexOf(currentSong);
			let i = Math.floor(Math.random() * songs.length);
			while (i === n) {
				i = Math.floor(Math.random() * songs.length);
			}
			setCurrentSong(songs[i]);
		} else {
			let n = songs.indexOf(currentSong) + 1;
			if (n < songs.length) {
				setCurrentSong(songs[n]);
			} else {
				setCurrentSong(songs[0]);
			}
		}
	};
	const previous = () => {
		let n = songs.indexOf(currentSong);
		if (n > 0) {
			setCurrentSong(songs[n - 1]);
		}
	};
	const showSingers = () => {
		const nod = document.getElementById('singer-control').classList;
		if (nod.contains('hidden')) {
			nod.remove('hidden');
		} else {
			nod.add('hidden');
		}
	};
	const Control = () => {
		return (
			<span className="inline-block md:hidden cursor-pointer" onClick={() => showSingers()}>
				<svg
					className="w-6 h-6 cursor-pointer hover:opacity-75 text-gray-600"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
					/>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
			</span>
		);
	};
	const controlRandom = () => {
		random ? setRandom(false) : setRandom(true);
	};
	const randomClass = () => {
		if (random) {
			return 'text-xs border border-primary text-primary uppercase ml-2 cursor-pointer z-20';
		} else {
			return 'text-xs border border-gray-400 text-gray-500 uppercase ml-2 cursor-pointer z-20';
		}
	};
	const Header = () => (
		<div className="flex justify-between py-4">
			<div>
				<span className="text-lg">{currentSong.name}</span> -{' '}
				<span className="text-sm">{currentSong.singer}</span>
				<span
					className="text-xs border border-gray-400 text-gray-500 uppercase ml-2 cursor-pointer hover:text-primary hover:border-primary"
					onClick={() => setMusics(docs)}
				>
					all
				</span>
				<span className={randomClass()} onClick={() => controlRandom()}>
					ran
				</span>
			</div>
			<img
				src={currentSong.img ? currentSong.img : pic}
				alt={currentSong.img ? currentSong.name : 'mymusic'}
				className="w-24 h-24 rounded-full right-0 absolute transform -translate-y-20 -translate-x-6 shadow-lg cursor-pointer"
				onClick={() => {
					Object.keys(currentSong).length !== 0 && setShowPlayingSong(currentSong);
				}}
			/>
		</div>
	);


	return (
		<div className="fixed bottom-0 w-full z-10" id="music-player">
			{currentSong && (
				<AudioPlayer
					autoPlay
					src={currentSong.url}
					onPlay={() => setPlay(true)}
					onPause={() => setPlay(false)}
					showSkipControls={true}
					onClickNext={() => next()}
					onClickPrevious={() => previous()}
					onEnded={() => next()}
					header={currentSong && <Header />}
					customProgressBarSection={[
						RHAP_UI.CURRENT_TIME,
						<div>/</div>,
						RHAP_UI.DURATION,
						RHAP_UI.PROGRESS_BAR,
						RHAP_UI.VOLUME
					]}
					customVolumeControls={[]}
					// other props here
					// eslint-disable-next-line no-undef
					customAdditionalControls={[ RHAP_UI.LOOP, <Control />, <Upload /> ]}
				/>
			)}
		</div>
	);
};

export default MusicPlayer;

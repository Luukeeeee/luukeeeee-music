import React from 'react';
import pic from '../img/mymusic.jpg';
import disk from '../img/disk.png';

const PlayingInfo = ({ showPlayingSong, setShowPlayingSong, deg, play, setSelectedEditSong }) => {
	let audio = document.querySelector('audio');
	let duration = audio.duration;
	let currentTime = audio.currentTime;
	const convertDuration = (s) => {
		let minsStr = '--';
		let secsStr = '--';
		let durationDec = Math.round(s) / 60;
		let durationArr = durationDec.toString().split('.');
		let secs = Math.round(s) % 60;
		if (Number(durationArr[0]) < 10) {
			minsStr = '0' + durationArr[0];
		} else {
			minsStr = durationArr[0];
		}
		if (secs < 10) {
			secsStr = '0' + secs.toString();
		} else {
			secsStr = secs.toString();
		}
		return minsStr + ':' + secsStr;
	};
	const barClickHandle = (e) => {
		var x = e.clientX - 20;
		var y = document.getElementById('progressbar').clientWidth;
		if(audio.paused){
			audio.play();
			audio.currentTime = x / y * duration;
			audio.pause();
		}
		audio.currentTime = x / y * duration;
	};

	return (
		<div className="w-screen min-h-screen z-40 bg-white fixed md:grid md:grid-cols-5">
			<div className="md:col-span-3 bg-blue-500 min-h-screen flex-row content-center">
				<div className="items-center justify-center flex">
					<img src={disk} alt="disk" className="img-disk" style={{ transform: `rotate(${deg}deg)` }} />
					<img
						src={showPlayingSong.img ? showPlayingSong.img : pic}
						alt={showPlayingSong.img ? showPlayingSong.name : 'mymusic'}
						className="img-song absolute rounded-full object-cover cursor-pointer"
						style={{ transform: `rotate(${deg}deg)` }}
						onClick={() => setSelectedEditSong(showPlayingSong)}
					/>
				</div>
				<div className="flex justify-center text-white mb-4 align-text-bottom">
					<span className="text-2xl">{showPlayingSong.name} - </span>
					<span className="mt-2 ml-2">{showPlayingSong.singer}</span>
				</div>
				<div className="mx-5 mb-2">
					<div
						className="h-1 bg-gray-600 cursor-pointer"
						style={{ marginBottom: '-0.375rem' }}
						id="progressbar"
						onClick={(e) => barClickHandle(e)}
					/>
					<div
						className="h-2 bg-white rounded-lg cursor-pointer"
						style={{ width: `${currentTime / duration * 100}%` }}
						onClick={(e) => barClickHandle(e)}
					>
						<div
							className="w-4 h-4 bg-white rounded-full float-right cursor-pointer border-2 hover:border-gray-700"
							id="point"
							style={{ bottom: '0.205rem', left: '0.5rem', position: 'relative' }}
							onDragEnd={(e) => barClickHandle(e)}
							onTouchMove={(e) => {
								var x = e.touches[0].clientX;
								var y = document.getElementById('progressbar').clientWidth;
								audio.currentTime = x / y * duration;
								audio.pause();
							}}
							onTouchEnd={() => {
								audio.play();
							}}
						/>
					</div>
				</div>

				<div className="flex justify-center text-sm text-white mb-2">
					{convertDuration(currentTime)}/{convertDuration(duration)}
				</div>

				<div className="flex justify-center">
					<span
						className="cursor-pointer text-white w-8 mt-3 mr-3"
						onClick={() => {
							document.getElementsByClassName('rhap_skip-button')[0].click();
						}}
					>
						<svg
							className="w-8 h-8"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
							/>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M 1.6 5.334 l 0 13" />
						</svg>
					</span>
					<span
						className="cursor-pointer text-white w-12"
						onClick={() => {
							document.getElementsByClassName('rhap_play-pause-button')[0].click();
						}}
					>
						{play ? (
							<svg
								className="w-12 h-12"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						) : (
							<svg
								className="w-12 h-12"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						)}
					</span>
					<span
						className="cursor-pointer text-white w-8 mt-3 ml-3"
						onClick={() => {
							document.getElementsByClassName('rhap_skip-button')[1].click();
						}}
					>
						<svg
							className="w-8 h-8"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M 22.6 5.334 l 0 13"
							/>
						</svg>
					</span>
				</div>
			</div>
			<div className="md:block md:col-span-2 bg-gray-600 hidden" />
			<svg
				className="w-6 h-6 text-white fixed top-0 right-0"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				onClick={() => setShowPlayingSong(null)}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		</div>
	);
};

export default PlayingInfo;

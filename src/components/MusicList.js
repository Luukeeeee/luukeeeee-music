import React, { useEffect } from 'react';
import MusicPlayer from './MusicPlayer';
import DeleteSong from './DeleteSong';
import pic from '../img/mymusic.jpg';

const MusicList = ({
	setSelectedEditSong,
	musics,
	setMusics,
	currentSong,
	setCurrentSong,
	random,
	setRandom,
	setShowPlayingSong,
	setPlay,
	setSelectedSongToList,
	songs
}) => {
	const chooseEditSong = (id) => {
		setSelectedEditSong(songs.find((doc) => doc.id === id));
	};
	const handleClick = (doc) => {
		setCurrentSong(doc);
	};

	const songClass = (id) => {
		if (currentSong && id === currentSong.id) {
			return 'selected-song h-24 lg:h-auto lg:p-3 border-l-8 border-green-600';
		} else {
			return 'song h-24 lg:h-auto lg:m-4 lg:p-3';
		}
	};
	const shortenName = (name) => {
		const checkStr = name.slice(0, 2);
		const chiPattern = new RegExp('[\u4E00-\u9FA5]+');
		const engPattern = new RegExp('[A-Za-z]+');
		if (chiPattern.test(checkStr)) {
			if (name.length > 8) {
				return name.slice(0, 8) + '...';
			} else {
				return name;
			}
		} else if (engPattern.test(checkStr)) {
			if (name.length > 16) {
				return name.slice(0, 16) + '...';
			} else {
				return name;
			}
		} else {
			if (name.length > 8) {
				return name.slice(0, 8) + '...';
			} else {
				return name;
			}
		}
	};

	useEffect(
		() => {
			if (currentSong) {
				window.location.hash = `#${currentSong.id}`;
			}
		},
		[ currentSong ]
	);

	return (
		<div className="bg-indigo-600">
			<div className="p-1 lg:p-4 overflow-auto" id="music-list">
				{musics &&
					musics.map((doc) => {
						return (
							<div key={doc.id} className={songClass(doc.id)} id={doc.id}>
								<div className="cursor-pointer w-full lg:w-3/4 grid lg:grid-cols-4 grid-cols-5 gap-1 lg:gap-8">
									<div
										className="lg:col-span-1 col-span-2"
										onClick={() => {
											handleClick(doc);
										}}
									>
										<img
											src={doc.img ? doc.img : pic}
											alt={doc.name ? doc.name : 'mymusic'}
											className="h-24 w-32 lg:w-48 lg:h-32 object-fill"
										/>
									</div>
									<div className="col-span-3 sm:col-span-3 p-4">
										<div className="flex w-full justify-center lg:justify-start items-center mb-2">
											<span className="text-lg lg:text-3xl">{shortenName(doc.name)}</span>
											<span className="ml-2 lg:text-lg hidden lg:inline-block">
												{' - ' + doc.singer}
											</span>
										</div>
										<div className="lg:flex lg:w-full lg:justify-between lg:my-2 hidden lg:visible">
											<div>
												<div className="text-xs text-gray-600">Album</div>
												<div>{doc.album}</div>
											</div>
											<div>
												<div className="text-xs text-gray-600">Type</div>
												<div>{doc.type}</div>
											</div>
											<div>
												<div className="text-xs text-gray-600">Duration</div>
												<div>{doc.duration}</div>
											</div>
										</div>
										<div className="lg:hidden flex justify-center">
											<div
												className="rounded-full hover:shadow-lg hover:bg-gray-400 w-10 h-10 p-2"
												onClick={() => {
													chooseEditSong(doc.id);
												}}
											>
												<svg
													className="w-6 h-6"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
													/>
												</svg>
											</div>
											<div
												className="rounded-full hover:shadow-lg hover:bg-gray-400 w-10 h-10 p-2"
												onClick={() => {
													setSelectedSongToList(doc);
												}}
											>
												<svg
													className="w-6 h-6"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
													/>
												</svg>
											</div>
											<DeleteSong id={doc.id} storageRef={doc.storageRef} />
										</div>
									</div>
								</div>
								<div className="hidden lg:block">
									<div
										className="rounded-full hover:shadow-lg hover:bg-gray-400 w-10 h-10 p-2"
										onClick={() => {
											chooseEditSong(doc.id);
										}}
									>
										<svg
											className="w-6 h-6"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
											/>
										</svg>
									</div>
									<div
										className="rounded-full hover:shadow-lg hover:bg-gray-400 w-10 h-10 p-2"
										onClick={() => {
											setSelectedSongToList(doc);
										}}
									>
										<svg
											className="w-6 h-6"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
											/>
										</svg>
									</div>
									<DeleteSong id={doc.id} storageRef={doc.storageRef} />
								</div>
							</div>
						);
					})}
			</div>
			<MusicPlayer
				musics={musics}
				setCurrentSong={setCurrentSong}
				currentSong={currentSong}
				docs={songs}
				setMusics={setMusics}
				random={random}
				setRandom={setRandom}
				setShowPlayingSong={setShowPlayingSong}
				setPlay={setPlay}
			/>
		</div>
	);
};

export default MusicList;

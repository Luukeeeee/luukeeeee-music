/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import MusicList from './components/MusicList';
import EditSongModal from './components/Modals/EditSongModal';
import EditSingerModal from './components/Modals/EditSingerModal';
import AddSingerModal from './components/Modals/AddSingerModal';
import SingerList from './components/SingerList';
import SingerInfo from './components/SingerInfo';
import useFirestore from './hooks/useFirestore';
import PlayingInfo from './components/PlayingInfo';
import useInterval from 'use-interval';
import PersonalLists from './components/PersonalLists';
import EditListModal from './components/Modals/EditListModal';
import { auth, fs } from './firebase/config';
import SignIn from './components/SignIn';

function App() {
	const songs = useFirestore('musics');
	const singers = useFirestore('singers');
	const lists = useFirestore('lists');
	const [ selectedEditSong, setSelectedEditSong ] = useState(null);
	const [ selectedEditSinger, setSelectedEditSinger ] = useState(null);
	const [ addSinger, setAddSinger ] = useState(null);
	const [ selectedSinger, setSelectedSinger ] = useState(null);
	const [ musics, setMusics ] = useState([]);
	const [ currentSong, setCurrentSong ] = useState({});
	const [ random, setRandom ] = useState(false);
	const [ list, setList ] = useState([]);
	const [ showSingers, setShowSingers ] = useState([]);
	const [ showPlayingSong, setShowPlayingSong ] = useState(null);
	const [ deg, setDeg ] = useState(0);
	const [ play, setPlay ] = useState(false);
	const [ selectedSongToList, setSelectedSongToList ] = useState(null);

	useEffect(
		() => {
			// if (musics.length === 0) {
			// 	setMusics(songs.docs);
			// }
			setMusics(songs.docs);
		},
		[ songs.docs ]
	);
	const recordsRef = fs.collection('records').doc('currentSong');
	// const storage = window.localStorage;
	useEffect(
		() => {
			if (Object.keys(currentSong).length > 0) {
				recordsRef.update(currentSong);
				// storage.setItem('currentSong', currentSong);
			}
		},
		[ currentSong ]
	);
	useEffect(
		() => {
			musics.length > 0 && //storage.setItem('music', JSON.stringify(musics));
			recordsRef.update({
				musics: JSON.stringify(musics)
			});
		},
		[ musics ]
	);
	let audio = document.querySelector('audio');
	audio &&
		audio.addEventListener('pause', () => {
			recordsRef.update({
				currentTime: audio.currentTime
			});
			// storage.setItem('currentTime', audio.currentTime);
		});
	window.addEventListener(
		'beforeunload',
		function(e) {
			recordsRef.update({
				currentTime: audio.currentTime
			});
			// storage.setItem('currentTime', audio.currentTime);
		},
		false
	);
	useEffect(() => {
		currentSong.name ? (document.title = currentSong.name) : (document.title = "Luukeeeee's Music");
	});
	useEffect(
		() => {
			if (showPlayingSong) {
				setShowPlayingSong(currentSong);
			}
		},
		[ currentSong ]
	);
	const getPreRecords = (a) => {
		recordsRef.get().then((doc) => {
			if (doc.exists) {
				setCurrentSong(doc.data());
				if (doc.data().musics) {
					setMusics(JSON.parse(doc.data().musics));
				}
			}
		});
		// let storageCurrentSong = storage.getItem('currentSong');
		// let storageMusics = storage.getItem('music');
		// // let storageCurrentTime = storage.getItem('currentTime');
		// storageCurrentSong && setCurrentSong(storageCurrentSong);
		// storageMusics && setMusics(JSON.parse(storageMusics));
		// // if (storageCurrentTime) {
		// // 	audio.currentTime = storageCurrentTime;
		// // }
	};
	useEffect(() => {
		getPreRecords();
	}, []);
	useEffect(
		() => {
			if (currentSong.currentTime) {
				audio.currentTime = currentSong.currentTime;
			}
		},
		[ currentSong ]
	);
	useInterval(() => {
		setDeg((pre) => {
			if (pre === 359) {
				return 0;
			} else {
				return pre + 1;
			}
		});
	}, play ? 15 : null);

	return (
		<div className="App">
			{window.localStorage.getItem('uid') ? (
				<div className="bg-orange-400 h-screen grid md:grid-cols-2 lg:grid-cols-5 md:gap-2">
					<div className="lg:col-span-3 md:col-span-1 overflow-y-auto">
						<MusicList
							setSelectedEditSong={setSelectedEditSong}
							musics={musics}
							setMusics={setMusics}
							currentSong={currentSong}
							setCurrentSong={setCurrentSong}
							random={random}
							setRandom={setRandom}
							setShowPlayingSong={setShowPlayingSong}
							setPlay={setPlay}
							setSelectedSongToList={setSelectedSongToList}
							songs={songs.docs}
						/>
					</div>
					<div
						className="lg:col-span-2 md:col-span-1 hidden absolute md:block md:relative bg-gray-200 overflow-auto h-full w-full"
						id="singer-control"
					>
						<SingerList
							setSelectedSinger={setSelectedSinger}
							setAddSinger={setAddSinger}
							list={list}
							setList={setList}
							showSingers={showSingers}
							setShowSingers={setShowSingers}
							setDeg={setDeg}
							singers={singers.docs}
						/>
						<PersonalLists lists={lists.docs} songs={songs.docs} setMusics={setMusics} />

						{selectedSinger && (
							<div className="absolute top-0 h-full w-full">
								<SingerInfo
									selectedSinger={selectedSinger}
									musics={songs.docs}
									setMusics={setMusics}
									setSelectedEditSinger={setSelectedEditSinger}
									setCurrentSong={setCurrentSong}
									setSelectedSinger={setSelectedSinger}
									singers={singers.docs}
								/>
							</div>
						)}
					</div>
					{selectedEditSong && (
						<EditSongModal
							selectedEditSong={selectedEditSong}
							setSelectedEditSong={setSelectedEditSong}
							showPlayingSong={showPlayingSong}
							setShowPlayingSong={setShowPlayingSong}
							singers={singers.docs}
						/>
					)}
					{selectedEditSinger && (
						<EditSingerModal
							selectedEditSinger={selectedEditSinger}
							setSelectedEditSinger={setSelectedEditSinger}
							selectedSinger={selectedSinger}
							setSelectedSinger={setSelectedSinger}
						/>
					)}
					{addSinger && <AddSingerModal setAddSinger={setAddSinger} />}
					{showPlayingSong && (
						<PlayingInfo
							showPlayingSong={showPlayingSong}
							setShowPlayingSong={setShowPlayingSong}
							deg={deg}
							play={play}
							setSelectedEditSong={setSelectedEditSong}
						/>
					)}
					{selectedSongToList && (
						<EditListModal
							selectedSongToList={selectedSongToList}
							setSelectedSongToList={setSelectedSongToList}
							lists={lists.docs}
						/>
					)}
				</div>
			) : (
				<SignIn />
			)}
		</div>
	);
}

export default App;

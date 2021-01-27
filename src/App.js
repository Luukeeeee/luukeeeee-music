/* eslint-disable no-restricted-globals */
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
import { fs } from './firebase/config';
import SignIn from './components/SignIn';
import pic from './img/mymusic.jpg';

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
			setMusics(songs.docs);
		},
		[ songs.docs ]
	);
	const recordsRef = fs.collection('records').doc('currentSong');

	let audio = document.querySelector('audio');

	useEffect(
		() => {
			if (Object.keys(currentSong).length > 0) {
				audio.addEventListener('pause', () => {
					recordsRef.set(currentSong).then(() => {
						recordsRef.update({
							currentTime: audio.currentTime,
							musics: JSON.stringify(musics)
						});
					});
				});
			}
		},
		[ currentSong ]
	);
	window.onbeforeunload = function(e) {
		recordsRef.set(currentSong).then(() => {
			recordsRef.update({
				currentTime: audio.currentTime,
				musics: JSON.stringify(musics)
			});
		});
		e.returnValue = 'close?';
	};
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
	const getPreRecords = () => {
		recordsRef.get().then((doc) => {
			if (doc.exists) {
				setCurrentSong(doc.data());
				if (doc.data().musics) {
					setMusics(JSON.parse(doc.data().musics));
				}
			}
		});
	};

	window.addEventListener('load', () => {
		getPreRecords();
	});
	useEffect(
		() => {
			if (currentSong.currentTime && audio) {
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

	if ('mediaSession' in navigator) {
		navigator.mediaSession.metadata = new window.MediaMetadata({
			title: `${currentSong.name ? currentSong.name : '未知'}`,
			artist: `${currentSong.singer ? currentSong.singer : '未知'}`,
			album: `${currentSong.album ? currentSong.album : '未知'}`,
			artwork: [ { src: `${currentSong.img ? currentSong.img : pic}`, sizes: '128x128', type: 'image/jpg' } ]
		});

		// TODO: Update playback state.
		navigator.mediaSession.setActionHandler('previoustrack', function() {
			document.getElementsByClassName('rhap_skip-button')[0].click();
		});
		navigator.mediaSession.setActionHandler('nexttrack', function() {
			document.getElementsByClassName('rhap_skip-button')[1].click();
		});
	}

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

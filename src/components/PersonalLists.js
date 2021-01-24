import React, { useState, useEffect } from 'react';
import { fs } from '../firebase/config';
import firebase from 'firebase';

const PersonalLists = ({ lists, songs, setMusics }) => {
	const [ list, setList ] = useState([]);
	const [ newList, setNewList ] = useState('');
	const [ belongArr, setBelongArr ] = useState([]);
	const [ notBelongArr, setNotBelongArr ] = useState([]);
	const [ songArr, setSongArr ] = useState(null);
	const [ selectList, setSelectList ] = useState(null);
	useEffect(
		() => {
			setList(lists);
		},
		[ lists ]
	);
	const swap = () => {
		document.getElementById('personal-lists').classList.add('hidden');
		document.getElementById('singer-list').classList.remove('hidden');
	};
	const handleSubmit = () => {
		const addObj = {
			name: newList,
			songs: []
		};
		if (newList.length > 0) {
			fs.collection('lists').add(addObj).then(() => setNewList(''));
		}
	};
	const arrangeSongs = (doc) => {
		setSelectList(doc);
		if (doc.songs !== songArr) {
			setBelongArr([]);
			setNotBelongArr([]);
			songs.forEach((song) => {
				if (doc.songs.includes(song.id)) {
					setBelongArr((pre) => {
						return [ ...pre, song ];
					});
				} else {
					setNotBelongArr((pre) => {
						return [ ...pre, song ];
					});
				}
			});
		}
		setSongArr(doc.songs);
	};
	const handleDelete = (id) => {
		// eslint-disable-next-line no-restricted-globals
		if (confirm('Delete this list?')) {
			fs.collection('lists').doc(id).delete();
		}
	};
	const shortenName = (name) => {
		const checkStr = name.slice(0, 2);
		const chiPattern = new RegExp('[\u4E00-\u9FA5]+');
		const engPattern = new RegExp('[A-Za-z]+');
		if (chiPattern.test(checkStr)) {
			if (name.length > 5) {
				return name.slice(0, 5) + '...';
			} else {
				return name;
			}
		} else if (engPattern.test(checkStr)) {
			if (name.length > 12) {
				return name.slice(0, 12) + '...';
			} else {
				return name;
			}
		} else {
			if (name.length > 5) {
				return name.slice(0, 5) + '...';
			} else {
				return name;
			}
		}
	};
	const selectedListDisplay = (id) => {
		if (selectList && id === selectList.id) {
			return 'bg-primary p-2 flex justify-between text-white mr-2 shadow-md';
		} else {
			return 'p-1';
		}
	};
	const playIconDisplay = (id) => {
		if (selectList && id === selectList.id) {
			return 'block w-3 h-3 mt-2 md:mt-0 md:w-6 md:h-6 cursor-pointer hover:text-yellow-400';
		} else {
			return 'hidden';
		}
	};
	const addSong = (listId, songId) => {
		let ref = fs.collection('lists').doc(listId);
		ref
			.update({
				songs: firebase.firestore.FieldValue.arrayUnion(songId)
			})
			.then(() => {
				ref.get().then((doc) => arrangeSongs({ ...doc.data(), id: doc.id }));
			});
	};
	const removeSong = (listId, songId) => {
		let ref = fs.collection('lists').doc(listId);
		ref
			.update({
				songs: firebase.firestore.FieldValue.arrayRemove(songId)
			})
			.then(() => {
				ref.get().then((doc) => arrangeSongs({ ...doc.data(), id: doc.id }));
			});
	};
	return (
		<div className="hidden border-2 border-gray-600 m-5" id="personal-lists">
			<div className="grid grid-cols-8 border-b border-gray-600" onTouchMove={() => swap()}>
				<div className="col-span-2 flex justify-center">List</div>
				<div className="col-span-3 flex justify-center">Songs in list {selectList && `(${selectList.name})`}</div>
				<div className="col-span-3 flex justify-center">Rest songs</div>
			</div>
			<div className="grid grid-cols-8" style={{ height: '88%' }}>
				<div className="col-span-2 overflow-y-auto list-col">
					{list.map((doc) => {
						return (
							<div className={selectedListDisplay(doc.id)} key={doc.id}>
								<div>
									<div onClick={() => arrangeSongs(doc)} className="cursor-pointer inline-block">
										{doc.name}
									</div>
									<svg
										className="w-3 h-3 cursor-pointer inline-block ml-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
										onClick={() => {
											handleDelete(doc.id);
										}}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="1"
											d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
										/>
									</svg>
								</div>
								<svg
									className={playIconDisplay(doc.id)}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									onClick={() => {
										setMusics(belongArr);
									}}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="1"
										d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="1"
										d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
						);
					})}
					<div className="flex flex-col items-center justify-center">
						<input type="text" className="w-20" onChange={(e) => setNewList(e.target.value)} value={newList} />
						<span
							className="bg-primary cursor-pointer text-white text-xs px-1 mt-2"
							onClick={() => handleSubmit()}
						>
							add
						</span>
					</div>
				</div>
				<div className="col-span-3 overflow-y-auto list-col">
					{belongArr.map((song) => {
						return (
							<span className="block hover:bg-gray-600 hover:shadow-md" key={song.id}>
								{shortenName(song.name)}
								<svg
									className="w-3 h-3 inline-block ml-2 cursor-pointer hover:text-primary"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									onClick={() => removeSong(selectList.id, song.id)}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="1"
										d="M13 5l7 7-7 7M5 5l7 7-7 7"
									/>
								</svg>
							</span>
						);
					})}
				</div>
				<div className="col-span-3 overflow-y-auto list-col">
					{notBelongArr.map((song) => {
						return (
							<span className="block hover:bg-gray-600 hover:shadow-md" key={song.id}>
								<svg
									className="w-3 h-3 mr-2 inline-block cursor-pointer hover:text-primary"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									onClick={() => addSong(selectList.id, song.id)}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="1"
										d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
									/>
								</svg>
								{shortenName(song.name)}
							</span>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default PersonalLists;

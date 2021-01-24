import React from 'react';
import { fs } from '../../firebase/config';
import firebase from 'firebase';

const EditListModal = ({ selectedSongToList, setSelectedSongToList, lists }) => {
	const closeModal = (e) => {
		if (e.target.classList.contains('dropdown')) {
			setSelectedSongToList(null);
		}
	};
	let belongArr = [];
	let notBelongArr = [];
	lists.forEach((doc) => {
		if (doc.songs.indexOf(selectedSongToList.id) >= 0) {
			belongArr.push(doc);
		} else {
			notBelongArr.push(doc);
		}
	});
	const addSong = (listId, songId) => {
		let ref = fs.collection('lists').doc(listId);
		ref.update({
			songs: firebase.firestore.FieldValue.arrayUnion(songId)
		});
	};
	const removeSong = (listId, songId) => {
		let ref = fs.collection('lists').doc(listId);
		ref.update({
			songs: firebase.firestore.FieldValue.arrayRemove(songId)
		});
	};

	return (
		<div
			className="w-full h-full fixed bg-gray-900 bg-opacity-25 top-0 left-0 lg:p-48 dropdown z-50"
			onClick={closeModal}
		>
			<div className="bg-white min-h-full block m-auto shadow-lg rounded-lg px-16 py-8">
				<div className="text-3xl text-gray-700 mb-4">{selectedSongToList.name}</div>
				<div className="grid grid-cols-2 w-full gap-8">
					<div className="col-span-1 flex flex-col overflow-y-auto">
						{belongArr.map((doc) => {
							return (
								<span
									className="bg-green-500 uppercase p-3 text-lg text-white rounded-lg cursor-pointer"
									key={doc.id}
									onClick={() => removeSong(doc.id, selectedSongToList.id)}
								>
									{doc.name}
								</span>
							);
						})}
					</div>
					<div className="col-span-1 flex flex-col overflow-y-auto">
						{notBelongArr.map((doc) => {
							return (
								<span
									className="bg-red-500 uppercase p-3 text-lg text-white rounded-lg cursor-pointer"
									key={doc.id}
									onClick={() => addSong(doc.id, selectedSongToList.id)}
								>
									{doc.name}
								</span>
							);
						})}
					</div>
				</div>

				<div className="flex justify-end pt-4">
					{/* <span className="uppercase bg-blue-800 hover:opacity-75 text-white rounded-md p-2 cursor-pointer">
						submit
					</span> */}
					<span
						className="uppercase bg-primary hover:opacity-75 text-white rounded-md p-2 block lg:hidden ml-2 cursor-pointer"
						onClick={() => setSelectedSongToList(null)}
					>
						close
					</span>
				</div>
			</div>
		</div>
	);
};

export default EditListModal;

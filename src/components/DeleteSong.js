import React from 'react';
import { sr, fs } from '../firebase/config';

const DeleteSong = ({ id, storageRef }) => {
	const handleDelete = () => {
		// eslint-disable-next-line no-restricted-globals
		if (confirm('Are you going to delete this song?')) {
			const srRef = sr.ref(storageRef);
			const fsRef = fs.collection('musics').doc(id);
			fsRef.delete().then(() => {
				srRef.delete();
			});
		}
	};
	return (
		<div
			className="rounded-full hover:shadow-lg hover:bg-gray-400 w-10 h-10 p-2"
			onClick={() => {
				handleDelete(id);
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
					d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
				/>
			</svg>
		</div>
	);
};

export default DeleteSong;

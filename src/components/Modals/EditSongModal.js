import React, { useState } from 'react';
import { fs } from '../../firebase/config';

const EditSongModal = ({ selectedEditSong, setSelectedEditSong, showPlayingSong, setShowPlayingSong, singers }) => {
	const closeModal = (e) => {
		if (e.target.classList.contains('dropdown')) {
			setSelectedEditSong(null);
		}
	};
	const [ name, setName ] = useState(selectedEditSong.name ? selectedEditSong.name : "");
	const [ singer, setSinger ] = useState(selectedEditSong.singer ? selectedEditSong.singer : "");
	const [ singerId, setSingerId ] = useState(selectedEditSong.singerId ? selectedEditSong.singerId : "");
	const [ album, setAlbum ] = useState(selectedEditSong.album ? selectedEditSong.album : "");
	const [ type, setType ] = useState(selectedEditSong.type ? selectedEditSong.type : "");
	const [ img, setImg ] = useState(selectedEditSong.img ? selectedEditSong.img : "");
	const handleSubmit = async () => {
		const updateDoc = {
			name,
			singer,
			album,
			type,
			img,
			singerId
		};
		await Object.keys(updateDoc).forEach((item) => {
			if (!updateDoc[item]) delete updateDoc[item];
		});
		if(showPlayingSong){
			setShowPlayingSong(updateDoc);
		}
		fs.collection('musics').doc(selectedEditSong.id).update(updateDoc).then(() => {
			setSelectedEditSong(null);
		});
	};

	return (
		<div
			className="w-full h-full fixed bg-gray-900 bg-opacity-25 top-0 left-0 lg:p-20 dropdown z-50"
			onClick={closeModal}
		>
			<div className="bg-white min-h-full block m-auto shadow-lg rounded-lg p-16">
				<div className="mb-4 relative">
					<label className="label">Song</label>
					<input
						value={name}
						type="text"
						onChange={(e) => setName(e.target.value)}
						className="input focus:text-primary focus:border-primary focus:outline-none active:outline-none active:border-primary"
					/>
				</div>
				<div className="mb-4 relative">
					<label className="label">Singer</label>
					<select
						name="singer"
						onChange={(e) => {
							if (typeof JSON.parse(e.target.value) == 'object') {
								const { name, id } = JSON.parse(e.target.value);
								setSinger(name);
								setSingerId(id);
							}
						}}
					>
						{selectedEditSong.singerId ? (
							<option
								value={JSON.stringify({ name: selectedEditSong.singer, id: selectedEditSong.singerId })}
							>
								{selectedEditSong.singer}
							</option>
						) : (
							<option value="select a singer">select a singer</option>
						)}
						{singers &&
							singers.map((doc) => {
								return (
									<option value={JSON.stringify(doc)} key={doc.id}>
										{doc.name}
									</option>
								);
							})}
					</select>
					{/* <label className="label">Singer</label>
					<input
						value={singer}
						type="text"
						onChange={(e) => setSinger(e.target.value)}
						className="input focus:text-primary focus:border-primary focus:outline-none active:outline-none active:border-primary"
					/> */}
				</div>
				<div className="mb-4 relative">
					<label className="label">Album</label>
					<input
						value={album}
						type="text"
						onChange={(e) => setAlbum(e.target.value)}
						className="input focus:text-primary focus:border-primary focus:outline-none active:outline-none active:border-primary"
					/>
				</div>
				<div className="mb-4 relative">
					<label className="label">Type</label>
					<input
						value={type}
						type="text"
						onChange={(e) => setType(e.target.value)}
						className="input focus:text-primary focus:border-primary focus:outline-none active:outline-none active:border-primary"
					/>
				</div>
				<div className="mb-4 relative">
					<label className="label">ImgURL</label>
					<input
						value={img}
						type="text"
						onChange={(e) => setImg(e.target.value)}
						className="input focus:text-primary focus:border-primary focus:outline-none active:outline-none active:border-primary"
					/>
				</div>
				<div className="flex justify-end pt-4">
					<span
						className="uppercase bg-blue-800 hover:opacity-75 text-white rounded-md p-2 cursor-pointer"
						onClick={handleSubmit}
					>
						submit
					</span>
					<span
						className="uppercase bg-primary hover:opacity-75 text-white rounded-md p-2 block lg:hidden ml-2 cursor-pointer"
						onClick={() => setSelectedEditSong(null)}
					>
						close
					</span>
				</div>
			</div>
		</div>
	);
};

export default EditSongModal;

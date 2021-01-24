import React, { useState } from 'react';
import { fs } from '../../firebase/config';
// import useFirestore from '../../hooks/useFirestore';

const EditSingerModal = ({ selectedEditSinger, setSelectedEditSinger, selectedSinger, setSelectedSinger }) => {
	const closeModal = (e) => {
		if (e.target.classList.contains('dropdown')) {
			setSelectedEditSinger(null);
		}
	};
	const [ name, setName ] = useState(selectedEditSinger.name ? selectedEditSinger.name : "");
	const [ dob, setDob ] = useState(selectedEditSinger.dob ? selectedEditSinger.dob : "");
	const [ area, setArea ] = useState(selectedEditSinger.area ? selectedEditSinger.area : "");
	const [ info, setInfo ] = useState(selectedEditSinger.type ? selectedEditSinger.type : "");
	const [ photo, setPhoto ] = useState(selectedEditSinger.photo ? selectedEditSinger.photo : "");
	
	const handleSubmit = async () => {
		const updateDoc = {
			name,
			dob,
			area,
			info,
			photo
		};
		await Object.keys(updateDoc).forEach((item) => {
			if (!updateDoc[item]) delete updateDoc[item];
		});
		if(selectedSinger){
			setSelectedSinger(updateDoc);
		}
		fs.collection('singers').doc(selectedEditSinger.id).update(updateDoc).then(() => {
			setSelectedEditSinger(null);
		});
	};

	return (
		<div
			className="w-full h-full fixed bg-gray-900 bg-opacity-25 top-0 left-0 lg:p-20 dropdown z-50"
			onClick={closeModal}
		>
			<div className="bg-white min-h-full block m-auto shadow-lg rounded-lg p-16">
				<div className="mb-4 relative">
					<label className="label">Name</label>
					<input
						value={name}
						type="text"
						onChange={(e) => setName(e.target.value)}
						className="input focus:text-primary focus:border-primary focus:outline-none active:outline-none active:border-primary"
					/>
				</div>
				<div className="mb-4 relative">
					<label className="label">Birth Day</label>
					<input
						value={dob}
						type="text"
						onChange={(e) => setDob(e.target.value)}
						className="input focus:text-primary focus:border-primary focus:outline-none active:outline-none active:border-primary"
					/>
				</div>
				<div className="mb-4 relative">
					<label className="label">Area</label>
					<input
						value={area}
						type="text"
						onChange={(e) => setArea(e.target.value)}
						className="input focus:text-primary focus:border-primary focus:outline-none active:outline-none active:border-primary"
					/>
				</div>
				<div className="mb-4 relative">
					<label className="label">Infomation</label>
					<input
						value={info}
						type="text"
						onChange={(e) => setInfo(e.target.value)}
						className="input focus:text-primary focus:border-primary focus:outline-none active:outline-none active:border-primary"
					/>
				</div>
				<div className="mb-4 relative">
					<label className="label">PhotoURL</label>
					<input
						value={photo}
						type="text"
						onChange={(e) => setPhoto(e.target.value)}
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
						onClick={() => setSelectedEditSinger(null)}
					>
						close
					</span>
				</div>
			</div>
		</div>
	);
};

export default EditSingerModal;

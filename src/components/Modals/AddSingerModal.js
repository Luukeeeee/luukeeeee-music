import React, { useState } from 'react';
import { fs } from '../../firebase/config';

const AddSingerModal = ({ setAddSinger }) => {
	const [ singer, setSinger ] = useState(null);
	const handleChange = (e) => {
		setSinger(e.target.value);
	};
	const handleSubmit = () => {
		if (singer) {
			fs.collection('singers').add({ name: singer }).then(() => {
				setSinger(null);
                document.getElementById('singer-input').value = null;
				setAddSinger(null);
			});
		}
	};
	const closeModal = (e) => {
		if (e.target.classList.contains('dropdown')) {
			setAddSinger(null);
		}
	};
	return (
		<div
			className="w-full h-full fixed bg-gray-900 bg-opacity-25 top-0 left-0 p-10 sm:p-40 dropdown"
			onClick={closeModal}
		>
			<div className="bg-white p-10 shadow-xl rounded-xl">
				<label className="label">Singer Name</label>
				<div className="flex justify-start">
					<input
						type="text"
						className="bg-transparent border-b-2 w-3/4 border-primary focus:outline-none"
						onChange={handleChange}
						id="singer-input"
					/>
					<span
						className="uppercase text-white bg-primary text-xs rounded-sm mx-4 p-1 shadow-sm hover:shadow-2xl hover:opacity-75 cursor-pointer"
						onClick={() => {
							handleSubmit();
						}}
					>
						submit
					</span>
				</div>
			</div>
		</div>
	);
};

export default AddSingerModal;

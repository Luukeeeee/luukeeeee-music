import React, { useState, useEffect } from 'react';
import useStorage from '../hooks/useStorage';

const Upload = () => {
	const [ file, setFile ] = useState(null);
	const [ selected, setSelected ] = useState(null);
	const [ err, setErr ] = useState(null);
	const [ width, setWidth ] = useState(0);
	const [ height, setHeight ] = useState(0);
	// eslint-disable-next-line
	const { progress, error, url } = useStorage(file, setFile, setSelected);
	const handleChange = (e) => {
		const types = [ 'audio/mpeg', 'audio/flac' ];
		let file = e.target.files[0];
		if (file && types.includes(file.type)) {
			setSelected(e.target.files[0]);
			setErr(null);
		} else {
			setSelected(null);
			setErr('Please select a audio file(mp3, flac).');
		}
	};
	const handleClick = () => {
		setFile(selected);
	};
	const handleDelete = () => {
		setSelected(null);
	};
	let dom = document.getElementById('upload-box');
	useEffect(
		() => {
			if (dom) {
				setHeight(dom.clientHeight);
			} else {
				setHeight(0);
			}
		},
		[ dom ]
	);
	useEffect(
		() => {
			if (dom && progress !== 0) {
				dom && setWidth(dom.clientWidth * progress / 100);
			} else {
				setWidth(0);
			}
		},
		// eslint-disable-next-line
		[ progress ]
	);

	return (
		<div className="inline-block">
			<div className="flex items-center">
				<label className="text-gray-600 inline-block cursor-pointer">
					<input type="file" className="w-0 h-0 opacity-0" accept="audio/*" onChange={handleChange} />
					<svg
						className="w-6 h-6 cursor-pointer hover:opacity-75 hover:text-primary mb-5 ml-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
						/>
					</svg>
				</label>
				{selected && (
					<div className="block text-sm mt-8 mx-2 mb-8 bg-gray-200 z-20" id="upload-box">
						<div
							id="progress-bar"
							className="bg-purple-400 z-10"
							style={{ height: height, width: width }}
						/>
						{progress !== 0 ? (
							<div className="p-2 z-10" id="upload-info">
								uploading...
							</div>
						) : (
							<div className="p-2 z-10 text-xs" id="upload-info">
								{selected.name}
								<svg
									className="w-3 h-3 inline-block ml-2 cursor-pointer hover:text-primary"
									onClick={handleDelete}
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
								<svg
									className="w-3 h-3 inline-block cursor-pointer hover:text-primary ml-2"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									onClick={handleClick}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
									/>
								</svg>
							</div>
						)}
					</div>
				)}
				{err && <div className="block text-xs text-primary">{err}</div>}
			</div>
		</div>
	);
};

export default Upload;

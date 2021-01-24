import React from 'react';

const SingerInfo = ({ selectedSinger, musics, setMusics, setSelectedEditSinger, setCurrentSong, setSelectedSinger, singers }) => {
	const singerMusics = musics.filter((music) => music.singerId === selectedSinger.id);
	const shortenName = (name) => {
		const checkStr = name.slice(0, 2);
		const chiPattern = new RegExp("[\u4E00-\u9FA5]+");
		const engPattern = new RegExp("[A-Za-z]+");
		if(chiPattern.test(checkStr)){
			if(name.length > 6){
				return name.slice(0, 6) + "..."
			} else {
				return name
			}
		} else if(engPattern.test(checkStr)){
			if(name.length > 15){
				return name.slice(0, 15) + "..."
			} else {
				return name
			}
		} else {
			return name
		}
	}

	return (
		<div className="bg-white shadow-lg rounded-lg h-full w-full overflow-hidden grid grid-rows-5">
			<svg
				className="w-6 h-6 absolute right-0 top-0 text-gray-500 cursor-pointer hover:text-primary"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				onClick={() => setSelectedSinger(null)}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			{selectedSinger.photo && (
				<img
					src={selectedSinger.photo}
					alt={selectedSinger.name}
					className="w-full object-cover block row-span-2 h-56"
				/>
			)}

			<div className="ml-4 row-span-1">
				<span className="text-4xl">{selectedSinger.name}</span>
				<span
					onClick={() => {
						setMusics(singerMusics);
					}}
					className="bg-green-600 text-xs p-1 rounded-sm uppercase text-white mx-2 hover:opacity-75 cursor-pointer"
				>
					play
				</span>
				<span
					onClick={() => {
						setSelectedEditSinger(singers.find((doc) => doc.id === selectedSinger.id));
					}}
					className="bg-red-600 text-xs p-1 rounded-sm uppercase text-white mx-2 hover:opacity-75 cursor-pointer"
				>
					edit
				</span>
			</div>
			<div className="grid grid-cols-5 row-span-2 ml-4 col-gap-8">
				<div className="col-span-2">
					<div className="text-xs text-gray-600">Birth Day:</div>
					<div>{selectedSinger.dob}</div>
					<div className="text-xs text-gray-600 mt-1">Area:</div>
					<div>{selectedSinger.area}</div>
					<div className="text-xs text-gray-600 mt-1">Infomation:</div>
					<div>{selectedSinger.info}</div>
				</div>
				<div className="col-span-3 overflow-auto h-40">
					{singerMusics &&
						singerMusics.map((item) => (
							<div
								key={item.id}
								className="my-2 rounded-md p-1 w-auto hover:bg-gray-200 hover:bg-opacity-75"
							>
								<span>{shortenName(item.name)}</span>
								<span className="text-xs text-gray-700 mx-4">{item.duration}</span>
								<svg
									className="w-5 h-5 inline-block cursor-pointer hover:text-primary"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									onClick={() => setCurrentSong(item)}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default SingerInfo;

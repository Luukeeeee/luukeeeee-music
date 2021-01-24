/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { fs } from '../firebase/config';

const SingerList = ({ setSelectedSinger, setAddSinger, list, setList, showSingers, setShowSingers, singers }) => {
	const [ singerIndex, setSingerIndex ] = useState(0);
	const deleteInVisible = (id) => {
		document.getElementById(id).classList.remove('md:invisible');
	};
	const addInVisible = (id) => {
		document.getElementById(id).classList.add('md:invisible');
	};
	const deleteSinger = (id) => {
		// eslint-disable-next-line no-restricted-globals
		if (confirm('Delete this singer?')) {
			fs.collection('singers').doc(id).delete().then(() => {
				setSelectedSinger(null);
			});
		}
	};
	const pySegSort = (arr) => {
		if (!String.prototype.localeCompare) return null;
		const letters = 'abcdefghjklmnopqrstwxyz'.split('');
		const zh = '阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀'.split('');
		const iuvArr = 'iuv'.split('');
		let segs = [];
		iuvArr.map((item, i) => {
			let cur = { letter: item, data: [] };
			arr.map((item) => {
				let firstLetter = item.name.slice(0, 1).toLowerCase();
				if (iuvArr.includes(firstLetter) && firstLetter === iuvArr[i]) {
					cur.data.push(item);
				}
			});
			if (cur.data.length) {
				cur.data.sort(function(a, b) {
					return a.name.localeCompare(b.name, 'zh');
				});
				segs.push(cur);
			}
		});
		letters.map((item, i) => {
			let cur = { letter: item, data: [] };
			arr.map((item) => {
				let firstLetter = item.name.slice(0, 1).toLowerCase();
				const engPattern = new RegExp('[A-Za-z]+');
				if (!engPattern.test(firstLetter)) {
					if (item.name.localeCompare(zh[i]) >= 0 && item.name.localeCompare(zh[i + 1]) < 0) {
						cur.data.push(item);
					}
				}
				if (firstLetter === letters[i]) {
					cur.data.push(item);
				}
			});
			if (cur.data.length) {
				cur.data.sort(function(a, b) {
					return a.name.localeCompare(b.name, 'zh');
				});
				segs.push(cur);
			}
		});
		segs.sort(function(a, b) {
			let x = a.letter;
			let y = b.letter;
			if (x < y) {
				return -1;
			}
			if (x > y) {
				return 1;
			}
			return 0;
		});
		return segs;
	};

	useEffect(
		() => {
			let result = pySegSort(singers);
			setList(result);
		},
		[ singers ]
	);
	useEffect(
		() => {
			if (list.length > 0) {
				setShowSingers(list[singerIndex]);
			}
		},
		[ list ]
	);
	const letterClass = (l) => {
		if (l === showSingers.letter) {
			return 'border border-gray-500 flex justify-center cursor-pointer bg-gray-500 text-white text-bold';
		} else {
			return 'border border-gray-500 flex justify-center cursor-pointer';
		}
	};
	const swap = () => {
        document.getElementById('singer-list').classList.add('hidden');
        document.getElementById('personal-lists').classList.remove('hidden');
    }

	return (
		<div className="grid grid-cols-9 m-5 max-h-screen overflow-y-auto" id="singer-list" onTouchMove={() => swap()}>
			<div className="col-span-1">
				{list && list.map((item, i) => {
					return (
						<div
							className={letterClass(item.letter)}
							key={i}
							onClick={() => {
								setShowSingers(list[i]);
								setSingerIndex(i);
							}}
						>
							{item.letter.toUpperCase()}
						</div>
					);
				})}
				<span onClick={() => setAddSinger(true)} className="flex justify-center cursor-pointer mt-2">
					<svg
						className="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
						/>
					</svg>
				</span>
			</div>
			<div className="col-span-8 block border border-gray-500 overflow-y-scroll">
				{showSingers.data &&
					showSingers.data.map((doc) => {
						return (
							<div
								className="hover:bg-gray-400 bg-opacity-25 hover:font-bold text-lg md:text-2xl cursor-pointer rounded-full md:px-2 md:py-1 md:m-2 m-1 my-4 md:border md:border-black w-auto md:inline-block"
								key={doc.id}
								onMouseEnter={() => deleteInVisible(doc.id)}
								onMouseLeave={() => addInVisible(doc.id)}
								// onTouchStart={() => deleteInVisible(doc.id)}
								onClick={() => {
									setSelectedSinger(doc);
								}}
							>
								{doc.photo && (
									<img
										src={doc.photo}
										alt="doc.name"
										className="w-8 h-8 rounded-full inline-block mr-1 md:mb-1"
									/>
								)}
								{doc.name}
								<svg
									className="w-5 h-5 md:w-6 md:h-6 inline-block hover:text-primary ml-1 md:invisible mb-1"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									id={doc.id}
									onClick={() => deleteSinger(doc.id)}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default SingerList;

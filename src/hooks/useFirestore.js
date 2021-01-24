import { useState, useEffect } from 'react';
import { fs } from '../firebase/config';

const useFirestore = (collection) => {
	const [ docs, setDocs ] = useState([]);

	useEffect(
		() => {
			const unsub = fs.collection(collection).orderBy('name', 'asc').onSnapshot((snap) => {
				let documents = [];
				snap.forEach((doc) => {
					documents.push({ ...doc.data(), id: doc.id });
				});
				setDocs(documents);
            });
            
            return () => unsub();
		},
		[ collection ]
	);

	return { docs };
};

export default useFirestore;
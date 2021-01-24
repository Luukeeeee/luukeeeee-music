import React, { useState } from 'react';
import { auth } from '../firebase/config';

const SignIn = () => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ error, setError ] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('click');
		auth
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				auth.onAuthStateChanged((user) => {
					if (user) {
						window.localStorage.setItem('uid', user.uid);
					} else {
						window.localStorage.removeItem('uid');
					}
				});
				window.location.reload();
			})
			.catch((err) => setError(err.message));
	};

	return (
		<div className="flex items-center justify-center h-screen">
			<div className="border-2 border-primary rounded-2xl py-16 w-4/5 md:w-2/5 flex items-center justify-center flex-col row-gap-4">
				<label htmlFor="email" className="flex flex-col">
					<span>email</span>
					<input
						type="email"
						name="email"
						className="input"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label htmlFor="password" className="flex flex-col">
					<span>password</span>
					<input
						type="password"
						name="password"
						className="input"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<span
					className="uppercase bg-primary text-white p-1 text-sm cursor-pointer hover:opacity-75 flex justify-center"
					onClick={(e) => handleSubmit(e)}
				>
					sign in
				</span>
				<span className="text-red-500 text-base text-center">{error}</span>
			</div>
		</div>
	);
};

export default SignIn;

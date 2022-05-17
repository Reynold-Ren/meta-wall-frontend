import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="about" element={<About />} />
			</Routes>
		</div>
	);
}

function Home() {
	return (
		<>
			<main>
				<h2>Welcome to the homepage!</h2>
				<p>You can do this, I believe in you.</p>
			</main>
			<nav>
				<Link to="/about">About</Link>
			</nav>
		</>
	);
}

function About() {
	return (
		<>
			<main>
				<h2>Who are we?</h2>
			</main>
			<nav>
				<Link to="/">Home</Link>
			</nav>
		</>
	);
}

export default App;

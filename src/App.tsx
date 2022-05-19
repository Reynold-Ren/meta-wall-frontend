import AppContainer from './views/AppContainer';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Follower from './views/Follower';
import Profile from './views/Profile';
import Likes from './views/Likes';
import User from './views/User';
import './App.scss';
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<AppContainer>
			<Routes>
				<Route path="login" element={<Login />} />
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="follower" element={<Follower />} />
				<Route path="profile" element={<Profile />} />
				<Route path="likes" element={<Likes />} />
				<Route path="user/:id" element={<User />} />
			</Routes>
		</AppContainer>
	);
}

export default App;

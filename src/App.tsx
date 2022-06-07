import AppContainer from './views/AppContainer';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Follow from './views/Follow';
import Profile from './views/Profile';
import Likes from './views/Likes';
import User from './views/User';
import Shop from './views/Shop';
import CreatePosts from './views/CreatePosts';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import RequireAuth from './components/RequireAuth';
import SocialLogin from './components/SocialLogin';

function App() {
	return (
		<AuthProvider>
			<AppContainer>
				<Routes>
					<Route path="login" element={<Login />} />
					<Route
						path="/"
						element={
							<SocialLogin>
								<RequireAuth>
									<Dashboard />
								</RequireAuth>
							</SocialLogin>
						}
					/>
					<Route
						path="follow"
						element={
							<RequireAuth>
								<Follow />
							</RequireAuth>
						}
					/>
					<Route
						path="profile"
						element={
							<RequireAuth>
								<Profile />
							</RequireAuth>
						}
					/>
					<Route
						path="likes"
						element={
							<RequireAuth>
								<Likes />
							</RequireAuth>
						}
					/>
					<Route
						path="user/:id"
						element={
							<RequireAuth>
								<User />
							</RequireAuth>
						}
					/>
					<Route
						path="create"
						element={
							<RequireAuth>
								<CreatePosts />
							</RequireAuth>
						}
					/>
					<Route
						path="shop"
						element={
							<RequireAuth>
								<Shop />
							</RequireAuth>
						}
					/>
				</Routes>
			</AppContainer>
		</AuthProvider>
	);
}

export default App;

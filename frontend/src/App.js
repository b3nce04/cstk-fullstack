import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { SnackbarProvider } from "notistack";

import Dashboard from './pages/Dashboard.js';

import ProtectedRoutes from "./ProtectedRoutes.js";
import PublicRoutes from "./PublicRoutes.js";

import LoadingBar from "./components/LoadingBar.js";
import LoginForm from "./pages/Login.js";
import RegisterForm from "./pages/Register.js";

import {AuthProvider} from './contexts/AuthContext.js'

const theme = createTheme();

function App() {
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Box component="main">
					<LoadingBar />
					<SnackbarProvider
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "right",
						}}
						maxSnack={4}
					>			
						<AuthProvider>
							<Routes>
								<Route element={<PublicRoutes/>}>
									<Route path='/login' element={<LoginForm/>} />
									<Route path='/register' element={<RegisterForm/>} />
								</Route>
								<Route element={<ProtectedRoutes/>}>
									<Route path='/' element={<Dashboard/>} />
								</Route>
							</Routes>
						</AuthProvider>
					</SnackbarProvider>
				</Box>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import LoadingBar from "./components/LoadingBar.js";
import LoginForm from "./components/LoginForm.js";
import RegisterForm from "./components/RegisterForm.js";

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
						<Routes>
							<Route path="/" element={<h1>app</h1>} />
							<Route path="/login" element={<LoginForm />} />
							<Route
								path="/register"
								element={<RegisterForm />}
							/>
						</Routes>
					</SnackbarProvider>
				</Box>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;

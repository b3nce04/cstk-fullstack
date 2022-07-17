import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Copyright from '../components/Copyright.js';
import { useSnackbar } from 'notistack'

import apiClient from "../api/api-client.js";

import {useAuth} from "../contexts/AuthContext.js";

export default function Login() {
	const [classes, setClasses] = useState([]);
	const [message, setMessage] = useState("");
	const [selectedClass, setSelectedClass] = useState(0)
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();
	const {login} = useAuth();


	useEffect(() => {
		apiClient("get", "/class", setClasses);
		apiClient("get", "/setting/global-message", (res) => {
			setMessage(res.value)
		});
	}, [])

	const handleSelect = (event) => {
		setSelectedClass(event.target.value);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		apiClient("post", "/user/login", (res, status) => {
			enqueueSnackbar(res.msg, { variant: res.type || 'info' })
			if (status === 201) {
				login()
			}
		}, {
			email: data.get("email"),
			password: data.get("password"),
			classId: data.get("classId"),
		});
	};

	return (
		<Container maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					p: 2
				}}
			>
				<Typography component="h1" variant="h1" color="primary" sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Csoportos tételkezelő rendszer</Typography>
				<Typography component="h6" variant="h6">Bejelentkezés</Typography>
				<Divider/>
				<Box
					component="form"
					onSubmit={handleSubmit}
					noValidate
					sx={{mt: 3}}
				>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								label="E-mail cím"
								name="email"
								autoFocus
								autoComplete="current-email"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="password"
								label="Jelszó"
								type="password"
								autoComplete="current-password"
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth>
								<InputLabel id="select-label">
									Osztály
								</InputLabel>
								<Select
									labelId="select-label"
									label="Osztály"
									name="classId"
									value={selectedClass}
									onChange={handleSelect}
								>
									<MenuItem key='0' value='0'>Válaszd ki a megfelelőt</MenuItem>
									{classes.map((item) => {
										return (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
									})}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<Button
								type="submit"
								fullWidth
								variant="contained"
							>
								Bejelentkezés
							</Button>
						</Grid>
						<Grid item xs={12}>
							<Button
								fullWidth
								variant="outlined"
								onClick={() => navigate('/register')}
							>
								Regisztráció
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Box>
			{message && <Alert severity="info">{message}</Alert>}
			<Copyright sx={{ mt: 2 }} />
		</Container>
	);
}

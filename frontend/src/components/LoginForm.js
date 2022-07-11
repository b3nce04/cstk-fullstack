import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import Copyright from './Login.Copyright.js';
import { useSnackbar } from 'notistack'

import apiClient from "../api-client.js";

export default function Login() {
	const [classes, setClasses] = useState([]);
	const [selectedClass, setSelectedClass] = useState(1)

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	useEffect(() => {
		apiClient("get", "/class", setClasses);
	}, [])

	const handleSelect = (event) => {
		setSelectedClass(event.target.value);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		apiClient("post", "/user/login", (res) => {
			enqueueSnackbar(res.msg, { variant: 'info' })
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
								autoComplete="email"
								autoFocus
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
								<InputLabel id="demo-simple-select-label">
									Válassz osztályt
								</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									name="classId"
									value={selectedClass}
									label="Válassz osztályt"
									onChange={handleSelect}
								>
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
							<Link to="/register" style={{ textDecoration: "none" }}>
								<Button
									type="submit"
									fullWidth
									variant="outlined"
								>
									Regisztráció
								</Button>
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Copyright sx={{ mt: 2 }} />
		</Container>
	);
}

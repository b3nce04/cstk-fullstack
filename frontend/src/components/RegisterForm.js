import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {DatePicker} from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Copyright from './Login.Copyright.js';
import { useSnackbar } from 'notistack'

import apiClient from "../api-client.js";

export default function Register() {
    const [birthDate, setBirthDate] = useState();

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const [classes, setClasses] = useState([]);
	const [selectedClass, setSelectedClass] = useState(1)

	useEffect(() => {
		apiClient("get", "/class", setClasses);
	}, [])

	const handleSelect = (event) => {
		setSelectedClass(event.target.value);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		apiClient("post", "/user/register", (res) => {
			enqueueSnackbar(res.msg, { variant: res.type || 'info' })
		}, {
			email: data.get("email"),
			password: data.get("password"),
			password2: data.get("password2"),
			lastname: data.get("lastname"),
			firstname: data.get("firstname"),
			birthDate: birthDate,
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
				<Typography component="h6" variant="h6">Regisztráció</Typography>
				<Divider/>
				<Box
					component="form"
					onSubmit={handleSubmit}
					noValidate
					sx={{ mt: 3 }}
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
							<TextField
								required
								fullWidth
								name="password2"
								label="Jelszó mégegyszer"
								type="password"
								autoComplete="current-password"
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								required
								fullWidth
								label="Vezetéknév"
								name="lastname"
								autoComplete="email"
								autoFocus
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								required
								fullWidth
								label="Keresztnév"
								name="firstname"
								autoComplete="email"
								autoFocus
							/>
						</Grid>
						<Grid item xs={12}>
							<LocalizationProvider dateAdapter={AdapterMoment}>
								<DatePicker
									label="Születési idő"
									value={birthDate}
									onChange={(newValue) => {
										setBirthDate(newValue);
									}}
									renderInput={(params) => <TextField {...params} fullWidth/>}
								/>
							</LocalizationProvider>
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
								Regisztráció
							</Button>
						</Grid>
						<Grid item xs={12}>
							<Link to="/login" style={{ textDecoration: "none" }}>
								<Button
									type="submit"
									fullWidth
									variant="outlined"
								>
									Bejelentkezés
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

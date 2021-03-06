import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Copyright from "../components/Copyright.js";
import { useSnackbar } from "notistack";

import apiClient from "../api/api-client.js";

export default function Register() {
	const [birthDate, setBirthDate] = useState();

	const { enqueueSnackbar } = useSnackbar();

	const [classes, setClasses] = useState([]);
	const [selectedClass, setSelectedClass] = useState(0);

	const navigate = useNavigate();

	useEffect(() => {
		apiClient("get", "/class", setClasses);
	}, []);

	const handleSelect = (event) => {
		setSelectedClass(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		apiClient(
			"post",
			"/user/register",
			(res) => {
				enqueueSnackbar(res.msg, { variant: res.type || "info" });
			},
			{
				email: data.get("email"),
				password: data.get("password"),
				password2: data.get("password2"),
				code: data.get("code"),
				lastname: data.get("lastname"),
				firstname: data.get("firstname"),
				birthDate: birthDate,
				classId: data.get("classId"),
			}
		);
	};

	return (
		<Container maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					p: 2,
				}}
			>
				<Typography
					component="h1"
					variant="h1"
					color="primary"
					sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
				>
					Csoportos t??telkezel?? rendszer
				</Typography>
				<Typography component="h6" variant="h6">
					Regisztr??ci??
				</Typography>
				<Divider />
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
								label="E-mail c??m"
								name="email"
								autoFocus
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="password"
								label="Jelsz??"
								type="password"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="password2"
								label="Jelsz?? m??gegyszer"
								type="password"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="code"
								label="Regisztr??ci??s k??d"
								type="text"
								helperText="*ide kell a kapott k??d"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								fullWidth
								label="Vezet??kn??v"
								name="lastname"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								fullWidth
								label="Keresztn??v"
								name="firstname"
							/>
						</Grid>
						<Grid item xs={12}>
							<LocalizationProvider dateAdapter={AdapterMoment}>
								<DatePicker
									label="Sz??let??si id??"
									value={birthDate}
									onChange={(newValue) => {
										setBirthDate(newValue);
									}}
									renderInput={(params) => (
										<TextField {...params} fullWidth />
									)}
								/>
							</LocalizationProvider>
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth>
								<InputLabel id="select-label">
									Oszt??ly
								</InputLabel>
								<Select
									labelId="select-label"
									name="classId"
									label="Oszt??ly"
									value={selectedClass}
									onChange={handleSelect}
								>
									<MenuItem key='0' value='0'>V??laszd ki a megfelel??t</MenuItem>
									{classes.map((item) => {
										return (
											<MenuItem
												key={item.id}
												value={item.id}
											>
												{item.name}
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<Button type="submit" fullWidth variant="contained">
								Regisztr??ci??
							</Button>
						</Grid>
						<Grid item xs={12}>
							<Button
								fullWidth
								variant="outlined"
								onClick={() => navigate("/login")}
							>
								Bejelentkez??s
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Copyright sx={{ mt: 2 }} />
		</Container>
	);
}

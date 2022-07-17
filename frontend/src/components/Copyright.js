import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Copyright(props) {
	return (
		<Typography variant="body2" align="center" {...props}>
			{"Minden jog fenntartva! © "}
			{new Date().getFullYear()}
			{" | Készítette: "}
			{
				<Link href="https://github.com/b3nce04" color="primary" target="_blank" rel="noopener">
					Hagymási Bence
				</Link>
			}
		</Typography>
	);
}
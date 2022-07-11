import {usePromiseTracker} from 'react-promise-tracker';
import LinearProgress from '@mui/material/LinearProgress';

function LoadingBar() {
    const { promiseInProgress } = usePromiseTracker();
    return (promiseInProgress === true) ? <LinearProgress sx={{position: 'fixed', width: '100%', top: '0'}} /> : null
}

export default LoadingBar;
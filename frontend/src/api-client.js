import axios from 'axios'
import {trackPromise} from 'react-promise-tracker'

const instance = axios.create({
    baseURL: 'http://localhost:4000/api/v1',
    headers: {
        'Content-Type': 'application/json',
        'api-key': '858d6f1d-ed77-4c4d-b085-5e9841b81cb1',
    },
    transformRequest: [function (data) {
        return JSON.stringify(data);
    }],
    timeout: 2000
});

function apiClient(method, source, callback, data) {
    trackPromise(instance({
        method: method,
        url: source,
        data: data
    }))
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
}

export default apiClient;
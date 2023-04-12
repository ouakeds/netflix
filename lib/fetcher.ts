import axios from 'axios'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const patchRequest = (url: string, data?: any): Promise<any> => {
    return axios.patch(url, data)
}

const postRequest = (url: string, data?: any): Promise<any> => {
    return axios.post(url, data)
}

export {patchRequest, postRequest}

export default fetcher;
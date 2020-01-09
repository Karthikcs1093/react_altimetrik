import axios from 'axios';

export const service = {
    callApi: (dataset) => {
        const requestOptions = getOptions(dataset);
        return axios(requestOptions)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return {
                    data: error.response.data
                }
            })

        function getOptions(dataset) {
            let header = {
                "Content-Type": "application/json"
            };

            if (dataset.method === 'GET') {
                return {
                    method: 'get',
                    url: dataset.url,
                    headers: header
                };
            } else if (dataset.method === 'POST') {
                return {
                    method: 'post',
                    url: dataset.url,
                    headers: header,
                    data: dataset.body
                };
            }
        }
    }

}
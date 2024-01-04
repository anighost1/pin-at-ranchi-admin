import axios from "axios";

export const appServiceName = 'http://localhost:6969'; 

class RestfulProvider {
    constructor() {
        this.setCommonHeaders();
    }
    setCommonHeaders = () => {
        const token = localStorage.getItem("token");

        token &&
            (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`);
    };

    makeCall = (url, data, axiosMethod) => {
        const header = {
            ...((url === '/api/print_invoice2' || 
                url === '/api/print-order') &&
            {responseType: 'arraybuffer'}),
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (localStorage.getItem("token")) {
            this.setCommonHeaders();
        }

        return new Promise((resolve, reject) => {
            const response = axiosMethod(`${appServiceName}${url}`, data, header);

            response
                .then((res) => {
                    resolve(res.data);                                     
                })
                .catch((error) => {
                    reject(
                        error 
                        // ||
                        // "Server is down, please check after some time !!"
                    );
                });
        });
    };

    put = (url, data) => {
        return this.makeCall(url, data, axios.put);
    };

    post = (url, data) => {
        return this.makeCall(url, data, axios.post);
    };

    get = (url) => {
        return this.makeCall(url, undefined, axios.get);
    };

    delete = (url, request) => {
        return this.makeCall(url, { data: request }, axios.delete);
    };
}

export default new RestfulProvider();
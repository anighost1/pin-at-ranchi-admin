import axios from "axios";

// export const appServiceName = 'http://localhost:6969'; 
export const appServiceName = process.env.REACT_APP_BASE_URL;

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
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
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
import axios from "axios";
import { useLoader } from "../utils/loader";

class Requests {
    constructor(baseUrl) {
        this.baseUrl = baseUrl || ''
        this.config = {
            headers: {}
        }
        this.instance = axios.create({
            baseURL: baseUrl
        })
    }

    handleAxiosError(error) {
        if (!error.response) {
            return {
                ok: false,
                status: 500,
                message: 'Server Request Timeout (code: ERR_CONNECTION_TIMED_OUT)',
                data: []
            }
        }
        return {
            ok: false,
            status: error.response.status,
            message: error.response.data.error || 'An error occurred',
            data: error.response.data || [],
        };
    }


   async makeRequest(method, url, data = {}, loader, config = {}) {
    const { activateLoader, deactivateLoader } = useLoader()
    activateLoader(loader)
    try {
        const mergedConfig = { ...this.config, ...config }
        let responsePromise;

        if (method === 'get') {
            responsePromise = this.instance[method](url, mergedConfig);
        } else {
            responsePromise = this.instance[method](url, data, mergedConfig);
        }
        const delay = new Promise(resolve => setTimeout(resolve, 1500));

        const [response] = await Promise.all([responsePromise, delay]);
        return {
            ok: true,
            status: response.status,
            message: "",
            data: response.data || []
        }
    } catch (error) {
        return this.handleAxiosError(error)
    } finally {
        deactivateLoader(loader)
    }
}


    get(url, loader, config) {
        return this.makeRequest('get', url, undefined, loader, config)
    }

    post(url, data, loader, config) {
        return this.makeRequest('post', url, data, loader, config)
    }
    put(url, data, loader, config) {
        return this.makeRequest('put', url, data, loader, config)
    }

    delete(url, data, loader, config,) {
        return this.makeRequest('delete', url, data, loader, config)
    }

    patch(url, loader, config,) {
        return this.makeRequest('patch', url, undefined, loader, config)
    }
}

export default new Requests()
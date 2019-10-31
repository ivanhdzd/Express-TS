import axios, { AxiosInstance } from 'axios';

/** Axios base URL configuration */
const baseURL: string = process.env.ELASTIC_BASE_URL || '';
/** Axios timeout configuration */
const timeout: number = +(process.env.ELASTIC_TIMEOUT || 1000);

class ElasticsearchRequestSingleton {
	/** Unique ElasticsearchRequestSingleton instance reference */
	private static _instance: ElasticsearchRequestSingleton;
	/** Axios instance to exports */
	public axiosInstance: AxiosInstance = axios.create({ baseURL, timeout });

	public constructor() {
		if (!ElasticsearchRequestSingleton._instance) ElasticsearchRequestSingleton._instance = this;
		return ElasticsearchRequestSingleton._instance;
	}
}

/** Creates an unique instance of ElasticsearchRequestSingleton class */
const instance = new ElasticsearchRequestSingleton();
/** Prevents the modification of existing ElasticsearchRequestSingleton instance */
Object.freeze(instance);

/** Exports axios instance as default */
export default instance.axiosInstance;
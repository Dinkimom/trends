import axios from 'axios';
import { serverEntryPoint } from '../shared/constants/serverEntryPoint';
import { ISort } from './../shared/types/ISort';

export class GitClient {
	public URL: string;
	public axios: any;

	public constructor() {
		this.URL = serverEntryPoint;
		this.axios = axios.create({
			timeout: 20000,
		});
	}

	public get = async (query_string: string, sort?: ISort) => {
		return await this.axios.get(this.URL, {
			params: { q: query_string, sort: sort?.name, order: sort?.dir },
		});
	};
}

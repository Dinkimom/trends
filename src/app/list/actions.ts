import { RepoDTO } from '../../shared/dto/RepoDTO';
import * as types from './types';

export const listActions = {
	loadData: () => ({
		type: types.LIST_LOAD_DATA,
	}),

	dataLoaded: (payload: RepoDTO[]) => ({
		type: types.LIST_DATA_LOADED,
		payload,
	}),

	setQueryString: (payload: string) => ({
		type: types.LIST_SET_QUERY_STRING,
		payload,
	}),

	setFetching: (payload: boolean) => ({
		type: types.LIST_SET_FETCHING,
		payload,
	}),

	setError: (payload: string) => ({
		type: types.LIST_SET_ERROR,
		payload,
	}),

	setSort: (payload: string) => ({
		type: types.LIST_SET_SORT,
		payload,
	}),
};

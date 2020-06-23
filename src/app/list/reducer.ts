import { IActionPayloaded } from '../../store/IAction';
import { IReducerPayloaded } from '../../store/IReducer';
import { IListState } from './state';
import * as types from './types';

const initialState: IListState = {
	list: [],
	query_string: '',
	isFetching: false,
	error: '',
	sort: [
		{ name: 'owner', dir: null },
		{ name: 'name', dir: null },
		{ name: 'stars', dir: null },
	],
};

export class ListReducer implements IReducerPayloaded<IListState> {
	constructor() {
		this.reduce = this.reduce.bind(this);
	}

	public static Create() {
		const reducer = new ListReducer();
		return reducer.reduce;
	}

	public reduce(
		state: IListState = initialState,
		action: IActionPayloaded<any>,
	): IListState {
		let newState = { ...state };

		switch (action.type) {
			case types.LIST_DATA_LOADED:
				newState.list = [...action.payload];
				break;
			case types.LIST_SET_QUERY_STRING:
				newState.query_string = action.payload;
				break;
			case types.LIST_SET_FETCHING:
				newState.isFetching = action.payload;
				break;
			case types.LIST_SET_SORT:
				let param = newState.sort.filter(
					(item) => item.name === action.payload,
				)[0];

				if (param.dir === null) {
					newState.sort = newState.sort.map((item) => ({ ...item, dir: null }));
					param = newState.sort.filter(
						(item) => item.name === action.payload,
					)[0];
					param.dir = 'desc';
				} else {
					param.dir = param.dir === 'desc' ? 'asc' : 'desc';
				}
				break;
			case types.LIST_SET_ERROR:
				newState.error = action.payload;
				break;
		}

		return newState;
	}
}

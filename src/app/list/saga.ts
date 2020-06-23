import { put, select, takeEvery } from 'redux-saga/effects';
import { safeSagaExecute } from '../../middleware/saga';
import { gitClient } from './../../index';
import { ISort } from './../../shared/types/ISort';
import { IRootState } from './../../store/state';
import { listActions } from './actions';
import * as types from './types';

export class ListApiSaga {
	public constructor() {
		this.loadData = this.loadData.bind(this);
	}

	public static Initialize() {
		const saga = new ListApiSaga();
		return saga.watch();
	}

	public *watch() {
		yield takeEvery(types.LIST_LOAD_DATA, (a) =>
			safeSagaExecute(a, this.loadData),
		);
	}

	public *loadData() {
		yield put(listActions.setFetching(true));

		const { query_string, sort: sortArray } = yield select(
			(state: IRootState) => state.list,
		);

		if (query_string) {
			const sort = sortArray.filter((item: ISort) => item.dir !== null)[0];

			try {
				const response = yield gitClient.get(query_string, sort);

				yield put(listActions.dataLoaded(response.data.items));
			} catch (error) {
				yield put(listActions.setError(error.message));
			}
		}

		yield put(listActions.setFetching(false));
	}
}

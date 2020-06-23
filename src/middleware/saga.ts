import { all } from 'redux-saga/effects';
import { ListApiSaga } from '../app/list/saga';

export const rootSaga = function* root() {
	yield all([ListApiSaga.Initialize()]);
};

export function* safeSagaExecute(action: any, func: (a: any) => any) {
	try {
		yield func(action);
	} catch (error) {
		console.error(error);
	}
}

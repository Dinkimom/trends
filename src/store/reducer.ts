import { combineReducers } from 'redux';
import { ListReducer } from '../app/list/reducer';
import { IRootState } from './state';

export const rootReducer = combineReducers<IRootState>({
	list: ListReducer.Create(),
});

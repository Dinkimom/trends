import { RepoDTO } from '../../shared/dto/RepoDTO';
import { ISort } from './../../shared/types/ISort';

export interface IListState {
	list: RepoDTO[];
	query_string: string;
	isFetching: boolean;
	sort: ISort[];
	error: string;
}

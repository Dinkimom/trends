import debounce from 'lodash.debounce';
import React, { ChangeEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sort } from '../../shared/components/sort';
import { IRootState } from '../../store/state';
import { PageWrapper } from '../pageWrapper';
import { listActions } from './actions';
import './index.css';

export const List = React.memo(() => {
	const dispatch = useDispatch();

	const { list, isFetching, error, sort, query_string } = useSelector(
		(state: IRootState) => state.list,
	);

	const handleLoadData = () => {
		dispatch(listActions.loadData());
	};

	const handleSort = (name: string) => {
		dispatch(listActions.setSort(name));

		handleLoadData();
	};

	const delayedLoad = useCallback(debounce(handleLoadData, 500), []);

	const handleQueryChange = (evt: ChangeEvent<HTMLInputElement>) => {
		const { value } = evt.target;

		dispatch(listActions.setQueryString(value));

		delayedLoad();
	};

	const renderList = () => {
		if (isFetching) {
			return <p className='list__container__loader'>Loading...</p>;
		}

		if (error) {
			return <p className='list__container__message error'>{error}</p>;
		}

		if (list.length === 0) {
			return <p className='list__container__message'>No results</p>;
		}

		return list.map((item) => (
			<div className='list__container__item' key={item.id}>
				<a className='list__container__item__name' href={item.html_url}>
					{`${item.owner.login} / ${item.name}`}
				</a>
				<p className='list__container__item__description'>{item.description}</p>
				<p className='list__container__item__stars'>
					<span role='img' aria-label='stars'>
						⭐️
					</span>{' '}
					{item.stargazers_count}
				</p>
			</div>
		));
	};

	const renderSort = () => {
		return sort.map((item, index) => (
			<Sort {...item} onClick={() => handleSort(item.name)} key={index} />
		));
	};

	return (
		<PageWrapper className='list'>
			<h1>
				<svg
					height='32'
					viewBox='0 0 16 16'
					version='1.1'
					width='32'
					aria-hidden='true'
				>
					<path
						fillRule='evenodd'
						d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z'
					></path>
				</svg>{' '}
				GitHub Trends
			</h1>
			<div className='list__container'>
				<div className='list__controls'>
					<div className='list__controls__search'>
						<input
							type='text'
							placeholder='Query...'
							onChange={handleQueryChange}
							value={query_string}
						/>
					</div>
					<div className='list__controls__sort'>{renderSort()}</div>
				</div>
				{renderList()}
			</div>
		</PageWrapper>
	);
});

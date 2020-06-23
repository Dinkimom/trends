import React from 'react';
import { Direction } from '../../types/Direction';
import './index.css';

interface ISortProps {
	name: string;
	dir: Direction;
	onClick: (...args: any) => void;
}

export const Sort = ({ name, dir, onClick }: ISortProps) => (
	<div className={`sort ${dir === null ? '' : 'active'}`} onClick={onClick}>
		<span className='sort__name'>{name}</span>
		<span className={`sort__direction ${dir === null ? '' : dir}`}>
			&#8249;
		</span>
	</div>
);

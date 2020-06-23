import React, { ReactNode } from 'react';
import './index.css';

interface IPageWrapperProps {
	children: ReactNode;
	error?: string;
	isFetching?: boolean;
	className?: string;
}

export const PageWrapper = ({
	children,
	error,
	isFetching,
	className,
}: IPageWrapperProps) => {
	let inner = children;

	if (error) {
		inner = (
			<div className='error-message'>
				<p className='error-message__text'>{error}</p>
			</div>
		);
	}

	if (isFetching) {
		inner = (
			<div className='loader'>
				<p className='loader__text'>Loading...</p>
			</div>
		);
	}

	return (
		<div className='page-wrapper'>
			<header></header>
			<aside></aside>
			<main className={className}>{inner}</main>
			<footer></footer>
		</div>
	);
};

import { UserDTO } from './UserDTO';

export interface RepoDTO {
	id: string;
	name: string;
	full_name: string;
	html_url: string;
	stargazers_count: number;
	description: string;
	owner: UserDTO;
	contributors_url: string;
	contributors: UserDTO[];
}

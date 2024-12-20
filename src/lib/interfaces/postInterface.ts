import type { Tag } from "../enums/tagEnum";

export interface IPost {
	post: number;
	draft: boolean;
	title: string;
	summary: string;
	author: string;
	date: Date;
	tags: Tag[];
	image: {
		alt: string;
	};
}

type CommentUser = {
	_id: string;
	name: string;
	avatar: string;
};

export interface CommentType {
	_id: string;
	user: CommentUser;
	comment: string;
	post: string;
	createdAt: string;
}
[];

import './comments.scss';
import { useState } from 'react';
import CommentsItem from '../CommentsItem';
import { CommentType } from '../../../models/comment.interface';
import { useAuthContext } from '../../../context/auth';
import { Comment } from '../../../apis/apis';

type CommentPropsType = {
	data: CommentType[];
	postID: string;
};

const Comments = ({ data, postID }: CommentPropsType) => {
	const [commentsData, setCommentsData] = useState<CommentType[]>(data);
	const [commentContent, setCommentContent] = useState<string>('');
	const { user } = useAuthContext();
	const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setCommentContent(evt.target.value);
	};
	const addComment = async () => {
		const result = await Comment.create({ postID, comment: commentContent });
		if (result.status) {
			setCommentsData([...commentsData, result.data]);
			setCommentContent('');
		}
	};
	return (
		<div className="commentsContainer">
			<div className="commentsContainer__head">
				<div className="commentsContainer__head__avatar">
					<img src={user.avatar} alt="" />
				</div>
				<div className="commentsContainer__head__inputGroup">
					<input type="text" value={commentContent} placeholder="請輸入留言" onChange={handleInputChange} />
					<div className="sendBtn" onClick={addComment}>
						留言
					</div>
				</div>
			</div>
			<div className="commentsContainer__body">
				{commentsData.map((comment) => (
					<CommentsItem
						key={comment._id}
						avatar={comment.user.avatar}
						name={comment.user.name}
						createAt={comment.createdAt}
						comment={comment.comment}
					/>
				))}
			</div>
		</div>
	);
};

export default Comments;

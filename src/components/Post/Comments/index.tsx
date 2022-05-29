import './comments.scss';
import CommentsItem from '../CommentsItem';

const Comments = () => {
	return (
		<div className="commentsContainer">
			<div className="commentsContainer__head">
				<div className="commentsContainer__head__avatar">
					<img src="" alt="" />
				</div>
				<div className="commentsContainer__head__inputGroup">
					<input type="text" placeholder="請輸入留言" />
					<div className="sendBtn">留言</div>
				</div>
			</div>
			<div className="commentsContainer__body">
				<CommentsItem />
			</div>
		</div>
	);
};

export default Comments;

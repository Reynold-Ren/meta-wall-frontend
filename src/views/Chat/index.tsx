import './chat.scss';
import Title from '../../components/Title';
import ChatRoom from '../../components/ChatRoom';

const Chat = () => {
	return (
		<div className="chatContainer">
			<Title wording="六角聊天室" />
			<ChatRoom />
		</div>
	);
};

export default Chat;

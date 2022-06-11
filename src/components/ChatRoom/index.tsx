import './chatRoom.scss';
import React, { useState, useEffect, useRef } from 'react';
import Message from './message';
import { MessageType, EnterRoomType } from '../../models/message.interface';
import { io, Socket } from 'socket.io-client';
import { RiSendPlaneLine } from 'react-icons/ri';
import { Messages } from '../../apis/apis';
import classnames from 'classnames';

const API_URL = process.env.REACT_APP_API_URL;

const ChatRoom = () => {
	const [ws, setWs] = useState<Socket | null>();
	const [messages, setMessages] = useState<MessageType[]>([]);
	const [content, setContent] = useState<string>('');
	const [currentEnterUser, setCurrentEnterUser] = useState<string>('');
	const chatRoom = useRef<null | HTMLDivElement>(null);
	const activeClass = classnames({
		active: currentEnterUser !== '',
		userEnterInfo: true,
	});

	useEffect(() => {
		setWs(io(`${API_URL}`));
		return () => {
			ws?.disconnect();
		};
	}, []);

	useEffect(() => {
		if (ws) {
			const fetchRoomHistory = async () => {
				const result = await Messages.enterRoom({ socketId: ws.id });
				if (result.status) {
					setMessages(result.data);
				}
			};

			ws.on('chat message', (message: MessageType) => {
				setMessages((prevState) => [...prevState, message]);
			});

			ws.on('coming', (data: EnterRoomType) => {
				setCurrentEnterUser(`${data.name} 進入了聊天室`);
				setTimeout(() => {
					setCurrentEnterUser('');
				}, 2000);
			});

			fetchRoomHistory();
		}
	}, [ws]);

	useEffect(() => {
		if (chatRoom.current) {
			chatRoom.current.scrollTop = chatRoom.current.scrollHeight;
		}
	}, [messages]);

	const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setContent(evt.target.value);
	};

	const handleInputKeyPress = async (evt: React.KeyboardEvent<HTMLInputElement>) => {
		if (evt.key === 'Enter' && content !== '') {
			await Messages.send({ content });
			setContent('');
		}
	};

	const handleSendMessage = async () => {
		await Messages.send({ content });
		setContent('');
	};

	return (
		<>
			<div className="chatRoomContainerWrap">
				<div className={activeClass}>{currentEnterUser}</div>
				<div className="chatRoomContainer" ref={chatRoom}>
					{messages.map((message) => (
						<Message
							key={message.createdAt}
							content={message.content}
							userId={message.userId}
							createdAt={message.createdAt}
						/>
					))}
				</div>
			</div>
			<div className="chatRoomInputContainer">
				<input type="text" value={content} onChange={handleInputChange} onKeyPress={handleInputKeyPress} />
				<div className="chatRoomInputContainer__send" onClick={handleSendMessage}>
					<RiSendPlaneLine />
				</div>
			</div>
		</>
	);
};

export default ChatRoom;

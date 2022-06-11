import './donateeList.scss';
import { useState, useEffect } from 'react';
import DonateeListItem from './DonateeListItem';
import { Donate } from '../../apis/apis';
import { UserFieldType } from '../../models/user.interface';

type donateeListType = {
	_id: string;
	userId: UserFieldType;
	donatee: UserFieldType;
	donateNum: number;
	createdAt: string;
};

const DonateeList = () => {
	const [donateeList, setDonateeList] = useState<donateeListType[]>([]);

	useEffect(() => {
		const fetchDonateeList = async () => {
			const result = await Donate.fetchDonateeHisory();
			if (result.status) {
				setDonateeList(result.data);
			}
		};

		fetchDonateeList();
	}, []);
	return (
		<div className="donateeListContainer">
			<h2>六角幣 - 贊助紀錄</h2>
			{donateeList.length === 0 ? (
				<div className="emptyWording">目前尚未有人贊助你 🥲</div>
			) : (
				donateeList.map((item) => (
					<DonateeListItem key={item._id} createdAt={item.createdAt} user={item.userId} coinNum={item.donateNum} />
				))
			)}
		</div>
	);
};

export default DonateeList;

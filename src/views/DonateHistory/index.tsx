import { useState, useEffect } from 'react';
import Title from '../../components/Title';
import ListItem from '../../components/ListItem';
import Empty from '../../components/Empty';
import { Donate } from '../../apis/apis';
import { UserFieldType } from '../../models/user.interface';

type donateListType = {
	_id: string;
	donatee: UserFieldType;
	donateNum: number;
	createdAt: string;
};

const DonateHistory = () => {
	const [donateList, setDonateList] = useState<donateListType[]>([]);
	useEffect(() => {
		const fetchDonateList = async () => {
			const result = await Donate.fetchDonateHisory();
			result.status ? setDonateList(result.data) : [];
		};

		fetchDonateList();
	}, []);

	return (
		<div>
			<Title wording="贊助紀錄" />
			{donateList.length !== 0 ? (
				donateList.map((donateRecord) => <ListItem key={donateRecord._id} type="donate" data={donateRecord} />)
			) : (
				<Empty type="DONATES" />
			)}
		</div>
	);
};

export default DonateHistory;

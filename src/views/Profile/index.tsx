import { useState, FC } from 'react';
import Title from '../../components/Title';
import Tabs from '../../components/Tabs';
import EditProfile from '../../components/Tab/EditProfile';
import ResetPassword from '../../components/Tab/ResetPassword';

type TabsType = {
	label: string;
	index: number;
	Component: FC;
}[];

const tabs: TabsType = [
	{
		label: '修改暱稱',
		index: 1,
		Component: EditProfile,
	},
	{
		label: '重設密碼',
		index: 2,
		Component: ResetPassword,
	},
];

const Profile = () => {
	const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);

	return (
		<div>
			<Title wording="修改個人資料" />
			<Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={tabs} />
		</div>
	);
};

export default Profile;

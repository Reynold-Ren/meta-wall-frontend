import { useState, useEffect } from 'react';
import Title from '../../components/Title';
import PaymentListItem from '../../components/PaymentListItem';
import Empty from '../../components/Empty';
import { Order } from '../../apis/apis';

type addValueListType = {
	_id: string;
	tradeNo: string;
	amt: number;
	paymentType: string;
	payTime: number;
	IP: string;
	payment_status: number;
}[];

const AddValueHistory = () => {
	const [addValueList, setAddValueList] = useState<addValueListType>([]);

	useEffect(() => {
		const fetchAddValueHistory = async () => {
			const result = await Order.fetchAddValueHisory();
			result.status ? setAddValueList(result.data) : [];
		};

		fetchAddValueHistory();
	}, []);

	return (
		<div>
			<Title wording="購買記錄" />
			{addValueList.length !== 0 ? (
				addValueList.map((payment) => <PaymentListItem key={payment._id} data={payment} />)
			) : (
				<Empty type="PAYMENTS" />
			)}
		</div>
	);
};

export default AddValueHistory;

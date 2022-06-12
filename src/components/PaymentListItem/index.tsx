import './paymentListItem.scss';
import { useState } from 'react';
import moment from 'moment';
import { FiArrowRightCircle } from 'react-icons/fi';
import { PRODUCT_AMT } from '../../constants/productItem';
import Modal from 'react-modal';
import { CUSTOM_STYLES } from '../../constants/modalStyle';
import Button from '../Button';

type AddValueItemProps = {
	data: {
		_id: string;
		tradeNo: string;
		amt: number;
		paymentType: string;
		payTime: number;
		IP: string;
		payment_status: number;
	};
};

Modal.setAppElement('#root');

const PaymentListItem = ({ data }: AddValueItemProps) => {
	const [modalIsOpen, setIsOpen] = useState<boolean>(false);
	const { tradeNo, amt, payTime, paymentType, IP, payment_status } = data;

	const timeFormat = (payTime: number) => {
		const theDay = moment(payTime).subtract(8, 'hours');
		return theDay.format('YYYY-MM-DD HH:mm');
	};

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	return (
		<div className="paymentListItemContainer">
			<div className="paymentListItemContainer__info-detail">
				<h3>{PRODUCT_AMT[amt]}</h3>
				<p>購買時間：{timeFormat(payTime)}</p>
			</div>
			<div className="paymentListItemContainer__tools">
				<div className="getPaymentDetailBtn" onClick={openModal}>
					<FiArrowRightCircle />
					<span>查看</span>
				</div>
			</div>
			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={CUSTOM_STYLES} contentLabel="Modal">
				<ul className="paymentDetailContainer">
					<li>
						<h3>交易編號</h3>
						<p>{tradeNo}</p>
					</li>
					<li>
						<h3>產品名稱</h3>
						<p>{PRODUCT_AMT[amt]}</p>
					</li>
					<li>
						<h3>交易金額</h3>
						<p>{amt}</p>
					</li>
					<li>
						<h3>交易時間</h3>
						<p>{timeFormat(payTime)}</p>
					</li>
					<li>
						<h3>交易方式</h3>
						<p>{paymentType === 'CREDIT' ? '信用卡' : '其他'}</p>
					</li>
					<li>
						<h3>IP</h3>
						<p>{IP}</p>
					</li>
					<li>
						<h3>訂單狀態</h3>
						<p>{payment_status === 1 ? '已繳費' : '尚未繳費'}</p>
					</li>
				</ul>
				<Button wording="關閉" style="primary" handleClick={closeModal} />
			</Modal>
		</div>
	);
};

export default PaymentListItem;

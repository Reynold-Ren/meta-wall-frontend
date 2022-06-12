import { useState, useEffect } from 'react';
import Title from '../../components/Title';
import ShopItem from './ShopItem';
import Modal from 'react-modal';
import Button from '../../components/Button';
import './shop.scss';
import { useAuthContext } from '../../context/auth';
import { SHOP_ITEMS } from '../../constants/shopItems';
import { CUSTOM_STYLES } from '../../constants/modalStyle';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_AMT } from '../../constants/productItem';

Modal.setAppElement('#root');

const Shop = () => {
	const [modalIsOpen, setIsOpen] = useState<boolean>(false);
	const [listening, setListening] = useState<boolean>(false);
	const { user, setCoin } = useAuthContext();
	const API_URL = process.env.REACT_APP_API_URL;
	const navigate = useNavigate();

	useEffect(() => {
		if (!listening) {
			const events = new EventSource(`${API_URL}/donate/events?id=${user.id}`);
			events.onmessage = (event) => {
				console.log(event);
				const parsedData = JSON.parse(event.data);
				if (parsedData?.id === user.id) {
					openModal();
					setCoin({ coinNum: PRODUCT_AMT[parsedData?.amt].coinNum });
				}
			};

			setListening(true);
		}
	}, [listening]);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
		navigate('/addValue-history');
	}

	return (
		<div>
			<Title wording="儲值購買六角幣" subTitle="錢錢沒有不見只是變成喜歡的形狀" size="large" />
			<div className="shopContainer">
				{SHOP_ITEMS.map((item, i) => (
					<ShopItem
						key={i}
						title={item.title}
						icon={item.icon}
						coinNum={item.coinNum}
						price={item.price}
						desc={item.itemDesc}
					/>
				))}
			</div>
			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={CUSTOM_STYLES} contentLabel="Modal">
				<h2>儲值成功</h2>
				<p>您已成功購買六角幣</p>
				<Button wording="關閉" style="primary" handleClick={closeModal} />
			</Modal>
		</div>
	);
};

export default Shop;

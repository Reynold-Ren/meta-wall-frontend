import Button from '../../../components/Button';
import { Order } from '../../../apis/apis';

type shopItemProps = {
	title: string;
	icon: string;
	coinNum: string;
	price: number;
	desc: string;
};

const ShopItem = ({ title, icon, coinNum, price, desc }: shopItemProps) => {
	const post = async () => {
		const form = document.createElement('form');
		form.method = 'post';
		form.action = 'https://ccore.newebpay.com/MPG/mpg_gateway';
		form.target = '_blank';

		const result = await Order.create({ email: 'chasel1020@gmail.com', amt: price, desc: desc });

		if (result.status) {
			const { data } = result;
			for (const key in data) {
				if (data.hasOwnProperty(key)) {
					const hiddenField = document.createElement('input');
					hiddenField.type = 'hidden';
					hiddenField.name = key;
					hiddenField.value = data[key];

					form.appendChild(hiddenField);
				}
			}
		}

		document.body.appendChild(form);
		form.submit();
		form.remove();
	};

	return (
		<div className="shopItemContainer">
			<h2>{title}</h2>
			<img src={icon} alt="" />
			<div>
				<h3>六角幣</h3>
				<p>{coinNum}</p>
			</div>
			<div>
				<h3>售價 ( 元 )</h3>
				<p>{price}</p>
			</div>
			<Button wording="前往付款" style="primary" layout="Shop" handleClick={post} />
		</div>
	);
};

export default ShopItem;

type DonatePropsType = {
	coinNum: number;
};

const DonateAddOn = ({ coinNum }: DonatePropsType) => {
	return (
		<div className="donateAddOnContainer">
			{coinNum} <span>枚</span>
		</div>
	);
};

export default DonateAddOn;

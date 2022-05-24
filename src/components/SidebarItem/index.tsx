import './sidebarItem.scss';

type SidebarItemProps = {
	avatar?: string;
	icon?: React.ReactNode;
	wording: string;
	handleClick?: () => void;
};

const SidebarItem = ({ avatar, icon, wording, handleClick }: SidebarItemProps) => {
	return (
		<>
			{icon ? (
				<div onClick={handleClick} className="sidebarItemContainer">
					<div className="sidebarItemContainer__icon">{icon}</div>
					{wording}
				</div>
			) : (
				<div onClick={handleClick} className="sidebarItemContainer">
					<img src={avatar} alt="" className="sidebarItemContainer__avatar" />
					{wording}
				</div>
			)}
		</>
	);
};

export default SidebarItem;

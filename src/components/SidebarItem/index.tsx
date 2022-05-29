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
					<div className="sidebarItemContainer__avatar">
						<img src={avatar} alt="" />
					</div>
					{wording}
				</div>
			)}
		</>
	);
};

export default SidebarItem;

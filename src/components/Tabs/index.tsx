import { FC } from 'react';
import './tabs.scss';

type TabsProps = {
	tabs: {
		label: string;
		index: number;
		Component: FC<{ index: number }>;
	}[];
	selectedTab: number;
	onClick: (index: number) => void;
};

const Tabs = ({ tabs, selectedTab, onClick }: TabsProps) => {
	const Panel = tabs && tabs.find((tab) => tab.index === selectedTab);

	return (
		<div className="tabsContainer">
			<div className="tabsContainer__head">
				{tabs.map((tab) => (
					<button
						className={selectedTab === tab.index ? 'active' : ''}
						onClick={() => onClick(tab.index)}
						key={tab.index}
						type="button"
						tabIndex={selectedTab === tab.index ? 0 : -1}
					>
						{tab.label}
					</button>
				))}
			</div>
			<div className="tabsContainer__body">{Panel && <Panel.Component index={selectedTab} />}</div>
		</div>
	);
};

export default Tabs;

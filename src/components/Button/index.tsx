import React from 'react';
import classnames from 'classnames';
import './button.scss';

type ButtonProps = {
	wording: string;
	disabled?: boolean;
	style: string;
	layout?: string;
	handleClick?: (evt: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({ wording, disabled, style, layout, handleClick }: ButtonProps) => {
	const activeClass = classnames({
		disabled,
		[`is${layout}`]: layout,
		[`${style}`]: true,
		btnContainer: true,
	});
	return (
		<button
			className={activeClass}
			onClick={handleClick}
			disabled={disabled}
			type={style === 'primary' ? 'submit' : 'button'}
		>
			{wording}
		</button>
	);
};

export default Button;

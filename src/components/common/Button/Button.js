import React from 'react';
import './Button.scss'

const Button = ({ title, styleType, onClick, icon, ...props  }) => {
    return (
        <button type="button" className={styleType === 'primary' ? 'btn btn-primary' : 'btn btn-outline-info btn-sm'} onClick={onClick} {...props}>
            {icon && <i className={icon}></i>} {title}
        </button>
    );
}

export default Button;
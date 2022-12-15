import React from 'react';

const modalStyle = {
    width: '600px',
    height: '600px',
    zIndex: 5,
    position: 'fixed',
    background: 'gray',
    opacity: 1,
    top: '100px',
    left: '100px',
};

const Modal = ({username, email, phone, companyName, isOpen, handleClose}) => {
    return (
        <div style={{display: isOpen ? 'block' : 'none', ...modalStyle}}>
            <div>{username}</div>
            <div>{email}</div>
            <div>{phone}</div>
            <div>{companyName}</div>
            <button onClick={handleClose}>close</button>
        </div>
    );
};

export default Modal;
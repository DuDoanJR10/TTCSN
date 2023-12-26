import React from 'react'
import '../styles/Auth.scss';
import { Modal } from 'antd';
import Login from '../components/Login';
import Register from '../components/Register';

const Auth = ({ open, handleCancel, type, showModalRegister, showModalLogin }) => {
    return (
        <div className='Auth'>
            <Modal
                centered
                className='Auth__modal relative'
                open={open}
                onCancel={handleCancel}
                footer={null}
            >
                {type ? <Login handleCancel={handleCancel} showModalRegister={showModalRegister} /> : <Register handleCancel={handleCancel} showModalLogin={showModalLogin} />}
            </Modal>
        </div>
    )
}

export default Auth
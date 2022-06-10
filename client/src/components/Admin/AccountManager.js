import React, { useState, useEffect, useContext } from 'react'
import Table from 'react-bootstrap/Table'
import { AuthContext } from '../../contexts/AuthContext';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import ModalPopup from '../Common/Modal';
import AlertMessage from '../Common/Alert';

export default function AccountManager() {
    const [action, setAction] = useState('');
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState('');
    const [path, setPath] = useState('');
    const [needRender, setNeedRender] = useState(false);
    const [alert, setAlert] = useState(null);
    const { authState: { accounts }
        , getAllAccounts, lockAccount, unlockAccount, deleteAccount } = useContext(AuthContext);

    useEffect(() => getAllAccounts(), []);
    useEffect(() => getAllAccounts(), [needRender]);

    const searchSchema = Yup.object().shape({
        partnerId: Yup.string()
            .required('Vui lòng nhập mã đối tác.')
    })

    const handleOnClick = (value) => {
        setAction(value);
    }

    const handleAction = async (value) => {
        switch (action) {
            case "lock":
                const responseLock = await lockAccount(value);
                if (responseLock.status) {
                    setMsg(responseLock.message);
                    setShow(true);
                    setPath('/admin/account-manager');
                } else {
                    setAlert({ type: 'danger', message: responseLock.message });
                    setTimeout(() => setAlert(null), 5000);
                }
                break;
            case "unlock":
                const responseUnlock = await unlockAccount(value);
                if (responseUnlock.status) {
                    setMsg(responseUnlock.message);
                    setShow(true);
                    setPath('/admin/account-manager');
                } else {
                    setAlert({ type: 'danger', message: responseUnlock.message });
                    setTimeout(() => setAlert(null), 5000);
                }
                break;
            case "delete":
                const responseDelete = await deleteAccount(value);
                if (responseDelete.status) {
                    setMsg(responseDelete.message);
                    setShow(true);
                    setPath('/admin/account-manager');
                } else {
                    setAlert({ type: 'danger', message: responseDelete.message });
                    setTimeout(() => setAlert(null), 5000);
                }
                break;
        }
    }
    return (
        <div className="account-manager">
            <h1 className="auth-title">QUẢN LÝ TÀI KHOẢN</h1>
            <Formik initialValues={{ partnerId: '' }}
                validationSchema={searchSchema}
                onSubmit={values => handleAction(values.partnerId)}
            >
                {({ errors, touched }) => (
                    <Form>
                        <AlertMessage info={alert} />
                        <div className="mb-3 search">
                            <label style={{ fontWeight: 'bold' }}>Mã đối tác</label>
                            <Field type="text" name="partnerId" className="inputArea" />
                            {errors.partnerId && touched.partnerId ? (<p className="text-validate">{errors.partnerId}
                            </p>) : null}
                        </div>
                        <div className="feature">
                            <Button variant="primary" type="submit" className="feature-item" onClick={handleOnClick.bind(this, "unlock")}>
                                Kích hoạt
                            </Button>
                            <Button variant="warning" type="submit" className="feature-item" onClick={handleOnClick.bind(this, "lock")}>
                                Vô hiệu hóa
                            </Button>
                            <Button variant="danger" type="submit" className="feature-item" onClick={handleOnClick.bind(this, "delete")}>
                                Xóa tài khoản
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
            <Table striped bordered hover style={{ fontSize: '15px', marginTop: '30px' }}>
                <thead>
                    <tr><th colSpan="12">DANH SÁCH TẤT CẢ TÀI KHOẢN TRÊN HỆ THỐNG</th></tr>
                    <tr style={{ fontSize: '11.8px' }}>
                        <th>MÃ ĐỐI TÁC</th>
                        <th>TÊN ĐĂNG NHẬP</th>
                        <th>ĐỊA CHỈ EMAIL</th>
                        <th>HỌ VÀ TÊN</th>
                        <th>ĐỊA CHỈ</th>
                        <th>NGÀY SINH</th>
                        <th>CMND/CCCD</th>
                        <th>SĐT</th>
                        <th>GIỚI TÍNH</th>
                        <th>VAI TRÒ</th>
                        <th>TRẠNG THÁI</th>
                        <th>VÙNG</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map(account => {
                        let userRole;
                        switch (account.role) {
                            case 0:
                                userRole = 'Quản trị viên';
                                break;
                            case 1:
                                userRole = 'Người mua';
                                break;
                            case 2:
                                userRole = 'Người bán';
                                break;
                            case 3:
                                userRole = 'Người giao hàng';
                                break;
                        }
                        let area;
                        switch (account.area) {
                            case 0:
                                area = "Đỏ";
                                break;
                            case 1:
                                area = "Vàng";
                                break;
                            case 2:
                                area = "Xanh";
                                break;
                            default:
                                area = "Chưa xác định";
                                break;
                        }
                        return (
                            <tr key={account.id}>
                                <td>{account.id}</td>
                                <td>{account.username}</td>
                                <td>{account.email}</td>
                                <td>{account.fullName}</td>
                                <td>{account.address}</td>
                                <td>{account.dateOfBirth}</td>
                                <td>{account.identityNumber}</td>
                                <td>{account.phone}</td>
                                <td>{account.gender}</td>
                                <td>{userRole}</td>
                                <td>{account.isLocked ? 'Vô hiệu hóa' : 'Đang hoạt động'}</td>
                                <td>{area}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            {show ? <ModalPopup msg={msg} path={path} show={show} setShow={setShow} needRender={needRender} setNeedRender={setNeedRender} /> : null}
        </div>
    )
}

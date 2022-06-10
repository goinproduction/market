import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from './Alert';
import back from '../../assets/img/back.png';
export default function Login() {

    const { loginUser } = useContext(AuthContext);
    const [alert, setAlert] = useState(null);
    const redirect = useHistory();
    const LoginSchema = Yup.object().shape({
        username: Yup.string()
            .required('Vui lòng nhập trường này.'),
        password: Yup.string()
            .min(5, 'Mật khẩu phải từ 5 đến 60 kí tự.')
            .max(60, 'Mật khẩu phải từ 5 đến 60 kí tự.')
            .required('Vui lòng nhập mật khẩu.'),
    });

    const login = async (data) => {
        try {
            const loginData = await loginUser(data);
            console.log(loginData);
            if (loginData.error) {
                setAlert({ type: 'danger', message: 'Tài khoản hoặc mật khẩu chưa chính xác!' });
                setTimeout(() => setAlert(null), 5000);
            } else if (loginData.isLocked) {
                setAlert({ type: 'danger', message: 'Tài khoản của bạn đã bị khóa, vui lòng liên hệ nhà cung cấp dịch vụ!' });
                setTimeout(() => setAlert(null), 5000);
            } else {
                switch (loginData.role) {
                    case 1:
                        redirect.push('/');
                        break;
                    case 0:
                        redirect.push('/admin')
                        break;
                    case 2:
                        redirect.push('/seller')
                        break
                    case 3:
                        redirect.push('/shipper')
                        break
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="auth">
            <img src={back} className="back-icon" onClick={() => redirect.push('/')} />
            <h1 className="auth-title">ĐĂNG NHẬP VÀO HỆ THỐNG</h1>
            <Container style={{ maxWidth: '400px', margin: '0 auto' }}>
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={LoginSchema}
                    onSubmit={values => login(values)}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <AlertMessage info={alert} style={{ textAlign: 'center' }} />
                            <div className="mb-3">
                                <label>Tên đăng nhập</label>
                                <Field type="text" name="username" className="inputArea" />
                                {errors.username && touched.username ? (<p className="text-validate">{errors.username}
                                </p>) : null}
                            </div>

                            <div className="mb-3">
                                <label>Mật khẩu</label>
                                <Field type="password" name="password" className='inputArea' />
                                {errors.password && touched.password ? (<p className="text-validate">{errors.password}
                                </p>) : null}
                            </div>
                            <Button variant="primary" type="submit">
                                Đăng nhập
                            </Button>
                        </Form>
                    )}
                </Formik>
                <p className='mt-3'>
                    Bạn chưa có tài khoản?
                    <Link to='/register'>
                        <Button variant='danger' size='md' className='ms-2'>
                            Đăng ký
                        </Button>
                    </Link>
                </p>
            </Container>
        </div>
    )
}

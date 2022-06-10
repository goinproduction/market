import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from './Alert';
import back from '../../assets/img/back.png';

export default function Register() {

    const { registerUser } = useContext(AuthContext);
    const [alert, setAlert] = useState(null);
    const redirect = useHistory();
    const RegisterSchema = Yup.object().shape({
        email: Yup.string()
            .email('Địa chỉ email không hợp lệ.')
            .required('Vui lòng nhập trường này.'),
        full_name: Yup.string()
            .required('Vui lòng nhập trường này.'),
        phone: Yup.string()
            .required("Vui lòng nhập trường này."),
        identity_number: Yup.string()
            .required("Vui lòng nhập số chứng minh nhân dân."),
        address: Yup.string()
            .required("Vui lòng nhập địa chỉ."),
        password: Yup.string()
            .min(5, 'Mật khẩu phải từ 5 đến 60 kí tự.')
            .max(60, 'Mật khẩu phải từ 5 đến 60 kí tự.')
            .required('Vui lòng nhập mật khẩu.'),
        confirm_password: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Mật khẩu chưa khớp.')
            .required('Vui lòng nhập trường này.'),
        termsOfService: Yup.boolean().oneOf([true], 'Vui lòng chấp nhận điều khoản sử dụng.'),
        road_name: Yup.string()
            .required("Vui lòng nhập tên đường."),
        apartment_number: Yup.string()
            .required("Vui lòng nhập số nhà."),
        username: Yup.string()
            .required("Vui lòng điền tên đăng nhập.")
    });

    const [gender, setGender] = useState('Nam');
    const [dateOfBirth, setDateOfBirth] = useState();
    const [frontIdentity, setFrontIdentity] = useState();
    const [behindIdentity, setBehindIdentity] = useState();

    const front_identity = () => {
        var file = document.querySelector(
            '#front')['files'][0];

        var reader = new FileReader();

        reader.onload = function () {
            setFrontIdentity(reader.result.replace("data:", "")
                .replace(/^.+,/, ""));
        }
        reader.readAsDataURL(file);
    }

    const behind_identity = () => {
        var file = document.querySelector(
            '#behind')['files'][0];

        var reader = new FileReader();

        reader.onload = function () {
            setBehindIdentity(reader.result.replace("data:", "")
                .replace(/^.+,/, ""));
        }
        reader.readAsDataURL(file);
    }

    const register = async (data) => {
        data["gender"] = gender;
        data["date_of_birth"] = dateOfBirth;
        data["front_identity"] = frontIdentity;
        data["behind_identity"] = behindIdentity;

        try {
            await registerUser(data);
        } catch (error) {
            setAlert({ type: 'danger', message: error.message });
            setTimeout(() => setAlert(null), 5000);
        }

        redirect.push('/login');
    }
    return (
        <div className="auth">
            <img src={back} className="back-icon" alt="back-icon" onClick={() => redirect.push('/')} />
            <h1 className="auth-title">ĐĂNG KÝ TÀI KHOẢN HỆ THỐNG</h1>
            <Container style={{ maxWidth: '700px', margin: '0 auto' }}>
                <Formik
                    initialValues={{ email: '', full_name: '', identity_number: '', address: '', password: '', road_name: '', apartment_number: '', username: '', phone: '' }}
                    validationSchema={RegisterSchema}
                    onSubmit={values => register(values)}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <AlertMessage info={alert} style={{ textAlign: 'center' }} />
                            <p className="title">Thông tin cá nhân</p>
                            <div className="mb-3">
                                <label>Họ và tên</label>
                                <Field type="text" name="full_name" className="inputArea" />
                                {errors.full_name && touched.full_name ? (<p className="text-validate">{errors.full_name}
                                </p>) : null}
                            </div>
                            <div className="mb-3">
                                <label>Giới tính</label>
                                <select name="gender" className='form-select' defaultValue="Chọn giới tính" onChange={(e) => setGender(e.target.value)}>
                                    <option value='Nam'>Nam</option>
                                    <option value='Nữ'>Nữ</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label>CMND/CCCD</label>
                                <Field type="text" name="identity_number" className='inputArea' />
                                {errors.identity_number && touched.identity_number ? (<p className="text-validate">{errors.identity_number}
                                </p>) : null}
                            </div>
                            <div className="mb-3">
                                <label>Ảnh mặt trước CMND/CCCD</label><br />
                                <input type="file" id="front" onChange={front_identity} />
                            </div>
                            <div className="mb-3">
                                <label>Ảnh mặt sau CMND/CCCD</label><br />
                                <input type="file" id="behind" onChange={behind_identity} />
                            </div>
                            <div className="mb-3">
                                <label>Ngày sinh</label>
                                <input type="date" name="dateOfBirth" className='inputArea' onChange={(e) => setDateOfBirth(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label>Số điện thoại</label>
                                <Field type="text" name="phone" className='inputArea' />
                                {errors.phone && touched.phone ? (<p className="text-validate">{errors.phone}
                                </p>) : null}
                            </div>
                            <p className="title">Thông tin địa chỉ</p>
                            <div className="mb-3">
                                <label>Địa chỉ</label>
                                <Field type="text" name="address" className='inputArea' />
                                {errors.address && touched.address ? (<p className="text-validate">{errors.address}
                                </p>) : null}
                            </div>
                            <div className="mb-3">
                                <label>Đường</label>
                                <Field type="text" name="road_name" className='inputArea' />
                                {errors.road_name && touched.road_name ? (<p className="text-validate">{errors.road_name}
                                </p>) : null}
                            </div>
                            <div className="mb-3">
                                <label>Số nhà</label>
                                <Field type="text" name="apartment_number" className='inputArea' />
                                {errors.apartment_number && touched.apartment_number ? (<p className="text-validate">{errors.apartment_number}
                                </p>) : null}
                            </div>
                            <p className="title">Thông tin tài khoản</p>
                            <div className="mb-3">
                                <label>Email</label>
                                <Field type="text" name="email" className='inputArea' />
                                {errors.email && touched.email ? (<p className="text-validate">{errors.email}
                                </p>) : null}
                            </div>

                            <div className="mb-3">
                                <label>Tên đăng nhập</label>
                                <Field type="text" name="username" className='inputArea' />
                                {errors.username && touched.username ? (<p className="text-validate">{errors.username}
                                </p>) : null}
                            </div>

                            <div className="mb-3">
                                <label>Mật khẩu</label>
                                <Field type="password" name="password" className='inputArea' />
                                {errors.password && touched.password ? (<p className="text-validate">{errors.password}
                                </p>) : null}
                            </div>
                            <div className="mb-3">
                                <label>Xác nhận mật khẩu</label>
                                <Field type="password" name="confirm_password" className='inputArea' />
                                {errors.confirm_password && touched.confirm_password ? (<p className="text-validate">{errors.confirm_password}
                                </p>) : null}
                            </div>
                            <div className="mb-3">
                                <p className="title">Xác nhận thông tin</p>
                                <div className="rule-text">
                                    <p style={{ fontWeight: '500', fontSize: '20px' }}>Điều khoản dịch vụ</p>

                                    Người đăng kí đồng ý rằng Nhà cung cấp có thể sử dụng thông tin trên đây để thực hiện dịch vụ sau:

                                    <ol>
                                        <li>Mở tài khoản trên hệ thống.</li>
                                    </ol>
                                    Lưu ý:

                                    <ol>
                                        <li>Nhà cung cấp sẽ tự động tạo tên đăng nhập khi tạo tài khoản, bạn có thể chỉnh sửa (nếu cần).</li>
                                        <li>Nhà cung cấp sẽ lấy thông tin của bạn để điều phối giao hàng.</li>
                                    </ol>
                                </div>
                                <div className='rules'>
                                    <input type="checkbox" className="rule-left" name='termsOfService' />
                                    <p className="rule-right">Tôi đã đọc và chấp nhận các điều khoản dịch vụ của Nhà cung cấp.</p>
                                </div>
                            </div>
                            <Button variant="primary" type="submit">
                                Đăng ký
                            </Button>
                        </Form>
                    )}
                </Formik>
                <p className='mt-3'>
                    Bạn đã có tài khoản?
                    <Link to='/login'>
                        <Button variant='danger' size='md' className='ms-2'>
                            Đăng nhập
                        </Button>
                    </Link>
                </p>
            </Container>
        </div>
    )
}

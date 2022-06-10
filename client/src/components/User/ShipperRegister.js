import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { AuthContext } from '../../contexts/AuthContext';
import { PartnerContext } from '../../contexts/PartnerContext';
import ModalPopup from '../Common/Modal';
import back from '../../assets/img/back.png';

export default function ShipperRegister() {
    const { authState: { userId } } = useContext(AuthContext);
    const { registerShipper } = useContext(PartnerContext);
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState('');
    const [path, setPath] = useState('');
    const [needRender, setNeedRender] = useState(false);
    const redirect = useHistory();

    const [frontLicense, setFrontLicense] = useState();
    const [behindLicense, setBehindLicense] = useState();
    const [vaccineCer, setVaccineCer] = useState();

    const front_lisence = () => {
        var file = document.querySelector(
            '#front_dri')['files'][0];

        var reader = new FileReader();

        reader.onload = function () {
            setFrontLicense(reader.result.replace("data:", "")
                .replace(/^.+,/, ""));
        }
        reader.readAsDataURL(file);
    }

    const behind_lisence = () => {
        var file = document.querySelector(
            '#behind_dri')['files'][0];

        var reader = new FileReader();

        reader.onload = function () {
            setBehindLicense(reader.result.replace("data:", "")
                .replace(/^.+,/, ""));
        }
        reader.readAsDataURL(file);
    }

    const vaccine = () => {
        var file = document.querySelector(
            '#vaccine')['files'][0];

        var reader = new FileReader();

        reader.onload = function () {
            setVaccineCer(reader.result.replace("data:", "")
                .replace(/^.+,/, ""));
        }
        reader.readAsDataURL(file);
    }
    const ShipperSchema = Yup.object().shape({
        bankAccountNumber: Yup.number()
            .required('Vui lòng nhập số tài khoản.'),
        bankName: Yup.string()
            .required('Vui lòng nhập tên ngân hàng.'),
        driverLicense: Yup.number()
            .required("Vui lòng nhập số GPLX.")
    });

    const register = async (data) => {
        try {
            data["shipperId"] = userId;
            data["frontLicense"] = frontLicense;
            data["behindLicense"] = behindLicense;
            data["vaccineCer"] = vaccineCer;
            const registerData = await registerShipper(data);
            if (registerData.status) {
                setMsg(registerData.message);
                setShow(true);
                setPath('/');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="auth">
            <img src={back} className="back-icon" onClick={() => redirect.push('/')} />
            <h1 className="auth-title">ĐĂNG KÝ GIAO HÀNG</h1>
            <Container style={{ margin: '0 auto' }}>
                <Formik
                    initialValues={{ driverLicense: '', bankAccountNumber: '', bankName: '' }}
                    validationSchema={ShipperSchema}
                    onSubmit={values => register(values)}
                >
                    {({ errors, touched }) => (
                        <>
                            <Form>
                                <div className="form">
                                    <p className="title">Thông tin đăng ký</p>
                                    <div className="mb-3">
                                        <label>Giấy phép lái xe hạng A1/A2</label>
                                        <Field type="text" name="driverLicense" className='inputArea' />
                                        {errors.driverLicense && touched.driverLicense ? (<p className="text-validate">{errors.driverLicense}
                                        </p>) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label>Ảnh mặt trước GPLX</label><br />
                                        <input type="file" id="front_dri" onChange={front_lisence} />
                                    </div>
                                    <div className="mb-3">
                                        <label>Ảnh mặt sau GPLX</label><br />
                                        <input type="file" id="behind_dri" onChange={behind_lisence} />
                                    </div>
                                    <div className="mb-3">
                                        <label>Số tài khoản</label>
                                        <Field type="text" name="bankAccountNumber" className='inputArea' />
                                        {errors.bankAccountNumber && touched.bankAccountNumber ? (<p className="text-validate">{errors.bankAccountNumber}
                                        </p>) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label>Tên ngân hàng</label>
                                        <Field type="text" name="bankName" className='inputArea' />
                                        {errors.bankName && touched.bankName ? (<p className="text-validate">{errors.bankName}
                                        </p>) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label>Giấy chứng nhận tiêm chủng vaccine</label><br />
                                        <input type="file" id="vaccine" onChange={vaccine} />
                                    </div>
                                    <div className="mb-3">
                                        <p className="title">Xác nhận thông tin</p>
                                        <div className="rule-text">
                                            <p style={{ fontWeight: '500', fontSize: '20px' }}>Điều khoản dịch vụ</p>

                                            Người đăng kí đồng ý rằng Nhà cung cấp có thể sử dụng thông tin trên đây để thực hiện dịch vụ sau:

                                            <ol>
                                                <li>Mở tài khoản giao hàng trên hệ thống.</li>
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
                                        Đăng ký giao hàng
                                    </Button>
                                </div>
                            </Form>
                            {show ? <ModalPopup msg={msg} path={path} show={show} setShow={setShow} needRender={needRender} setNeedRender={setNeedRender} /> : null}
                        </>
                    )}
                </Formik>
            </Container>
        </div>
    )
}

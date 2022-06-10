import { useContext, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { AuthContext } from '../../contexts/AuthContext';
import { PartnerContext } from '../../contexts/PartnerContext';
import ModalPopup from '../Common/Modal';
import back from '../../assets/img/back.png';
import { useHistory } from 'react-router-dom';

export default function GroceryRegister() {
    const { authState: { userId } } = useContext(AuthContext);
    const { registerGrocery } = useContext(PartnerContext);
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState('');
    const [path, setPath] = useState('');
    const redirect = useHistory();
    const [needRender, setNeedRender] = useState(false);
    const [typeOfBusiness, setTypeOfBusiness] = useState();
    const [businessField, setBusinessField] = useState();

    const SellerSchema = Yup.object().shape({
        name: Yup.string()
            .required('Vui lòng nhập tên cửa hàng.'),
        groAddress: Yup.string()
            .required('Vui lòng nhập địa chỉ cửa hàng.'),
        groRoadName: Yup.string()
            .required("Vui lòng nhập tên đường"),
        groApartmentNumber: Yup.string()
            .required("Vui lòng nhập số nhà."),
        taxNumber: Yup.string()
            .required('Vui lòng nhập mã số thuế.'),
        availbleProduct: Yup.number()
            .required("Vui lòng nhập số lượng sản phẩm có sẵn."),
        avgAvailbleProduct: Yup.number()
            .required("Vui lòng nhập số lượng tồn kho có sẵn."),
        avgOrder: Yup.number()
            .required("Vui lòng nhập số lượng đơn hàng trung bình mỗi ngày.")
    });

    const register = async (data) => {
        try {
            data["sellerId"] = userId;
            data["typeOfBusiness"] = typeOfBusiness;
            data["businessField"] = businessField;
            const registerData = await registerGrocery(data);
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
            <h1 className="auth-title">ĐĂNG KÝ BÁN HÀNG</h1>
            <Container style={{ margin: '0 auto' }}>
                <Formik
                    initialValues={{ name: '', groAddress: '', groRoadName: '', groApartmentNumber: '', taxNumber: '', availbleProduct: '', avgAvailbleProduct: '', avgOrder: '' }}
                    validationSchema={SellerSchema}
                    onSubmit={values => register(values)}
                >
                    {({ errors, touched }) => (
                        <>
                            <Form>
                                <div className='form'>
                                    <p className="title">Thông tin cửa hàng</p>
                                    <div className="mb-3">
                                        <label>1. Tên cửa hàng *</label>
                                        <Field type="text" name="name" className="inputArea" />
                                        {errors.name && touched.name ? (<p className="text-validate">{errors.name}
                                        </p>) : null}
                                    </div>

                                    <div className="mb-3">
                                        <label>2. Địa chỉ *</label>
                                        <Field type="text" name="groAddress" className='inputArea' />
                                        {errors.groAddress && touched.groAddress ? (<p className="text-validate">{errors.groAddress}
                                        </p>) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label>3. Đường *</label>
                                        <Field type="text" name="groRoadName" className='inputArea' />
                                        {errors.groRoadName && touched.groRoadName ? (<p className="text-validate">{errors.groRoadName}
                                        </p>) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label>4. Số nhà *</label>
                                        <Field type="text" name="groApartmentNumber" className='inputArea' />
                                        {errors.groApartmentNumber && touched.groApartmentNumber ? (<p className="text-validate">{errors.groApartmentNumber}
                                        </p>) : null}
                                    </div>
                                    <p className="title">Thông tin kinh doanh</p>
                                    <div className="mb-3">
                                        <label>1. Loại hình kinh doanh *</label>
                                        <select name="type_of_business" className='form-select' defaultValue="Chọn loại hình" onChange={(e) => setTypeOfBusiness(e.target.value)}>
                                            <option value='Tư nhân'>Tư nhân</option>
                                            <option value='Liên doanh'>Liên doanh</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label>2. Lĩnh vực kinh doanh *</label>
                                        <select name="fieldBusiness" className='form-select' defaultValue="Chọn lĩnh vực" onChange={(e) => setBusinessField(e.target.value)}>
                                            <option value='Thịt, cá, hải sản'>Thịt, cá, hải sản</option>
                                            <option value='Sữa tươi'>Sữa tươi</option>
                                            <option value='Nước ngọt'>Nước ngọt</option>
                                            <option value='Mì ăn liền'>Mì ăn liền</option>
                                            <option value='Dầu ăn'>Dầu ăn</option>
                                            <option value='Rau củ'>Rau củ</option>
                                            <option value='Gạo'>Gạo</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label>3. Số lượng sản phẩm hiện có?* (Nếu bạn bán mì tôm 3 miền, mì tôm hảo hảo được tính là có 2 sản phẩm hiện có)</label>
                                        <Field type="text" name="availbleProduct" className="inputArea" />
                                        {errors.availbleProduct && touched.availbleProduct ? (<p className="text-validate">{errors.availbleProduct}
                                        </p>) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label>4. Số lượng tồn kho TRUNG BÌNH trên mỗi sản phẩm *</label>
                                        <Field type="text" name="avgAvailbleProduct" className="inputArea" />
                                        {errors.avgAvailbleProduct && touched.avgAvailbleProduct ? (<p className="text-validate">{errors.avgAvailbleProduct}
                                        </p>) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label>5. Số lượng đơn hàng TRUNG BÌNH MỖI NGÀY trong khoảng 30 ngày gần nhất *</label>
                                        <Field type="text" name="avgOrder" className="inputArea" />
                                        {errors.avgOrder && touched.avgOrder ? (<p className="text-validate">{errors.avgOrder}
                                        </p>) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label>6. Mã số thuế *</label>
                                        <Field type="text" name="taxNumber" className="inputArea" />
                                        {errors.taxNumber && touched.taxNumber ? (<p className="text-validate">{errors.taxNumber}
                                        </p>) : null}
                                    </div>
                                    <div className="mb-3">
                                        <p className="title">Xác nhận thông tin</p>
                                        <div className="rule-text">
                                            <p style={{ fontWeight: '500', fontSize: '20px' }}>Điều khoản dịch vụ</p>

                                            Người đăng kí đồng ý rằng Nhà cung cấp có thể sử dụng thông tin trên đây để thực hiện dịch vụ sau:

                                            <ol>
                                                <li>Mở tài khoản bán hàng trên hệ thống.</li>
                                                <li>Đăng tải sản phẩm.</li>
                                            </ol>
                                            Lưu ý:

                                            <ol>
                                                <li>Nhà cung cấp sẽ tự động tạo tên đăng nhập khi tạo tài khoản, bạn có thể chỉnh sửa (nếu cần).</li>
                                                <li>Nhà cung cấp sẽ tự động bật tất cả đơn vị vận chuyện hiện có, bạn có thể chỉnh sửa (nếu cần).</li>
                                                <li>Mỗi sản phẩm được đăng tải sẽ có kho bằng 1, bạn có thể chỉnh sửa (nếu cần).</li>
                                            </ol>
                                        </div>
                                        <div className='rules'>
                                            <input type="checkbox" className="rule-left" name='termsOfService' />
                                            <p className="rule-right">Tôi đã đọc và chấp nhận các điều khoản dịch vụ của Nhà cung cấp.</p>
                                        </div>
                                    </div>
                                    <Button variant="primary" type="submit">
                                        Hoàn tất đăng ký
                                    </Button>
                                </div>
                            </Form>
                        </>
                    )}
                </Formik>
            </Container>
            {show ? <ModalPopup msg={msg} path={path} show={show} setShow={setShow} needRender={needRender} setNeedRender={setNeedRender} /> : null}
        </div >
    )
}

import { useContext, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { AuthContext } from '../../contexts/AuthContext';
import { PartnerContext } from '../../contexts/PartnerContext';
import back from '../../assets/img/back.png';
import { useHistory } from 'react-router-dom';

export default function SellerRegister() {
    const { authState: { userId } } = useContext(AuthContext);
    const { registerSeller } = useContext(PartnerContext);
    const redirect = useHistory();

    const [businessCer, setBusinessCer] = useState();

    const SellerSchema = Yup.object().shape({
    });

    const register = async (data) => {
        try {
            console.log(data);
            data["sellerId"] = userId;
            data["businessCer"] = businessCer;
            await registerSeller(data);
            redirect.push('/grocery-register');
        } catch (error) {
            console.log(error);
        }
    }

    const business = () => {
        var file = document.querySelector(
            '#business_cer')['files'][0];

        var reader = new FileReader();

        reader.onload = function () {
            setBusinessCer(reader.result.replace("data:", "")
                .replace(/^.+,/, ""));
        }
        reader.readAsDataURL(file);
    }

    return (
        <div className="auth">
            <img src={back} className="back-icon" onClick={() => redirect.push('/')} />
            <h1 className="auth-title">ĐĂNG KÝ BÁN HÀNG</h1>
            <Container style={{ margin: '0 auto' }}>
                <Formik
                    initialValues={{}}
                    validationSchema={SellerSchema}
                    onSubmit={values => register(values)}
                >
                    {({ errors, touched }) => (
                        <>
                            <Form>
                                <div className='form'>
                                    <div className="mb-3">
                                        <label>Giấy phép kinh doanh</label><br />
                                        <input type="file" id="business_cer" onChange={business} />
                                    </div>
                                    <Button variant="primary" type="submit">
                                        Tiếp theo
                                    </Button>
                                </div>
                            </Form>
                        </>
                    )}
                </Formik>
            </Container>
        </div >
    )
}

import React, { useState, useEffect, useContext } from 'react'
import Table from 'react-bootstrap/Table'
import { AuthContext } from '../../contexts/AuthContext';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import ModalPopup from '../Common/Modal';
import AlertMessage from '../Common/Alert';
import Form from 'react-bootstrap/Form';
import { PartnerContext } from '../../contexts/PartnerContext';

export default function RegistrationManager() {
    const { partnerState: { unaccepted }, getUnacceptedSellers,
        getUnacceptedSellerById, deleteGroBySellerId,
        deleteSellerById, updateUserAccepted, updateSellerRoleById } = useContext(PartnerContext);
    const [partnerId, setPartnerId] = useState();
    const [alert, setAlert] = useState(null);
    const [partnerById, setPartnerById] = useState(null);
    const [needRender, setNeedRender] = useState(false);
    const [partner, setPartner] = useState({
        seller_id: "",
        full_name: "",
        phone: "",
        gender: "",
        date_of_birth: "",
        identity_number: "",
        front_identity: "",
        behind_identity: "",
        address: "",
        road_name: "",
        apartment_number: "",
        business_cer: "",
        name: "",
        gro_address: "",
        gro_road_name: "",
        gro_apartment_number: "",
        type_of_business: "",
        business_field: "",
        availble_product: "",
        avg_availble_product: "",
        avg_order: "",
        tax_number: ""
    });
    useEffect(() => {
        getUnacceptedSellers();
    }, [])

    useEffect(() => {
        getUnacceptedSellers();
    }, [needRender])

    useEffect(() => {
        handleFetchPartnerById();
    }, [partnerById]);

    const handleFetchPartnerById = async () => {
        if (partnerById !== null) {
            await partnerById.map(p => {
                setPartner(p);
            })
            handleConvertBase64();
        } else {
            setPartner({
                seller_id: "",
                full_name: "",
                phone: "",
                gender: "",
                date_of_birth: "",
                identity_number: "",
                front_identity: "",
                behind_identity: "",
                address: "",
                road_name: "",
                apartment_number: "",
                business_cer: "",
                name: "",
                gro_address: "",
                gro_road_name: "",
                gro_apartment_number: "",
                type_of_business: "",
                business_field: "",
                availble_product: "",
                avg_availble_product: "",
                avg_order: "",
                tax_number: ""
            })
        }
    }

    const handleConvertBase64 = async () => {
        document.getElementById('frontIdentity').setAttribute('src', `data:image/jpg;base64,${partner.front_identity}`);
        document.getElementById('behindIdentity').setAttribute('src', `data:image/jpg;base64,${partner.behind_identity}`);
        document.getElementById('businessCer').setAttribute('src', `data:image/jpg;base64,${partner.business_cer}`);
    }

    const handleSearchClick = async (e) => {
        e.preventDefault();
        try {
            const object = await getUnacceptedSellerById(partnerId);
            if (object.status === false) {
                setAlert({ type: 'danger', message: object.message });
                setTimeout(() => setAlert(null), 3000);
            } else {
                setPartnerById(object);
            }
        } catch (error) {
            setAlert({ type: 'danger', message: 'Internal Server Error' });
            setTimeout(() => setAlert(null), 3000);
        }
    }

    const handleAccept = async (e) => {
        // Cập nhật role = 2
        // Cập nhật is_accepted = true
        e.preventDefault();
        try {
            await updateUserAccepted(partnerId);
            await updateSellerRoleById(partnerId);
            setAlert({ type: 'success', message: 'Đơn đăng ký bán hàng đã được chấp nhận!' });
            setTimeout(() => setAlert(null), 3000);
            setNeedRender(!needRender);
        } catch (error) {
            setAlert({ type: 'danger', message: 'Internal Server Error' });
            setTimeout(() => setAlert(null), 3000);
        }
    }

    const handleReject = async (e) => {
        // Xóa seller 
        // Xóa grocery
        e.preventDefault();
        try {
            await deleteGroBySellerId(partnerId);
            await deleteSellerById(partnerId);
            setAlert({ type: 'success', message: 'Đã hủy bỏ đơn đăng ký bán hàng!' });
            setTimeout(() => setAlert(null), 3000);
            setNeedRender(!needRender);
        } catch (error) {
            setAlert({ type: 'danger', message: 'Internal Server Error' });
            setTimeout(() => setAlert(null), 3000);
        }
    }

    return (
        <div className='registration'>
            <h1 className="auth-title">XÉT DUYỆT ĐĂNG KÝ BÁN HÀNG</h1>
            <Table striped bordered hover style={{ fontSize: '13px', marginTop: '30px' }}>
                <thead>
                    <tr style={{ fontSize: '15px', marginTop: '30px' }}><th colSpan="11">DANH SÁCH ĐỐI TÁC BÁN HÀNG CHƯA ĐƯỢC DUYỆT</th></tr>
                    <tr style={{ fontSize: '11.8px' }}>
                        <th>MÃ ĐỐI TÁC</th>
                        <th>ĐỊA CHỈ EMAIL</th>
                        <th>HỌ VÀ TÊN</th>
                        <th>SĐT</th>
                        <th>GIỚI TÍNH</th>
                        <th>CMND/CCCD</th>
                        <th>ĐỊA CHỈ NGƯỜI BÁN</th>
                        <th>MÃ CỬA HÀNG</th>
                        <th>TÊN CỬA HÀNG</th>
                        <th>ĐỊA CHỈ CỬA HÀNG</th>
                        <th>VÙNG</th>
                    </tr>
                </thead>
                <tbody>
                    {unaccepted.map(u => {
                        let area;
                        switch (u.area) {
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
                            <tr key={u.id}>
                                <td>{u.seller_id}</td>
                                <td>{u.email}</td>
                                <td>{u.full_name}</td>
                                <td>{u.phone}</td>
                                <td>{u.gender}</td>
                                <td>{u.identity_number}</td>
                                <td>{u.address}</td>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.gro_address}</td>
                                <td>{area}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Form>
                <AlertMessage info={alert} />
                <div className="mb-3 search">
                    <label style={{ fontWeight: 'bold' }}>Mã đối tác</label>
                    <input type="text" name="partnerId" className="inputArea" onChange={(e) => setPartnerId(e.target.value)} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button variant="primary" type="submit" onClick={handleSearchClick}>
                        Xem chi tiết
                    </Button>
                </div>
            </Form>
            <div>
                <p className='detail'>Thông tin chi tiết</p>
                <Form>
                    <div className="form-update">
                        <div className="form-left">
                            <p className="title">Thông tin người bán</p>
                            <div className="mb-3 disable-input">
                                <label>1. Mã đối tác</label>
                                <input type="text" className="inputArea" defaultValue={partner.seller_id} />
                            </div>
                            <div className="mb-3 disable-input">
                                <label>2. Họ và tên</label>
                                <input type="text" className="inputArea" defaultValue={partner.full_name} />
                            </div>
                            <div className="mb-3 disable-input">
                                <label>3. Số điện thoại</label>
                                <input type="text" className="inputArea" defaultValue={partner.phone} />
                            </div>
                            <div className="mb-3 disable-input">
                                <label>4. Giới tính</label>
                                <input type="text" className="inputArea" defaultValue={partner.gender} />
                            </div>
                            <div className="mb-3 disable-input">
                                <label>5. Ngày sinh</label>
                                <input type="text" className="inputArea" defaultValue={partner.date_of_birth} />
                            </div>
                            <div className="mb-3 disable-input">
                                <label>6. CMND/CCCD</label>
                                <input type="text" className="inputArea" defaultValue={partner.identity_number} />
                            </div>
                            <div className="mb-3">
                                <label>- Mặt trước CMND/CCCD</label><br />
                                <img id="frontIdentity" className="img-preview" />
                            </div>
                            <div className="mb-3">
                                <label>- Mặt sau CMND/CCCD</label><br />
                                <img id="behindIdentity" className="img-preview" />
                            </div>
                            <div className="mb-3 disable-input">
                                <label>7. Địa chỉ</label>
                                <input type="text" className="inputArea" defaultValue={partner.address} />
                            </div>
                            <div className="mb-3 disable-input">
                                <label>8. Đường</label>
                                <input type="text" className="inputArea" defaultValue={partner.road_name} />
                            </div>
                            <div className="mb-3 disable-input">
                                <label>9. Số nhà</label>
                                <input type="text" className="inputArea" defaultValue={partner.apartment_number} />
                            </div>
                            <div className="mb-3 disable-input">
                                <label>10. Giấy phép kinh doanh</label><br />
                                <img id="businessCer" className="img-preview" />
                            </div>
                        </div>
                        <div className="form-right">
                            <p className="title">Thông tin cửa hàng</p>
                            <div className="mb-3 disable-input">
                                <label>1. Tên cửa hàng</label>
                                <input type="text" className="inputArea" defaultValue={partner.name} />
                            </div>
                            <div className="mb-3 disable-input">
                                <label>2. Địa chỉ</label>
                                <input type="text" className="inputArea" defaultValue={partner.gro_address} />
                            </div>
                            <div className="mb-3 disable-input">
                                <label>3. Đường</label>
                                <input type="text" className="inputArea" defaultValue={partner.gro_road_name} />
                            </div>
                            <div className="mb-3 disable-input">
                                <label>4. Số nhà</label>
                                <input type="text" className="inputArea" defaultValue={partner.gro_apartment_number} />
                            </div>
                            <div className="mb-3 disable-input">
                                <label>5. Loại hình kinh doanh</label>
                                <input type="text" className="inputArea" defaultValue={partner.type_of_business} />
                            </div>
                            <div className="mb-3 disable-input">
                                <label>6. Lĩnh vực kinh doanh</label>
                                <input type="text" className="inputArea" defaultValue={partner.business_field} />
                            </div>
                            <div className="mb-3 disable-input">
                                <label>7. Số lượng sản phẩm hiện có</label>
                                <input type="text" className="inputArea" defaultValue={partner.availble_product} />
                            </div>
                            <div className="mb-3 disable-input">
                                <label>8. Số lượng tồn kho trung bình</label>
                                <input type="text" className="inputArea" defaultValue={partner.avg_availble_product} />
                            </div>
                            <div className="mb-3 disable-input">
                                <label>9. Số đơn hàng trung bình mỗi ngày</label>
                                <input type="text" className="inputArea" defaultValue={partner.avg_order} />
                            </div>
                            <div className="mb-3 disable-input">
                                <label>10. Mã số thuế</label>
                                <input type="text" className="inputArea" defaultValue={partner.tax_number} />
                            </div>
                        </div>
                    </div>
                    <Button variant="success" className="me-2" type="submit" onClick={(e) => handleAccept(e)}>
                        Chấp nhận
                    </Button>
                    <Button variant="danger" type="submit" onClick={(e) => handleReject(e)}>
                        Từ chối
                    </Button>
                </Form>
            </div>
        </div>
    )
}

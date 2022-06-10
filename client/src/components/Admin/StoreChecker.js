import React, { useState, useEffect, useContext } from 'react'
import Table from 'react-bootstrap/Table'
import { PartnerContext } from '../../contexts/PartnerContext';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import search from '../../assets/img/search.png';
import Form from 'react-bootstrap/Form';
import ModalPopup from '../Common/Modal';
import AlertMessage from '../Common/Alert';

export default function StoreChecker() {
    const [groId, setGroId] = useState();
    const { partnerState: { groceries }, getAllGroceries, getGroceryById, updateGroceryById, deleteGroceryById } = useContext(PartnerContext);
    const [groById, setGroById] = useState(null);
    const [alert, setAlert] = useState(null);
    const [needRender, setNeedRender] = useState(false);
    const [newGrocery, setNewGrocery] = useState({
        availble_product: '',
        avg_availble_product: '',
        avg_order: ''
    });

    useEffect(() => {
        getAllGroceries()
    }, []);
    useEffect(() => {
        getAllGroceries()
    }, [needRender]);

    const handleSearchClick = async (e) => {
        e.preventDefault();
        try {
            const object = await getGroceryById(groId);
            if (object.status === false) {
                setAlert({ type: 'danger', message: object.message });
                setTimeout(() => setAlert(null), 3000);
            } else {
                await setGroById(object);
            }
        } catch (error) {
            setAlert({ type: 'danger', message: 'Internal Server Error' });
            setTimeout(() => setAlert(null), 3000);
        }
    }

    const handleOnChange = (e) => {
        setNewGrocery({



            ...newGrocery,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await updateGroceryById(newGrocery, groId);
            if (response) {
                setAlert({ type: 'success', message: 'Thông tin cửa hàng đã được cập nhật thành công!' });
                setTimeout(() => setAlert(null), 3000);
                setNeedRender(!needRender);
            }
        } catch (error) {
            setAlert({ type: 'danger', message: 'Internal Server Error' });
            setTimeout(() => setAlert(null), 3000);
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await deleteGroceryById(groId);
            setAlert({ type: 'success', message: 'Thông tin cửa hàng đã bị xóa!' });
            setTimeout(() => setAlert(null), 3000);
            setNeedRender(!needRender);
        } catch (error) {
            setAlert({ type: 'danger', message: 'Internal Server Error' });
            setTimeout(() => setAlert(null), 3000);
        }
    }
    return (
        <div className="store-checker">
            <h1 className="auth-title">KIỂM TRA THÔNG TIN CỬA HÀNG</h1>
            <Table striped bordered hover size="sm" style={{ fontSize: '15px', marginTop: '30px' }}>
                <thead>
                    <tr><th colSpan="12">DANH SÁCH CỬA HÀNG</th></tr>
                    <tr style={{ fontSize: '11.8px' }}>
                        <th>MÃ CỬA HÀNG</th>
                        <th>MÃ ĐỐI TÁC</th>
                        <th>TÊN CỬA HÀNG</th>
                        <th>ĐỊA CHỈ</th>
                        <th>ĐƯỜNG</th>
                        <th>SỐ NHÀ</th>
                        <th>LOẠI HÌNH KINH DOANH</th>
                        <th>LĨNH VỰC KINH DOANH</th>
                        <th>SỐ LƯỢNG SẢN PHẨM</th>
                        <th>SỐ LƯỢNG TỒN KHO</th>
                        <th>SỐ LƯỢNG ĐƠN HÀNG</th>
                        <th>MÃ SỐ THUẾ</th>
                    </tr>
                </thead>
                <tbody>
                    {groceries.map(grocery =>
                    (
                        <tr key={grocery.id}>
                            <td>{grocery.id}</td>
                            <td>{grocery.seller_id}</td>
                            <td>{grocery.name}</td>
                            <td>{grocery.gro_address}</td>
                            <td>{grocery.gro_road_name}</td>
                            <td>{grocery.gro_apartment_number}</td>
                            <td>{grocery.type_of_business}</td>
                            <td>{grocery.business_field}</td>
                            <td>{grocery.availble_product}</td>
                            <td>{grocery.avg_availble_product}</td>
                            <td>{grocery.avg_order}</td>
                            <td>{grocery.tax_number}</td>
                        </tr>
                    )
                    )}
                </tbody>
            </Table>
            <Form>
                <AlertMessage info={alert} />
                <div className="mb-3 search">
                    <label style={{ fontWeight: 'bold' }}>Mã cửa hàng</label>
                    <input type="text" name="id" className="inputArea" onChange={(e) => setGroId(e.target.value)} />

                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button variant="primary" type="submit" onClick={(e) => handleSearchClick(e)}>
                        Xem chi tiết
                    </Button>
                </div>
            </Form>
            {
                groById !== null ? groById.map((gro, index) => (<div key={index}>
                    <p className='detail'>Thông tin chi tiết</p>
                    <Form>
                        <div className='form-update'>
                            <div className='form-left'>
                                <p className="title">Thông tin kinh doanh</p>
                                <div className="mb-3 disable-input">
                                    <label>1. Loại hình kinh doanh</label>
                                    <input type="text" name="typeOfBusiness" className="inputArea" defaultValue={gro.type_of_business} />
                                </div>
                                <div className="mb-3 disable-input">
                                    <label>2. Lĩnh vực kinh doanh</label>
                                    <input type="text" name="businessField" className="inputArea" defaultValue={gro.business_field} />
                                </div>
                                <div className="mb-3">
                                    <label>3. Số lượng sản phẩm hiện có?* (Nếu bạn bán mì tôm 3 miền, mì tôm hảo hảo được tính là có 2 sản phẩm hiện có)</label>
                                    <input type="text" name="availble_product" className="inputArea" defaultValue={gro.availble_product} onChange={handleOnChange} />
                                </div>
                                <div className="mb-3">
                                    <label>4. Số lượng tồn kho TRUNG BÌNH trên mỗi sản phẩm *</label>
                                    <input type="text" name="avg_availble_product" className="inputArea" defaultValue={gro.avg_availble_product} onChange={handleOnChange} />
                                </div>
                                <div className="mb-3">
                                    <label>5. Số lượng đơn hàng TRUNG BÌNH MỖI NGÀY trong khoảng 30 ngày gần nhất *</label>
                                    <input type="text" name="avg_order" className="inputArea" defaultValue={gro.avg_order} onChange={handleOnChange} />
                                </div>
                                <div className="mb-3 disable-input">
                                    <label>6. Mã số thuế</label>
                                    <input type="text" name="taxNumber" className="inputArea" defaultValue={gro.tax_number} />
                                </div>
                            </div>

                            <div className="form-right">
                                <p className="title">Thông tin cửa hàng</p>
                                <div className="mb-3 disable-input">
                                    <label>1. Mã đối tác</label>
                                    <input type="text" name="sellerId" className="inputArea" defaultValue={gro.seller_id} />
                                </div>

                                <div className="mb-3 disable-input">
                                    <label>2. Tên cửa hàng *</label>
                                    <input type="text" name="name" className="inputArea" defaultValue={gro.name} onChange={handleOnChange} />
                                </div>

                                <div className="mb-3 disable-input">
                                    <label>3. Địa chỉ *</label>
                                    <input type="text" name="gro_address" className='inputArea' defaultValue={gro.gro_address} onChange={handleOnChange} />
                                </div>
                                <div className="mb-3 disable-input">
                                    <label>4. Đường *</label>
                                    <input type="text" name="gro_road_name" className='inputArea' defaultValue={gro.gro_road_name} onChange={handleOnChange} />
                                </div>
                                <div className="mb-3 disable-input">
                                    <label>5. Số nhà *</label>
                                    <input type="text" name="gro_apartment_number" className='inputArea' defaultValue={gro.gro_apartment_number} onChange={handleOnChange} />
                                </div>
                            </div>
                        </div>
                        <Button variant="success" type="submit" className="me-1" onClick={(e) => handleUpdate(e)}>
                            Cập nhật
                        </Button>
                        <Button variant="danger" type="submit" onClick={(e) => handleDelete(e)}>
                            Xóa vĩnh viễn
                        </Button>
                    </Form>
                </div>)) : null
            }
        </div >
    )
}

import React, {useState} from 'react';
import {useEffectAsync} from "../useEffectAsync";
import { axios } from '../axios';
import {Cart} from "../store/cart-store";
import {observer} from "mobx-react-lite";

export const OrdersPage = ({ match }) => {
    const [ordersData, setOrdersData] = useState([]);

    useEffectAsync(async () => {
        try {
            const { data } = await axios.get(`http://localhost:4000/buyer-orders?buyerId=${match.params.id}`);
            setOrdersData(data);
        } catch(err) {
            console.error(err);
        }
    }, []);

    return (
        <div className="container">
            <div className="d-flex justify-content-center" style={{ padding: '50px 0' }}>Narudzbe</div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Status</th>
                    <th scope="col">Broj narudzbe</th>
                    <th scope="col">Datum</th>
                    <th scope="col">Lokacija dostave</th>
                    <th scope="col">Cijena</th>
                </tr>
                </thead>
                <tbody>
                {ordersData.map(item => (
                    <ItemRow
                        status={item?.status}
                        orderCode={item?.orderCode}
                        date={item?.date}
                        shipTo={`${item?.address}, ${item?.postalCode} ${item?.city}`}
                        totalCost={item?.totalCost}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
}

const ItemRow = observer(({ status, orderCode, date, shipTo, totalCost }) => {
    return (
        <tr>
            <td>{status}</td>
            <td>{orderCode}</td>
            <td>{date}</td>
            <td>{shipTo}</td>
            <td>{`${totalCost}kn`}</td>
        </tr>
    )
});


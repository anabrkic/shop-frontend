import React, {useState} from "react";
import {useEffectAsync} from "../useEffectAsync";
import {axios} from "../axios";
import {css} from "@emotion/css";
import { set, find } from 'lodash';

const selectStyle = css`
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: .25rem;
`;

const statusLabels = { 0: 'U tijeku', 1: 'Obrada', 2: 'Otpremljeno', 3: 'Otkazano' };

export const AdminOrdersPage = (props) => {
    const [ordersData, setOrdersData] = useState([]);
    const [statuses, setStatuses] = useState([]);

    useEffectAsync(async () => {
        try {
            const { data } = await axios.get(`http://localhost:4000/orders`);
            setOrdersData(data);
            console.log('data', data);
            const statuses = data.map(order => ({ id: order?._id, status: parseInt(order.status) }));
            setStatuses(statuses);
        } catch(err) {
            console.error(err);
        }
    }, []);

    const handleOrderDelete = async (id) => {
        const response = await axios.delete(`http://localhost:4000/orders/${id}`);
        if (response.data === id) {
            window.location.reload(false);
        }
    }

    const handleStatusUpdate = async (event, id) => {
        const status = event.target.value;
        const statusesCopy = [...statuses];
        set(find(statusesCopy, { id }), 'status', parseInt(status));
        setStatuses(statusesCopy);
    }

    const handleSubmit = async () => {
        for (let statusData of statuses) {
            try {
                await axios.put(`http://localhost:4000/orders/${statusData?.id}`, { status: statusData?.status });
            } catch(err) {
                console.error(err);
            }
        }
        window.location.reload(false);
    }

    return (
        <div className="container mt-5">
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Broj narudzbe</th>
                    <th scope="col">Datum</th>
                    <th scope="col">Lokacija dostave</th>
                    <th scope="col">Cijena</th>
                    <th scope="col">Delete</th>
                </tr>
                </thead>
                <tbody>
                {ordersData.map((order, index) => (
                    <tr key={order?._id}>
                        <th scope="row">{index + 1}</th>
                        <td>
                            <select value={statuses[index]?.status} name="cars" id="cars" className={selectStyle} onChange={(e) => handleStatusUpdate(e, order?._id)}>
                                <option value="" disabled>Odaberi status</option>
                                {Object.values(statusLabels).map((label, index) => (
                                    <option value={index}>{label}</option>
                                ))}
                            </select>
                        </td>
                        <td>{order?.orderCode}</td>
                        <td>{order?.date}</td>
                        <td>{`${order?.address}, ${order?.postalCode} ${order?.city}`}</td>
                        <td>{`${order?.totalCost}`}</td>
                        <td>
                            <button type="submit" className="btn btn-primary" onClick={() => handleOrderDelete(order?._id)}>
                                X
                            </button>
                        </td>
                    </tr>
                ))}
                <button type="submit" className="btn btn-primary" style={{ marginTop: 10 }} onClick={handleSubmit}>Spremi izmjene</button>
                </tbody>
            </table>
        </div>
    );
}

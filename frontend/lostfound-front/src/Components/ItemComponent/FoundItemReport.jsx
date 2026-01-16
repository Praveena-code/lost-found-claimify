import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getAllFoundItems, getFoundItemsByUsername } from "../../Services/FoundItemService";
import { getRole } from "../../Services/LoginService";
import '../../Styles/MatchItem.css';

const FoundItemsReport = () => {
    let navigate = useNavigate();
    const [itemList, setItemList] = useState([]);
    const [role, setRole] = useState("");

    const showFoundItems = () => {
        getRole().then((response) => {
            setRole(response.data);

            if (response.data === 'Admin') {
                getAllFoundItems().then((res1) => {
                    setItemList(res1.data);
                });
            }
            else if (response.data === 'Student') {
                getFoundItemsByUsername().then((res2) => {
                    setItemList(res2.data);
                });
            }
        });
    };

    useEffect(() => {
        showFoundItems();
    }, []);

    const returnBack = () => {
        if (role === 'Admin')
            navigate('/AdminMenu');
        else if (role === 'Student')
            navigate('/StudentMenu');
    };

return (
    <div className="match-dashboard">
        <div className="match-main">

            {role === 'Admin'
                ? <h1 className="match-title">Admin – <span>Found Item List</span></h1>
                : <h1 className="match-title">Student – <span>Found Item List</span></h1>
            }

            <div className="match-table-card">
            <table className="match-table">
                <thead>
                    <tr>
                        <th>Item Id</th>
                        <th>Item Name</th>
                        <th>Category</th>
                        <th>Color</th>
                        <th>Brand</th>
                        <th>Location</th>
                        <th>Found Date</th>
                        <th>User Id</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {itemList.map((item) => (
                        <tr key={item.foundItemId}>
                            <td>{item.foundItemId}</td>
                            <td>{item.foundItemName}</td>
                            <td>{item.category}</td>
                            <td>{item.color}</td>
                            <td>{item.brand}</td>
                            <td>{item.location}</td>
                            <td>{item.foundDate}</td>
                            <td>{item.username}</td>
                            <td>{item.status ? "Returned" : "Not Returned"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
             <div className="match-back-wrapper">
  <button className="match-back-btn" onClick={returnBack}>
    Return
  </button>
</div>

        </div>
    </div>
);

};

export default FoundItemsReport;
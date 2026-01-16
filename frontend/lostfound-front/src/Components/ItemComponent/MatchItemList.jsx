import React, { useEffect, useState } from "react";
import { getAllMatchedItems } from "../../Services/MatchItemService";
import { Link } from "react-router-dom";
import "../../Styles/MatchItem.css";

const MatchItemList = () => {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllMatchedItems()
      .then((res) => {
        setMatches(res.data);
      })
      .catch(() => {
        setError("Failed to load matched items");
      });
  }, []);

  return (
    <div className="match-dashboard">
      <h2 className="match-title">Matched Items List</h2>

      <div className="match-table-card">
        {error ? (
          <p className="match-error">{error}</p>
        ) : matches.length === 0 ? (
          <p className="match-no-data">No matched items found</p>
        ) : (
          <table className="match-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Lost Item ID</th>
                <th>Found Item ID</th>
                <th>Item Name</th>
                <th>Category</th>
                <th>Lost User</th>
                <th>Found User</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.matchItemId.lostItemId}</td>
                  <td>{item.matchItemId.foundItemId}</td>
                  <td>{item.itemName}</td>
                  <td>{item.category}</td>
                  <td>{item.lostUsername}</td>
                  <td>{item.foundUsername}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

     <div className="match-back-wrapper">
  <Link to="/AdminMenu">
    <button className="match-back-btn">Back</button>
  </Link>
</div>

    </div>
  );
};

export default MatchItemList;

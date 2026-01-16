import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getLostItemById } from "../../Services/LostItemService";
import { getFoundItemsByLostItem } from "../../Services/FoundItemService";
import { saveMatchItem } from "../../Services/MatchItemService";
import "../../Styles/MatchItem.css"

const MatchItemSearch = () => {
  const { pid } = useParams();

  const [lostItem, setLostItem] = useState(null);
  const [foundItems, setFoundItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");



  /* ==========================
     FETCH LOST ITEM + MATCHES
     ========================== */
  useEffect(() => {
    getLostItemById(pid)
      .then((res) => setLostItem(res.data))
      .catch(() => setError("Failed to load lost item"));

    getFoundItemsByLostItem(pid)
      .then((res) => setFoundItems(res.data))
      .catch(() => setError("Failed to load matched items"));
  }, [pid]);

  /* ==========================
     SEARCH FILTER
     ========================== */
  const filteredItems = foundItems.filter(
    (item) =>
      item.foundItemName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ==========================
     CLAIM HANDLER (FIXED)
     ========================== */
  const handleClaim = (foundItem) => {
    const matchData = {
      lostItemId: pid,
      foundItemId: foundItem.foundItemId,
      itemName: foundItem.foundItemName,   // ✅ correct
      category: foundItem.category,
      lostUsername: lostItem.username,
    foundUsername: foundItem.username
    };

    saveMatchItem(matchData)
    .then(() => {
      alert("Item matched successfully!");
    })
    .catch((err) => {
      console.error("Match failed", err);
    });
};

  return (
    <div className="match-dashboard">
      <h2 className="match-title">Matched Found Items</h2>

      {lostItem && (
        <p className="match-subtitle">
          Lost Item : <b>{lostItem.lostItemName}</b> | Category :{" "}
          <b>{lostItem.category}</b>
        </p>
      )}

      {/* SEARCH */}
      <div className="match-search-wrapper">
        <span className="match-search-icon">🔍</span>
        <input
          type="text"
          className="match-search-input"
          placeholder="Search by name, category or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="match-table-card">
        {error ? (
          <p className="error">{error}</p>
        ) : filteredItems.length === 0 ? (
          <p className="no-data">No matching items found</p>
        ) : (
          <table className="match-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Location</th>
                <th>Date Found</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.foundItemId}>
                  <td>{item.foundItemName}</td>
                  <td>{item.category}</td>
                  <td>{item.location}</td>
                  <td>{item.foundDate}</td>
                  <td>{item.status ? "Claimed" : "Available"}</td>
                  <td>
                    <button
                      className="match-collect-pill"
                      onClick={() => handleClaim(item)}
                      disabled={item.status}
                    >
                      Claim
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* BACK BUTTON */}
      <div className="match-back-wrapper">
      <Link to="/LostItemReport" className="success-ok-btn">
        Back
      </Link>
      </div>
    </div>
  );
};

export default MatchItemSearch;

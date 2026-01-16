import React,{useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import {getUserId} from '../../Services/LoginService';
import {generateId,saveLostItem} from "../../Services/LostItemService";
import '../../Styles/FoundEntry.css';
import claimifyLogo from "../../claimify-logo.jpg"; // logo added

const LostItemEntry = () => {
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const [lostItem, setLostItem] = useState({
    lostItemId: "",
    lostItemName: "",
    color: "",
    brand: "",
    category: "",
    location: "",
    username: "",
    lostDate: new Date(),
    status: false,
  });

  const [newId, setNewId] = useState("");
  const [ldate, setLdate] = useState("");
  const [userId, setUserId] = useState("");



  const setLostItemId = () => {
    generateId().then(response => {
      setNewId(response.data);
    });
  };

  const setUsername = () => {
    getUserId().then(response => {
      setUserId(response.data);
    });
  };

  useEffect(() => {
    setLostItemId();
    setUsername();
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setLostItem(values => ({ ...values, [name]: value }));
  };

  const lostItemSubmit = (event) => {
    event.preventDefault();

    const updatedItem = {
      ...lostItem,
      lostItemId: newId,
      username: userId,
      lostDate: ldate
    };

    saveLostItem(updatedItem).then(() => {
      setShowSuccess(true);      // show success card
    });
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!lostItem.lostItemName.trim()) {
      tempErrors.lostItemName = "Item Name is required";
      isValid = false;
    }
    if (!lostItem.color.trim()) {
      tempErrors.color = "Item color is required";
      isValid = false;
    }
    if (!lostItem.brand.trim()) {
      tempErrors.brand = "Item brand is required";
      isValid = false;
    }
    if (!lostItem.category.trim()) {
      tempErrors.category = "Item category is required";
      isValid = false;
    }
    if (!lostItem.location.trim()) {
      tempErrors.location = "Lost Location is required";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) {
      lostItemSubmit(event);
    }
  };

  const returnBack = () => {
    navigate("/StudentMenu");
  };

  // const nextItem = () => {
  //   navigate("/Dummy/1");
  // };

  const handleSuccessOk = () => {
    setShowSuccess(false);
    navigate('/StudentMenu');
  };

  return (
<div className="found-page light">
  <div className="found-card light">
    {/* logo + title in one row */}
      <div className="found-card-header">
        <img
          src={claimifyLogo}
          alt="Claimify logo"
          className="found-logo"
        />
        <h2 className="found-title light">REPORT LOST ITEM</h2>
      </div>

<p className="found-subtitle">
    Please fill in all required information
  </p>

    <form className="found-form light">
      {/* Row 1 */}
      <div className="found-row light">
          <label className="found-label light">Item Id:</label>
          <div className="found-input-wrapper">
          <input
            name="itemId"
            className="found-input light"
            value={newId}
            readOnly
          />
        </div>
      </div>

        <div className="found-row light">
          <label className="found-label light">Lost Item Name:</label>
          <div className="found-input-wrapper">
          <input
            name="lostItemName"
            className="found-input light"
            value={lostItem.lostItemName}
            onChange={onChangeHandler}
          />
          {errors.lostItemName && (
            <p className="error-text">{errors.lostItemName}</p>
          )}
        </div>
      </div>

      {/* Row 2 */}
      <div className="found-row light">
          <label className="found-label light">Item Category:</label>
          <div className="found-input-wrapper">
          <input
            name="category"
            className="found-input light"
            value={lostItem.category}
            onChange={onChangeHandler}
          />
          {errors.category && (
            <p className="error-text">{errors.category}</p>
          )}
        </div>
      </div>
        <div className="found-row light">
          <label className="found-label light">Item Color:</label>
          <div className="found-input-wrapper">
          <input
            name="color"
            className="found-input light"
            value={lostItem.color}
            onChange={onChangeHandler}
          />
          {errors.color && <p className="error-text">{errors.color}</p>}
        </div>
      </div>

      {/* Row 3 */}
      <div className="found-row light">
          <label className="found-label light">Item Brand Name:</label>
          <div className="found-input-wrapper">
          <input
            name="brand"
            className="found-input light"
            value={lostItem.brand}
            onChange={onChangeHandler}
          />
          {errors.brand && <p className="error-text">{errors.brand}</p>}
        </div>
      </div>

        <div className="found-row light">
          <label className="found-label light">Location of Lost Item:</label>
          <div className="found-input-wrapper">
          <input
            name="location"
            className="found-input light"
            value={lostItem.location}
            onChange={onChangeHandler}
          />
          {errors.location && (
            <p className="error-text">{errors.location}</p>
          )}
        </div>
      </div>

      {/* Row 4 */}
      <div className="found-row light">
          <label className="found-label light">Select Lost Date:</label>
          <div className="found-input-wrapper">
          <input
            type="date"
            className="found-input light"
            value={ldate}
            onChange={(event) => setLdate(event.target.value)}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="found-actions light">
          <button type="button" className="found-submit light" onClick={handleValidation}>
            Submit
          </button>
          <button type="button" className="found-return light" onClick={returnBack}>
            Return
          </button>
        </div>
    </form>

    {/* Same success overlay styling */}
    {showSuccess && (
      <div className="success-overlay">
        <div className="success-card">
          <h3 className="success-title">
            Lost item form submitted successfully
          </h3>

          <div className="success-icon">
            <span className="success-tick"></span>
          </div>

          <button className="success-ok-btn" onClick={handleSuccessOk}>
            OK
          </button>
          <br />
        </div>
      </div>
    )}
  </div>
</div>

  );
};

export default LostItemEntry;

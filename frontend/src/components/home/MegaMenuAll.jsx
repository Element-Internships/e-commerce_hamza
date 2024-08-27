import React, { useState, useEffect } from 'react';
import { getAllCategoryDetails } from '../../api/AppURL'; // Correct named import
import axios from 'axios';
import { Link } from 'react-router-dom';

const MegaMenuAll = () => {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get(getAllCategoryDetails()); 
        setMenuData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMenuData();
  }, []);

  const menuItemClick = (event) => {
    event.target.classList.toggle('active');
    const panel = event.target.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  };

  return (
    <div className="accordionMenuDivAll">
      <div className="accordionMenuDivInsideAll">
        {menuData.map((catList, i) => (
          <div key={i}>
            <button onClick={menuItemClick} className="accordionAll">
              <img className="accordionMenuIconAll" src={catList.category_image} alt={catList.category_name} />
              &nbsp; {catList.category_name}
            </button>
            <div className="panelAll">
              <ul>
                {catList.subcategory_name.map((subList, i) => (
                  <li key={i}>
                    <Link to={`/productsubcategory/${catList.category_name}/${subList.subcategory_name}`} className="accordionItem">
                      {subList.subcategory_name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaMenuAll;

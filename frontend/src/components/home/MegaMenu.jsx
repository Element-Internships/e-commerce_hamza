import React from 'react';
import { Link } from 'react-router-dom';

const MegaMenu = ({ data }) => {
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
    <div className="accordionMenuDiv">
      <div className="accordionMenuDivInside">
        {data.map((catList, i) => (
          <div key={i}>
            <button onClick={menuItemClick} className="accordion">
              <img className="accordionMenuIcon" src={catList.category_image} alt={catList.category_name} />
              &nbsp; {catList.category_name}
            </button>
            <div className="panel">
              <ul>
                {catList.subcategory_name.map((subList, i) => (
                  <li key={i}>
                    <Link to={`productsubcategory/${catList.category_name}/${subList.subcategory_name}`} className="accordionItem">
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

export default MegaMenu;

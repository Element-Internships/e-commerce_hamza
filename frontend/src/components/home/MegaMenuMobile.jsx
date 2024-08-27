import React, { useEffect } from 'react';

const MegaMenuMobile = () => {
  useEffect(() => {
    const megaMenu = () => {
      const acc = document.getElementsByClassName('accordionMobile');
      Array.from(acc).forEach((item) => {
        item.addEventListener('click', function () {
          this.classList.toggle('active');
          const panel = this.nextElementSibling;
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
            panel.style.maxHeight = panel.scrollHeight + 'px';
          }
        });
      });
    };

    megaMenu();
  }, []);

  return (
    <div className="accordionMenuDivMobile">
      <div className="accordionMenuDivInsideMobile">
        {/* Sample buttons; ideally, you'd map these from a data source */}
        {[...Array(15)].map((_, i) => (
          <div key={i}>
            <button className="accordionMobile">
              <img className="accordionMenuIconMobile" src="https://image.flaticon.com/icons/png/128/739/739249.png" alt="Menu Icon" />
              &nbsp; Men's Clothing
            </button>
            <div className="panelMobile">
              <ul>
                <li><a href="#" className="accordionItemMobile">Mans Tshirt 1</a></li>
                <li><a href="#" className="accordionItemMobile">Mans Tshirt 2</a></li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaMenuMobile;

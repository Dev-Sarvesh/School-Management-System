import React from "react";
import { Dropdown, Badge, Form } from "react-bootstrap";
import sideBarImage1 from "assets/img/sidebar-1.jpg";
import sideBarImage2 from "assets/img/sidebar-2.jpg";
import sideBarImage3 from "assets/img/sidebar-3.jpg";
import sideBarImage4 from "assets/img/sidebar-4.jpg";

function FixedPlugin({ hasImage, setHasImage, color, setColor, image, setImage }) {
  return (
    <div className="fixed-plugin">
      <Dropdown>
        <Dropdown.Toggle variant="" className="text-white border-0 opacity-100">
          <i className="fas fa-cogs fa-2x mt-1"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <li className="adjustments-line d-flex align-items-center justify-content-between">
            <p>Background Image</p>
            <Form.Check
              type="switch"
              id="custom-switch-1-image"
              checked={hasImage}
              onChange={setHasImage}
            />
          </li>
          <li className="adjustments-line mt-3">
            <p>Filters</p>
            <div className="pull-right">
              {["black", "azure", "green", "orange", "red", "purple"].map((badgeColor) => (
                <Badge
                  key={badgeColor}
                  variant={badgeColor}
                  className={color === badgeColor ? "active" : ""}
                  onClick={() => setColor(badgeColor)}
                ></Badge>
              ))}
            </div>
            <div className="clearfix"></div>
          </li>
          <li className="header-title">Sidebar Images</li>
          {[sideBarImage1, sideBarImage2, sideBarImage3, sideBarImage4].map((sidebarImage, index) => (
            <li key={index} className={image === sidebarImage ? "active" : ""}>
              <a
                className="img-holder switch-trigger d-block"
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  setImage(sidebarImage);
                }}
              >
                <img alt="..." src={sidebarImage}></img>
              </a>
            </li>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default FixedPlugin;

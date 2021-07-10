import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faCity,
  faHdd,
  faCandyCane,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

function LeftSideMenu() {
  const history = useHistory();

  const handleZonesClick = () => {
    history.push("/zones");
  };

  const handleCitiesClick = () => {
    history.push("/cities");
  };

  const handleMachinesClick = () => {
    history.push("/machines");
  };

  const handleProductsClick = () => {
    history.push("/products");
  };

  return (
    <div className="my-1">
      <ul className="nav flex-column">
        <li className="card p-3 my-2" onClick={() => handleZonesClick()}>
          <div className="d-flex flex-row custom-cursor">
            <div>
              <FontAwesomeIcon className="fa-lg" icon={faCompass} />
            </div>
            <div className="mx-2">Zones</div>
          </div>
        </li>
        <li className="card p-3 my-2" onClick={() => handleCitiesClick()}>
          <div className="d-flex flex-row custom-cursor">
            <div>
              <FontAwesomeIcon className="fa-lg" icon={faCity} />
            </div>
            <div className="mx-2">Cities</div>
          </div>
        </li>
        <li className="card p-3 my-2" onClick={() => handleMachinesClick()}>
          <div className="d-flex flex-row custom-cursor">
            <div>
              <FontAwesomeIcon className="fa-lg" icon={faHdd} />
            </div>
            <div className="mx-2">Machines</div>
          </div>
        </li>
        <li className="card p-3 my-2" onClick={() => handleProductsClick()}>
          <div className="d-flex flex-row custom-cursor">
            <div>
              <FontAwesomeIcon className="fa-lg" icon={faCandyCane} />
            </div>
            <div className="mx-2">Products</div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default LeftSideMenu;

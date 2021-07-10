import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import dayjs from "dayjs";

import LeftSideMenu from "../leftSideMenu/LeftSideMenu";

const GET_ZONE_BY_ID = gql`
  query getZoneById($id: Int) {
    getZoneById(id: $id) {
      message
      zone {
        id
        zone_name
        created_at
        updated_at
        cities {
          id
          city_name
          area
          created_at
          updated_at
        }
      }
    }
  }
`;

function ZoneDetails() {
  const history = useHistory();
  const { id } = useParams();
  const idNum = parseInt(id, 10);

  const [zoneName, setZoneName] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [citiesList, setCitiesList] = useState([]);

  const { loading, error, data } = useQuery(GET_ZONE_BY_ID, {
    variables: { id: idNum },
  });

  console.log("loading = ", loading);
  console.log("error = ", error);
  console.log("data = ", data);

  useEffect(() => {
    if (data && data.getZoneById && data.getZoneById.zone) {
      setZoneName(data.getZoneById.zone.zone_name);

      const createdAt = dayjs(
        parseInt(data.getZoneById.zone.created_at, 10)
      ).format("YYYY-MM-DD HH:mm:ss");
      setCreatedAt(createdAt);

      const updatedAt = dayjs(
        parseInt(data.getZoneById.zone.updated_at, 10)
      ).format("YYYY-MM-DD HH:mm:ss");
      setUpdatedAt(updatedAt);

      setCitiesList(data.getZoneById.zone.cities);
    }
  }, [data]);

  const renderMainView = () => {
    const mainView = (
      <div className="m-3">
        <div className="row">
          <div className="col-sm-3">
            <LeftSideMenu />
          </div>
          <div className="col-sm-9">
            <div className="my-1">{renderResultView()}</div>
          </div>
        </div>
      </div>
    );

    return mainView;
  };

  const handleBackButtonClick = () => {
    history.push("/zones");
  };

  const renderCitiesDropdown = (citiesList) => {
    let citiesDropdown = null;

    if (citiesList) {
      citiesDropdown = citiesList.map((item, i) => {
        return (
          <option key={i} value={item.id}>
            {item.city_name}
          </option>
        );
      });
    }

    return citiesDropdown;
  };

  const renderResultView = () => {
    let resultView = null;

    if (true) {
      resultView = (
        <div>
          <div className="card p-3">
            <h4 className="mx-1 my-2">Zone Details</h4>
            <div className="form-floating my-2">
              <input
                type="text"
                className="form-control"
                value={zoneName}
                readOnly
              />
              <label htmlFor="floatingInput">Zone name</label>
            </div>
            <div className="form-floating my-2">
              <input
                type="text"
                className="form-control"
                value={createdAt}
                readOnly
              />
              <label htmlFor="floatingPassword">Created at</label>
            </div>
            <div className="form-floating my-2">
              <input
                type="text"
                className="form-control"
                value={updatedAt}
                readOnly
              />
              <label htmlFor="floatingPassword">Updated at</label>
            </div>

            <div className="my-2">
              <h4 className="mb-3">Cities</h4>
              <select className="form-select">
                {renderCitiesDropdown(citiesList)}
              </select>
            </div>
          </div>

          <div className="my-3">
            <button
              type="submit"
              className="btn btn-outline-primary"
              onClick={() => handleBackButtonClick()}
            >
              Back
            </button>
          </div>
        </div>
      );
    }

    return resultView;
  };

  return <div>{renderMainView()}</div>;
}

export default ZoneDetails;

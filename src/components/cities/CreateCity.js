import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";

import LeftSideMenu from "../leftSideMenu/LeftSideMenu";

const GET_ZONES = gql`
  query getZones {
    getZones {
      message
      zones {
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

const CREATE_CITY = gql`
  mutation createCities($input: CreateCitiesInput!) {
    createCities(input: $input) {
      message
    }
  }
`;

function CreateCity() {
  const history = useHistory();

  const [cityName, setCityName] = useState("");
  const [area, setArea] = useState("");
  const [zoneId, setZoneId] = useState(0);

  const {
    loading: getZonesLoading,
    error: getZonesError,
    data: getZonesData,
  } = useQuery(GET_ZONES);
  const [createCity, { loading, error, data }] = useMutation(CREATE_CITY);

  console.log("getZonesLoading = ", getZonesLoading);
  console.log("getZonesError = ", getZonesError);
  console.log("getZonesData = ", getZonesData);

  console.log("loading = ", loading);
  console.log("error = ", error);
  console.log("data = ", data);

  const renderCreateSuccessAlert = (data) => {
    let createSuccessAlert = null;

    if (data && data.createCities) {
      createSuccessAlert = (
        <div className="alert alert-success" role="alert">
          Create city success
        </div>
      );
      setTimeout(() => {
        history.push("/cities");
        window.location.reload();
      }, 1500);
    }

    return createSuccessAlert;
  };

  const renderMainView = () => {
    const mainView = (
      <div className="m-3">
        <div className="row">
          <div className="col-sm-3">
            <LeftSideMenu />
          </div>
          <div className="col-sm-9">
            {renderCreateSuccessAlert(data)}
            <div className="my-1">{renderResultView()}</div>
          </div>
        </div>
      </div>
    );

    return mainView;
  };

  const handleCityNameChange = (e) => {
    setCityName(e.target.value);
  };

  const handleAreaChange = (e) => {
    setArea(e.target.value);
  };

  const handleZoneSelectDropdownChange = (e) => {
    const zoneIdNum = parseInt(e.target.value, 10);
    setZoneId(zoneIdNum);
  };

  const renderZonesDropdown = (getZonesData) => {
    let zonesDropdown = null;

    if (getZonesData) {
      const zonesList = getZonesData.getZones.zones;
      if (zonesList) {
        zonesDropdown = zonesList.map((item, i) => {
          return (
            <option key={i} value={item.id}>
              {item.zone_name}
            </option>
          );
        });
      }
    }

    return zonesDropdown;
  };

  const handleSubmitButtonClick = () => {
    if (cityName && area && zoneId > 0) {
      createCity({
        variables: {
          input: { city_name: cityName, area: area, zone_id: zoneId },
        },
      });
    }
  };

  const renderResultView = () => {
    let resultView = null;

    if (true) {
      resultView = (
        <div>
          <div className="card p-3">
            <h4 className="mx-1 my-2">Create city</h4>
            <div className="form-floating my-2">
              <input
                type="text"
                className="form-control"
                onChange={(e) => handleCityNameChange(e)}
              />
              <label htmlFor="floatingInput">City name</label>
            </div>

            <div className="form-floating my-2">
              <input
                type="text"
                className="form-control"
                onChange={(e) => handleAreaChange(e)}
              />
              <label htmlFor="floatingInput">Area</label>
            </div>

            <div className="my-2">
              <h4 className="mb-3">Zones</h4>
              <select
                className="form-select"
                onChange={(e) => handleZoneSelectDropdownChange(e)}
              >
                {renderZonesDropdown(getZonesData)}
              </select>
            </div>
          </div>

          <div className="my-3">
            <button
              type="submit"
              className="btn btn-outline-primary"
              onClick={() => handleSubmitButtonClick()}
            >
              Submit
            </button>
          </div>
        </div>
      );
    }

    return resultView;
  };

  return <div>{renderMainView()}</div>;
}

export default CreateCity;

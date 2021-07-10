import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";

import LeftSideMenu from "../leftSideMenu/LeftSideMenu";

const GET_CITIES = gql`
  query getCities {
    getCities {
      message
      cities {
        id
        city_name
        area
        created_at
        updated_at
        zone {
          id
          zone_name
          created_at
          updated_at
        }
      }
    }
  }
`;

const CREATE_MACHINE = gql`
  mutation createMachines($input: CreateMachinesInput!) {
    createMachines(input: $input) {
      message
    }
  }
`;

function CreateMachine() {
  const history = useHistory();

  const [machineName, setMachineName] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [cityId, setCityId] = useState(0);

  const {
    loading: getCitiesLoading,
    error: getCitiesError,
    data: getCitiesData,
  } = useQuery(GET_CITIES);
  const [createMachine, { loading, error, data }] = useMutation(CREATE_MACHINE);

  console.log("getCitiesLoading = ", getCitiesLoading);
  console.log("getCitiesError = ", getCitiesError);
  console.log("getCitiesData = ", getCitiesData);

  console.log("loading = ", loading);
  console.log("error = ", error);
  console.log("data = ", data);

  const renderCreateSuccessAlert = (data) => {
    let createSuccessAlert = null;

    if (data && data.createMachines) {
      createSuccessAlert = (
        <div className="alert alert-success" role="alert">
          Create machine success
        </div>
      );
      setTimeout(() => {
        history.push("/machines");
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

  const handleMachineNameChange = (e) => {
    setMachineName(e.target.value);
  };

  const handleSerialNumberChange = (e) => {
    const serialNumberInt = parseInt(e.target.value, 10);
    setSerialNumber(serialNumberInt);
  };

  const handleCitySelectDropdownChange = (e) => {
    const cityIdNum = parseInt(e.target.value, 10);
    setCityId(cityIdNum);
  };

  const renderCitiesDropdown = (getCitiesData) => {
    let citiesDropdown = null;

    if (getCitiesData) {
      const citiesList = getCitiesData.getCities.cities;
      if (citiesList) {
        citiesDropdown = citiesList.map((item, i) => {
          return (
            <option key={i} value={item.id}>
              {item.city_name}
            </option>
          );
        });
      }
    }

    return citiesDropdown;
  };

  const handleSubmitButtonClick = () => {
    if (machineName && serialNumber && cityId > 0) {
      createMachine({
        variables: {
          input: {
            machine_name: machineName,
            serial_number: serialNumber,
            city_id: cityId,
          },
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
            <h4 className="mx-1 my-2">Create machine</h4>
            <div className="form-floating my-2">
              <input
                type="text"
                className="form-control"
                onChange={(e) => handleMachineNameChange(e)}
              />
              <label htmlFor="floatingInput">Machine name</label>
            </div>

            <div className="form-floating my-2">
              <input
                type="number"
                className="form-control"
                onChange={(e) => handleSerialNumberChange(e)}
              />
              <label htmlFor="floatingInput">Serial number</label>
            </div>

            <div className="my-2">
              <h4 className="mb-3">Cities</h4>
              <select
                className="form-select"
                onChange={(e) => handleCitySelectDropdownChange(e)}
              >
                {renderCitiesDropdown(getCitiesData)}
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

export default CreateMachine;

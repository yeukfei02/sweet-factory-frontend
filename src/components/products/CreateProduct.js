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

const GET_MACHINES = gql`
  query getMachines {
    getMachines {
      message
      machines {
        id
        machine_name
        serial_number
        created_at
        updated_at
        city {
          id
          city_name
          area
          created_at
          updated_at
        }
        products {
          id
          product_name
          product_description
          price
          quantity
          created_at
          updated_at
        }
      }
    }
  }
`;

const CREATE_PRODUCT = gql`
  mutation createProducts($input: CreateProductsInput!) {
    createProducts(input: $input) {
      message
    }
  }
`;

function CreateProduct() {
  const history = useHistory();

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [machineId, setMachineId] = useState(0);

  const {
    loading: getCitiesLoading,
    error: getCitiesError,
    data: getCitiesData,
  } = useQuery(GET_CITIES);
  const {
    loading: getMachinesLoading,
    error: getMachinesError,
    data: getMachinesData,
  } = useQuery(GET_MACHINES);
  const [createMachine, { loading, error, data }] = useMutation(CREATE_PRODUCT);

  console.log("getCitiesLoading = ", getCitiesLoading);
  console.log("getCitiesError = ", getCitiesError);
  console.log("getCitiesData = ", getCitiesData);

  console.log("getMachinesLoading = ", getMachinesLoading);
  console.log("getMachinesError = ", getMachinesError);
  console.log("getMachinesData = ", getMachinesData);

  console.log("loading = ", loading);
  console.log("error = ", error);
  console.log("data = ", data);

  const renderCreateSuccessAlert = (data) => {
    let createSuccessAlert = null;

    if (data && data.createProducts) {
      createSuccessAlert = (
        <div className="alert alert-success" role="alert">
          Create product success
        </div>
      );
      setTimeout(() => {
        history.push("/products");
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

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductDescriptionChange = (e) => {
    setProductDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    const priceFloat = parseFloat(e.target.value);
    setPrice(priceFloat);
  };

  const handleQuantityChange = (e) => {
    const quantityInt = parseInt(e.target.value, 10);
    setQuantity(quantityInt);
  };

  const handleCitySelectDropdownChange = (e) => {
    const cityIdNum = parseInt(e.target.value, 10);
    setCityId(cityIdNum);
  };

  const handleMachineSelectDropdownChange = (e) => {
    const machineIdNum = parseInt(e.target.value, 10);
    setMachineId(machineIdNum);
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

  const renderMachinesDropdown = (getMachinesData) => {
    let machinesDropdown = null;

    if (getMachinesData) {
      const machinesList = getMachinesData.getMachines.machines;
      if (machinesList) {
        machinesDropdown = machinesList.map((item, i) => {
          return (
            <option key={i} value={item.id}>
              {item.machine_name}
            </option>
          );
        });
      }
    }

    return machinesDropdown;
  };

  const handleSubmitButtonClick = () => {
    if (
      productName &&
      productDescription &&
      price > 0 &&
      quantity > 0 &&
      cityId > 0 &&
      machineId > 0
    ) {
      createMachine({
        variables: {
          input: {
            product_name: productName,
            product_description: productDescription,
            price: price,
            quantity: quantity,
            city_id: cityId,
            machine_id: machineId,
          },
        },
      });
    }
  };

  const handleBackButtonClick = () => {
    history.push("/products");
  };

  const renderResultView = () => {
    let resultView = null;

    if (true) {
      resultView = (
        <div>
          <div className="card p-3">
            <h4 className="mx-1 my-2">Create product</h4>
            <div className="form-floating my-2">
              <input
                type="text"
                className="form-control"
                onChange={(e) => handleProductNameChange(e)}
              />
              <label htmlFor="floatingInput">Product name</label>
            </div>

            <div className="form-floating my-2">
              <input
                type="text"
                className="form-control"
                onChange={(e) => handleProductDescriptionChange(e)}
              />
              <label htmlFor="floatingInput">Product description</label>
            </div>

            <div className="form-floating my-2">
              <input
                type="number"
                className="form-control"
                onChange={(e) => handlePriceChange(e)}
              />
              <label htmlFor="floatingInput">Price</label>
            </div>

            <div className="form-floating my-2">
              <input
                type="number"
                className="form-control"
                onChange={(e) => handleQuantityChange(e)}
              />
              <label htmlFor="floatingInput">Quantity</label>
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

            <div className="my-2">
              <h4 className="mb-3">Machines</h4>
              <select
                className="form-select"
                onChange={(e) => handleMachineSelectDropdownChange(e)}
              >
                {renderMachinesDropdown(getMachinesData)}
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

            <button
              type="submit"
              className="btn btn-outline-success mx-3"
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

export default CreateProduct;

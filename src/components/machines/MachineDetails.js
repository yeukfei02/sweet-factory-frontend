import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import dayjs from "dayjs";

import LeftSideMenu from "../leftSideMenu/LeftSideMenu";

const GET_MACHINE_BY_ID = gql`
  query getMachineById($id: Int) {
    getMachineById(id: $id) {
      message
      machine {
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

function MachineDetails() {
  const history = useHistory();
  const { id } = useParams();
  const idNum = parseInt(id, 10);

  const [machineName, setMachineName] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [city, setCity] = useState({});
  const [productsList, setProductsList] = useState([]);

  const { loading, error, data } = useQuery(GET_MACHINE_BY_ID, {
    variables: { id: idNum },
  });

  console.log("loading = ", loading);
  console.log("error = ", error);
  console.log("data = ", data);

  useEffect(() => {
    if (data && data.getMachineById && data.getMachineById.machine) {
      setMachineName(data.getMachineById.machine.machine_name);
      setSerialNumber(data.getMachineById.machine.serial_number);

      const createdAt = dayjs(
        parseInt(data.getMachineById.machine.created_at, 10)
      ).format("YYYY-MM-DD HH:mm:ss");
      setCreatedAt(createdAt);

      const updatedAt = dayjs(
        parseInt(data.getMachineById.machine.updated_at, 10)
      ).format("YYYY-MM-DD HH:mm:ss");
      setUpdatedAt(updatedAt);

      setCity(data.getMachineById.machine.city);
      setProductsList(data.getMachineById.machine.products);
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
    history.push("/machines");
  };

  const renderProductsDropdown = (productsList) => {
    let productsDropdown = null;

    if (productsList) {
      productsDropdown = productsList.map((item, i) => {
        return (
          <option key={i} value={item.id}>
            {item.product_name}
          </option>
        );
      });
    }

    return productsDropdown;
  };

  const renderResultView = () => {
    let resultView = null;

    if (true) {
      resultView = (
        <div>
          <div className="card p-3">
            <h4 className="mx-1 my-2">Machine Details</h4>
            <div className="form-floating my-2">
              <input
                type="text"
                className="form-control"
                value={machineName}
                readOnly
              />
              <label htmlFor="floatingInput">Machine name</label>
            </div>
            <div className="form-floating my-2">
              <input
                type="text"
                className="form-control"
                value={serialNumber}
                readOnly
              />
              <label htmlFor="floatingInput">Serial number</label>
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
              <h4 className="mb-3">City</h4>
              <div className="form-floating my-2">
                <input
                  type="text"
                  className="form-control"
                  value={city.city_name}
                  readOnly
                />
                <label htmlFor="floatingInput">City name</label>
              </div>
              <div className="form-floating my-2">
                <input
                  type="text"
                  className="form-control"
                  value={city.area}
                  readOnly
                />
                <label htmlFor="floatingInput">Area</label>
              </div>
              <div className="form-floating my-2">
                <input
                  type="text"
                  className="form-control"
                  value={dayjs(parseInt(city.created_at, 10)).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                  readOnly
                />
                <label htmlFor="floatingPassword">Created at</label>
              </div>
              <div className="form-floating my-2">
                <input
                  type="text"
                  className="form-control"
                  value={dayjs(parseInt(city.updated_at, 10)).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                  readOnly
                />
                <label htmlFor="floatingPassword">Updated at</label>
              </div>
            </div>

            <div className="my-2">
              <h4 className="mb-3">Products</h4>
              <select className="form-select">
                {renderProductsDropdown(productsList)}
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

export default MachineDetails;

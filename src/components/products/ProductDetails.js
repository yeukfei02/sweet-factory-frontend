import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import dayjs from "dayjs";

import LeftSideMenu from "../leftSideMenu/LeftSideMenu";

const GET_PRODUCT_BY_ID = gql`
  query getProductById($id: Int) {
    getProductById(id: $id) {
      message
      product {
        id
        product_name
        product_description
        price
        quantity
        created_at
        updated_at
        machine {
          id
          machine_name
          serial_number
          created_at
          updated_at
        }
        city {
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

function ProductDetails() {
  const history = useHistory();
  const { id } = useParams();
  const idNum = parseInt(id, 10);

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [city, setCity] = useState({});
  const [machine, setMachine] = useState({});

  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id: idNum },
  });

  console.log("loading = ", loading);
  console.log("error = ", error);
  console.log("data = ", data);

  useEffect(() => {
    if (data && data.getProductById && data.getProductById.product) {
      setProductName(data.getProductById.product.product_name);
      setProductDescription(data.getProductById.product.product_description);
      setPrice(data.getProductById.product.price);
      setQuantity(data.getProductById.product.quantity);

      const createdAt = dayjs(
        parseInt(data.getProductById.product.created_at, 10)
      ).format("YYYY-MM-DD HH:mm:ss");
      setCreatedAt(createdAt);

      const updatedAt = dayjs(
        parseInt(data.getProductById.product.updated_at, 10)
      ).format("YYYY-MM-DD HH:mm:ss");
      setUpdatedAt(updatedAt);

      setCity(data.getProductById.product.city);
      setMachine(data.getProductById.product.machine);
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
    history.push("/products");
  };

  const renderResultView = () => {
    let resultView = null;

    if (true) {
      resultView = (
        <div>
          <div className="card p-3">
            <h4 className="mx-1 my-2">Product Details</h4>
            <div className="form-floating my-2">
              <input
                type="text"
                className="form-control"
                value={productName}
                readOnly
              />
              <label htmlFor="floatingInput">Product name</label>
            </div>
            <div className="form-floating my-2">
              <input
                type="text"
                className="form-control"
                value={productDescription}
                readOnly
              />
              <label htmlFor="floatingInput">Product description</label>
            </div>
            <div className="form-floating my-2">
              <input
                type="text"
                className="form-control"
                value={price}
                readOnly
              />
              <label htmlFor="floatingInput">Price</label>
            </div>
            <div className="form-floating my-2">
              <input
                type="text"
                className="form-control"
                value={quantity}
                readOnly
              />
              <label htmlFor="floatingInput">Quantity</label>
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
              <h4 className="mb-3">Machine</h4>
              <div className="form-floating my-2">
                <input
                  type="text"
                  className="form-control"
                  value={machine.machine_name}
                  readOnly
                />
                <label htmlFor="floatingInput">Machine name</label>
              </div>
              <div className="form-floating my-2">
                <input
                  type="text"
                  className="form-control"
                  value={machine.serial_number}
                  readOnly
                />
                <label htmlFor="floatingInput">Serial number</label>
              </div>
              <div className="form-floating my-2">
                <input
                  type="text"
                  className="form-control"
                  value={dayjs(parseInt(machine.created_at, 10)).format(
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
                  value={dayjs(parseInt(machine.updated_at, 10)).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                  readOnly
                />
                <label htmlFor="floatingPassword">Updated at</label>
              </div>
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

export default ProductDetails;

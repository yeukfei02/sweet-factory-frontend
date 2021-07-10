import React from "react";
import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import dayjs from "dayjs";

import LeftSideMenu from "../leftSideMenu/LeftSideMenu";

const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      message
      products {
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

function Products() {
  const history = useHistory();

  const { loading, error, data } = useQuery(GET_PRODUCTS);

  console.log("loading = ", loading);
  console.log("error = ", error);
  console.log("data = ", data);

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

  const handleCreateProductsButtonClick = () => {
    history.push("/products/create-products");
  };

  const handleItemClick = (id) => {
    history.push(`/products/${id}`);
  };

  const renderProductsData = (data) => {
    let productsData = null;

    if (data && data.getProducts.products) {
      productsData = data.getProducts.products.map((item, i) => {
        const id = item.id;
        const productName = item.product_name;
        const productDescription = item.product_description;
        const price = item.price;
        const quantity = item.quantity;
        const createdAt = dayjs(parseInt(item.created_at, 10)).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        const updatedAt = dayjs(parseInt(item.updated_at, 10)).format(
          "YYYY-MM-DD HH:mm:ss"
        );

        return (
          <tr key={i} onClick={() => handleItemClick(id)}>
            <th scope="row">{id}</th>
            <td>{productName}</td>
            <td>{productDescription}</td>
            <td>{price}</td>
            <td>{quantity}</td>
            <td>{createdAt}</td>
            <td>{updatedAt}</td>
          </tr>
        );
      });
    }

    return productsData;
  };

  const renderResultView = () => {
    let resultView = null;

    if (true) {
      resultView = (
        <div>
          <div className="d-flex justify-content-end mb-3">
            <button
              type="submit"
              className="btn btn-outline-primary"
              onClick={() => handleCreateProductsButtonClick()}
            >
              Create products
            </button>
          </div>

          <table className="table table-hover table-bordered custom-cursor">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product name</th>
                <th scope="col">Product description</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Created at</th>
                <th scope="col">Updated at</th>
              </tr>
            </thead>
            <tbody>{renderProductsData(data)}</tbody>
          </table>
        </div>
      );
    }

    return resultView;
  };

  return <div>{renderMainView()}</div>;
}

export default Products;

import React from "react";
import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import dayjs from "dayjs";

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

function Cities() {
  const history = useHistory();

  const token = localStorage.getItem("token");
  const isUserLoggedIn = token ? true : false;
  console.log("isUserLoggedIn = ", isUserLoggedIn);

  const { loading, error, data } = useQuery(GET_CITIES);

  console.log("loading = ", loading);
  console.log("error = ", error);
  console.log("data = ", data);

  const renderMainView = (isUserLoggedIn) => {
    let mainView = (
      <div className="d-flex justify-content-center my-5">
        <h2>
          Sweet Factory is a platform to manage your sweet product and delivery
        </h2>
      </div>
    );

    if (isUserLoggedIn) {
      mainView = (
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
    }

    return mainView;
  };

  const handleCreateCitiesButtonClick = () => {
    history.push("/cities/create-cities");
  };

  const handleItemClick = (id) => {
    history.push(`/cities/${id}`);
  };

  const renderCitiesData = (data) => {
    let citiesData = null;

    if (data && data.getCities.cities) {
      citiesData = data.getCities.cities.map((item, i) => {
        const id = item.id;
        const cityName = item.city_name;
        const area = item.area;
        const createdAt = dayjs(parseInt(item.created_at, 10)).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        const updatedAt = dayjs(parseInt(item.updated_at, 10)).format(
          "YYYY-MM-DD HH:mm:ss"
        );

        return (
          <tr key={i} onClick={() => handleItemClick(id)}>
            <th scope="row">{id}</th>
            <td>{cityName}</td>
            <td>{area}</td>
            <td>{createdAt}</td>
            <td>{updatedAt}</td>
          </tr>
        );
      });
    }

    return citiesData;
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
              onClick={() => handleCreateCitiesButtonClick()}
            >
              Create cities
            </button>
          </div>

          <table className="table table-hover table-bordered custom-cursor">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">City name</th>
                <th scope="col">Area</th>
                <th scope="col">Created at</th>
                <th scope="col">Updated at</th>
              </tr>
            </thead>
            <tbody>{renderCitiesData(data)}</tbody>
          </table>
        </div>
      );
    }

    return resultView;
  };

  return <div>{renderMainView(isUserLoggedIn)}</div>;
}

export default Cities;

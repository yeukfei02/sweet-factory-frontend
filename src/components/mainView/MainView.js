import React from "react";
import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import dayjs from "dayjs";

import image from "../../images/images.jpg";
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

function MainView() {
  const history = useHistory();

  const token = localStorage.getItem("token");
  const isUserLoggedIn = token ? true : false;
  console.log("isUserLoggedIn = ", isUserLoggedIn);

  const { loading, error, data } = useQuery(GET_ZONES);

  console.log("loading = ", loading);
  console.log("error = ", error);
  console.log("data = ", data);

  const renderMainView = (isUserLoggedIn) => {
    let mainView = (
      <div className="d-flex flex-column justify-content-center align-items-center my-5">
        <h2 className="mb-5">
          Sweet Factory is a platform to manage your sweet product and delivery
        </h2>
        <img
          src={image}
          className="img-fluid"
          alt=""
          width="800"
          height="600"
        ></img>
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

  const handleCreateZoneButtonClick = () => {
    history.push("/zones/create-zones");
  };

  const handleItemClick = (id) => {
    history.push(`/zones/${id}`);
  };

  const renderZonesData = (data) => {
    let zonesData = null;

    if (data && data.getZones.zones) {
      zonesData = data.getZones.zones.map((item, i) => {
        const id = item.id;
        const zoneName = item.zone_name;
        const createdAt = dayjs(parseInt(item.created_at, 10)).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        const updatedAt = dayjs(parseInt(item.updated_at, 10)).format(
          "YYYY-MM-DD HH:mm:ss"
        );

        return (
          <tr key={i} onClick={() => handleItemClick(id)}>
            <th scope="row">{id}</th>
            <td>{zoneName}</td>
            <td>{createdAt}</td>
            <td>{updatedAt}</td>
          </tr>
        );
      });
    }

    return zonesData;
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
              onClick={() => handleCreateZoneButtonClick()}
            >
              Create zones
            </button>
          </div>

          <table className="table table-hover table-bordered custom-cursor">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Zone name</th>
                <th scope="col">Created at</th>
                <th scope="col">Updated at</th>
              </tr>
            </thead>
            <tbody>{renderZonesData(data)}</tbody>
          </table>
        </div>
      );
    }

    return resultView;
  };

  return <div>{renderMainView(isUserLoggedIn)}</div>;
}

export default MainView;

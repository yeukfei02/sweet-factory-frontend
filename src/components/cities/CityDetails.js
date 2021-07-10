import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import dayjs from "dayjs";

import LeftSideMenu from "../leftSideMenu/LeftSideMenu";

const GET_CITY_BY_ID = gql`
  query getCityById($id: Int) {
    getCityById(id: $id) {
      message
      city {
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

function CityDetails() {
  const history = useHistory();
  const { id } = useParams();
  const idNum = parseInt(id, 10);

  const [cityName, setCityName] = useState("");
  const [area, setArea] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [zone, setZone] = useState({});

  const { loading, error, data } = useQuery(GET_CITY_BY_ID, {
    variables: { id: idNum },
  });

  console.log("loading = ", loading);
  console.log("error = ", error);
  console.log("data = ", data);

  useEffect(() => {
    if (data && data.getCityById && data.getCityById.city) {
      setCityName(data.getCityById.city.city_name);
      setArea(data.getCityById.city.area);

      const createdAt = dayjs(
        parseInt(data.getCityById.city.created_at, 10)
      ).format("YYYY-MM-DD HH:mm:ss");
      setCreatedAt(createdAt);

      const updatedAt = dayjs(
        parseInt(data.getCityById.city.updated_at, 10)
      ).format("YYYY-MM-DD HH:mm:ss");
      setUpdatedAt(updatedAt);

      setZone(data.getCityById.city.zone);
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
    history.push("/cities");
  };

  const renderResultView = () => {
    let resultView = null;

    if (true) {
      resultView = (
        <div>
          <div className="card p-3">
            <h4 className="mx-1 my-2">City Details</h4>
            <div className="form-floating my-2">
              <input
                type="text"
                className="form-control"
                value={cityName}
                readOnly
              />
              <label htmlFor="floatingInput">City name</label>
            </div>
            <div className="form-floating my-2">
              <input
                type="text"
                className="form-control"
                value={area}
                readOnly
              />
              <label htmlFor="floatingInput">Area</label>
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
              <h4 className="mb-3">Zone</h4>
              <div className="form-floating my-2">
                <input
                  type="text"
                  className="form-control"
                  value={zone.zone_name}
                  readOnly
                />
                <label htmlFor="floatingInput">Zone name</label>
              </div>
              <div className="form-floating my-2">
                <input
                  type="text"
                  className="form-control"
                  value={dayjs(parseInt(zone.created_at, 10)).format(
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
                  value={dayjs(parseInt(zone.updated_at, 10)).format(
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

export default CityDetails;

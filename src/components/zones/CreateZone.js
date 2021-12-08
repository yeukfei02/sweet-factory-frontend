import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

import LeftSideMenu from "../leftSideMenu/LeftSideMenu";

const CREATE_ZONE = gql`
  mutation createZones($input: CreateZonesInput!) {
    createZones(input: $input) {
      message
    }
  }
`;

function CreateZone() {
  const history = useHistory();

  const [zoneName, setZoneName] = useState("");

  const [createZone, { loading, error, data }] = useMutation(CREATE_ZONE);

  console.log("loading = ", loading);
  console.log("error = ", error);
  console.log("data = ", data);

  const renderCreateSuccessAlert = (data) => {
    let createSuccessAlert = null;

    if (data && data.createZones) {
      createSuccessAlert = (
        <div className="alert alert-success" role="alert">
          Create zone success
        </div>
      );
      setTimeout(() => {
        history.push("/zones");
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

  const handleZoneNameChange = (e) => {
    setZoneName(e.target.value);
  };

  const handleSubmitButtonClick = () => {
    const userId = localStorage.getItem("user_id");
    const userIdInt = userId ? parseInt(userId, 10) : 0;

    if (zoneName && userIdInt > 0) {
      createZone({
        variables: {
          input: { zone_name: zoneName, user_id: userIdInt },
        },
      });
    }
  };

  const handleBackButtonClick = () => {
    history.push("/zones");
  };

  const renderResultView = () => {
    let resultView = null;

    if (true) {
      resultView = (
        <div>
          <div className="card p-3">
            <h4 className="mx-1 my-2">Create zone</h4>
            <div className="form-floating my-2">
              <input
                type="text"
                className="form-control"
                onChange={(e) => handleZoneNameChange(e)}
              />
              <label htmlFor="floatingInput">Zone name</label>
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

export default CreateZone;

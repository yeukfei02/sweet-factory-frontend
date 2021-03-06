import React from "react";
import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import dayjs from "dayjs";

import LeftSideMenu from "../leftSideMenu/LeftSideMenu";

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

function Machines() {
  const history = useHistory();

  const userId = localStorage.getItem("user_id");
  const userIdInt = userId ? parseInt(userId, 10) : 0;

  const { loading, error, data } = useQuery(GET_MACHINES, {
    variables: { user_id: userIdInt },
  });

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

  const handleCreateMachinesButtonClick = () => {
    history.push("/machines/create-machines");
  };

  const handleItemClick = (id) => {
    history.push(`/machines/${id}`);
  };

  const renderMachinesData = (data) => {
    let machinesData = null;

    if (data && data.getMachines.machines) {
      machinesData = data.getMachines.machines.map((item, i) => {
        const id = item.id;
        const machineName = item.machine_name;
        const serialNumber = item.serial_number;
        const createdAt = dayjs(parseInt(item.created_at, 10)).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        const updatedAt = dayjs(parseInt(item.updated_at, 10)).format(
          "YYYY-MM-DD HH:mm:ss"
        );

        return (
          <tr key={i} onClick={() => handleItemClick(id)}>
            <th scope="row">{id}</th>
            <td>{machineName}</td>
            <td>{serialNumber}</td>
            <td>{createdAt}</td>
            <td>{updatedAt}</td>
          </tr>
        );
      });
    }

    return machinesData;
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
              onClick={() => handleCreateMachinesButtonClick()}
            >
              Create machines
            </button>
          </div>

          <table className="table table-hover table-bordered custom-cursor">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Machine name</th>
                <th scope="col">Serial number</th>
                <th scope="col">Created at</th>
                <th scope="col">Updated at</th>
              </tr>
            </thead>
            <tbody>{renderMachinesData(data)}</tbody>
          </table>
        </div>
      );
    }

    return resultView;
  };

  return <div>{renderMainView()}</div>;
}

export default Machines;

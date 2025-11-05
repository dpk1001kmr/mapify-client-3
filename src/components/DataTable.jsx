import React from "react";

const DataTable = ({ data }) => {
  return (
    <div>
      {data.length !== 0 && (
        <div className="overflow-x-auto border border-zinc-100 rounded">
          <table className="table table-xs">
            <tbody>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Job Title</th>
                <th>Department</th>
                <th>Company</th>
                <th>Street</th>
                <th>Zip Code</th>
                <th>City</th>
                <th>Country</th>
              </tr>
              {data.map((row, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{row.firstName}</td>
                    <td>{row.lastName}</td>
                    <td>{row.email}</td>
                    <td>{row.phone}</td>
                    <td>{row.jobTitle}</td>
                    <td>{row.department}</td>
                    <td>{row.company}</td>
                    <td>{row.street}</td>
                    <td>{row.zipCode}</td>
                    <td>{row.city}</td>
                    <td>{row.country}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DataTable;

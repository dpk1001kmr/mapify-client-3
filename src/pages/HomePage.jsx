import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getData } from "../api/services/data.service";
import DataTable from "../components/DataTable";

const HomePage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["data"],
    queryFn: getData,
  });

  if (isLoading) {
    return (
      <div className="p-3">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-3">
        <p>Error...</p>
      </div>
    );
  }

  return (
    <div className="p-3">
      <p className="text-sm font-bold mb-4">Uploaded Data &rarr;</p>
      <DataTable data={data} />
    </div>
  );
};

export default HomePage;

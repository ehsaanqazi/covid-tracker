import React from "react";
import Chart from "react-apexcharts";
function Graph(props) {
  return (
    <Chart
      options={{
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: [],
        },
      }}
      series={[
        {
          name: "",
          data: props.cases,
        },
      ]}
      type="area"
      width="100%"
    />
  );
}
export default Graph;

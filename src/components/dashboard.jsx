import { useEffect, useState } from "react";
import "../index.css";
import Countries from "./countries";
import Header from "./header";
import Graph from "./graph";

function Dashboard() {
  const [cases, setCases] = useState([]);
  const [recovered, setRecovered] = useState([]);
  const [deaths, setDeaths] = useState([]);
  const [todayCases, setTodayCases] = useState([]);
  const [countryName, setCountry] = useState("all");
  const [casesAll, setAllCases] = useState([]);
  function fetchSingleCountryForGraph(e) {
    fetch(`https://disease.sh/v3/covid-19/countries/${e}`)
      .then((response) => response.json())
      .then((data) => {
        setCountry(
          JSON.stringify(data.countryInfo.iso2)
            .toLowerCase()
            .replace('"', "")
            .replace('"', "")
        );
      });
  }
  const fetchCasesForGraph = async () => {
    let cases = [];
    let finalCases = [];
    if (countryName !== "all") {
      await fetch(`https://disease.sh/v3/covid-19/historical/${countryName}`)
        .then((res) => res.json())
        .then((res) => {
          for (let value of Object.values(res.timeline.cases)) {
            cases.push(value);
          }
        });
    } else {
      await fetch(`https://disease.sh/v3/covid-19/historical/all`)
        .then((res) => res.json())
        .then((res) => {
          for (let value of Object.values(res.cases)) {
            cases.push(value);
          }
        });
    }
    cases.forEach((el, index) => {
      finalCases.push((el = cases[index + 1] - el));
    });
    finalCases.pop();
    setAllCases([...finalCases]);
  };
  function fetchSingleCountry(e) {
    let apiURL;
    if (e === "all") {
      apiURL = "https://disease.sh/v3/covid-19/all";
      setCountry("all");
    } else {
      apiURL = `https://disease.sh/v3/covid-19/countries/${e}`;
      fetchSingleCountryForGraph(e);
    }
    fetch(`${apiURL}`)
      .then((response) => response.json())
      .then((data) => {
        setCases(data.cases);
        setRecovered(data.recovered);
        setDeaths(data.deaths);
        setTodayCases(data.todayCases);
      });
    fetchCasesForGraph();
  }

  useEffect(() => {
    const getData = async () => {
      fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
          setCases(data.cases);
          setRecovered(data.recovered);
          setDeaths(data.deaths);
          setTodayCases(data.todayCases);
        });
    };
    getData();
    fetchCasesForGraph();
  }, []);
  return (
    <>
      <Header handleChange={fetchSingleCountry} />
      <div className="row" style={{ padding: "0px", margin: "0px" }}>
        <div className="col-md-9">
          <section className="cards">
            <div className="row">
              <div className="col-md-3 col-sm-6 px-2 py-4">
                <div className="card px-3">
                  <div className="card-body">
                    <div>
                      <i className="fa fa-user"></i>
                    </div>
                    <div>
                      <h5 className="card-title">Total Cases</h5>
                      <p className="card-text">{cases}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 px-2 py-4">
                <div className="card">
                  <div className="card-body">
                    <div>
                      <i className="fa fa-home"></i>
                    </div>
                    <div>
                      <h5 className="card-title">Recovered Cases</h5>
                      <p className="card-text">{recovered}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 px-2 py-4">
                <div className="card">
                  <div className="card-body">
                    <div>
                      <i className="fa fa-bed"></i>
                    </div>
                    <div>
                      <h5 className="card-title">Total Deaths</h5>
                      <p className="card-text">{deaths}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 px-2 py-4">
                <div className="card">
                  <div className="card-body">
                    <div>
                      <i className="fa fa-ambulance"></i>
                    </div>
                    <div>
                      <h5 className="card-title">New Cases</h5>
                      <p className="card-text">{todayCases}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Graph cases={[...casesAll]} />
        </div>
        <Countries handleChange={fetchSingleCountry} />
      </div>
    </>
  );
}
export default Dashboard;

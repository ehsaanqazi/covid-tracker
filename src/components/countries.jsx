import { useState, useEffect } from "react";
import _ from "lodash";
function Countries(props) {
  const [countryNames, setCountryNames] = useState([]);
  const [allCases, setAllCases] = useState([]);
  useEffect(() => {
    const allCountries = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((item) => ({
            name: item.country,
            cases: item.cases,
            iso2: item.countryInfo.iso2,
          }));
          setCountryNames(_.orderBy(countries, ["cases"], ["desc"]));
        });
    };
    allCountries();
    const totalCases = async () => {
      fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
          setAllCases(data.cases);
        });
    };
    totalCases();
  }, []);
  const handleOption = (e) => {
    props.handleChange(e);
  };
  return (
    <>
      <div className="col-md-3">
        <section className="overflow-scroll countries">
          <div
            className="countries__item"
            id="all"
            onClick={(e) => handleOption(e.currentTarget.id)}
          >
            <ul>
              <li>
                <img
                  src={`https://brandeps.com/logo-download/E/Emblem-of-the-United-Nations-UN-logo-vector-01.svg`}
                  alt="all"
                />
              </li>
              <li>All</li>
              <li>{allCases}</li>
            </ul>
          </div>
          {countryNames.map((country, index) => (
            <div
              key={index}
              id={country.name}
              className="countries__item"
              onClick={(e) => handleOption(e.currentTarget.id)}
            >
              <ul>
                <li>
                  <img
                    src={`https://disease.sh/assets/img/flags/${JSON.stringify(
                      country.iso2
                    )
                      .toLowerCase()
                      .replace('"', "")
                      .replace('"', "")}.png`}
                    alt={country.name}
                  />
                </li>
                <li>{country.name}</li>
                <li>{country.cases}</li>
              </ul>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export default Countries;

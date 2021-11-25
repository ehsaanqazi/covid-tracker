import React, { useEffect, useState } from "react";
function Header(props) {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const allCountries = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((item) => ({
            name: item.country,
            value: item.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    allCountries();
  }, []);

  const handleOption = (e) => {
    props.handleChange(e);
  };
  return (
    <section className="header">
      <h1 className="">COVID Tracker</h1>
      <select onChange={(e) => handleOption(e.target.value)}>
        <option defaultChecked value="all">
          All Countries
        </option>
        {countries.map((country, index) => (
          <option id={country.value} key={index}>
            {country.name}
          </option>
        ))}
      </select>
    </section>
  );
}

export default Header;

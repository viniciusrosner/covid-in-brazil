import { useState } from "react";
import "./global.css";

const CORONA_VIRUS_BASE_URL = "https://coronavirus-19-api.herokuapp.com";
const DEFAULT_HEADERS = {
  mode: "cors",
  cache: "default",
  contentType: "application/json",
};

const state = {
  countries: [],
  covidData: [],
  countryElements: null,
};

/*active: 39082686
cases: 517204427
casesPerOneMillion: 66353
country: "World"
critical: 39871
deaths: 6276338
deathsPerOneMillion: 805
recovered: 471845403
testsPerOneMillion: 0
todayCases: 300138
todayDeaths: 622
totalTests: 0
*/

const populateCountryElements = (brazilData) => {
  console.log(brazilData);
  return (
    <div className="grid grid-flow-row justify-evenly  font-sans font-light" key={brazilData.country}>
      <div className="w-48 flex flex-row text-slate-200 flex justify-center border-4 p-2 m-3 text-1xl rounded-lg border-stone-700 bg-gradient-to-r from-slate-500 to-slate-900">{`Casos Totais: ${brazilData.cases}`}</div>
      <div className="w-48 flex flex-row text-slate-200 flex justify-center border-4 p-2 m-3 text-1xl rounded-lg border-stone-700 bg-gradient-to-r from-slate-500 to-slate-900">{`Mortes:  ${brazilData.deaths}`}</div>
      <div className="w-48 flex flex-row text-slate-200 flex justify-center border-4 p-2 m-3 text-1xl rounded-lg border-stone-700 bg-gradient-to-r from-slate-500 to-slate-900">{`Casos do dia:  ${brazilData.todayCases}`}</div>
      <div className="w-48 flex flex-row text-slate-200 flex justify-center border-4 p-2 m-3 text-1xl rounded-lg border-stone-700 bg-gradient-to-r from-slate-500 to-slate-900">{`Recuperados:  ${brazilData.recovered}`}</div>
    </div>
  );
};

/*;const populateCountryElements = (countryNames) => {
                          console.log(countryNames);
                          return (
                            countryNames.reduce((countryNameElements, countryName) => {
                              countryNameElements.push(<div className="text-sky-300" key={countryName}>{countryName}</div>)
                              return countryNameElements
                            }, [])
                            )
                        };*/

const getCovidData = async () => {
  return fetch(`${CORONA_VIRUS_BASE_URL}/countries`)
    .then((fetchResponse) => {
      return fetchResponse.json();
    })

    .then((body) => {
      state.covidData = body;
      body.reduce((stateCountries, bodyItem) => {
        stateCountries.push(bodyItem.country);
        return stateCountries;
      }, state.countries);
    })
    .then(() => {
      state.countryElements = populateCountryElements(
        state.covidData
          .filter((data) => {
            return "Brazil" === data.country;
          })
          .shift()
      );
      console.log(state.countryElements);
    });
};

await getCovidData();

const App = () => {
  return (
    <>
      <header className="bg-black text-slate-300 font-sans font-thin text-6xl flex w-auto h-auto justify-center p-2 ">COVID in Brazil</header>
      <div className="">
        {state.countryElements ? state.countryElements : ""}
      </div>
    </>
  );
};

export default App;

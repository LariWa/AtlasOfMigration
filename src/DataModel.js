import { TotalEmBothSex } from "./const/TotalEmBothSex";
import { TotalEmMale } from "./const/TotalEmMale";
import { TotalEmFemale } from "./const/TotalEmFemale";
import { CountryNameID } from "./const/CountryNameID";
/* These objects also includes the world */

const path = "./data/Data.json";
const WORLD = 900;

/*

handles state (year, country) of the app and fetches data from database

 */
class DataModel {
  constructor(year = 2020, countryID = WORLD) {
    this.numberOfArrows = 5;
    this.year = year;
    this.countryID = countryID;
    this.countryName = this.codeToName(this.countryID);
    this.timeData = this.getTotalEmigration();
  }

  setYear(x) {
    this.year = x;
    //  console.log(x);
  }

  setCountryID(x) {
    //console.log(x);
    this.countryID = x;
    //console.log("id: " ,this.countryID);
    this.countryName = this.codeToName(x)
    //console.log("name: ",this.countryName);

  }

  /* get name of a country by code */
  codeToName(x = WORLD) {
    let obj = CountryNameID.filter((item) => item.id === x);
    return obj[0] == null ? null : obj[0].name;
  }


  /* TODO: return an array with unique objects {name: ID, id: countryname}
    with ID and countrynames as listed in the UN dataset */
  getCountryNameID(res) {
    let cnid = res.map((x) => ({
      name: x.DestinationName,
      id: x.DestinationID,
    }));
    console.log(cnid);

    //TODO: remove duplicates
  }

  /*
    Net emigration from destination for all years and sex
        destination: countrycode, sex (optional): m = -1 / f = 1 / both = 0
        Return: An array of objects with {date: year (Date), total: total emigration (int)}  */
  getTotalEmigration(destination = WORLD, sex = 0) {
    let path = TotalEmBothSex;
    if (sex != 0) path = sex === 1 ? TotalEmFemale : TotalEmMale;
    let data = path[destination];
    //console.log(data &&data[0]);

    //filter everything that is not year data
    // Object.key(data[0])
    //   .filter(key => !isNaN(key))
    //   .forEach(key => delete data[0][key]);

    if (data) {
      delete data[0].Area; //quick fix
      let res = Object.entries(data[0]).map(([key, value]) => ({
        date: new Date(key, 6), // 6 equals 1 July
        total: Number(value.replaceAll(" ", "")),
      }));
      //console.log(res);
      return res;
    }
  }

  /*  Net immigration to destination for all years
    origin: countrycode
    Return: An array of objects with {date: year, total: total immigration} */
  getTotalImmigration(countryID) {}

  /*  Migration from origin to destination for all years
      origin: countryID
      Return: An object with date: number + other values */
  getMigrationValueAll(origin, destination) {
    if (this.migrationData)
      return this.migrationData.find(
        (x) => x.DestinationID == destination && x.OriginID == origin
      );
    //return this.migrationData.find(x => x.DestinationID == destination && x.OriginID == origin)[0];
  }

  /*  Migration from origin to destination for one year.
      origin, destination: country code
      Return: object with date:number + other values */
  getMigrationValue(origin, destination, year) {
    return this.getMigrationValueAll(origin, destination)[year];
  }

  //gets immigration value for specified destination (use 900 as destination to get total immigration)
  getImmigrationValue(destination, year) {
    if (!year) year = this.year;
    if (this.immigrationData) {
      var value = this.immigrationData.filter(function findValue(data) {
        return data.DestinationID == destination;
      });
      if (value && value[0]) {
        return parseInt(value[0][year].split(" ").join(""));
      }
    }
  }
  //get top immigration countries for a specified country
  //numberOfArrows specifies number of results
  getImmigrantionCountries(countryId) {
    var component = this;
    var imiCountries = this.migrationData.filter(function findValue(data) {
      return data.DestinationID == countryId && isCountry(data.OriginID);
    });
    function isCountry(countryId) {
      var validCountries = CountryNameID.filter(
        (item) => item.id == countryId && !item.region
      );
      if (validCountries.length > 0) {
        return true;
      }
    }
    imiCountries = imiCountries.map(function getYearData(entry) {
      return {
        name: entry.OriginName,
        id: entry.OriginID,
        value: parseInt(entry[component.year].split(" ").join("")),
      };
    });
    return imiCountries
      .sort(this.sortBy("value"))
      .slice(0, this.numberOfArrows);
  }

  //get top emigration countries for a specified country
  getEmigrantionCountries(countryId) {
    var component = this;
    var emiCountries = this.migrationData.filter(function findValue(data) {
      return data.OriginID == countryId && isCountry(data.DestinationID);
    });
    function isCountry(countryId) {
      var validCountries = CountryNameID.filter(
        (item) => item.id == countryId && !item.region
      );
      if (validCountries.length > 0) {
        return true;
      }
    }
    emiCountries = emiCountries.map(function getYearData(entry) {
      return {
        name: entry.DestinationName,
        id: entry.DestinationID,
        value: parseInt(entry[component.year].split(" ").join("")),
      };
    });
    return emiCountries
      .sort(this.sortBy("value"))
      .slice(0, this.numberOfArrows);
  }
  //get NetRatio
  getNetRatioMigrationValue(country, year) {
    //TODO decide on ratio or substract
    if (!year) year = this.year;
    var immi = this.getimmigrationValue(country, year);
    var emmi = this.getEmigrationValue(country, year);
    if (immi && emmi) return immi / emmi;
    return 0;
  }
  //this calculation does not make sense for a ratio?
  getNetRatioOverPopulationValue(country, year) {
    //(The Net migration value / the population value) * 1000
    if (!year) year = this.year;
    var pop = this.getPopulationValue(country, year);
    var netmig = this.getNetRatioMigrationValue(country, year);
    if (pop && netmig) return netmig / (pop * 1000); // I multiplied the population value by 1000
    // as the value is presented in thousands
    return 0;
  }
  getEmigrationOverPopulation(country, year) {
    // Emigration value / popualtion value
    if (!year) year = this.year;
    var pop = this.getPopulationValue(country, year);
    var emmi = this.getEmigrationValue(country, year);
    if (pop && emmi) return (emmi / (pop * 1000)) * 100; // I multiplied the population value by 1000
    // as the value is presented in thousands;
    return 0;
  }
  getImigrationOverPopulation(country, year) {
    // Emigration value / popualtion value
    if (!year) year = this.year;
    var pop = this.getPopulationValue(country, year);
    var immi = this.getImmigrationValue(country, year);
    if (pop && immi) {
      return (immi / (pop * 1000)) * 100;
    } // I multiplied the population value by 1000
    // as the value is presented in thousands
    return 0;
  }
  //get emigration value for specified country
  getEmigrationValue(origin, year) {
    if (!year) year = this.year;
    if (this.emigrationData)
      var value = this.emigrationData.filter(function findValue(data) {
        return data.OriginID == origin;
      });
    if (value && value[0]) {
      if (this.max < parseInt(value[0][year].split(" ").join("")))
        this.max = parseInt(value[0][year].split(" ").join(""));
      return parseInt(value[0][year].split(" ").join(""));
    }
  }
  getPopulationValue(country, year) {
    if (!year) year = this.year;
    if (this.populationData)
      var value = this.populationData.filter(function findValue(data) {
        return data.id == country;
      });
    if (value && value[0]) {
      return parseInt(value[0][year].split(" ").join(""));
    }
  }

  /* fetch data as csv for year x, return file. TODO error handling */




/*  http://data.un.org/ws/rest/{artifact}/{artifactId}/{parameters}  */

// async getUNData() {
//   try {
//     this.res = await fetch("http://data.un.org/ws/rest/", {
//       headers: {
//          mode: "no-cors",
//         "Content-Type": "text/json",
//         Accept: "text/json",
//       },
//     });
//   } catch (e) {
//     console.log(e);
//     this.UN_data = await this.res.json();
//     console.log(this.UN_data);
//   }
// }

  /*
    not used possibly rewrite as async function
    TODO: error handling */
  async getData() {
    try {
      this.res = await fetch(path, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
    } catch (e) {
      console.log(e);
      this.c_data = await this.res.json();
      console.log(this.c_data);
    }
  }
  loadData() {
    const component = this;
    return Promise.all([getMigrationData(), getPopulationData()]).then();
    function getMigrationData() {
      /* fetch data for country x */
      return fetch(path, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((resData) => {
          component.migrationData = resData;
          component.immigrationData = component.getImmigrationData();
          component.emigrationData = component.getEmigrationData();
          //this.getCountryNameID(resData)
          //this.CountryNameID = this.getCountryNameID(res) //map to object from migData
          //return resData;
        })
        .catch((_) => console.log(_));
    }
    function getPopulationData() {
      /* fetch pupulation data for country x */
      return fetch(`./data/population.json`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((resData) => {
          component.populationData = resData;
        })
        .catch((_) => console.log(_));
    }
  }
  /* fetches the data for migration as json */

  getCountryPopulationData() {
    //Not sure with the naming!
    return this.populationData.filter(function findValue(data) {
      return data.id == 900; // whole world population
    });
  }
  getImmigrationData() {
    return this.migrationData.filter(function findValue(data) {
      return data.OriginID == 900; //people coming from the whole world --> total number of immigrants
    });
  }

  getEmigrationData() {
    return this.migrationData.filter(function findValue(data) {
      return data.DestinationID == 900; //people leaving from the whole world --> total number of emigrants
    });
  }

  sortBy(prop) {
    //descending
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return -1;
      } else if (a[prop] < b[prop]) {
        return 1;
      }
      return 0;
    };
  }
}
export default DataModel;

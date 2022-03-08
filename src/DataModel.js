//const path = `./data/${this.year}.json`;
const path = "./data/Data.json";

/* handles state (year, country) of the app and fetches data from database  */
class DataModel {
  constructor(year = 2020, country = null) {
    this.numberOfArrows = 5;
    this.year = year;
    this.country = country;
    this.getMigrationData().then((res) => {
      this.migrationData = res;
      //this.data = null;
      this.imigrationData = this.getImmigrationData();
      this.emigrationData = this.getEmigrationData();
      //total imigration in 1990 900 is ID for World
      //  console.log(this.getImigrationValue(900, 1990));
    });
    this.getCountryNameAndId().then((res) => {
      this.countryNameAndId = res;
    });
  }

  getMigrationValue(origin, destination, year) {
    if (this.migrationData)
      return this.migrationData.filter(function findValue(data) {
        return data.DestinationID == destination && data.OriginID == origin;
      })[0][year];
  }
  getImigrationValue(destination, year) {
    if (!year) year = this.year;
    if (this.imigrationData) {
      var value = this.imigrationData.filter(function findValue(data) {
        return data.DestinationID == destination;
      });
      if (value && value[0]) {
        return parseInt(value[0][year].split(" ").join(""));
      }
    }
  }
  getImmigrantionCountries(countryId) {
    var component = this;
    var imiCountries = this.migrationData.filter(function findValue(data) {
      return data.DestinationID == countryId && isCountry(data.OriginID);
    });
    function isCountry(countryId) {
      var validCountries = component.countryNameAndId.filter(
        (item) => item.id == countryId
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

  getEmigrantionCountries(countryId) {
    var component = this;
    var emiCountries = this.migrationData.filter(function findValue(data) {
      return data.OriginID == countryId && isCountry(data.DestinationID);
    });
    function isCountry(countryId) {
      var validCountries = component.countryNameAndId.filter(
        (item) => item.id == countryId
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
  getNetRatioMigrationValue(country, year) {
    //TODO decide on ratio or substract
    if (!year) year = this.year;
    var immi = this.getImigrationValue(country, year);
    var emmi = this.getEmigrationValue(country, year);
    if (immi && emmi) return immi / emmi;
    return 0;
  }
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

  setYear(x) {
    this.year = x;
  }
  setCountry(x) {
    this.country = x;
  }


/* fetch data as csv for year x, return file. TODO error handling */
// getCsvData(x = ""){
//   return fetch(path
//     ,{headers : {
//     'Content-Type': 'text/csv;charset=UTF-8',
//    }
//  })
//  .then(res => res.blob())
//  .then(blob => {
//    this.data = blob;
//    return blob.text()
//  })
//  .then(resData => {
//     console.log("fetch csv: "+ resData);
//     //console.log(resData instanceof Blob);
//     //console.log(this.data instanceof Blob);
//     return resData;
//   })
//   .catch(_ => console.log(_))
// }

// papa.parse(getCsvData(), {
//   complete: results => {
//     this.data = results.data
//     console.log("Finished:", this.data);
//   }
// });


  /*
    TODO: error handling */

  async getData() {
    try {
      this.res = await fetch(`./data/Data.json`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
    } catch(e) {
      console.log(e);
      this.c_data = await this.res.json()
      console.log(this.c_data);
    }
  }


  getMigrationData() {
    /* fetch data for country x */
    return fetch(`./data/Data.json`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        return resData;
      })
      .catch((_) => console.log(_));
  }
  getCountryNameAndId() {
    /* fetch data for country x */
    return fetch(`./data/CountryNameId.json`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        return resData;
      })
      .catch((_) => console.log(_));
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

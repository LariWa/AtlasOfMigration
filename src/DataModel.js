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
    this.countryName = this.codeToName(this.countryID)
    this.timeData = this.getTotalEmigration()
    //console.log(this.timeData);

    // this.getCountryNameAndId().then((res) => {
    //   this.countryNameAndId = res;
    //
    // });
  }

  setYear(x) {
    this.year = x;
  //  console.log(x);
  }
  setCountry(x) {
    this.countryID = x;
  }

  /* get name of a country by code */
  codeToName(x = 300){
      let obj = CountryNameID.filter(item => item.id === x)
    return obj[0] == null ? null : obj[0].name
  }

  // xport const CountryNameID = [
  //   {
  //     "name": "WORLD",
  //     "id": 900,
  //     region: true
  //   },
  //
  //
  //   for (const [book, price] of Object.entries(books)) {
  //     if (price === 0) {
  //       console.log(book);
  //

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
        total: Number(value.replaceAll(' ','')),
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

  getimmigrationValue(destination, year) {
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

  getNetRatioMigrationValue(country, year) {
    //TODO decide on ratio or substract
    if (!year) year = this.year;
    var immi = this.getimmigrationValue(country, year);
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

  /* fetches the data for migration as json */
  getMigrationData() {
    /* fetch data for country x */
    return fetch(path, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        this.migrationData = resData;
        this.immigrationData = this.getImmigrationData();
        this.emigrationData = this.getEmigrationData();
        //this.getCountryNameID(resData)
        //this.CountryNameID = this.getCountryNameID(res) //map to object from migData
        //return resData;
      })
      .catch((_) => console.log(_));
  }

  // getCountryNameAndId() {
  //   /* fetch data for country x */
  //   return fetch(`./data/CountryNameId.json`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((resData) => {
  //       return resData;
  //     })
  //     .catch((_) => console.log(_));
  // }

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

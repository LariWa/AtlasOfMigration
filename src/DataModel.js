/* handles state (year, country) of the app and fetches data from database  */
class DataModel {
  constructor(year = 2000, country = null) {
    this.year = year;
    this.country = country;
    this.max = 0;
    this.getMigrationData().then((res) => {
      this.migrationData = res;
      //this.data = null;
      this.imigrationData = this.getImmigrationData();
      this.emigrationData = this.getEmigrationData();
      //total imigration in 1990 900 is ID for World
      //  console.log(this.getImigrationValue(900, 1990));
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
        //  console.log(value[0][year]);
        if (this.max < parseInt(value[0][year].split(" ").join("")))
          this.max = parseInt(value[0][year].split(" ").join(""));
        return parseInt(value[0][year].split(" ").join(""));
      } else return "";
    }
  }
  getNetMigrationValue(destination, year) {
    //TODO implement net migration
    return 0;
  }
  getEmigrationValue(origin, year) {
    if (!year) year = this.year;
    if (this.emigrationData)
      var value = this.emigrationData.filter(function findValue(data) {
        return data.OriginID == origin;
      });
    if (value && value[0]) {
      //  console.log(value[0][year]);
      if (this.max < parseInt(value[0][year].split(" ").join("")))
        this.max = parseInt(value[0][year].split(" ").join(""));
      return parseInt(value[0][year].split(" ").join(""));
    } else return "";
  }

  setYear(x) {
    this.year = x;
  }
  setCountry(x) {
    this.country = x;
  }

  /* param: country
    return: number of incoming migrants per country as fields
    country: number
    TODO: error handling */
  getData(x = "") {
    /* fetch data for country x */
    return fetch(`./data/${this.year}.json`, {
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
}
export default DataModel;

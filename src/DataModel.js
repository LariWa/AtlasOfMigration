/* handles state (year, country) of the app and fetches data from database  */
class DataModel {
  constructor(year = "1980_1985", country = null) {
    this.year = year;
    this.country = country;
    this.getMigrationData().then((res) => {
      this.migrationData = res;
      //this.data = null;
      this.imigrationData = this.getImmigrationData();
      this.emigrationData = this.getEmigrationData();
      //total imigration in 1990 900 is ID for World
      console.log(this.getImigrationValue(900, 1990));
    });
  }
  getMigrationValue(origin, destination, year) {
    if (this.migrationData)
      return this.migrationData.filter(function findValue(data) {
        return data.DestinationID == destination && data.OriginID == origin;
      })[0][year];
  }
  getImigrationValue(destination, year) {
    if (this.imigrationData)
      return this.imigrationData.filter(function findValue(data) {
        return data.DestinationID == destination;
      })[0][year];
  }
  getEmigrationValue(origin, year) {
    if (this.emigrationData)
      return this.emigrationData.filter(function findValue(data) {
        return data.OriginID == origin;
      })[0][year];
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
        console.log(resData);
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

//const path = `./data/${this.year}.json`;
const path = "./data/Data.json";

/* handles state (year, country) of the app and fetches data from database  */
class DataModel {
  constructor(year = "1990", country = null) {
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

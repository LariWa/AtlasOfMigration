import * as d3 from 'd3';
const papa = require('papaparse');
const path = './data/1990_Origin_Destination.csv';

/* handles state (year, country) of the app and fetches data from database  */
class DataModel {

  constructor(year = '1980_1985', country = null) {
  this.year = year
  this.country = country;
  this.jsondata = d3.blob(path).then(res => {
    console.log(res.text());
    papa.parse(res, {
      complete: x => {
        console.log(x.data);
      }
    })
    })
    .catch(_ => console.log(_))

}

  setYear(x){
    this.year = x
  }
  setCountry(x){
    this.country = x
  }


/* fetch data as csv for year x, return file. TODO error handling */
getCsvData(x = ""){
  return fetch(path
    ,{headers : {
    'Content-Type': 'text/csv;charset=UTF-8',
   }
 })
 .then(res => res.blob())
 .then(blob => {
   this.data = blob;
   return blob.text()
 })
 .then(resData => {
    console.log("fetch csv: "+ resData);
    //console.log(resData instanceof Blob);
    //console.log(this.data instanceof Blob);
    return resData;
  })
  .catch(_ => console.log(_))
}

// papa.parse(getCsvData(), {
//   complete: results => {
//     this.data = results.data
//     console.log("Finished:", this.data);
//   }
// });


  /* param: country
    return: number of incoming migrants per country as fields
    country: number
    TODO: error handling */
  getData(x = ""){
    /* fetch data for country x */
    return fetch(`./data/${this.year}.json`
      ,{headers : {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }
   })
    .then(res => res.json())
    .then(resData => {
      //console.log("fetch res: "+ resData);
      return resData;
    })
    .catch(_ => console.log(_))
  }
}
export default DataModel;

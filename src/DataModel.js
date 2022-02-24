
/* handles state (year, country) of the app and fetches data from database  */
class DataModel {

  constructor(year = '1980_1985', country = null) {
  this.year = year
  this.country = country;

  //this.data = null;
}

  setYear(x){
    this.year = x
  }
  setCountry(x){
    this.country = x
  }

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
      return resData;
    })
    .catch(_ => console.log(_))
  }
}
export default DataModel;

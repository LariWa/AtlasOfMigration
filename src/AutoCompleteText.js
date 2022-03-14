
/*export default class AutoCompleteText extends React.Component {
    constructor (props) {
      super(props);
      this.items = [ 
        {
          "name": "Burundi",
          "id": 108
        },
        {
          "name": "Comoros",
          "id": 174
        },
        {
          "name": "Djibouti",
          "id": 262
        },
        {
          "name": "Eritrea",
          "id": 232
        },
        {
          "name": "Ethiopia",
          "id": 231
        },
        {
          "name": "Kenya",
          "id": 404
        },
        {
          "name": "Madagascar",
          "id": 450
        },
        {
          "name": "Malawi",
          "id": 454
        },
        {
          "name": "Mauritius",
          "id": 480
        },
        {
          "name": "Mayotte",
          "id": 175
        },
        {
          "name": "Mozambique",
          "id": 508
        },
        {
          "name": "Réunion",
          "id": 638
        },
        {
          "name": "Rwanda",
          "id": 646
        },
        {
          "name": "Seychelles",
          "id": 690
        },
        {
          "name": "Somalia",
          "id": 706
        },
        {
          "name": "South Sudan",
          "id": 728
        },
        {
          "name": "Uganda",
          "id": 800
        },
        {
          "name": "United Republic of Tanzania",
          "id": 834
        },
        {
          "name": "Zambia",
          "id": 894
        },
        {
          "name": "Zimbabwe",
          "id": 716
        },
        {
          "name": "Angola",
          "id": 24
        },
        {
          "name": "Cameroon",
          "id": 120
        },
        {
          "name": "Central African Republic",
          "id": 140
        },
        {
          "name": "Chad",
          "id": 148
        },
        {
          "name": "Congo",
          "id": 178
        },
        {
          "name": "Democratic Republic of the Congo",
          "id": 180
        },
        {
          "name": "Equatorial Guinea",
          "id": 226
        },
        {
          "name": "Gabon",
          "id": 266
        },
        {
          "name": "Sao Tome and Principe",
          "id": 678
        },
        {
          "name": "Algeria",
          "id": 12
        },
        {
          "name": "Egypt",
          "id": 818
        },
        {
          "name": "Libya",
          "id": 434
        },
        {
          "name": "Morocco",
          "id": 504
        },
        {
          "name": "Sudan",
          "id": 729
        },
        {
          "name": "Tunisia",
          "id": 788
        },
        {
          "name": "Western Sahara",
          "id": 732
        },
        {
          "name": "Botswana",
          "id": 72
        },
        {
          "name": "Eswatini",
          "id": 748
        },
        {
          "name": "Lesotho",
          "id": 426
        },
        {
          "name": "Namibia",
          "id": 516
        },
        {
          "name": "South Africa",
          "id": 710
        },
        {
          "name": "Benin",
          "id": 204
        },
        {
          "name": "Burkina Faso",
          "id": 854
        },
        {
          "name": "Cabo Verde",
          "id": 132
        },
        {
          "name": "Cote d'Ivoire",
          "id": 384
        },
        {
          "name": "Gambia",
          "id": 270
        },
        {
          "name": "Ghana",
          "id": 288
        },
        {
          "name": "Guinea",
          "id": 324
        },
        {
          "name": "Guinea-Bissau",
          "id": 624
        },
        {
          "name": "Liberia",
          "id": 430
        },
        {
          "name": "Mali",
          "id": 466
        },
        {
          "name": "Mauritania",
          "id": 478
        },
        {
          "name": "Niger",
          "id": 562
        },
        {
          "name": "Nigeria",
          "id": 566
        },
        {
          "name": "Saint Helena",
          "id": 654
        },
        {
          "name": "Senegal",
          "id": 686
        },
        {
          "name": "Sierra Leone",
          "id": 694
        },
        {
          "name": "Togo",
          "id": 768
        },
        {
          "name": "Kazakhstan",
          "id": 398
        },
        {
          "name": "Kyrgyzstan",
          "id": 417
        },
        {
          "name": "Tajikistan",
          "id": 762
        },
        {
          "name": "Turkmenistan",
          "id": 795
        },
        {
          "name": "Uzbekistan",
          "id": 860
        },
        {
          "name": "China",
          "id": 156
        },
        {
          "name": "China, Hong Kong SAR",
          "id": 344
        },
        {
          "name": "China, Macao SAR",
          "id": 446
        },
        {
          "name": "China, Taiwan Province of China",
          "id": 158
        },
        {
          "name": "Dem. People's Republic of Korea",
          "id": 408
        },
        {
          "name": "Japan",
          "id": 392
        },
        {
          "name": "Mongolia",
          "id": 496
        },
        {
          "name": "Republic of Korea",
          "id": 410
        },
        {
          "name": "Brunei Darussalam",
          "id": 96
        },
        {
          "name": "Cambodia",
          "id": 116
        },
        {
          "name": "Indonesia",
          "id": 360
        },
        {
          "name": "Lao People's Democratic Republic",
          "id": 418
        },
        {
          "name": "Malaysia",
          "id": 458
        },
        {
          "name": "Myanmar",
          "id": 104
        },
        {
          "name": "Philippines",
          "id": 608
        },
        {
          "name": "Singapore",
          "id": 702
        },
        {
          "name": "Thailand",
          "id": 764
        },
        {
          "name": "Timor-Leste",
          "id": 626
        },
        {
          "name": "Viet Nam",
          "id": 704
        },
        {
          "name": "Afghanistan",
          "id": 4
        },
        {
          "name": "Bangladesh",
          "id": 50
        },
        {
          "name": "Bhutan",
          "id": 64
        },
        {
          "name": "India",
          "id": 356
        },
        {
          "name": "Iran (Islamic Republic of)",
          "id": 364
        },
        {
          "name": "Maldives",
          "id": 462
        },
        {
          "name": "Nepal",
          "id": 524
        },
        {
          "name": "Pakistan",
          "id": 586
        },
        {
          "name": "Sri Lanka",
          "id": 144
        },
        {
          "name": "Armenia",
          "id": 51
        },
        {
          "name": "Azerbaijan",
          "id": 31
        },
        {
          "name": "Bahrain",
          "id": 48
        },
        {
          "name": "Cyprus",
          "id": 196
        },
        {
          "name": "Georgia",
          "id": 268
        },
        {
          "name": "Iraq",
          "id": 368
        },
        {
          "name": "Israel",
          "id": 376
        },
        {
          "name": "Jordan",
          "id": 400
        },
        {
          "name": "Kuwait",
          "id": 414
        },
        {
          "name": "Lebanon",
          "id": 422
        },
        {
          "name": "Oman",
          "id": 512
        },
        {
          "name": "Qatar",
          "id": 634
        },
        {
          "name": "Saudi Arabia",
          "id": 682
        },
        {
          "name": "State of Palestine",
          "id": 275
        },
        {
          "name": "Syrian Arab Republic",
          "id": 760
        },
        {
          "name": "Turkey",
          "id": 792
        },
        {
          "name": "United Arab Emirates",
          "id": 784
        },
        {
          "name": "Yemen",
          "id": 887
        },
        {
          "name": "Belarus",
          "id": 112
        },
        {
          "name": "Bulgaria",
          "id": 100
        },
        {
          "name": "Czechia",
          "id": 203
        },
        {
          "name": "Hungary",
          "id": 348
        },
        {
          "name": "Poland",
          "id": 616
        },
        {
          "name": "Republic of Moldova",
          "id": 498
        },
        {
          "name": "Romania",
          "id": 642
        },
        {
          "name": "Russian Federation",
          "id": 643
        },
        {
          "name": "Slovakia",
          "id": 703
        },
        {
          "name": "Ukraine",
          "id": 804
        },
        {
          "name": "Channel Islands",
          "id": 830
        },
        {
          "name": "Denmark",
          "id": 208
        },
        {
          "name": "Estonia",
          "id": 233
        },
        {
          "name": "Faroe Islands",
          "id": 234
        },
        {
          "name": "Finland",
          "id": 246
        },
        {
          "name": "Iceland",
          "id": 352
        },
        {
          "name": "Ireland",
          "id": 372
        },
        {
          "name": "Isle of Man",
          "id": 833
        },
        {
          "name": "Latvia",
          "id": 428
        },
        {
          "name": "Lithuania",
          "id": 440
        },
        {
          "name": "Norway",
          "id": 578
        },
        {
          "name": "Sweden",
          "id": 752
        },
        {
          "name": "United Kingdom",
          "id": 826
        },
        {
          "name": "Albania",
          "id": 8
        },
        {
          "name": "Andorra",
          "id": 20
        },
        {
          "name": "Bosnia and Herzegovina",
          "id": 70
        },
        {
          "name": "Croatia",
          "id": 191
        },
        {
          "name": "Gibraltar",
          "id": 292
        },
        {
          "name": "Greece",
          "id": 300
        },
        {
          "name": "Holy See",
          "id": 336
        },
        {
          "name": "Italy",
          "id": 380
        },
        {
          "name": "Malta",
          "id": 470
        },
        {
          "name": "Montenegro",
          "id": 499
        },
        {
          "name": "North Macedonia",
          "id": 807
        },
        {
          "name": "Portugal",
          "id": 620
        },
        {
          "name": "San Marino",
          "id": 674
        },
        {
          "name": "Serbia",
          "id": 688
        },
        {
          "name": "Slovenia",
          "id": 705
        },
        {
          "name": "Spain",
          "id": 724
        },
        {
          "name": "Austria",
          "id": 40
        },
        {
          "name": "Belgium",
          "id": 56
        },
        {
          "name": "France",
          "id": 250
        },
        {
          "name": "Germany",
          "id": 276
        },
        {
          "name": "Liechtenstein",
          "id": 438
        },
        {
          "name": "Luxembourg",
          "id": 442
        },
        {
          "name": "Monaco",
          "id": 492
        },
        {
          "name": "Netherlands",
          "id": 528
        },
        {
          "name": "Switzerland",
          "id": 756
        },
        {
          "name": "Anguilla",
          "id": 660
        },
        {
          "name": "Antigua and Barbuda",
          "id": 28
        },
        {
          "name": "Aruba",
          "id": 533
        },
        {
          "name": "Bahamas",
          "id": 44
        },
        {
          "name": "Barbados",
          "id": 52
        },
        {
          "name": "Bonaire, Sint Eustatius and Saba",
          "id": 535
        },
        {
          "name": "British Virgin Islands",
          "id": 92
        },
        {
          "name": "Cayman Islands",
          "id": 136
        },
        {
          "name": "Cuba",
          "id": 192
        },
        {
          "name": "Curacao",
          "id": 531
        },
        {
          "name": "Dominica",
          "id": 212
        },
        {
          "name": "Dominican Republic",
          "id": 214
        },
        {
          "name": "Grenada",
          "id": 308
        },
        {
          "name": "Guadeloupe",
          "id": 312
        },
        {
          "name": "Haiti",
          "id": 332
        },
        {
          "name": "Jamaica",
          "id": 388
        },
        {
          "name": "Martinique",
          "id": 474
        },
        {
          "name": "Montserrat",
          "id": 500
        },
        {
          "name": "Puerto Rico",
          "id": 630
        },
        {
          "name": "Saint Barthélemy",
          "id": 652
        },
        {
          "name": "Saint Kitts and Nevis",
          "id": 659
        },
        {
          "name": "Saint Lucia",
          "id": 662
        },
        {
          "name": "Saint Martin (French part)",
          "id": 663
        },
        {
          "name": "Saint Vincent and the Grenadines",
          "id": 670
        },
        {
          "name": "Sint Maarten (Dutch part)",
          "id": 534
        },
        {
          "name": "Trinidad and Tobago",
          "id": 780
        },
        {
          "name": "Turks and Caicos Islands",
          "id": 796
        },
        {
          "name": "United States Virgin Islands",
          "id": 850
        },
        {
          "name": "Belize",
          "id": 84
        },
        {
          "name": "Costa Rica",
          "id": 188
        },
        {
          "name": "El Salvador",
          "id": 222
        },
        {
          "name": "Guatemala",
          "id": 320
        },
        {
          "name": "Honduras",
          "id": 340
        },
        {
          "name": "Mexico",
          "id": 484
        },
        {
          "name": "Nicaragua",
          "id": 558
        },
        {
          "name": "Panama",
          "id": 591
        },
        {
          "name": "Argentina",
          "id": 32
        },
        {
          "name": "Bolivia (Plurinational State of)",
          "id": 68
        },
        {
          "name": "Brazil",
          "id": 76
        },
        {
          "name": "Chile",
          "id": 152
        },
        {
          "name": "Colombia",
          "id": 170
        },
        {
          "name": "Ecuador",
          "id": 218
        },
        {
          "name": "Falkland Islands (Malvinas)",
          "id": 238
        },
        {
          "name": "French Guiana",
          "id": 254
        },
        {
          "name": "Guyana",
          "id": 328
        },
        {
          "name": "Paraguay",
          "id": 600
        },
        {
          "name": "Peru",
          "id": 604
        },
        {
          "name": "Suriname",
          "id": 740
        },
        {
          "name": "Uruguay",
          "id": 858
        },
        {
          "name": "Venezuela (Bolivarian Republic of)",
          "id": 862
        },
        {
          "name": "Bermuda",
          "id": 60
        },
        {
          "name": "Canada",
          "id": 124
        },
        {
          "name": "Greenland",
          "id": 304
        },
        {
          "name": "Saint Pierre and Miquelon",
          "id": 666
        },
        {
          "name": "United States of America",
          "id": 840
        },
        {
          "name": "Australia",
          "id": 36
        },
        {
          "name": "New Zealand",
          "id": 554
        },
        {
          "name": "Fiji",
          "id": 242
        },
        {
          "name": "New Caledonia",
          "id": 540
        },
        {
          "name": "Papua New Guinea",
          "id": 598
        },
        {
          "name": "Solomon Islands",
          "id": 90
        },
        {
          "name": "Vanuatu",
          "id": 548
        },
        {
          "name": "Guam",
          "id": 316
        },
        {
          "name": "Kiribati",
          "id": 296
        },
        {
          "name": "Marshall Islands",
          "id": 584
        },
        {
          "name": "Micronesia (Fed. States of)",
          "id": 583
        },
        {
          "name": "Nauru",
          "id": 520
        },
        {
          "name": "Northern Mariana Islands",
          "id": 580
        },
        {
          "name": "Palau",
          "id": 585
        },
        {
          "name": "American Samoa",
          "id": 16
        },
        {
          "name": "Cook Islands",
          "id": 184
        },
        {
          "name": "French Polynesia",
          "id": 258
        },
        {
          "name": "Niue",
          "id": 570
        },
        {
          "name": "Samoa",
          "id": 882
        },
        {
          "name": "Tokelau",
          "id": 772
        },
        {
          "name": "Tonga",
          "id": 776
        },
        {
          "name": "Tuvalu",
          "id": 798
        },
        {
          "name": "Wallis and Futuna Islands",
          "id": 876
        }
      ];

      this.state = {
          suggestions: [],
          text: '',
      };

    }

    nameSpilt () {

    }

    onTextChanged = (e) => {
        console.log(e.target.value)
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp('^${value}', 'i');
            suggestions = this.items.sort().filter(v => regex.test(v));
        }
        this.setState(() => ({suggestions, text:value}));
    }

    suggestionSelected (value) {
        this.setState(() => ({
            text: value,
            suggestions: [],
        }))
    }

    renderSuggestions () {
        const { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
        <ul>
            {suggestions.map((item) => <li onClick={() => this.suggestionsSelected(item)}>(item)</li>)}
        </ul>
        );
    }
  
    render () {
        console.log(this.items)
        const { text } = this.state;
        return (
          <div>
          <input value={text} onChange= {this.onTextChanged}type="text" placeholder="Search here.."/>
            <ul>
              {this.renderSuggestions()}
            </ul>
          </div>
  
      )
    }
}
*/

import React from 'react'
import './App.css'
import "./styles/sideBar.min.css";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

function App() {
  const items = [
    {
        "name": "Burundi",
        "id": 108
      },
      {
        "name": "Comoros",
        "id": 174
      },
      {
        "name": "Djibouti",
        "id": 262
      },
      {
        "name": "Eritrea",
        "id": 232
      },
      {
        "name": "Ethiopia",
        "id": 231
      },
      {
        "name": "Kenya",
        "id": 404
      },
      {
        "name": "Madagascar",
        "id": 450
      },
      {
        "name": "Malawi",
        "id": 454
      },
      {
        "name": "Mauritius",
        "id": 480
      },
      {
        "name": "Mayotte",
        "id": 175
      },
      {
        "name": "Mozambique",
        "id": 508
      },
      {
        "name": "Réunion",
        "id": 638
      },
      {
        "name": "Rwanda",
        "id": 646
      },
      {
        "name": "Seychelles",
        "id": 690
      },
      {
        "name": "Somalia",
        "id": 706
      },
      {
        "name": "South Sudan",
        "id": 728
      },
      {
        "name": "Uganda",
        "id": 800
      },
      {
        "name": "United Republic of Tanzania",
        "id": 834
      },
      {
        "name": "Zambia",
        "id": 894
      },
      {
        "name": "Zimbabwe",
        "id": 716
      },
      {
        "name": "Angola",
        "id": 24
      },
      {
        "name": "Cameroon",
        "id": 120
      },
      {
        "name": "Central African Republic",
        "id": 140
      },
      {
        "name": "Chad",
        "id": 148
      },
      {
        "name": "Congo",
        "id": 178
      },
      {
        "name": "Democratic Republic of the Congo",
        "id": 180
      },
      {
        "name": "Equatorial Guinea",
        "id": 226
      },
      {
        "name": "Gabon",
        "id": 266
      },
      {
        "name": "Sao Tome and Principe",
        "id": 678
      },
      {
        "name": "Algeria",
        "id": 12
      },
      {
        "name": "Egypt",
        "id": 818
      },
      {
        "name": "Libya",
        "id": 434
      },
      {
        "name": "Morocco",
        "id": 504
      },
      {
        "name": "Sudan",
        "id": 729
      },
      {
        "name": "Tunisia",
        "id": 788
      },
      {
        "name": "Western Sahara",
        "id": 732
      },
      {
        "name": "Botswana",
        "id": 72
      },
      {
        "name": "Eswatini",
        "id": 748
      },
      {
        "name": "Lesotho",
        "id": 426
      },
      {
        "name": "Namibia",
        "id": 516
      },
      {
        "name": "South Africa",
        "id": 710
      },
      {
        "name": "Benin",
        "id": 204
      },
      {
        "name": "Burkina Faso",
        "id": 854
      },
      {
        "name": "Cabo Verde",
        "id": 132
      },
      {
        "name": "Cote d'Ivoire",
        "id": 384
      },
      {
        "name": "Gambia",
        "id": 270
      },
      {
        "name": "Ghana",
        "id": 288
      },
      {
        "name": "Guinea",
        "id": 324
      },
      {
        "name": "Guinea-Bissau",
        "id": 624
      },
      {
        "name": "Liberia",
        "id": 430
      },
      {
        "name": "Mali",
        "id": 466
      },
      {
        "name": "Mauritania",
        "id": 478
      },
      {
        "name": "Niger",
        "id": 562
      },
      {
        "name": "Nigeria",
        "id": 566
      },
      {
        "name": "Saint Helena",
        "id": 654
      },
      {
        "name": "Senegal",
        "id": 686
      },
      {
        "name": "Sierra Leone",
        "id": 694
      },
      {
        "name": "Togo",
        "id": 768
      },
      {
        "name": "Kazakhstan",
        "id": 398
      },
      {
        "name": "Kyrgyzstan",
        "id": 417
      },
      {
        "name": "Tajikistan",
        "id": 762
      },
      {
        "name": "Turkmenistan",
        "id": 795
      },
      {
        "name": "Uzbekistan",
        "id": 860
      },
      {
        "name": "China",
        "id": 156
      },
      {
        "name": "China, Hong Kong SAR",
        "id": 344
      },
      {
        "name": "China, Macao SAR",
        "id": 446
      },
      {
        "name": "China, Taiwan Province of China",
        "id": 158
      },
      {
        "name": "Dem. People's Republic of Korea",
        "id": 408
      },
      {
        "name": "Japan",
        "id": 392
      },
      {
        "name": "Mongolia",
        "id": 496
      },
      {
        "name": "Republic of Korea",
        "id": 410
      },
      {
        "name": "Brunei Darussalam",
        "id": 96
      },
      {
        "name": "Cambodia",
        "id": 116
      },
      {
        "name": "Indonesia",
        "id": 360
      },
      {
        "name": "Lao People's Democratic Republic",
        "id": 418
      },
      {
        "name": "Malaysia",
        "id": 458
      },
      {
        "name": "Myanmar",
        "id": 104
      },
      {
        "name": "Philippines",
        "id": 608
      },
      {
        "name": "Singapore",
        "id": 702
      },
      {
        "name": "Thailand",
        "id": 764
      },
      {
        "name": "Timor-Leste",
        "id": 626
      },
      {
        "name": "Viet Nam",
        "id": 704
      },
      {
        "name": "Afghanistan",
        "id": 4
      },
      {
        "name": "Bangladesh",
        "id": 50
      },
      {
        "name": "Bhutan",
        "id": 64
      },
      {
        "name": "India",
        "id": 356
      },
      {
        "name": "Iran (Islamic Republic of)",
        "id": 364
      },
      {
        "name": "Maldives",
        "id": 462
      },
      {
        "name": "Nepal",
        "id": 524
      },
      {
        "name": "Pakistan",
        "id": 586
      },
      {
        "name": "Sri Lanka",
        "id": 144
      },
      {
        "name": "Armenia",
        "id": 51
      },
      {
        "name": "Azerbaijan",
        "id": 31
      },
      {
        "name": "Bahrain",
        "id": 48
      },
      {
        "name": "Cyprus",
        "id": 196
      },
      {
        "name": "Georgia",
        "id": 268
      },
      {
        "name": "Iraq",
        "id": 368
      },
      {
        "name": "Israel",
        "id": 376
      },
      {
        "name": "Jordan",
        "id": 400
      },
      {
        "name": "Kuwait",
        "id": 414
      },
      {
        "name": "Lebanon",
        "id": 422
      },
      {
        "name": "Oman",
        "id": 512
      },
      {
        "name": "Qatar",
        "id": 634
      },
      {
        "name": "Saudi Arabia",
        "id": 682
      },
      {
        "name": "State of Palestine",
        "id": 275
      },
      {
        "name": "Syrian Arab Republic",
        "id": 760
      },
      {
        "name": "Turkey",
        "id": 792
      },
      {
        "name": "United Arab Emirates",
        "id": 784
      },
      {
        "name": "Yemen",
        "id": 887
      },
      {
        "name": "Belarus",
        "id": 112
      },
      {
        "name": "Bulgaria",
        "id": 100
      },
      {
        "name": "Czechia",
        "id": 203
      },
      {
        "name": "Hungary",
        "id": 348
      },
      {
        "name": "Poland",
        "id": 616
      },
      {
        "name": "Republic of Moldova",
        "id": 498
      },
      {
        "name": "Romania",
        "id": 642
      },
      {
        "name": "Russian Federation",
        "id": 643
      },
      {
        "name": "Slovakia",
        "id": 703
      },
      {
        "name": "Ukraine",
        "id": 804
      },
      {
        "name": "Channel Islands",
        "id": 830
      },
      {
        "name": "Denmark",
        "id": 208
      },
      {
        "name": "Estonia",
        "id": 233
      },
      {
        "name": "Faroe Islands",
        "id": 234
      },
      {
        "name": "Finland",
        "id": 246
      },
      {
        "name": "Iceland",
        "id": 352
      },
      {
        "name": "Ireland",
        "id": 372
      },
      {
        "name": "Isle of Man",
        "id": 833
      },
      {
        "name": "Latvia",
        "id": 428
      },
      {
        "name": "Lithuania",
        "id": 440
      },
      {
        "name": "Norway",
        "id": 578
      },
      {
        "name": "Sweden",
        "id": 752
      },
      {
        "name": "United Kingdom",
        "id": 826
      },
      {
        "name": "Albania",
        "id": 8
      },
      {
        "name": "Andorra",
        "id": 20
      },
      {
        "name": "Bosnia and Herzegovina",
        "id": 70
      },
      {
        "name": "Croatia",
        "id": 191
      },
      {
        "name": "Gibraltar",
        "id": 292
      },
      {
        "name": "Greece",
        "id": 300
      },
      {
        "name": "Holy See",
        "id": 336
      },
      {
        "name": "Italy",
        "id": 380
      },
      {
        "name": "Malta",
        "id": 470
      },
      {
        "name": "Montenegro",
        "id": 499
      },
      {
        "name": "North Macedonia",
        "id": 807
      },
      {
        "name": "Portugal",
        "id": 620
      },
      {
        "name": "San Marino",
        "id": 674
      },
      {
        "name": "Serbia",
        "id": 688
      },
      {
        "name": "Slovenia",
        "id": 705
      },
      {
        "name": "Spain",
        "id": 724
      },
      {
        "name": "Austria",
        "id": 40
      },
      {
        "name": "Belgium",
        "id": 56
      },
      {
        "name": "France",
        "id": 250
      },
      {
        "name": "Germany",
        "id": 276
      },
      {
        "name": "Liechtenstein",
        "id": 438
      },
      {
        "name": "Luxembourg",
        "id": 442
      },
      {
        "name": "Monaco",
        "id": 492
      },
      {
        "name": "Netherlands",
        "id": 528
      },
      {
        "name": "Switzerland",
        "id": 756
      },
      {
        "name": "Anguilla",
        "id": 660
      },
      {
        "name": "Antigua and Barbuda",
        "id": 28
      },
      {
        "name": "Aruba",
        "id": 533
      },
      {
        "name": "Bahamas",
        "id": 44
      },
      {
        "name": "Barbados",
        "id": 52
      },
      {
        "name": "Bonaire, Sint Eustatius and Saba",
        "id": 535
      },
      {
        "name": "British Virgin Islands",
        "id": 92
      },
      {
        "name": "Cayman Islands",
        "id": 136
      },
      {
        "name": "Cuba",
        "id": 192
      },
      {
        "name": "Curacao",
        "id": 531
      },
      {
        "name": "Dominica",
        "id": 212
      },
      {
        "name": "Dominican Republic",
        "id": 214
      },
      {
        "name": "Grenada",
        "id": 308
      },
      {
        "name": "Guadeloupe",
        "id": 312
      },
      {
        "name": "Haiti",
        "id": 332
      },
      {
        "name": "Jamaica",
        "id": 388
      },
      {
        "name": "Martinique",
        "id": 474
      },
      {
        "name": "Montserrat",
        "id": 500
      },
      {
        "name": "Puerto Rico",
        "id": 630
      },
      {
        "name": "Saint Barthélemy",
        "id": 652
      },
      {
        "name": "Saint Kitts and Nevis",
        "id": 659
      },
      {
        "name": "Saint Lucia",
        "id": 662
      },
      {
        "name": "Saint Martin (French part)",
        "id": 663
      },
      {
        "name": "Saint Vincent and the Grenadines",
        "id": 670
      },
      {
        "name": "Sint Maarten (Dutch part)",
        "id": 534
      },
      {
        "name": "Trinidad and Tobago",
        "id": 780
      },
      {
        "name": "Turks and Caicos Islands",
        "id": 796
      },
      {
        "name": "United States Virgin Islands",
        "id": 850
      },
      {
        "name": "Belize",
        "id": 84
      },
      {
        "name": "Costa Rica",
        "id": 188
      },
      {
        "name": "El Salvador",
        "id": 222
      },
      {
        "name": "Guatemala",
        "id": 320
      },
      {
        "name": "Honduras",
        "id": 340
      },
      {
        "name": "Mexico",
        "id": 484
      },
      {
        "name": "Nicaragua",
        "id": 558
      },
      {
        "name": "Panama",
        "id": 591
      },
      {
        "name": "Argentina",
        "id": 32
      },
      {
        "name": "Bolivia (Plurinational State of)",
        "id": 68
      },
      {
        "name": "Brazil",
        "id": 76
      },
      {
        "name": "Chile",
        "id": 152
      },
      {
        "name": "Colombia",
        "id": 170
      },
      {
        "name": "Ecuador",
        "id": 218
      },
      {
        "name": "Falkland Islands (Malvinas)",
        "id": 238
      },
      {
        "name": "French Guiana",
        "id": 254
      },
      {
        "name": "Guyana",
        "id": 328
      },
      {
        "name": "Paraguay",
        "id": 600
      },
      {
        "name": "Peru",
        "id": 604
      },
      {
        "name": "Suriname",
        "id": 740
      },
      {
        "name": "Uruguay",
        "id": 858
      },
      {
        "name": "Venezuela (Bolivarian Republic of)",
        "id": 862
      },
      {
        "name": "Bermuda",
        "id": 60
      },
      {
        "name": "Canada",
        "id": 124
      },
      {
        "name": "Greenland",
        "id": 304
      },
      {
        "name": "Saint Pierre and Miquelon",
        "id": 666
      },
      {
        "name": "United States of America",
        "id": 840
      },
      {
        "name": "Australia",
        "id": 36
      },
      {
        "name": "New Zealand",
        "id": 554
      },
      {
        "name": "Fiji",
        "id": 242
      },
      {
        "name": "New Caledonia",
        "id": 540
      },
      {
        "name": "Papua New Guinea",
        "id": 598
      },
      {
        "name": "Solomon Islands",
        "id": 90
      },
      {
        "name": "Vanuatu",
        "id": 548
      },
      {
        "name": "Guam",
        "id": 316
      },
      {
        "name": "Kiribati",
        "id": 296
      },
      {
        "name": "Marshall Islands",
        "id": 584
      },
      {
        "name": "Micronesia (Fed. States of)",
        "id": 583
      },
      {
        "name": "Nauru",
        "id": 520
      },
      {
        "name": "Northern Mariana Islands",
        "id": 580
      },
      {
        "name": "Palau",
        "id": 585
      },
      {
        "name": "American Samoa",
        "id": 16
      },
      {
        "name": "Cook Islands",
        "id": 184
      },
      {
        "name": "French Polynesia",
        "id": 258
      },
      {
        "name": "Niue",
        "id": 570
      },
      {
        "name": "Samoa",
        "id": 882
      },
      {
        "name": "Tokelau",
        "id": 772
      },
      {
        "name": "Tonga",
        "id": 776
      },
      {
        "name": "Tuvalu",
        "id": 798
      },
      {
        "name": "Wallis and Futuna Islands",
        "id": 876
      }
  ]

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (
        <div>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
        </div>
    )  
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: 300 }}>
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            maxResults={3}
            styling={{backgroundColor: "#063140", iconColor: "white", color: "white", borderRadius: "0px", border: "0px solid #dfe1e5"}}
          />
        </div>
      </header>
    </div>
  )
}

export default App

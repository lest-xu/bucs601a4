"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/// 2. create class for rainy country and implements Icountry interface
class RainyCountry {
    constructor(name, climateLevel, climateType, flagUrl) {
        this.name = name;
        this.rainLevel = climateLevel;
        this.climateType = climateType;
        this.flagUrl = flagUrl;
    }
    // 2.2 return the country info as html element
    getInfo() {
        // create the country obejct
        const country = new RainyCountry(this.name, this.rainLevel, this.climateType, this.flagUrl);
        // define the counry info msg variable
        const infoMsg = `${country.name} has a rain level of ${country.rainLevel} inches.`;
        // create a div element and set its text content
        const div = createCountryHtml(country, infoMsg);
        return div;
    }
}
/// 3. create class for snowy country and implements Icountry interface
class SnowyCountry {
    constructor(name, climateLevel, climateType, flagUrl) {
        this.name = name;
        this.snowLevel = climateLevel;
        this.climateType = climateType;
        this.flagUrl = flagUrl;
    }
    // 3.2 return the country info as html element
    getInfo() {
        // create the country obejct
        const country = new SnowyCountry(this.name, this.snowLevel, this.climateType, this.flagUrl);
        // define the counry info msg variable
        const infoMsg = `${country.name} has a snow level of ${country.snowLevel} inches.`;
        // create a div element and set its text content
        const div = createCountryHtml(country, infoMsg);
        return div;
    }
}
/// 4. create class for island country and implements Icountry interface
class IslandCountry {
    constructor(name, climateLevel, climateType, flagUrl) {
        this.name = name;
        this.landSize = climateLevel;
        this.climateType = climateType;
        this.flagUrl = flagUrl;
    }
    // 4.2 return the country info as html element
    getInfo() {
        // create the country obejct
        const country = new IslandCountry(this.name, this.landSize, this.climateType, this.flagUrl);
        // define the counry info msg variable
        const infoMsg = `${country.name} has a land size of ${country.landSize} square kilometers.`;
        // create a div element and set its text content
        const div = createCountryHtml(country, infoMsg);
        return div;
    }
}
// 5. set json data file url
const countriesJsonUrl = "https://raw.githubusercontent.com/lest-xu/bucs601a2/main/countries.json";
// 6. asynchronously fetech countries form my github
function fetchCountries() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(countriesJsonUrl);
            const data = yield res.json();
            console.log(data);
            // define a list of countries
            const countries = [];
            const rainyCountriesList = [];
            const snowyCountriesList = [];
            const islandCountriesList = [];
            // add all josn data to the country list
            data.forEach(item => {
                switch (item.climateType) {
                    case 'rainy':
                        let rc = new RainyCountry(item.name, item.climateLevel, item.climateType, item.flagUrl);
                        countries.push(rc);
                        break;
                    case 'snowy':
                        let sc = new SnowyCountry(item.name, item.climateLevel, item.climateType, item.flagUrl);
                        countries.push(sc);
                        break;
                    case 'island':
                        let ic = new IslandCountry(item.name, item.climateLevel, item.climateType, item.flagUrl);
                        countries.push(ic);
                        break;
                    default:
                        break;
                }
            });
            for (const country of countries) {
                if (isRainyCountry(country)) {
                    let c = country;
                    rainyCountriesList.push(c);
                }
                if (isSnowyCountry(country)) {
                    let c = country;
                    snowyCountriesList.push(c);
                }
                if (isIslandCountry(country)) {
                    let c = country;
                    islandCountriesList.push(c);
                }
            }
            // display all countries
            displayCountryInfo(countries, "all-countries");
            // filter the country based on user selection
            const countrySelect = document.getElementById('country-filter');
            countrySelect.addEventListener('change', (event) => {
                // get the select element
                const selectElement = event.target;
                // get the selected value
                const selectedValue = selectElement.value;
                // check the selected value
                switch (selectedValue) {
                    case 'rainy':
                        // display rainy countries
                        displayCountryInfo(rainyCountriesList, "filtered-countries");
                        break;
                    case 'snowy':
                        // display snowy countries
                        displayCountryInfo(snowyCountriesList, "filtered-countries");
                        break;
                    case 'island':
                        // display island countries
                        displayCountryInfo(islandCountriesList, "filtered-countries");
                        break;
                    default:
                        // display no country
                        displayCountryInfo([], "filtered-countries");
                        break;
                }
            });
            // Display total annual snow level
            const totalSnowLevel = snowyCountriesList.reduce((total, country) => total + country.snowLevel, 0);
            const totalSnowElement = document.getElementById("total-snow-level");
            if (totalSnowElement) {
                totalSnowElement.textContent = `Total annual snow level: ${totalSnowLevel} inches.`;
            }
        }
        catch (error) {
            console.error("Error fetching the products:", error);
        }
    });
}
// 7. initialize fetch countries
fetchCountries();
/// ****HELPER FUNCTIONS**** ///
function createCountryHtml(country, infoMsg) {
    // create countryDiv html element
    const countryDiv = document.createElement("div");
    // set countryDiv class for styling
    countryDiv.classList.add("grid-item");
    // set countryDiv category
    countryDiv.setAttribute("data-category", country.climateType);
    // set countryDiv background image with size 80px at the bottom
    countryDiv.style.backgroundImage = `url(${country.flagUrl})`;
    countryDiv.style.backgroundSize = "60px";
    countryDiv.style.backgroundRepeat = "no-repeat";
    countryDiv.style.backgroundPosition = "bottom 10px right 10px";
    countryDiv.className = 'grid-item';
    let typeIcon = '';
    switch (country.climateType) {
        case 'rainy':
            typeIcon = '☔️';
            break;
        case 'snowy':
            typeIcon = '❄️';
            break;
        case 'island':
            typeIcon = '🌴';
            break;
        default:
            break;
    }
    // add country details for the innerHTML of countryDiv
    countryDiv.innerHTML = `
		<p><b>${country.name}</b></p>
		<p>${infoMsg}</p>
		<p>Type: <span class="type">${typeIcon + ' ' + country.climateType.toUpperCase()}</span></p>`;
    return countryDiv;
}
function displayCountryInfo(countries, elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        if (elementId == 'filtered-countries') {
            element.innerHTML = ''; // clear beofre each filter
        }
        countries.forEach((country) => {
            let countryDiv = country.getInfo();
            if (elementId == 'filtered-countries') {
                countryDiv.style.marginTop = '20px';
            }
            element.appendChild(countryDiv);
        });
        if (elementId == 'filtered-countries' && countries.length > 0) {
            const totalInfoElement = document.createElement('div');
            totalInfoElement.style.marginTop = "20px";
            let totalInfo = '';
            switch (countries[0].climateType) {
                case 'rainy':
                    const totaRainlLevel = countries.reduce((total, country) => total + country.rainLevel, 0);
                    totalInfo = `<p>Total rain level ${totaRainlLevel} inches.</p>`;
                    break;
                case 'snowy':
                    const totalSnowLevel = countries.reduce((total, country) => total + country.snowLevel, 0);
                    totalInfo = `<p>Total snow level  ${totalSnowLevel} inches.</p>`;
                    break;
                case 'island':
                    const totalLandSize = countries.reduce((total, country) => total + country.landSize, 0);
                    totalInfo = `<p>Total land size  ${totalLandSize} square kilometers.</p>`;
                    break;
                default:
                    break;
            }
            console.log(totalInfo);
            totalInfoElement.innerHTML = totalInfo;
            element.appendChild(totalInfoElement); // add total info
        }
    }
}
function isRainyCountry(country) {
    return country.rainLevel !== undefined;
}
function isSnowyCountry(country) {
    return country.snowLevel !== undefined;
}
function isIslandCountry(country) {
    return country.landSize !== undefined;
}
//# sourceMappingURL=app.js.map
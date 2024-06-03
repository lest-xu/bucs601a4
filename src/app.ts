/// 1. create interface for country
interface ICountry {
	name: string;
	// 1.1 extra properties for the country interface
	climateLevel?: number;
	climateType: string;
	flagUrl: string;
	getInfo(): HTMLElement;
}

/// 2. create class for rainy country and implements Icountry interface
class RainyCountry implements ICountry {
	name: string;
	rainLevel: number;
	// 2.1 extra properties for the country class
	climateType: string;
	flagUrl: string;

	constructor(
		name: string,
		climateLevel: number,
		climateType: string,
		flagUrl: string
	) {
		this.name = name;
		this.rainLevel = climateLevel;
		this.climateType = climateType;
		this.flagUrl = flagUrl;
	}

	// 2.2 return the country info as html element
	getInfo(): HTMLElement {
		// create the country obejct
		const country = new RainyCountry(
			this.name,
			this.rainLevel,
			this.climateType,
			this.flagUrl
		);
		// define the counry info msg variable
		const infoMsg = `${country.name} has a rain level of ${country.rainLevel} inches.`;
		// create a div element and set its text content
		const div = createCountryHtml(country, infoMsg);
		return div;
	}
}

/// 3. create class for snowy country and implements Icountry interface
class SnowyCountry implements ICountry {
	name: string;
	snowLevel: number;
	// 3.1 extra properties for the country class
	climateType: string;
	flagUrl: string;

	constructor(
		name: string,
		climateLevel: number,
		climateType: string,
		flagUrl: string
	) {
		this.name = name;
		this.snowLevel = climateLevel;
		this.climateType = climateType;
		this.flagUrl = flagUrl;
	}

	// 3.2 return the country info as html element
	getInfo(): HTMLElement {
		// create the country obejct
		const country = new SnowyCountry(
			this.name,
			this.snowLevel,
			this.climateType,
			this.flagUrl
		);
		// define the counry info msg variable
		const infoMsg = `${country.name} has a snow level of ${country.snowLevel} inches.`;
		// create a div element and set its text content
		const div = createCountryHtml(country, infoMsg);
		return div;
	}
}

/// 4. create class for island country and implements Icountry interface
class IslandCountry implements ICountry {
	name: string;
	landSize: number;
	// 4.1 extra properties for the country class
	climateType: string;
	flagUrl: string;

	constructor(
		name: string,
		climateLevel: number,
		climateType: string,
		flagUrl: string
	) {
		this.name = name;
		this.landSize = climateLevel;
		this.climateType = climateType;
		this.flagUrl = flagUrl;
	}

	// 4.2 return the country info as html element
	getInfo(): HTMLElement {
		// create the country obejct
		const country = new IslandCountry(
			this.name,
			this.landSize,
			this.climateType,
			this.flagUrl
		);
		// define the counry info msg variable
		const infoMsg = `${country.name} has a land size of ${country.landSize} square kilometers.`;
		// create a div element and set its text content
		const div = createCountryHtml(country, infoMsg);
		return div;
	}
}

// 5. set json data file url
const countriesJsonUrl = "https://raw.githubusercontent.com/lest-xu/bucs601a4/master/public/countries.json";

// 6. asynchronously fetech countries form my github
async function fetchCountries(): Promise<void> {
	try {
		const res: Response = await fetch(countriesJsonUrl);
		const data: any[] = await res.json();
		console.log(data);

		// define a list of countries
		const countries: ICountry[] = [];
		const rainyCountriesList: RainyCountry[] = [];
		const snowyCountriesList: SnowyCountry[] = [];
		const islandCountriesList: IslandCountry[] = [];

		// add all josn data to the country list based on the climate type
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
				let c = country as RainyCountry;
				rainyCountriesList.push(c);
			}
			if (isSnowyCountry(country)) {
				let c = country as SnowyCountry;
				snowyCountriesList.push(c);
			}
			if (isIslandCountry(country)) {
				let c = country as IslandCountry;
				islandCountriesList.push(c);
			}
		}

		// display all countries
		displayCountryInfo(countries, "all-countries");

		// filter the country based on user selection
		const countrySelect = document.getElementById('country-filter') as HTMLSelectElement;
		countrySelect.addEventListener('change', (event) => {
			// get the select element
			const selectElement = event.target as HTMLSelectElement;
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

	} catch (error) {
		console.error("Error fetching the products:", error);
	}
}

// 7. initialize fetch countries
fetchCountries();

/// ****HELPER FUNCTIONS**** ///
function createCountryHtml(country: ICountry, infoMsg: string): HTMLElement {
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

function displayCountryInfo(countries: ICountry[], elementId: string): void {
	const element = document.getElementById(elementId) as HTMLDivElement;
	if (element) {
		// clear beofre each filter for the filtered countries
		if (elementId == 'filtered-countries') {
			element.innerHTML = ''; 
		}
		// add the countries to the div list
		countries.forEach((country) => {
			let countryDiv = country.getInfo();
			if (elementId == 'filtered-countries') {
				countryDiv.style.marginTop = '20px';
			}
			element.appendChild(countryDiv);
		});

		// calculate total info for each country type
		if (elementId == 'filtered-countries' && countries.length > 0) {
			const totalInfoElement = document.createElement('div') as HTMLDivElement;
			totalInfoElement.style.marginTop = "20px";
			let totalInfo = '';
			switch (countries[0].climateType) {
				case 'rainy':
					const totaRainlLevel = (countries as RainyCountry[]).reduce(
						(total, country) => total + country.rainLevel, 0
					);
					totalInfo = `<p>Total rain level ${totaRainlLevel} inches.</p>`;
					break;
				case 'snowy':
					const totalSnowLevel = (countries as SnowyCountry[]).reduce(
						(total, country) => total + country.snowLevel, 0
					);
					totalInfo = `<p>Total snow level  ${totalSnowLevel} inches.</p>`;
					break;
				case 'island':
					const totalLandSize = (countries as IslandCountry[]).reduce(
						(total, country) => total + country.landSize, 0
					);
					totalInfo = `<p>Total land size  ${totalLandSize} square kilometers.</p>`;
					break;
				default:
					break;
			}
			totalInfoElement.innerHTML = totalInfo;
			element.appendChild(totalInfoElement); // add total info
		}
	}
}

function isRainyCountry(country: ICountry): country is RainyCountry {
	return (country as RainyCountry).rainLevel !== undefined;
}

function isSnowyCountry(country: ICountry): country is SnowyCountry {
	return (country as SnowyCountry).snowLevel !== undefined;
}

function isIslandCountry(country: ICountry): country is IslandCountry {
	return (country as IslandCountry).landSize !== undefined;
}

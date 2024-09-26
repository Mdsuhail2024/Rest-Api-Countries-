const countriesContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region");
const searchInput = document.querySelector(".searach-container input");
const themeChanger = document.querySelector(".theme-changer")
let allCountriesData;

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data);
    allCountriesData = data;
  });

filterByRegion.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res) => res.json())
    .then((data) => {
      renderCountries(data);
    });
});

function renderCountries(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    //   console.log(country);

    const countryCard = document.createElement("a");
    countryCard.href = `/country.html?name=${country.name.common}`;
    countryCard.classList.add("country-card");
    const cardHTML = `
        <img  src="${country.flags.svg}" alt="${country.name.common}">
                       <div class="card-text">
                        <h2 class="card-title">${country.name.common}</h2>
                        <p><b>Population:</b> ${country.population.toLocaleString()}</p>
                        <p><b>Region:</b> ${country.region}</p>
                        <p><b>Capital:</b> ${country.capital?.[0]}</p>
                       </div>
        `;
    countryCard.innerHTML = cardHTML;
    countriesContainer.append(countryCard);
    // console.log (countryCard);
  });
}

searchInput.addEventListener("input", (e) => {
  // console.log(e.target.value);
  // console.log(allCountriesData);
  const filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
//   console.log(filteredCountries);
  renderCountries(filteredCountries);
});
themeChanger.addEventListener("click", (e) => {
    document.body.classList.toggle("dark")
    themeChanger.innerText = "Light Mode"
})
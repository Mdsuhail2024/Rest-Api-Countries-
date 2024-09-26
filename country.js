// const urlParams = new URLSearchParams(window.location.search).get("name")
// console.log(urlParams);
const countryName = new URLSearchParams(location.search).get("name")
const flagImage = document.querySelector(".country-details img")
const countryNameh1 = document.querySelector(".detail-text-container h1")
const nativeName = document.querySelector(".native-name")
const population = document.querySelector(".population")
const region = document.querySelector(".region")
const subRegion = document.querySelector(".sub-region")
const capital = document.querySelector(".capital")
const topLevelDomain = document.querySelector(".top-level-domain")
const currencies = document.querySelector(".currency")
const languages = document.querySelector(".languages")
const borderCountries = document.querySelector(".border-countries")
const backButton = document.querySelector(".back-button")
const themeChanger = document.querySelector(".theme-changer")


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res) => res.json())
.then(([country]) => {
    // console.log(country);
    flagImage.src = country.flags.svg
    countryNameh1.innerText = country.name.common
    if(country.name.nativeName){
       nativeName.innerText = Object.values(country.name.nativeName)[0].common
    }else{
        nativeName.innerText = country.name.common
    }
    if(country.languages){
        languages.innerText = Object.values(country.languages).join(", ")
    }else{
         languages.remove()
    }
    if(country.currencies){
        currencies.innerText = Object.values(country.currencies)[0].name
    }else{
        currencies.remove()
    }
    if(country.capital){
        capital.innerText = country.capital?.[0]
    }else{
        capital.remove()
    }
    if(country.subregion){
        subRegion.innerText = country.subregion
    }else{
        subRegion.remove()
    }
    population.innerText = country.population.toLocaleString()
    region.innerText = country.region
    topLevelDomain.innerText = country.tld.join(" ")
//    console.log(country);
 
    if(country.borders){
        country.borders.forEach((border) => {
            // console.log(border);
            fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res) => res.json())
            .then(([borderCountry]) => {
                //  console.log(borderCountry);
                 const borderCountryTag = document.createElement("a")
                 borderCountryTag.innerText = borderCountry.name.common
                //  console.log(borderCountryTag);
                 borderCountries.append(borderCountryTag)
                 borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
                 
            })
        })
    }



   
})
themeChanger.addEventListener("click", (e) => {
    document.body.classList.toggle("dark")

    
    

})
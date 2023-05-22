import countries from "world-countries";

const formatCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    reigon: country.region,

}));

const useCountries = () => {
    const getAllCountries = () => formatCountries;

    const getByValue = (value: string) => {
        const country = formatCountries.find((country) => country.value === value);
        return country;
    }

    return {
        getAllCountries,
        getByValue,
    }
}

export default useCountries;
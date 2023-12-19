import React, { useEffect, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { fetchCities } from '../../api/OpenWeatherService';

const Search = ({ onSearchChange }) => {
  const [searchValue, setSearchValue] = useState({value: '24.583333333 73.683333333', label: 'Udaipur, IN'});
  const loadOptions = async (inputValue) => {
    const citiesList = await fetchCities(inputValue);

    return {
      options: citiesList.data.map((city) => {
        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        };
      }),
    };
  };

  const onChangeHandler = (enteredData) => {
    setSearchValue(enteredData);
    onSearchChange(enteredData);
  };

  useEffect (()=>{
    console.log(searchValue,"aa")
    onSearchChange(searchValue)
  },[])

  return (
    <AsyncPaginate
    placeholder="search your city"
    debounceTimeout={600}
    value={searchValue}
    onChange={onChangeHandler}
    loadOptions={loadOptions}
    />
  );
};

export default Search;

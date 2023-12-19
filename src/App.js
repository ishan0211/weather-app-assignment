import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Link, SvgIcon, Typography } from '@mui/material';
import Search from './components/Search/Search';
import WeeklyForecast from './components/WeeklyForecast/WeeklyForecast';
import TodayWeather from './components/TodayWeather/TodayWeather';
import { fetchWeatherData } from './api/OpenWeatherService';
import { transformDateFormat } from './utilities/DatetimeUtils';
import UTCDatetime from './components/Reusable/UTCDatetime';
import LoadingBox from './components/Reusable/LoadingBox';
import { ReactComponent as SplashIcon } from './assets/splash-icon.svg';
import Logo from './assets/logo.png';
import ErrorBox from './components/Reusable/ErrorBox';
import { ALL_DESCRIPTIONS } from './utilities/DateConstants';
// import GitHubIcon from '@mui/icons-material/GitHub';
import ListIcon from '@mui/icons-material/List';
import {
  getTodayForecastWeather,
  getWeekForecastWeather,
} from './utilities/DataUtils';

function App() {
  const [todayWeather, setTodayWeather] = useState(null);
  const [todayForecast, setTodayForecast] = useState([]);
  const [weekForecast, setWeekForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchValue, setSearchValue] = useState();

  const searchChangeHandler = (enteredData) => {
    setIsLoading(true);

    const [latitude, longitude] = enteredData?.value?.split(' ');

    fetchWeatherAndUpdateState(enteredData, latitude, longitude)
      .then(() => {
        setIsLoading(false);
      });
  };

  const fetchWeatherAndUpdateState = async (enteredData, latitude, longitude) => {
    const currentDate = transformDateFormat();
    const date = new Date();
    const dt_now = Math.floor(date.getTime() / 1000);

    try {
      const [todayWeatherResponse, weekForecastResponse] =
        await fetchWeatherData(latitude, longitude);

      const all_today_forecasts_list = getTodayForecastWeather(
        weekForecastResponse,
        currentDate,
        dt_now
      );

      const all_week_forecasts_list = getWeekForecastWeather(
        weekForecastResponse,
        ALL_DESCRIPTIONS
      );

      setTodayForecast([...all_today_forecasts_list]);
      setTodayWeather({ city: enteredData.label, ...todayWeatherResponse });
      setWeekForecast({
        city: enteredData.label,
        list: all_week_forecasts_list,
      });
    } catch (error) {
      setError(true);
    }

    // Update the search value and save to local storage
    setSearchValue(enteredData);
    localStorage.setItem('searchValue', JSON.stringify(enteredData));
  };

  useEffect(() => {
    // Load from local storage on mount
    const storedSearchValue = localStorage.getItem('searchValue');
    if (storedSearchValue) {
      setSearchValue(JSON.parse(storedSearchValue));
    }
  }, []);
  // const [todayWeather, setTodayWeather] = useState(null);
  // const [todayForecast, setTodayForecast] = useState([]);
  // const [weekForecast, setWeekForecast] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false);
  // const [searchValue, setSearchValue] = useState();

  // const searchChangeHandler = (enteredData) => {
  //   // Start loading state
  //   setIsLoading(true);
  
  //   // Extract latitude and longitude
  //   const [latitude, longitude] = searchValue?.value?.split(' ');
  
  //   // Perform asynchronous operations
  //   fetchWeatherAndUpdateState(searchValue, latitude, longitude)
  //     .then(() => {
  //       // Loading is complete
  //       setIsLoading(false);
  //     });
  // };
  
  // const fetchWeatherAndUpdateState = async (enteredData, latitude, longitude) => {
  //   const currentDate = transformDateFormat();
  //   const date = new Date();
  //   const dt_now = Math.floor(date.getTime() / 1000);
  
  //   try {
  //     const [todayWeatherResponse, weekForecastResponse] =
  //       await fetchWeatherData(latitude, longitude);
  
  //     const all_today_forecasts_list = getTodayForecastWeather(
  //       weekForecastResponse,
  //       currentDate,
  //       dt_now
  //     );
  
  //     const all_week_forecasts_list = getWeekForecastWeather(
  //       weekForecastResponse,
  //       ALL_DESCRIPTIONS
  //     );
  
  //     setTodayForecast([...all_today_forecasts_list]);
  //     setTodayWeather({ city: enteredData.label, ...todayWeatherResponse });
  //     setWeekForecast({
  //       city: enteredData.label,
  //       list: all_week_forecasts_list,
  //     });
  //   } catch (error) {
  //     setError(true);
  //   }
  //   localStorage.setItem('searchValue', JSON.stringify(enteredData));
  //   // Update the search value
  //   setSearchValue(enteredData);
  // };

  // const loadFromLocalStorage = () => {
  //   const storedSearchValue = localStorage.getItem('searchValue');
  //   if (storedSearchValue) {
  //     setSearchValue(JSON.parse(storedSearchValue));
  //   }
  // };

  // useEffect(() => {
  //   // Load from local storage on mount
  //   loadFromLocalStorage();
  // }, []);
  
  // const searchChangeHandler = async (enteredData) => {
  //   // Use the callback function to access the updated value
  //   setSearchValue((prevSearchValue) => {
  //     console.log(prevSearchValue, enteredData);
  
  //   const [latitude, longitude] = enteredData?.value?.split(' ');
  //     setIsLoading(true);
  
  //   const currentDate = transformDateFormat();
  //   const date = new Date();
  //   let dt_now = Math.floor(date.getTime() / 1000);

  //   try {
  //     const [todayWeatherResponse, weekForecastResponse] =
  //       await fetchWeatherData(latitude, longitude);
  //     const all_today_forecasts_list = getTodayForecastWeather(
  //       weekForecastResponse,
  //       currentDate,
  //       dt_now
  //     );

  //     const all_week_forecasts_list = getWeekForecastWeather(
  //       weekForecastResponse,
  //       ALL_DESCRIPTIONS
  //     );

  //     setTodayForecast([...all_today_forecasts_list]);
  //     setTodayWeather({ city: enteredData.label, ...todayWeatherResponse });
  //     setWeekForecast({
  //       city: enteredData.label,
  //       list: all_week_forecasts_list,
  //     });
  //   } catch (error) {
  //     setError(true);
  //   }
  
  //     setIsLoading(false);
  
  //     // Return the new value for setSearchValue
  //     return enteredData;
  //   });
  // };
  

  // const searchChangeHandler = async (enteredData) => {
  //   setSearchValue(enteredData);
  //   console.log(searchValue,enteredData)
  //   const [latitude, longitude] = searchValue?.value?.split(' ');

  //   setIsLoading(true);

  //   const currentDate = transformDateFormat();
  //   const date = new Date();
  //   let dt_now = Math.floor(date.getTime() / 1000);

  //   try {
  //     const [todayWeatherResponse, weekForecastResponse] =
  //       await fetchWeatherData(latitude, longitude);
  //     const all_today_forecasts_list = getTodayForecastWeather(
  //       weekForecastResponse,
  //       currentDate,
  //       dt_now
  //     );

  //     const all_week_forecasts_list = getWeekForecastWeather(
  //       weekForecastResponse,
  //       ALL_DESCRIPTIONS
  //     );

  //     setTodayForecast([...all_today_forecasts_list]);
  //     setTodayWeather({ city: enteredData.label, ...todayWeatherResponse });
  //     setWeekForecast({
  //       city: enteredData.label,
  //       list: all_week_forecasts_list,
  //     });
  //   } catch (error) {
  //     setError(true);
  //   }

  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   // Save to local storage when searchValue changes
  //   localStorage.setItem('kk', JSON.stringify(searchValue));
  // }, [searchValue]);

  // useEffect(() => {
  //   // Retrieve from local storage on component mount
  //   const storedSearchValue = localStorage.getItem('kk');
  //   if (storedSearchValue) {
  //     setSearchValue(JSON.parse(storedSearchValue));
  //   }
  // }, []); // Empty dependency array means it only runs once on component mount


  let appContent = (
    <Box
      xs={12}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: '100%',
        minHeight: '500px',
      }}
    >
      <SvgIcon
        component={SplashIcon}
        inheritViewBox
        sx={{ fontSize: { xs: '100px', sm: '120px', md: '140px' } }}
      />
      <Typography
        variant="h4"
        component="h4"
        sx={{
          fontSize: { xs: '12px', sm: '14px' },
          color: 'rgba(255,255,255, .85)',
          fontFamily: 'Poppins',
          textAlign: 'center',
          margin: '2rem 0',
          maxWidth: '80%',
          lineHeight: '22px',
        }}
      >
        Explore current weather data and 6-day forecast of more than 200,000
        cities!
      </Typography>
    </Box>
  );

  if (todayWeather && todayForecast && weekForecast) {
    appContent = (
      <React.Fragment>
        <Grid item xs={12} md={todayWeather ? 6 : 12}>
          <Grid item xs={12}>
            <TodayWeather data={todayWeather} forecastList={todayForecast} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <WeeklyForecast data={weekForecast} />
        </Grid>
      </React.Fragment>
    );
  }

  if (error) {
    appContent = (
      <ErrorBox
        margin="3rem auto"
        flex="inherit"
        errorMessage="Something went wrong"
      />
    );
  }

  if (isLoading) {
    appContent = (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          minHeight: '500px',
        }}
      >
        <LoadingBox value="1">
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontSize: { xs: '10px', sm: '12px' },
              color: 'rgba(255, 255, 255, .8)',
              lineHeight: 1,
              fontFamily: 'Poppins',
            }}
          >
            Loading...
          </Typography>
        </LoadingBox>
      </Box>
    );
  }

  return (
    <Container
      sx={{
        maxWidth: { xs: '95%', sm: '80%', md: '1100px' },
        width: '100%',
        height: '100%',
        margin: '0 auto',
        padding: '1rem 0 3rem',
        marginBottom: '1rem',
        borderRadius: {
          xs: 'none',
          sm: '0 0 1rem 1rem',
        },
        boxShadow: {
          xs: 'none',
          sm: 'rgba(0,0,0, 0.5) 0px 10px 15px -3px, rgba(0,0,0, 0.5) 0px 4px 6px -2px',
        },
      }}
    >
      <Grid container columnSpacing={2}>
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              width: '100%',
              marginBottom: '1rem',
            }}
          >
            <Box
              component="img"
              sx={{
                height: { xs: '16px', sm: '22px', md: '26px' },
                width: 'auto',
              }}
              alt="logo"
              src={Logo}
            />

            <UTCDatetime />
            <ListIcon
            fontSize="large"
            color="primary"
            />
          </Box>
          <Search onSearchChange={searchChangeHandler} />
        </Grid>
        {appContent}
      </Grid>
    </Container>
  );
}

export default App;

import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon6 from 'react-native-vector-icons/FontAwesome6';

import {useDispatch, useSelector} from 'react-redux';
import {setError, setWeather} from '../../redux/weatherActions';

import {getWeatherByCity} from '../../services/WeatherService';

import styles from './styles';
import {getNewsByCategory} from '../../services/newsServics';
import {setNews, setNewsError} from '../../redux/newsAction';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const Dashboard = () => {
  const navigation = useNavigation();

  const [city, setCity] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [newsLoading, setNewsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const weatherData = useSelector((state: any) => state.weather.weather);
  const newsData = useSelector((state: any) => state.news.news);
  const {newsError, error} = useSelector((state: any) => state.news);
  const {newsCategories, temperatureUnit} = useSelector(
    (state: any) => state.settings,
  );

  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;

        try {
          setLoading(true);
          dispatch(setError(''));
          dispatch(setNewsError(''));

          const weather = await getWeatherByCity('', latitude, longitude); // Update service
          dispatch(setWeather(weather));
        } catch (err) {
          dispatch(setError('Failed to fetch weather for location'));
        } finally {
          setLoading(false);
        }
      },
      error => {
        console.error('Location error:', error);
        dispatch(setError('Could not get location'));
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const convertTemp = (kelvin: number, unit: string) => {
    return unit === 'metric'
      ? Math.round(kelvin - 273.15)
      : Math.round(((kelvin - 273.15) * 9) / 5 + 32);
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') return true;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const fetchWeatherByCity = async () => {
    if (!city) {
      dispatch(setError('Please enter a city'));
      return;
    }

    setLoading(true);
    dispatch(setError(''));
    dispatch(setNewsError(''));

    try {
      const data = await getWeatherByCity(city);
      dispatch(setWeather(data));
    } catch (err) {
      dispatch(setError('Unable to fetch weather data'));
    } finally {
      setLoading(false);
    }
  };

  const fetchNewsByCategory = async (category: string) => {
    setNewsLoading(true);
    try {
      const newsResponse = await getNewsByCategory(category);
      dispatch(setNews(newsResponse));
    } catch {
      dispatch(setNewsError('Failed to fetch news'));
    } finally {
      setNewsLoading(false);
    }
  };

  // When weatherData updates, fetch news accordingly
  useEffect(() => {
    if (newsCategories) {
      fetchNewsByCategory(newsCategories);
    }
  }, [newsCategories]);

  const getDayLabel = (index: number) => {
    if (index === 0) return 'Today';
    if (index === 1) return 'Tomorrow';

    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const currentDay = new Date().getDay();
    return daysOfWeek[(currentDay + index) % 7];
  };

  const renderWeather = () => {
    if (weatherData) {
      const currentWeather = weatherData.list[0];
      const forecastData = weatherData.list.slice(1, 6);

      return (
        <>
          <View style={styles.weatherInfo}>
            <Text style={styles.city}>{weatherData.city.name}</Text>
            <View style={styles.row}>
              <Text style={styles.temp}>
                {convertTemp(currentWeather.main.temp, temperatureUnit)}
              </Text>
              <View style={styles.width} />
              <View style={styles.top}>
                <Text style={styles.weatherText}>
                  {temperatureUnit === 'metric' ? '°C' : '°F'}
                </Text>
                <Text style={styles.weatherText}>
                  {currentWeather.weather[0].description}
                </Text>
              </View>
            </View>
            <View style={styles.top} />
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.weatherText}>Humidity</Text>
                <View style={styles.top} />
                <Text style={styles.weatherText}>
                  {currentWeather.main.humidity}%
                </Text>
              </View>
              <View style={styles.width} />
              <View style={styles.column}>
                <Text style={styles.weatherText}>Wind Speed</Text>
                <View style={styles.top} />
                <Text style={styles.weatherText}>
                  {currentWeather.wind.speed} m/s
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.separator} />

          <FlatList
            data={forecastData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <>
                <View key={index} style={styles.forecastItem}>
                  <View>
                    <Text style={styles.title}>
                      {getDayLabel(index)}: {item.weather[0].description}
                    </Text>
                    <Text style={styles.forecastText}>
                      {convertTemp(item.main.temp_max, temperatureUnit)}°
                      {temperatureUnit === 'metric' ? 'C' : 'F'} /
                      {convertTemp(item.main.temp_min, temperatureUnit)}°
                      {temperatureUnit === 'metric' ? 'C' : 'F'}
                    </Text>
                  </View>
                  <Image
                    source={{
                      uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
                    }}
                    style={styles.weatherIcon}
                  />
                </View>
                <View style={styles.top} />
              </>
            )}
          />
        </>
      );
    } else {
      return <Text>No weather data available</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter city name"
          value={city}
          onChangeText={setCity}
          placeholderTextColor={'#ccc'}
        />
        <TouchableOpacity
          onPress={fetchWeatherByCity}
          style={styles.searchIcon}>
          <Icon name="search" size={20} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={getCurrentLocation}
          style={styles.searchIcon}>
          <Icon6 name="location-dot" size={20} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Icon name="cog" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#ccc" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={newsData?.articles || []}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={renderWeather}
          renderItem={({item, index}) => (
            <View>
              {index === 0 && (
                <Text style={[styles.forecastTitle, {marginBottom: 10}]}>
                  Today’s Headline
                </Text>
              )}
              <View style={styles.newsCard}>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsDescription}>{item.description}</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            newsLoading ? (
              <ActivityIndicator size="small" color="#3B82F6" />
            ) : newsError ? (
              <Text style={styles.error}>{newsError}</Text>
            ) : (
              <Text style={styles.error}>No news available</Text>
            )
          }
          ListFooterComponent={<View style={{height: 40}} />}
        />
      )}
    </SafeAreaView>
  );
};

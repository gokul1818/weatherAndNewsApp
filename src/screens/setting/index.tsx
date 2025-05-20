import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setNewsCategories, setTemperatureUnit } from '../../redux/settingAction';
import styles from '../dashBoard/styles'; // reuse your common styles
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Settings = () => {
  const dispatch = useDispatch();
  const temperatureUnit = useSelector((state: any) => state.settings.temperatureUnit);
  const newsCategories = useSelector((state: any) => state.settings.newsCategories);

  const toggleUnit = () => {
    dispatch(setTemperatureUnit(temperatureUnit === 'metric' ? 'imperial' : 'metric'));
  };

  const categories = [
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology',
  ];

  const toggleCategory = (category: string) => {
    if (newsCategories.includes(category)) {
      dispatch(setNewsCategories(newsCategories.filter((c: any) => c !== category)));
    } else {
      dispatch(setNewsCategories([...newsCategories, category]));
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: wp('5%') }}>
      <Text style={styles.forecastTitle}>Temperature Unit</Text>
      <TouchableOpacity
        onPress={toggleUnit}
        style={{
          padding: 12,
          backgroundColor: '#3B82F6',
          borderRadius: 8,
          marginTop: hp('1%'),
          alignSelf: 'flex-start',
        }}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
          {temperatureUnit === 'metric' ? 'Celsius (°C)' : 'Fahrenheit (°F)'}
        </Text>
      </TouchableOpacity>

      <Text style={[styles.forecastTitle, { marginTop: hp('4%') }]}>
        News Categories
      </Text>
      <View style={{ marginTop: hp('1%') }}>
        {categories.map(category => {
          const selected = newsCategories.includes(category);
          return (
            <TouchableOpacity
              key={category}
              onPress={() => toggleCategory(category)}
              style={{
                padding: 12,
                backgroundColor: selected ? '#3B82F6' : '#E5E7EB',
                borderRadius: 8,
                marginBottom: hp('1%'),
              }}>
              <Text style={{ color: selected ? '#fff' : '#000', fontWeight: '500' }}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Settings;

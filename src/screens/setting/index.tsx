import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { setNewsCategories, setTemperatureUnit } from '../../redux/settingAction';


const Settings = () => {
  const dispatch = useDispatch();
  const temperatureUnit = useSelector(
    (state: any) => state.settings.temperatureUnit,
  );
  const newsCategories = useSelector(
    (state: any) => state.settings.newsCategories,
  );

  const toggleUnit = () => {
    dispatch(
      setTemperatureUnit(temperatureUnit === 'metric' ? 'imperial' : 'metric'),
    );
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
      dispatch(setNewsCategories(newsCategories.filter((c:any) => c !== category)));
    } else {
      dispatch(setNewsCategories([...newsCategories, category]));
    }
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      <Text>Temperature Unit</Text>
      <TouchableOpacity onPress={toggleUnit}>
        <Text>
          {temperatureUnit === 'metric' ? 'Celsius (°C)' : 'Fahrenheit (°F)'}
        </Text>
      </TouchableOpacity>

      <Text style={{marginTop: 20}}>News Categories</Text>
      {categories.map(category => (
        <TouchableOpacity
          key={category}
          onPress={() => toggleCategory(category)}>
          <Text
            style={{
              color: newsCategories.includes(category) ? 'blue' : 'black',
            }}>
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Settings;

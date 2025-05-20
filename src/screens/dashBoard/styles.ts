import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingHorizontal: wp('2%'),
    paddingTop: hp('2%'),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1%'),
    marginBottom: hp('2%'),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#F1F5F9',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
  },

  searchIcon: {
    padding: wp('2%'),
    marginLeft: wp('1%'),
  },

  weatherInfo: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: wp('4%'),
    marginBottom: hp('2%'),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },

  city: {
    fontSize: 22,
    fontWeight: '700',
    color: '#F1F5F9',
    marginBottom: hp('1%'),
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  column: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  temp: {
    fontSize: 48,
    fontWeight: '800',
    color: '#3B82F6',
  },

  weatherText: {
    fontSize: 16,
    color: '#94A3B8',
    textTransform: 'capitalize',
  },

  weatherIcon: {
    width: 60,
    height: 60,
    marginLeft: wp('2%'),
  },

  forecastTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F1F5F9',
    marginBottom: hp('1.5%'),
  },

  forecastItem: {
    backgroundColor: '#1E293B',
    borderRadius: 10,
    padding: wp('4%'),
    marginBottom: hp('1.2%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
  },

  forecastText: {
    fontSize: 15,
    color: '#F1F5F9',
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F1F5F9',
  },

  top: {
    marginTop: hp('2%'),
  },

  top1: {
    marginTop: hp('1%'),
  },

  width: {
    width: wp('3%'),
  },

  separator: {
    borderBottomWidth: 1,
    borderColor: '#334155',
    marginVertical: hp('2%'),
  },

  error: {
    textAlign: 'center',
    color: '#F87171', // Soft red for error
    fontSize: 14,
    marginTop: hp('2%'),
  },

  newsCard: {
    backgroundColor: '#1E293B',
    padding: wp('4%'),
    borderRadius: 10,
    marginBottom: hp('1.5%'),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
  },

  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F1F5F9',
    marginBottom: hp('0.5%'),
  },

  newsDescription: {
    fontSize: 14,
    color: '#94A3B8',
  },
});

export default styles;

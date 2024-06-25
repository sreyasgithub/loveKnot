import React, {useState} from 'react';
import Layout from './layout';

import {
  View,
  Text,
  Image,
  Pressable,
  ImageBackground,
  Modal,
} from 'react-native';
import globalStyles from '../../../assets/globalStyles';
import images from '../../bucket-list';
import styles from './profile.styles';
import colors from '../../../assets/colors';
import TextField from '../../../components/textField';
import {ButtonLg} from '../../../components/buttons';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import DatePicker from 'react-native-modern-datepicker';
import Icon from '../../../components/icon';
import {Dialog} from '@rneui/themed';
import DateSelector from '../../../components/dateSelector';
import {RouteProp, useRoute} from '@react-navigation/native';
import {dateTypes} from '../../../redux/types/dates.types';
import {useSelector} from 'react-redux';
import {appState} from '../../../redux/slices/rootReducer';
const Dates = ({navigation}: any) => {
  type RootStackParamList = {
    dates: {
      user: any;
      firstName: string;
      lastName: string;
      gender: string;
    };
  };

  // Create a type for the route prop
  type ConnectScreenRouteProp = RouteProp<RootStackParamList, 'dates'>;

  // Initialize countdown value

  const route = useRoute<ConnectScreenRouteProp>();
  // const {email, firstName, lastName, gender} = route.params;
  console.log(route.params);
  const [selected, setSelected] = useState('');
  const {birthDate, meetDate} = useSelector(
    (state: appState) => state.datePicker,
  );
  return (
    <Layout step={3}>
      <Text style={[styles.stepStatement, {fontFamily: 'Montserrat-Medium'}]}>
        When is your birthday?
      </Text>
      <DateSelector dateType={dateTypes.birthDate} />
      <Text style={[styles.stepStatement, {fontFamily: 'Montserrat-Medium'}]}>
        When did you and your partner meet first?
      </Text>
      <DateSelector dateType={dateTypes.meetDate} />
      <View style={{marginTop: 10, marginBottom: 30}}>
        <ButtonLg
          label="Get started!"
          onPress={() => {
            navigation.navigate('concent', {
              ...route.params,
              birthDate,
              meetDate,
            });
          }}
        />
      </View>
      <Text style={styles.footerText}>
        You can also see the information given by your partner on Love Knot.
        Your privacy and security are our utmost priorities, and we strictly
        adhere to data protection regulations to ensure the confidentiality of
        your information on our platform.
      </Text>
    </Layout>
  );
};

export default Dates;

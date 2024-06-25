import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import Layout from '../profile/layout';
import {CheckBox} from 'react-native-elements';
import images from '../../../assets/images';
import colors from '../../../assets/colors';
import globalStyles from '../../../assets/globalStyles';
import styles from './concent.styles';
import ListItem from './listItem';
import {ButtonLg} from '../../../components/buttons';
import {RouteProp, useRoute} from '@react-navigation/native';
import {createUser} from '../../../redux/slices/auth/createUser.slice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../../redux/store';
import {appState} from '../../../redux/slices/rootReducer';

const Concent = ({navigation}: any) => {
  const [isAdult, setIsAdult] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const createState = useSelector((state: appState) => state.create);

  type RootStackParamList = {
    concent: {
      user: any;
      firstName: string;
      lastName: string;
      gender: string;
      birthDate: string;
      meetDate: string;
    };
  };

  // Create a type for the route prop
  type ConnectScreenRouteProp = RouteProp<RootStackParamList, 'concent'>;

  // Initialize countdown value

  const route = useRoute<ConnectScreenRouteProp>();

  return (
    <ScrollView>
      <View>
        <View style={globalStyles.flexColCenter}>
          <Text style={styles.welcomeText}>Welcome to Love Knot</Text>
          <Image source={images.LOGO} style={{marginVertical: 20}} />
          <Text style={styles.requestText}>
            Please agree the following terms for the use.
          </Text>
        </View>
        <View style={[globalStyles.contentWrapper, styles.concentWrapper]}>
          <View style={styles.acceptanceWrapper}>
            <CheckBox
              checked={isAdult}
              checkedColor={colors.primary}
              uncheckedColor={colors.grey.shade1}
              onPress={() => setIsAdult(!isAdult)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              containerStyle={{padding: 0}}
            />
            <Text style={styles.acceptanceText}>
              By clicking 'Agree and Proceed', you acknowledge that you're 18 or
              older and also provide consent to Love Knot's terms:
              location-based terms, personal data collection, optional ads, and
              use of personal info for marketing."
            </Text>
          </View>
          <View style={{marginTop: 10}}>
            <ListItem
              text="Iam"
              highLightedText="over 18"
              description="You must be at least 18 years old to use the App.
               By using the App, you represent and warrant that you are at least 18 years old."
            />
            <ListItem
              text="I agree to the"
              highLightedText="Terms of Use"
              highLightedTextUnderlined={true}
            />
            <ListItem
              text="I agree to the "
              highLightedText="Privacy Policy"
              highLightedTextUnderlined={true}
            />
            <ListItem
              text="I agree to"
              highLightedText="receive advertising notifications"
              description="You can get notifications about new events and benefits"
            />
          </View>
        </View>

        <View
          style={[
            globalStyles.contentWrapper,
            {marginTop: 10, marginBottom: 40},
          ]}>
          <ButtonLg
            label="Agree and Proceed"
            onPress={() => {
              dispatch(createUser({...route.params, isAdult, navigation}));
              // navigation.navigate('tabs');
            }}
          />
          <Text style={{color: 'red', fontSize: 10, textAlign: 'center'}}>
            {createState?.error?.concent?.message}
          </Text>
        </View>

        <View style={styles.bottomHeart}>
          <Image source={images.FOOTER_HEART} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Concent;

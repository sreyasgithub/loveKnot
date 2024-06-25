import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import images from '../../../assets/images';
import globalStyles from '../../../assets/globalStyles';
import colors from '../../../assets/colors';
import styles from './home.styles';
import Cover from './components/cover';
import Therapists from './components/therapists';

import SpecialDay from './components/specialDay';
import MsgNote from './components/msgNote';
import {useSelector} from 'react-redux';
import {appState} from '../../../redux/slices/rootReducer';

const Home = ({navigation}: any) => {
  const auth = useSelector((state: appState) => state.login);
  console.log('auth', auth);
  const WIDTH = Dimensions.get('window').width - 60;
  const LEFT_WIDTH = WIDTH / 1.4;
  const RIGHT_WIDTH = WIDTH - LEFT_WIDTH;
  return (
    <ScrollView contentContainerStyle={globalStyles.screenContainer}>
      <View style={{paddingHorizontal: 20}}>
        <Cover />
        <View
          style={[
            {
              flexDirection: 'row',
              marginVertical: 20,
            },
          ]}>
          <View style={{width: LEFT_WIDTH, marginRight: 20}}>
            <SpecialDay />
            <MsgNote />
          </View>
          <View style={{width: RIGHT_WIDTH}}>
            <View style={styles.featuresWrapper}>
              <Pressable
                onPress={() => {
                  navigation.navigate('bucket-list');
                }}
                style={[
                  styles.feartureIconWrapper,
                  {
                    width: RIGHT_WIDTH - 20,
                    height: RIGHT_WIDTH - 20,
                  },
                ]}>
                <Image source={images.CELEBRATIONS_ICON} />
              </Pressable>
              <Text style={styles.featureLabel}>Celebrations</Text>
              <Pressable
                onPress={() => {
                  navigation.navigate('bucket-list');
                }}
                style={[
                  styles.feartureIconWrapper,
                  {
                    width: RIGHT_WIDTH - 20,
                    height: RIGHT_WIDTH - 20,
                  },
                ]}>
                <Image source={images.BUCKET_LIST_ICON} />
              </Pressable>
              <Text style={styles.featureLabel}>Bucket List</Text>
            </View>
          </View>
        </View>
      </View>
      <Therapists />
    </ScrollView>
  );
};

export default Home;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Carousal from './carousal';
import images from '../../assets/images';
import colors from '../../assets/colors';
import globalStyles from '../../assets/globalStyles';
import {useSelector} from 'react-redux';
import {appState} from '../../redux/slices/rootReducer';
import {getData} from '../../services/asyncStorage';

const Intro = ({navigation}: any) => {
  const auth = useSelector((state: appState) => state.login);
  const [xg, setXg] = useState(null);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
      }}>
      <View style={styles.header}>
        <Image source={images.HEADER_HEART} />
        <TouchableOpacity style={globalStyles.flexRowCenter}>
          <Text style={styles.skip}>Skip</Text>
          <Image
            source={images.SKIP_ARROW}
            style={{marginTop: 2, marginLeft: 2}}
          />
        </TouchableOpacity>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image source={images.LOGO_WITH_TEXT} />
      </View>
      <View style={styles.carousalContainer}>
        <Carousal />
      </View>

      <View>
        <ImageBackground
          source={images.CIRCLE_ON_BOTTOM}
          style={styles.imageBackground}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('register');
            }}>
            <Text style={styles.buttonLabel}>Sign Up</Text>
          </TouchableOpacity>
          <Text style={styles.text}>
            Already have an account ? <Text>Sign In</Text>
          </Text>
        </ImageBackground>
      </View>
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginRight: 20,
    // flex: 1,
  },
  skip: {
    fontFamily: 'Montserrat-Bold',
    color: colors.accent,
  },
  carousalContainer: {
    flex: 2,
    marginBottom: 40,
  },

  text: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonLabel: {
    color: '#C8245C',
    textAlign: 'center',
    fontSize: 20,
  },
  imageBackground: {
    width: Dimensions.get('screen').width,
    height: 200,
    flexDirection: 'column',

    justifyContent: 'center', // Adjust as per your layout requirement
    alignItems: 'center', // Adjust as per your layout requirement
  },
});

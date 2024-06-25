import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import images from '../../../assets/images';
import styles from './fun.styles';
import globalStyles from '../../../assets/globalStyles';

const FunActivities = ({navigation}: any) => {
  const [isActive, setIsActive] = useState({
    quiz: false,
    movies: false,
  });
  return (
    <View>
      <ImageBackground
        source={images.CIRCLE_ON_TOP}
        style={globalStyles.topSemiCircle}>
        <Text style={styles.topCircleText}>Yay! Happy Hours</Text>
      </ImageBackground>
      <View style={styles.contentWrapper}>
        <TouchableOpacity
          onPress={() => {
            setIsActive({
              quiz: true,
              movies: false,
            });

            setTimeout(() => {
              navigation.navigate('about-quiz');
            }, 500);
          }}>
          <View
            style={[
              styles.iconWrapper,
              !isActive.quiz
                ? styles.inactiveIconWrapper
                : styles.activeIconWrapper,
            ]}>
            <Image
              source={!isActive.quiz ? images.QUIZ_BLACK : images.QUIZ_WHITE}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.label}>Fun Quiz</Text>
        <TouchableOpacity
          onPress={() => {
            setIsActive({
              quiz: false,
              movies: true,
            });
            setTimeout(() => {
              navigation.navigate('about-movies');
            }, 500);
          }}>
          <View
            style={[
              styles.iconWrapper,
              !isActive.movies
                ? styles.inactiveIconWrapper
                : styles.activeIconWrapper,
            ]}>
            <Image
              source={
                !isActive.movies ? images.MOVIE_BLACK : images.MOVIE_WHITE
              }
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.label}>Movie Cuddle</Text>
      </View>
    </View>
  );
};

export default FunActivities;

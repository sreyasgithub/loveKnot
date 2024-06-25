import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import Swiper from 'react-native-swiper';
import images from '../../assets/images';
import globalStyles from '../../assets/globalStyles';

// import { Pagination } from '@react-native-community/pagination';

const Carousal = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef<ScrollView | null>(null);

  const CustomPagination = ({totalSlides, activeIndex, onPress}: any) => {
    const renderPagination = () => {
      const indicators = [];
      for (let i = 0; i < totalSlides; i++) {
        indicators.push(
          <TouchableOpacity
            key={i}
            onPress={() => onPress(i)}
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 5,
            }}>
            {i == activeIndex ? (
              <Image source={images.CAROUSAL_ACTIVE_HEART} />
            ) : (
              <Image source={images.CAROUSAL_INACTIVE_HEART} />
            )}
          </TouchableOpacity>,
        );
      }
      return indicators;
    };

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {renderPagination()}
      </View>
    );
  };

  const sliderItems = [
    {
      img: images.SLIDE_1_IMG,
      text: 'Your private space to connect with your partner with our trio of communication.',
    },
    {
      img: images.SLIDE_2_IMG,
      text: "Tick off moments and craft your love story with our couple's bucket list.",
    },
    {
      img: images.SLIDE_3_IMG,
      text: 'Digitize your memories by creating a combined virtual photo journal.',
    },
    {
      img: images.SLIDE_4_IMG,
      text: 'Watch movies together,even when miles apart.',
    },
    {
      img: images.SLIDE_5_IMG,
      text: 'Dive into our online couple Quiz Games - Because every answer brings you closer.',
    },
    {
      img: images.SLIDE_6_IMG,
      text: 'Tune in to Expert Conversations for Lasting Love.',
    },
  ];
  return (
    <>
      <Swiper
        // loop={false}
        autoplay={true}
        autoplayTimeout={5}
        renderPagination={(index, total, swiper) => (
          <CustomPagination
            totalSlides={total}
            activeIndex={index}
            onPress={swiper.scrollBy}
          />
        )}>
        {/* Your carousel slides go here */}
        {sliderItems.map(item => {
          return (
            <View style={styles.slide} key={item.text}>
              <View style={styles.slideImg}>
                <Image
                  source={item.img}
                  resizeMode="contain"
                  style={{width: '100%'}}
                />
              </View>

              <Text style={styles.slideText}>{item.text}</Text>
            </View>
          );
        })}
      </Swiper>
    </>
  );
};
const styles = StyleSheet.create({
  slide: {
    // paddingVertical: 20,
    paddingHorizontal: 40,
    // margin: 10,

    marginBottom: 10,
  },
  slideImg: {
    width: '80%',
    ...globalStyles.flexRowCenter,
    margin: 'auto',
  },
  slideText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 16,
    // fontWeight: '600',
    lineHeight: 19,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: -20,
  },
});

export default Carousal;

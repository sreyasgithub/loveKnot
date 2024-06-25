import React, {useState} from 'react';
import styles from './photo-journal.styles';
import {
  ImageBackground,
  TouchableWithoutFeedback,
  View,
  Text,
  Touchable,
  Pressable,
} from 'react-native';
import VisibledCard from './visibledCard';
import HoveredCard from './hoveredCard';
import {cardProps} from './interfaces';
import images from '../../../assets/images';

const PhotoCard: React.FC<any> = ({item}) => {
  const [showContent, setShowContent] = useState(false);

  console.log(`http://192.168.29.8:4000/uploads/photos/${item.content.imgSrc}`);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setShowContent(!showContent);
      }}>
      <View style={styles.photoCardWrapper}>
        <ImageBackground
          source={
            item.content.imgSrc.url !== null
              ? {
                  uri: item.content.imgSrc.url,
                }
              : images.COUPLE_IMG
          }
          style={{
            height: 300,
          }}>
          {!showContent ? (
            <VisibledCard item={item} />
          ) : (
            <HoveredCard item={item} />
          )}
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PhotoCard;

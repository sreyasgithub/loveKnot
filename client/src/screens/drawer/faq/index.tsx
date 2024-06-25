import React from 'react';
import {Image, Text} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import images from '../../../assets/images';
import colors from '../../../assets/colors';
import globalStyles from '../../../assets/globalStyles';
import Accordion from './accordian';

const Faq = () => {
  const faqItems = [
    {
      question: 'What is Love Knot?',
      answer:
        'Love Knot app is a digital platform designed to enhance communication and connection between couples. It functions as a private space for couples to communicate, share moments, create shared calendars, and even exchange virtual hugs and kisses. Users can not only send messages, photos, videos, and voice notes but also watch movies together exclusively with their partner.',
    },
    {
      question: 'Is Love Knot free?',
      answer:
        'The basic features of Love Knot are free to use. However, there may be premium features available for purchase that offer additional functionalities or customization options.',
    },
    {
      question:
        'Can I use the Love Knot to communicate with multiple partners?',
      answer:
        'No, Love Knot is specifically designed for exclusive communication between two individuals in a romantic relationship. It is not intended for communication with multiple partners.',
    },
  ];
  return (
    <View style={globalStyles.contentWrapper}>
      {faqItems.map(item => {
        return <Accordion question={item.question} answer={item.answer} />;
      })}
    </View>
  );
};

export default Faq;

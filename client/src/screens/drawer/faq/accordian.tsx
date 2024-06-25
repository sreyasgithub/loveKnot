import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import colors from '../../../assets/colors';
import globalStyles from '../../../assets/globalStyles';
import {Text} from 'react-native';
import {Image} from 'react-native';
import images from '../../../assets/images';

interface accordianProps {
  question: string;
  answer: string;
}
const Accordion = ({question, answer}: accordianProps) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <View style={{marginBottom: 20}}>
      <ListItem.Accordion
        touchSoundDisabled={true}
        noIcon={true}
        containerStyle={[
          styles.accordian,
          expanded
            ? {
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                paddingBottom: 15,
              }
            : {borderRadius: 10},
        ]}
        content={
          <View
            style={[
              styles.accordianContent,
              expanded
                ? {
                    borderBottomWidth: 2,
                    borderBottomColor: colors.accent,
                    paddingBottom: 20,
                  }
                : {borderBottomWidth: 0},
            ]}>
            <Text style={styles.question}>{question}</Text>
            {expanded ? (
              <Image source={images.ACCORDIAN_ARROW_UP} />
            ) : (
              <Image source={images.ACCORDIAN_ARROW_DOWN} />
            )}
          </View>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}>
        <ListItem containerStyle={styles.answerContainer}>
          <ListItem.Content>
            <ListItem.Title style={styles.answer}>{answer}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </ListItem.Accordion>
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  question: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: colors.accent,
  },
  accordian: {
    backgroundColor: colors.grey.shade3,
    padding: 25,
    margin: 0,
  },
  accordianContent: {
    borderRadius: 10,
    padding: 0,
    margin: 0,
    width: '100%',
    ...globalStyles.flexRowSpaceBetween,
  },
  answer: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 14,
  },
  answerContainer: {
    backgroundColor: colors.grey.shade3,

    padding: 25,
    paddingTop: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

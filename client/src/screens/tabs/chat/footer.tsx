import React, {useState} from 'react';
import {Image, Text, TextInput, TouchableHighlight, View} from 'react-native';
import colors from '../../../assets/colors';
import styles from './chat.styles';
import images from '../../../assets/images';
import TextField from '../../../components/textField';
import {EntypoIcon} from '../../../assets/icons';
import globalStyles from '../../../assets/globalStyles';
import Attachments from './attachments';

const Footer = () => {
  const [showAttachmentModel, setShowAttachmentModel] = useState(false);
  return (
    <>
      {showAttachmentModel && <Attachments />}
      <View style={styles.footerContainer}>
        <View style={styles.footer}>
          <View style={styles.inputWrapper}>
            <Image source={images.EMOJI_ICON} />
            <TextInput
              onChange={() => {}}
              style={{width: '60%', color: colors.black}}
            />
            <View style={globalStyles.flexRow}>
              <TouchableHighlight
                onPress={() => {
                  setShowAttachmentModel(!showAttachmentModel);
                }}
                style={[styles.footerActionIconWrapper, {marginRight: 10}]}>
                <EntypoIcon name="attachment" size={15} />
              </TouchableHighlight>
              <TouchableHighlight style={styles.footerActionIconWrapper}>
                <Image source={images.RECORD_ICON} />
              </TouchableHighlight>
            </View>
          </View>
          <View>
            <Image source={images.SEND_ICON} />
          </View>
        </View>
      </View>
    </>
  );
};

export default Footer;

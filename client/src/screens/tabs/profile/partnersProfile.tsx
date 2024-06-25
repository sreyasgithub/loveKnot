import React, {useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import styles from './profile.styles';
import images from '../../../assets/images';
import TextField from '../../../components/profileTextField';
import colors from '../../../assets/colors';
import DateSelector from '../../../components/dateSelector';
import {IonIcons} from '../../../assets/icons';
import {ButtonSm, OutlinedButton} from '../../../components/buttons';
import {useSelector} from 'react-redux';
import {appState} from '../../../redux/slices/rootReducer';
import {dateTypes} from '../../../redux/types/dates.types';
import globalStyles from '../../../assets/globalStyles';

const PartnersProfile = () => {
  const [disConnected, setDisConnected] = useState(false);
  const profile = useSelector((state: appState) => state.profile);
  const {user, partner} = profile?.data;
  console.log(partner);

  return (
    <ScrollView>
      <View style={globalStyles.contentWrapper}>
        <View style={styles.card}>
          <View style={[styles.cardHeader, {backgroundColor: colors.accent}]}>
            <View style={styles.heartsIcon}>
              <Image source={images.PROFILE_WHITE_HEARTS} />
            </View>

            <Image source={images.DEFAULT_PROFILE} style={styles.profileImg} />
          </View>
          <View style={styles.formContainer}>
            <Text style={[styles.sectionLabel, {color: colors.primary}]}>
              Personal Information
            </Text>

            <TextField
              label="First Name"
              editable={false}
              value={partner?.firstName}
            />

            <TextField
              label="Last Name"
              editable={false}
              value={partner?.lastName}
            />

            <View>
              <Text style={styles.label}>Date of Birth</Text>
              <DateSelector
                screenName="profile"
                disabled={true}
                dateType={dateTypes.partnerDOB}
                selected={partner?.birthDate}
              />
            </View>

            <TextField
              label="Gender"
              color={colors.primary}
              editable={false}
              value={partner?.gender}
            />

            <Text style={[styles.sectionLabel, {color: colors.primary}]}>
              Account Information
            </Text>

            <TextField
              label="User Name"
              editable={false}
              value={partner?.email}
            />
          </View>
          {disConnected && (
            <View style={styles.disconnectedWrapper}>
              <Text style={styles.disconnectedText}>Disconnected</Text>
            </View>
          )}
        </View>

        {disConnected ? (
          <View style={{marginBottom: 40}}>
            <OutlinedButton
              label="Reconnect"
              onPress={() => {}}
              btnColor={colors.accent}
            />
            <OutlinedButton
              label="Delete Partner's Account"
              onPress={() => {}}
              btnColor={colors.accent}
            />
          </View>
        ) : (
          <OutlinedButton
            label="Disconnect"
            onPress={() => {
              setDisConnected(true);
            }}
            btnColor={colors.accent}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default PartnersProfile;

import {Dialog} from '@rneui/base';
import React, {ReactNode} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import colors from '../assets/colors';
import globalStyles from '../assets/globalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {appState} from '../redux/slices/rootReducer';
import {AppDispatch} from '../redux/store';
import {closeModel, showModel} from '../redux/slices/components/modal.slice';

const Model = ({
  children,
  onBackdropPress,
}: {
  children: ReactNode;
  onBackdropPress?: boolean;
}) => {
  const modal = useSelector((state: appState) => state.modal);
  const dispatch = useDispatch<AppDispatch>();
  const backdropPress = onBackdropPress === false ? onBackdropPress : true;

  return (
    <Dialog
      isVisible={modal.visible}
      overlayStyle={styles.diologOverlay}
      onBackdropPress={() => {
        if (backdropPress) {
          dispatch(closeModel());
        }
      }}>
      <View style={styles.card}>{children}</View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  diologOverlay: {
    backgroundColor: 'transparent',
    elevation: 0,
    padding: 0,
    width: Dimensions.get('screen').width - 40,
  },
  card: {
    width: Dimensions.get('screen').width - 40,
    margin: 'auto',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 30,
  },
});

export default Model;

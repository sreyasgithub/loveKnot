import {
  Image,
  Pressable,
  Text,
  Touchable,
  TouchableHighlight,
  View,
} from 'react-native';
import styles from '../bucket-list.styles';
import images from '../../../assets/images';
import globalStyles from '../../../assets/globalStyles';
import moment from 'moment';
import {Avatar} from 'react-native-elements';
import colors from '../../../assets/colors';
import Model from '../../../components/model';
import ItemDetails from './itemDetails';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../../redux/store';
import {showModel} from '../../../redux/slices/components/modal.slice';
import modalTypes from '../../../redux/types/modal.types';
import {appState} from '../../../redux/slices/rootReducer';
import {useState} from 'react';
import formatDate from '../../../services/setDateFormat.svc';
import formatDateString from '../../../services/setDateFormat.svc';
import {deleteBucketListItem} from '../../../redux/slices/bucket-list/deleteBucketList.slice';
import PopUp from '../../../components/popUp';
import {setSelectedCardId} from '../../../redux/slices/bucket-list/fetchBucketList.slice';

const ListItemCard = ({
  item,
  index,
  theme,
}: {
  item: any;
  index: any;
  theme: any;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const modal = useSelector((state: appState) => state.modal);
  const deleteBucketListItemState = useSelector(
    (state: appState) => state.deleteBucketListItem,
  );
  const fetchBL = useSelector((state: appState) => state.fetchBucketList);
  const {content, postedBy} = item;

  const [selected, setSelected] = useState(false);

  const getCategoryIcon = (category: any, theme: string) => {
    switch (category) {
      case 'Travel':
        return theme === colors.primary
          ? images.TRAVEL_WHITE_ICON
          : images.TRAVEL_BLACK_ICON;

      case 'Adventure':
        return theme === colors.primary
          ? images.ADVENTURE_BLACK_ICON
          : images.ADVENTURE_BLACK_ICON;

      case 'Fitness':
        return theme === colors.primary
          ? images.FITNESS_WHITE_ICON
          : images.FITNESS_BLACK_ICON;

      case 'relationship':
        return theme === colors.primary
          ? images.RELATIONSHIP_BLACK_ICON
          : images.RELATIONSHIP_BLACK_ICON;
      case 'Finance':
        return theme === colors.primary
          ? images.FITNESS_BLACK_ICON
          : images.FITNESS_BLACK_ICON;

      case 'Other':
        return theme === colors.primary
          ? images.OTHER_BLACK_ICON
          : images.OTHER_BLACK_ICON;

      default:
        return theme === colors.primary
          ? images.OTHER_BLACK_ICON
          : images.OTHER_BLACK_ICON;
    }
  };
  const ImageUri = getCategoryIcon(content?.category, theme);
  console.log('fetchBL.selectedCardId', fetchBL.selectedCardId);

  return (
    <>
      <Pressable
        onPress={() => {
          dispatch(showModel(modalTypes.PENDING_BUCKET_LIST_ITEM));
          dispatch(setSelectedCardId(content?._id));
        }}>
        <View style={styles.card}>
          <View
            style={[
              styles.categoryIconWrapper,
              {
                backgroundColor:
                  theme === 'pending' ? colors.grey.shade1 : colors.primary,
              },
            ]}>
            <Image source={ImageUri} style={{width: 20, height: 20}} />
          </View>
          <View>
            <Text
              style={[
                styles.title,
                {
                  color:
                    theme === 'pending' ? colors.grey.shade4 : colors.primary,
                },
              ]}>
              {content?.name}
            </Text>
            <View style={globalStyles.flexRow}>
              <Image source={images.CALENDER_BLACK_ICON} />
              <Text
                style={[
                  styles.targetDate,
                  {
                    color:
                      theme === 'pending' ? colors.grey.shade1 : colors.accent,
                  },
                ]}>
                {content?.targetDate
                  ? formatDate(content?.targetDate)
                  : 'not mentioned'}
              </Text>
            </View>
          </View>
          <View style={styles.user}>
            <Avatar
              rounded
              source={
                postedBy?.userImg?.url
                  ? {uri: postedBy?.userImg?.url}
                  : images.DEFAULT_PROFILE
              }
              size={20}
            />
          </View>
        </View>
      </Pressable>
      {(modal.type === modalTypes.PENDING_BUCKET_LIST_ITEM ||
        modal.type === modalTypes.ACHIEVED_BUCKET_LIST_ITEM) &&
        fetchBL.selectedCardId === content?._id && (
          <ItemDetails item={item} theme={theme} />
        )}

      {modal.type === modalTypes.DELETE_BUCKET_LIST &&
        deleteBucketListItemState?.blItemId === item?.content?._id && (
          <Model onBackdropPress={false}>
            <PopUp
              questionLg={`Are you sure you wanna delete ${item?.content?.name}`}
              actionLabels={['No', 'Yes']}
              handleOk={() => {
                dispatch(deleteBucketListItem(item?.content?._id));
              }}
            />
          </Model>
        )}
    </>
  );
};

export default ListItemCard;

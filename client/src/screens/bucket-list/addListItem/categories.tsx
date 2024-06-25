import React, {useState} from 'react';
import {Dimensions, View} from 'react-native';
import globalStyles from '../../../assets/globalStyles';
import IconButton from '../../../components/iconButton';
import images from '../../../assets/images';
import {useDispatch, useSelector} from 'react-redux';
import {appState} from '../../../redux/slices/rootReducer';
import {AppDispatch} from '../../../redux/store';
import {setFormData} from '../../../redux/slices/bucket-list/createBucketList.slice';

interface Props {
  data: any;
  setData: any;
}
const Categories = ({data, setData}: Props) => {
  const [isActive, setIsActive] = useState<any>({
    travel: false,
    adventure: false,
    relationShip: false,
    fitness: false,
    finance: false,
    other: false,
  });

  const handleSelectCategory = (category: any) => {
    setIsActive({
      travel: false,
      adventure: false,
      relationShip: false,
      fitness: false,
      finance: false,
      other: false,
      [category]: true,
    });
  };
  return (
    <>
      <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
        <View>
          <IconButton
            activeIcon={images.TRAVEL_WHITE_ICON}
            inActiveIcon={images.TRAVEL_BLACK_ICON}
            label={'Travel'}
            isActive={isActive?.travel}
            onPress={() => {
              setData({...data, category: 'Travel'});
              handleSelectCategory('travel');
            }}
          />
        </View>
        <IconButton
          activeIcon={images.ADVENTURE_BLACK_ICON}
          inActiveIcon={images.ADVENTURE_BLACK_ICON}
          label={'Adventure'}
          isActive={isActive?.adventure}
          onPress={() => {
            setData({...data, category: 'Adventure'});
            handleSelectCategory('adventure');
          }}
        />
      </View>

      <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
        <View>
          <IconButton
            activeIcon={images.TRAVEL_WHITE_ICON}
            inActiveIcon={images.TRAVEL_BLACK_ICON}
            label={'Fitness'}
            isActive={isActive?.fitness}
            onPress={() => {
              setData({...data, category: 'Fitness'});
              handleSelectCategory('fitness');
            }}
          />
        </View>
        <IconButton
          activeIcon={images.ADVENTURE_BLACK_ICON}
          inActiveIcon={images.ADVENTURE_BLACK_ICON}
          label={'Relationship'}
          isActive={isActive?.relationship}
          onPress={() => {
            setData({...data, category: 'Relationship'});
            handleSelectCategory('relationship');
          }}
        />
      </View>
      <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
        <View>
          <IconButton
            activeIcon={images.TRAVEL_WHITE_ICON}
            inActiveIcon={images.TRAVEL_BLACK_ICON}
            label={'Finance'}
            isActive={isActive?.finance}
            onPress={() => {
              setData({...data, category: 'Finance'});
              handleSelectCategory('finance');
            }}
          />
        </View>
        <IconButton
          activeIcon={images.FITNESS_WHITE_ICON}
          inActiveIcon={images.FITNESS_WHITE_ICON}
          label={'Other'}
          isActive={isActive?.other}
          onPress={() => {
            setData({...data, category: 'Other'});
            handleSelectCategory('other');
          }}
        />
      </View>
    </>
  );
};

export default Categories;

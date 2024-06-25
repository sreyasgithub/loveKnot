import {Text} from 'react-native';
import {TouchableOpacity, View} from 'react-native';
import colors from '../assets/colors';

const CustomTopTabBar = ({state, descriptors, navigation}: any) => {
  return (
    <View style={{flexDirection: 'row', backgroundColor: '#fff', padding: 10}}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={{selected: isFocused ? true : false}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>
            <Text
              style={{
                color: isFocused ? colors.primary : colors.grey.shade1,
                textAlign: 'center',
                backgroundColor: isFocused
                  ? colors._primary.shade_1
                  : colors.white,
                borderRadius: 10,
                padding: 10,
                textTransform: 'capitalize',
                fontFamily: 'Montserrat-Bold',
                fontSize: 16,
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTopTabBar;

import colors from '../../assets/colors';

const getQuizOptionColor: any = (
  choices: any,
  isSelected: boolean,
  selectedOption: any,
  item: string,
  option: string,
) => {
  console.log('choices', choices, option === choices?.partner);

  if (
    selectedOption &&
    selectedOption !== option &&
    option === choices?.partner &&
    choices?.partner &&
    choices?.user
  ) {
    return {
      bgColor: colors.green,
      textColor: colors.white,
    };
  }

  if (
    (choices.partner && choices.user && option === choices.user) ||
    selectedOption === option
  ) {
    return {
      bgColor: colors.primary,
      textColor: colors.white,
    };
  }
  return {
    bgColor: colors.white,
    textColor: colors.black,
  };
};

export default getQuizOptionColor;

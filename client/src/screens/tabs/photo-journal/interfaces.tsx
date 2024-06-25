export interface cardProps {
  content: {
    __v: number;
    _id: string;
    caption: string;
    description: string;
    imgSrc: string;
    postedOn: string;
    userId: string;
  };
  postedBy: {userImg: string; userName: string};
}

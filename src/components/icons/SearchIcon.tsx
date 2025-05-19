import Search from "../../assets/search.svg?react";

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

const SearchIcon = ({ width = 16, height = 16, fill = "black" }: Props) => {
  return <Search width={width} height={height} fill={fill} />;
};

export default SearchIcon;

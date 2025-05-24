import Search from "../../../assets/search.svg?react";
import { IconProps } from "../../../domain/types/components/iconTypes";

const SearchIcon = ({ width = 16, height = 16, fill = "black" }: IconProps) => {
  return <Search width={width} height={height} fill={fill} />;
};

export default SearchIcon;

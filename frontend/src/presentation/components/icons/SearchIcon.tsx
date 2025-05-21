import Search from "../../../assets/search.svg?react";
import type { IconProps } from "../../../domain/types/commonTypes";

const SearchIcon = ({ width = 16, height = 16, fill = "black" }: IconProps) => {
  return <Search width={width} height={height} fill={fill} />;
};

export default SearchIcon;

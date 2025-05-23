import SearchIcon from "../../icons/SearchIcon";
import { memo } from "react";

interface Props {
  searchQuery: string;
  isDisabled: boolean;
  setSearchQuery: (query: string) => void;
}

const SearchInput = memo(
  ({ searchQuery, setSearchQuery, isDisabled }: Props) => {
    return (
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Zoek op ..."
          disabled={isDisabled}
          className="w-full p-3 border border-gray-300 rounded-md disabled:bg-gray-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className={"absolute inset-y-0 right-0 pr-3 flex items-center"}>
          <SearchIcon />
        </div>
      </div>
    );
  },
);

export default SearchInput;

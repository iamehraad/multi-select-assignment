import SearchIcon from "../../icons/SearchIcon";
import { memo } from "react";
import { SearchInputProps } from "../../../../domain/types/components/searchInputTypes";

const SearchInput = memo(
  ({ searchQuery, setSearchQuery, isDisabled }: SearchInputProps) => {
    return (
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Zoek op ..."
          disabled={isDisabled}
          className="w-full p-3 border border-gray-300 rounded-md disabled:bg-gray-300"
          data-testid="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div
          className={"absolute inset-y-0 right-0 pr-3 flex items-center"}
          data-testid="search-input-icon"
        >
          <SearchIcon />
        </div>
      </div>
    );
  },
);

export default SearchInput;

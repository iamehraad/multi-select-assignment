import SearchIcon from "../../icons/SearchIcon";

interface Props {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchInput = ({ searchQuery, setSearchQuery }: Props) => {
  return (
    <div className="flex items-center relative">
      <input
        type="text"
        placeholder="Search items..."
        className="w-full p-2 pl-2 border border-gray-300 rounded-md"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        autoFocus
      />
      <div className="absolute right-2">
        <SearchIcon />
      </div>
    </div>
  );
};

export default SearchInput;
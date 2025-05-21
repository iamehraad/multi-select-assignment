import SearchIcon from "../../icons/SearchIcon";

interface Props {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchInput = ({ searchQuery, setSearchQuery }: Props) => {
  return (
    <div className="relative mb-4">
      <input
        type="text"
        placeholder="Zoek op ..."
        className="w-full p-3 border border-gray-300 rounded-md"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className={"absolute inset-y-0 right-0 pr-3 flex items-center"}>
        <SearchIcon />
      </div>
    </div>
  );
};

export default SearchInput;

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full sm:w-auto">
      <label className="w-full flex flex-col text-sm gap-2 mb-4 sm:mb-0 sm:mr-auto">
        <div className="w-full flex rounded-md border pl-4 py-2 focus-within:border-neutral-400">
          <input
            className="w-full bg-transparent outline-0"
            name="username"
            placeholder="Vyhledat projekt"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="mx-3">
            <CiSearch size={24} />
          </button>
        </div>
      </label>
    </form>
  );
};

export default SearchBar;

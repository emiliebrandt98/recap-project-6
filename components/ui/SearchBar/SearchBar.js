import styled from "styled-components";
import { Search } from "lucide-react";
export default function SearchBar({ search, onSearch }) {
  return (
    <>
      <label htmlFor="search" />
      <SearchContainer>
        <Search size={20} />

        <input
          id="search"
          name="search"
          placeholder="Search"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
        />
      </SearchContainer>
    </>
  );
}

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid black;
  border-radius: 8px;
  padding: 8px 12px;
  width: 100%;
  margin-bottom: 20px;

  input {
    border: none;
    outline: none;
    width: 100%;
  }
`;

import styled from "styled-components";
import { Search } from "lucide-react";
export default function SearchBar({ search, onSearch }) {
  return (
    <>
      <SearchContainer>
        <Search size={24} color="var(--color-grey-dark)" />

        <input
          id="search"
          name="search"
          placeholder="Search"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          aria-label="search-bar"
        />
      </SearchContainer>
    </>
  );
}

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-m);
  border-radius: var(--border-radius-l);
  padding: 8px 12px;
  width: 100%;
  height: 48px;
  background-color: var(--color-grey-light);

  input {
    border: none;
    outline: none;
    width: 100%;
    background-color: var(--color-grey-light);
  }
`;

import { useRef, useState } from "react";
import { ListSortDescending } from "lucide-react";
import styled from "styled-components";

export default function SortDate() {
  const dialogRef = useRef(null);

  const openDialog = () => dialogRef.current?.showModal();
  const closeDialog = () => dialogRef.current?.close();

  return (
    <>
      <SortButtonWrapper>
        <SortButton onClick={openDialog}>
          <ListSortDescending />
        </SortButton>
      </SortButtonWrapper>

      <dialog ref={dialogRef}>
        <h3>Sort Activity</h3>
        <ul>
          <li>
            <input type="checkbox" />
          </li>
        </ul>

        <button onClick={closeDialog}>Cancel</button>
      </dialog>
    </>
  );
}

const CheckboxList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.125rem;
  align-self: stretch;
  padding: 0;
`;

const CheckboxItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  align-self: stretch;
  list-style: none;
`;

const Checkbox = styled.input`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;

  border-radius: 0.375rem;
  border: 2px solid #f1f1f1;

  display: grid;
  place-content: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const SortButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
`;

const SortButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  padding: 0.5rem;

  border-radius: 7rem;
  background-color: #f1f1f1;
  border: none;
  color: #626262;

  &:hover {
    cursor: pointer;
    background-color: #ffecd1;
  }
`;

import { useRef, useState, useEffect } from "react";
import { X, SlidersVertical } from "lucide-react";
import useSWR from "swr";
import styled from "styled-components";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button/Button";

export default function CategoryFilter({ activeCategories, onApply }) {
  const dialogRef = useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [draftCategories, setDraftCategories] = useState([]);
  const { data: categories, isLoading, error } = useSWR("/api/categories");

  useEffect(() => {
    if (!dialogRef.current) return;

    if (isDialogOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [isDialogOpen]);

  function handleCancelFilter() {
    setDraftCategories(activeCategories);
    setIsDialogOpen(false);
  }

  function handleClearFilter() {
    onApply([]);
    setDraftCategories([]);
  }

  function handleApplyFilter() {
    onApply(draftCategories);
    setIsDialogOpen(false);
  }

  function handleToggleCheckbox(categoryName) {
    const isAlreadySelected = draftCategories.includes(categoryName);

    if (isAlreadySelected) {
      setDraftCategories(
        draftCategories.filter((name) => name !== categoryName)
      );
    } else {
      setDraftCategories([...draftCategories, categoryName]);
    }
  }

  if (error) return <p>Error loading filtered categories.</p>;
  if (isLoading || !categories) return null;

  return (
    <>
      <FilterButtonWrapper>
        <FilterButton
          aria-label="Open category filter"
          onClick={() => {
            setIsDialogOpen(true);
          }}
        >
          <SlidersVertical />
          {activeCategories.length > 0 && (
            <span>{activeCategories.length}</span>
          )}
        </FilterButton>

        {activeCategories.length > 0 && (
          <FilterButton onClick={handleClearFilter} aria-label="Clear filter">
            <X />
          </FilterButton>
        )}
      </FilterButtonWrapper>

      <Dialog ref={dialogRef} onClose={() => setIsDialogOpen(false)}>
        <DialogHeader>
          <h3>Category Filter</h3>
          <FilterButton onClick={handleCancelFilter} aria-label="Close dialog">
            <X />
          </FilterButton>
        </DialogHeader>

        <CheckboxList>
          {categories.map((category) => {
            const isChecked = draftCategories.includes(category.name);
            return (
              <CheckboxItem key={category._id}>
                <Checkbox
                  type="checkbox"
                  id={category._id}
                  checked={isChecked}
                  onChange={() => handleToggleCheckbox(category.name)}
                />
                <label htmlFor={category._id}>{category.name}</label>
              </CheckboxItem>
            );
          })}
        </CheckboxList>

        <ButtonWrapper>
          <PrimaryButton onClick={handleApplyFilter} buttonText={"Apply"} />
          <SecondaryButton onClick={handleCancelFilter} buttonText={"Cancel"} />
        </ButtonWrapper>
      </Dialog>
    </>
  );
}
const FilterButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
`;

const FilterButton = styled.button`
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

const Dialog = styled.dialog`
  width: 20.9375rem;
  padding: 1.5rem 1.25rem;
  flex-direction: column;
  align-items: flex-start;

  border-radius: 0.75rem;
  background: #fff;
  border: none;

  &:not([open]) {
    display: none;
  }

  &[open] {
    display: flex;
  }

  ::backdrop {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
  }
`;

const DialogHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

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

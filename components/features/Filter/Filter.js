import { useRef, useState, useEffect } from "react";
import { X, SlidersVertical, ListSortDescending, Check } from "lucide-react";
import useSWR from "swr";
import styled from "styled-components";
import {
  PrimaryButton,
  SecondaryButton,
  GreyIconButton,
} from "@/components/ui/Button/Button";

export default function Filter({
  activeCategories,
  onApply,
  activeSortOrder,
  onApplySort,
}) {
  const filterDialogRef = useRef(null);
  const sortDialogRef = useRef(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [draftCategories, setDraftCategories] = useState([]);
  const [draftSortOrder, setDraftSortOrder] = useState(activeSortOrder);

  const { data: categories, isLoading, error } = useSWR("/api/categories");

  useEffect(() => {
    if (!filterDialogRef.current) return;

    if (openFilter) {
      filterDialogRef.current.showModal();
    } else {
      filterDialogRef.current.close();
    }
  }, [openFilter]);

  useEffect(() => {
    if (!sortDialogRef.current) return;

    if (openSort) {
      sortDialogRef.current.showModal();
    } else {
      sortDialogRef.current.close();
    }
  }, [openSort]);

  function handleOpenFilter() {
    setDraftCategories(activeCategories);
    setOpenFilter(true);
  }

  function handleCancelFilter() {
    setDraftCategories(activeCategories);
    setOpenFilter(false);
  }

  function handleClearFilter() {
    onApply([]);
    setDraftCategories([]);
  }

  function handleApplyFilter() {
    onApply(draftCategories);
    setOpenFilter(false);
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

  function handleCloseSort() {
    setOpenSort(false);
  }

  function handleApplySort() {
    onApplySort(draftSortOrder);
    setOpenSort(false);
  }

  function handleCancelSort() {
    setDraftSortOrder(activeSortOrder);
    setOpenSort(false);
  }

  if (error) return <p>Error loading filtered categories.</p>;
  if (isLoading || !categories) return null;

  return (
    <>
      <FilterButtonWrapper>
        <GreyIconButton
          ariaLabel="Open category filter"
          onClick={handleOpenFilter}
          Icon={SlidersVertical}
          Content={
            activeCategories.length > 0 && (
              <span>{activeCategories.length}</span>
            )
          }
        />

        <GreyIconButton
          ariaLabel="Open Sort Dialog"
          onClick={() => setOpenSort(true)}
          Icon={ListSortDescending}
        />

        {activeCategories.length > 0 && (
          <GreyIconButton
            onClick={handleClearFilter}
            ariaLabel="Clear filter"
            Icon={X}
          />
        )}
      </FilterButtonWrapper>

      <Dialog ref={filterDialogRef} onClose={() => setOpenFilter(false)}>
        <DialogHeader>
          <h2>Category Filter</h2>

          <CancelButton onClick={handleCancelFilter} aria-label="Close dialog">
            <X />
          </CancelButton>
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
          <PrimaryButton onClick={handleApplyFilter} buttonText="Apply" />
          <SecondaryButton onClick={handleCancelFilter} buttonText="Cancel" />
        </ButtonWrapper>
      </Dialog>

      <Dialog ref={sortDialogRef} onClose={() => setOpenSort(false)}>
        <DialogHeader>
          <h2>Sort activities</h2>

          <CancelButton
            onClick={handleCloseSort}
            aria-label="Close sort dialog"
          >
            <X />
          </CancelButton>
        </DialogHeader>

        <CheckboxList>
          <CheckboxItem>
            <Checkbox
              type="checkbox"
              id="soonest"
              checked={draftSortOrder === "soonest"}
              onChange={() => setDraftSortOrder("soonest")}
            />
            <label htmlFor="soonest">Soonest</label>
          </CheckboxItem>
          <CheckboxItem>
            <Checkbox
              type="checkbox"
              id="latest"
              checked={draftSortOrder === "latest"}
              onChange={() => setDraftSortOrder("latest")}
            />
            <label htmlFor="latest">Latest</label>
          </CheckboxItem>
        </CheckboxList>
        <ButtonWrapper>
          <PrimaryButton onClick={handleApplySort} buttonText="Apply" />
          <SecondaryButton onClick={handleCancelSort} buttonText="Cancel" />
        </ButtonWrapper>
      </Dialog>
    </>
  );
}

const FilterButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--spacing-m);
`;

const CancelButton = styled.button`
  color: var(--color-grey-dark);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
`;

const Dialog = styled.dialog`
  width: 335px;
  padding: var(--padding-l);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-l);

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border-radius: var(--border-radius-m);
  background: var(--color-background-dialog);
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
  gap: var(--spacing-ml);
  align-self: stretch;
  padding: 0;
`;

const CheckboxItem = styled.li`
  display: flex;
  align-items: center;
  gap: var(--spacing-m);
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
  flex-direction: column;
  width: 100%;
  gap: var(--spacing-m);
`;

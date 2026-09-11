import { useRef, useState, useEffect } from "react";
import { X, Filter } from "lucide-react";
import useSWR from "swr";

export default function CategoryFilter() {
  const dialogRef = useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeCategories, setActiveCategories] = useState([]);
  const [draftCategories, setDraftCategories] = useState([]);
  const { data: categories, isLoading, error } = useSWR("/api/categories");
  console.log(categories);

  useEffect(() => {
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

  function handleApplyFilter() {
    setActiveCategories(draftCategories);
    setIsDialogOpen(false);
  }

  function handleToggleCheckbox(categoryName) {
    const isAlreadySelected = draftCategories.includes(categoryName);

    if (isAlreadySelected) {
      setDraftCategories(
        draftCategories.filter((name) => name != categoryName)
      );
    } else {
      setDraftCategories([...draftCategories, categoryName]);
    }
  }

  if (isLoading || !categories) return null;

  return (
    <>
      <button
        onClick={() => {
          setIsDialogOpen(true);
        }}
      >
        <Filter />
      </button>

      <dialog ref={dialogRef}>
        <div>
          <h2>Category Filter</h2>
          <button onClick={handleCancelFilter}>
            <X />
          </button>
        </div>

        {categories.map((category) => {
          const isChecked = draftCategories.includes(category.name);
          return (
            <div key={category._id}>
              <input
                type="checkbox"
                id={category.name}
                checked={isChecked}
                onChange={() => handleToggleCheckbox(category.name)}
              />
              <label htmlFor={category.name}>{category.name}</label>
            </div>
          );
        })}

        <div>
          <button onClick={handleCancelFilter}>Cancel</button>
          <button onClick={handleApplyFilter}>Apply</button>
        </div>
      </dialog>
    </>
  );
}

import Select from "react-select";
import useSWR from "swr";

export default function CategorySelect({
  id = "category",
  name = "category",
  value,
  onChange,
  placeholder = "Please select a category",
}) {
  const { data: categories, error, isLoading } = useSWR("/api/categories");

  const options = categories?.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  if (error) return <p>Error loading categories.</p>;

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "40px",
      padding: "8 6",
      borderRadius: "var(--border-radius-s)",
      borderColor: state.isFocused
        ? "var(--color-primary)"
        : "var(--color-grey-dark)",
      boxShadow: "none",
      backgroundColor: "transparent",
      "&:hover": {
        borderColor: state.isFocused
          ? "var(--color-primary)"
          : "var(--color-grey-dark)",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "var(--color-grey-dark)",
      opacity: 0.7,
      fontSize: "0.8rem",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "var(--color-primary)"
        : state.isFocused
          ? "var(--color-grey-light)"
          : "#fff",
      color: state.isSelected ? "#fff" : "var(--font-text-dark)",
      cursor: "pointer",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "var(--color-grey-light)",
      borderRadius: "var(--border-radius-s)",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "var(--font-text-dark)",
      ":hover": {
        backgroundColor: "var(--color-primary)",
        color: "var(--color-icon-light)",
      },
    }),
  };

  return (
    <Select
      instanceId={id}
      inputId={id}
      name={name}
      isMulti
      isLoading={isLoading}
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      noOptionsMessage={() => "No more categories."}
      styles={customStyles}
    />
  );
}

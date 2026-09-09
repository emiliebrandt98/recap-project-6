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

  return (
    <Select
      id={id}
      name={name}
      isMulti
      isLoading={isLoading}
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      noOptionsMessage={() => "No more categories."}
    />
  );
}

export function matchesActiveCategories(activity, activeCategories) {
  if (!activeCategories || activeCategories.length === 0) return true;

  return activity.categories.some((category) =>
    activeCategories.includes(category.name)
  );
}

export function matchesSearch(activity, search) {
  if (!search) return true;

  return activity.title.toLowerCase().includes(search.toLowerCase());
}

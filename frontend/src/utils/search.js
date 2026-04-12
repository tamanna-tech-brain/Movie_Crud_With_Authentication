export function searchFilter(data, searchText, field) {
  if (!searchText) return data;

  return data.filter(item =>
    item[field]?.toLowerCase().includes(searchText.toLowerCase())
  );
}
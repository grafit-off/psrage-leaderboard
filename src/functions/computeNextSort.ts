import { SortDirection, SortField } from '../models/Sorting';

const computeNextSort = (
  currentField: SortField,
  currentDirection: SortDirection,
  clickedField: SortField
): { sortField: SortField; sortDirection: SortDirection } => {
  if (currentField === clickedField) {
    return {
      sortField: currentField,
      sortDirection: currentDirection === 'asc' ? 'desc' : 'asc',
    };
  }
  return { sortField: clickedField, sortDirection: 'desc' };
};

export default computeNextSort;



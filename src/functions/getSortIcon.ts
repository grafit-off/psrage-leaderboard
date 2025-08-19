import { SortDirection } from '../models/Sorting';

const getSortIcon = (
  direction: SortDirection
): string => {
  return direction === 'asc' ? '↑' : '↓';
};

export default getSortIcon;

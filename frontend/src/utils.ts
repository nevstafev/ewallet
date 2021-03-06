export const formatDate = (date: string): string => {
  return Intl.DateTimeFormat('ee', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(date));
};

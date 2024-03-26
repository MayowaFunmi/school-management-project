export const formatDateOfBirth = (dateOfBirth: string): string => {
  const date = new Date(dateOfBirth);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return date.toLocaleDateString('en-US', options)
}
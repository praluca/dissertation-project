export function formatDate(date: any) {
  let dateObj = new Date(date);
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  let newdate = year + '/' + month + '/' + day;
  return newdate;
}

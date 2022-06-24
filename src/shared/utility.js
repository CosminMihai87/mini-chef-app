
export const filterJSONbyKey = (jsonObject, filterValue) => {
  return Object.keys(jsonObject).
    filter((key) => key.includes(filterValue)).
    reduce((cur, key) => { 
      return Object.assign(cur, { [key]: jsonObject[key] });
    }, {});
};

export const currentDateISOString = () => {
  const date = new Date();
  return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('.')[0].replace('T', ' ');
};
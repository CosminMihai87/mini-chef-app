
export const filterJSONbyKey = (jsonObject, filterValue) => {
  return Object.keys(jsonObject).
    filter((key) => key.includes(filterValue)).
    reduce((cur, key) => { 
      return Object.assign(cur, { [key]: jsonObject[key] });
    }, {});
};

export const currentDateISOString = () => {
  return new Date(Date.now()).toISOString().split('.')[0];
};
/* eslint-disable import/no-anonymous-default-export */
export default (state: any, action: any) => {
  const type = action?.type;
  const newState = Object.assign({}, state);

  switch (type) {
    case "add":
      return newState;
    default:
      newState;
  }
};

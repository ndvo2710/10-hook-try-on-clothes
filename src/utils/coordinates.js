export const getTRBLCoordinates = element => {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top,
    bottom: rect.bottom,
    right: rect.right,
    left: rect.left
  };
  // return [rect.top, rect.right, rect.bottom, rect.left]
};

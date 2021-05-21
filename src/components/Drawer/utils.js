export const adjustCoordinate = itemType => {
  switch (itemType) {
    case "botclothes":
      return [-20, 90, 1];
    case "shoes":
      return [-10, 270, 0.9];
    case "handbag":
      return [-100, 130, 0.5];
    case "hairstyle":
      return [30, 0, 0.7];
    case "background":
      return [210, 210, 3.4];
    default:
      return [0, 0, 1];
  }
};

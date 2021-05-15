import { CHANGE_ACTIVE_TAB } from "./DressingRoomActionTypeConstants";

const initialState = {
  currentActiveTab: {
    tabName: "tabTopClothes",
    showName: "Top",
    type: "topclothes"
  }
};

const DressingRoomReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_ACTIVE_TAB: {
      state.currentActiveTab = action.currentActiveTab;
      return { ...state };
    }
    default:
      return state;
  }
};

export default DressingRoomReducer;

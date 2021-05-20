import { CHANGE_ACTIVE_TAB, TRY_IT_ON } from "./DressingRoomActionTypeConstants";

const initialState = {
  currentActiveTab: {
    tabName: "tabTopClothes",
    showName: "Top",
    type: "topclothes"
  },
  currentDressingRoomSet: {
    hairstyle: "./img/hairstyle/hairstyle2.png",
    necklace: "./img/necklaces/necklace2.png",
    topclothes: "./img/clothes/topcloth6.png",
    botclothes: "./img/clothes/botcloth3.png",
    handbag: "./img/handbags/handbag3.png",
    shoes: "./img/shoes/shoes4.png",
    background: "./img/background/background3.jpg"
  }
};

const DressingRoomReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_ACTIVE_TAB: {
      state.currentActiveTab = action.currentActiveTab;
      return { ...state };
    }
    case TRY_IT_ON: {
        // console.log('action.tryItem', action.tryItem);
        const newCurrentDressingRoomSet = {...state.currentDressingRoomSet, ...action.tryItem};
        // console.log('state.currentDressingRoomSet', state.currentDressingRoomSet);
        // console.log('newCurrentDressingRoomSet', newCurrentDressingRoomSet);
        state.currentDressingRoomSet = newCurrentDressingRoomSet
        return {...state}
    }
    default:
      return state;
  }
};

export default DressingRoomReducer;

import { createActions, createReducer } from 'reduxsauce';
import { Notification } from "@common";
import { ToastAndroid } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { sia } from "@services";
import { string } from "@locales";


/* Types and actions */
export const { Types, Creators } = createActions({
    addSpace: ['value'],
    getSpace: ['value'],
    decreaseTime: null,
    updateEto: ['data'],
    togglePlay: ['item'],
    getSpaceName: ['name'],
    resetTimer: ['item'],
    deleteSpace: ['item'],
});

/* Value init */
const INITIAL_STATE = [];

/* Functions Reducers */
const addSpace = (state = INITIAL_STATE, action) => [
    ...state,
    action.value
];

const latitude = -8.668639;
const longitude = -37.682861;
const dataIncial = "20190516";
const dataFinal = "20190516";

const updateEto = (state = INITIAL_STATE, action) => {
    const data = action.data;
    console.log("RESPOSTA ETO SPkACE: ", data.features);

    return state.map(item => {
        const dataItem = new Date(item.irrigationTime);
        dataItem.setDate(dataItem.getDate() + 1); // tem q colocar + 1 para ser o dia seguinte

        if (dataItem < new Date()) {
            const timeCalc = Math.floor(Math.random() * (10 - 1) + 1);

            PushNotification.localNotification({
                channelId: "TC",
                title: string('IRRIGATION_DAY'),
                message: `${string('SESSION')} ${item.name} ${string('WAS_UPDATED')}!`,
            });
            return {
                ...item,
                time: timeCalc,
                data: data.features,
                currentTime: timeCalc,

            };
        }

        return item;
    });

};

const decreaseTime = (state = INITIAL_STATE, action) => {
    return state.map(item => {
        if (!item.play) {
            return item;
        }

        const newValue = item.currentTime - 1;

        if (newValue === 0) {
            PushNotification.localNotification({
                channelId: "TC",
                title: `${string("SESSION")} ${item.name} ${string("WAS_FINISHED")}! `,
                message: string("WAIT"),
            });
            return { ...item, currentTime: newValue, play: !item.play, irrigationTime: new Date() };
        }
        return { ...item, currentTime: newValue };
    });
};

const resetTimer = (state = INITIAL_STATE, action) => {
    return state.map(item => {
        if (item.name === action.item.name) {
            ToastAndroid.show("Timer reset!", ToastAndroid.SHORT);
            return { ...item, currentTime: item.time };
        }
        return item;
    });
}

const deleteSpace = (state = INITIAL_STATE, action) => {
    const item = state.find(space => space.name === action.item.name);
    if (item) {
        const newState = state.filter(space => space.name !== action.item.name);
        ToastAndroid.show("Cultivo deletado", ToastAndroid.SHORT);
        return newState;
    } else {
        ToastAndroid.show("Space not found!", ToastAndroid.SHORT);
        return state;
    }
}

const getSpace = (state = INITIAL_STATE, action) => state;

const togglePlay = (state = INITIAL_STATE, action) => {
    return state.map(item => {
        if (item.name === action.item.name) {
            if (item.currentTime === 0) {
                return { ...item, play: !item.play, currentTime: item.time };
            } else {
                return { ...item, play: !item.play };
            }
        }
        return item;
    });
};

const getSpaceName = (state = INITIAL_STATE, action) => {
    const item = state.find(space => space.name === action.name);
    if (item) {
        return state;
    } else {
        ToastAndroid.show("Space not found!", ToastAndroid.SHORT);
        return state;
    }
};

/* Create reducers */
export default createReducer(INITIAL_STATE, {
    [Types.ADD_SPACE]: addSpace,
    [Types.GET_SPACE]: getSpace,
    [Types.DECREASE_TIME]: decreaseTime,
    [Types.UPDATE_ETO]: updateEto,
    [Types.TOGGLE_PLAY]: togglePlay,
    [Types.GET_SPACE_NAME]: getSpaceName,
    [Types.RESET_TIMER]: resetTimer,
    [Types.DELETE_SPACE]: deleteSpace,
});

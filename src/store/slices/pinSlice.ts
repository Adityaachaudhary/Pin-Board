
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Pin {
  id: string;
  userId: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  likes: number;
  savedBy: number[];
  createdAt: string;
}

interface PinState {
  pins: Pin[];
}

const initialState: PinState = {
  pins: [],
};

const pinSlice = createSlice({
  name: 'pins',
  initialState,
  reducers: {
    setPins: (state, action: PayloadAction<Pin[]>) => {
      state.pins = action.payload;
      localStorage.setItem('pins', JSON.stringify(action.payload));
    },
    addPin: (state, action: PayloadAction<Pin>) => {
      state.pins.unshift(action.payload);
      localStorage.setItem('pins', JSON.stringify(state.pins));
    },
    updatePin: (state, action: PayloadAction<Pin>) => {
      const index = state.pins.findIndex(pin => pin.id === action.payload.id);
      if (index !== -1) {
        state.pins[index] = action.payload;
        localStorage.setItem('pins', JSON.stringify(state.pins));
      }
    },
    deletePin: (state, action: PayloadAction<string>) => {
      state.pins = state.pins.filter(pin => pin.id !== action.payload);
      localStorage.setItem('pins', JSON.stringify(state.pins));
    },
    likePin: (state, action: PayloadAction<string>) => {
      const pin = state.pins.find(pin => pin.id === action.payload);
      if (pin) {
        pin.likes += 1;
        localStorage.setItem('pins', JSON.stringify(state.pins));
      }
    },
    toggleSavePin: (state, action: PayloadAction<{ pinId: string; userId: number }>) => {
      const pin = state.pins.find(pin => pin.id === action.payload.pinId);
      if (pin) {
        const userIndex = pin.savedBy.indexOf(action.payload.userId);
        if (userIndex > -1) {
          pin.savedBy.splice(userIndex, 1);
        } else {
          pin.savedBy.push(action.payload.userId);
        }
        localStorage.setItem('pins', JSON.stringify(state.pins));
      }
    },
  },
});

export const { setPins, addPin, updatePin, deletePin, likePin, toggleSavePin } = pinSlice.actions;
export default pinSlice.reducer;

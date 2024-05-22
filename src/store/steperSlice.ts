import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Step {
  id: number;
  title: string;
  success: boolean | null;
  active: boolean;
  data: any;
}

interface StateType {
  active_step: number;
  steps: Array<Step>;
}

interface ChangeType {
  id: number;
  key: string;
  value: string;
}

const initialState: StateType = {
  active_step: 1,
  steps: [
    {
      id: 1,
      active: true,
      success: null,
      title: "Joy nomi",
      data: {
        name: "",
        phone: "",
        main_phone: "",
      },
    },
    {
      id: 2,
      success: null,
      active: false,
      title: "Joy rasmlari",
      data: {
        location_images: null,
      },
    },
    {
      id: 3,
      success: null,
      active: false,
      title: "Joylashuv ma’lumotlari",
      data: {
        lat: "",
        long: "",
        location: "",
        location_information: "",
      },
    },
    {
      id: 4,
      success: null,
      active: false,
      title: "Joy turi",
      data: {
        location_type: null,
      },
    },
    {
      id: 5,
      success: null,
      active: false,
      title: "Ish vaqtlari",
      data: {
        working_hours: null,
        time_zone: "",
      },
    },
    {
      id: 6,
      success: null,
      active: false,
      title: "Havolalar",
      data: {
        website: "",
        instagram: "",
        telegram: "",
        telegram_bot: "",
        facebook: "",
        twitter: "",
        youtube: "",
      },
    },
    {
      id: 7,
      success: null,
      active: false,
      title: "Qo’shimcha ma’lumotlar",
      data: {
        additional_information: null,
      },
    },
    {
      id: 8,
      success: null,
      active: false,
      title: "Arizachi ma’lumoti",
      data: {
        applicant_fio: "",
        applicant_phone: "",
      },
    },
  ],
};

export const steperSlice = createSlice({
  name: "steper",
  initialState,
  reducers: {
    setToggle: (state: StateType, { payload }: PayloadAction<number>) => {
      const newSteps = state?.steps?.map((step: Step) =>
        step?.id === payload
          ? { ...step, active: true }
          : { ...step, active: false },
      );
      return (state = { ...state, active_step: payload, steps: newSteps });
    },
    setSuccess: (
      state: StateType,
      action: PayloadAction<{ id: number; success: boolean }>,
    ) => {
      const newSteps = state?.steps?.map((step: Step) =>
        step?.id === action?.payload?.id
          ? { ...step, success: action?.payload?.success }
          : step,
      );
      return (state = { ...state, steps: newSteps });
    },
    setChange: (state: StateType, { payload }: PayloadAction<ChangeType>) => {
      const newSteps = state?.steps?.map((step: Step) =>
        step?.id === payload?.id
          ? {
              ...step,
              data: {
                ...step?.data,
                [payload.key]: payload?.value,
              },
            }
          : step,
      );

      return (state = { ...state, steps: newSteps });
    },
  },
});

export const { setToggle, setSuccess, setChange } = steperSlice.actions;
export default steperSlice.reducer;

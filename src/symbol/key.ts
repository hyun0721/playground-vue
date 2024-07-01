import type { Ref } from "vue";

export interface DataType {
    myData: Ref<string>;
    updateOriginData: (newValue: any) => void;
}

export const DRILLED_DATA = 'MY_INPUT';
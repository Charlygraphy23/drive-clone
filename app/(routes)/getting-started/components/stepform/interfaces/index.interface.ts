import { GettingStartedDataType } from "../../../store";

export type StepFormData = {
    title: string;
    buttonText: string;
    dataIndex: keyof GettingStartedDataType;
    botQuestion: string;
}

export type ChatUIStateType = {
    question: string;
    answer?: string
    key: keyof GettingStartedDataType
}[]
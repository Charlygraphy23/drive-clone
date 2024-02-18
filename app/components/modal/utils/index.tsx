import { ModalSize } from "../interfaces/index.interface";

export const getModalSize = (size?: ModalSize) => {
    if (size === "xl") return "modal-xl";
    if (size === "lg") return "modal-lg";
    if (size === "sm") return "modal-sm";
    return ""
}

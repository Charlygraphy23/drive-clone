import { AxiosError } from "axios";
import { ValidationError } from "yup";
import { EffectiveConnectionType } from "../interfaces/index.interface";

export const BootstrapMethods = {
    getBootstarp() {
        if (typeof window === 'undefined') {
            console.warn('window is undefined');
            return null;
        }

        return require('bootstrap')
    },
    toggle(id: string) {
        const boostrap = this.getBootstarp();
        const modal = new boostrap.Modal(`#${id}`);
        modal.toggle()
    },

    hide(id: string) {
        const boostrap = this.getBootstarp();
        const modal = new boostrap.Modal(`#${id}`);
        modal.hide()
    }
}


export const ErrorHandler = (err: unknown): ({ _validationError: boolean } & Record<string, string>) | string | unknown => {
    if (err instanceof ValidationError) {
        const errors = (err as ValidationError).inner;
        return errors.reduce((prev, _err) => {
            const key = _err?.path;
            if (!key) return prev;
            return {
                ...prev,
                [key]: _err.message
            }
        }, { _validationError: true })

    }

    if (err instanceof AxiosError) {
        const error = err as AxiosError<Record<string, any> | any | unknown>;
        const data = error.response?.data
        return data?.message ?? data?.msg ?? data ?? "Something went wrong"
    }

    const error = err as any
    return error.message ?? error?.msg ?? "Something went wrong"

}

export function formatBytes(size: number, decimals = 2) {
    if (!size) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']

    const i = Math.floor(Math.log(size) / Math.log(k))

    return `${parseFloat((size / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}


function getNetworkSpeedByBps(speedInBps: number) {
    const speedKbps = speedInBps / 1024;
    console.log("NETWORK-SPEED: ", `${speedKbps}kbps`)
    if (speedKbps < 100) {
        return EffectiveConnectionType.SPEED_2G;
    } else if (speedKbps < 1000) {
        return EffectiveConnectionType.SPEED_3G;
    } else {
        return EffectiveConnectionType.SPEED_4G;
    }
}

async function handleManualConnection(): Promise<EffectiveConnectionType> {
    const startTime = performance.now();

    try {
        const response = await fetch('/favicon.ico', { cache: 'no-store' });
        if (!response.ok) throw new Error('Network response was not ok');
        const blob = await response.blob();
        const endTime = performance.now();
        const duration = endTime - startTime;
        const fileSizeInBits = blob.size * 8;
        console.log("Blob size- ", blob.size)
        const speedInBps = fileSizeInBits / (duration / 1000);
        return getNetworkSpeedByBps(speedInBps)
    }
    catch (err) {
        console.error("Error getting network speed!", err);
        return EffectiveConnectionType.UNKNOWN
    }

}

async function getNetworkSpeed() {
    if ("connection" in navigator) {
        const connection = navigator.connection as { effectiveType: EffectiveConnectionType };

        if (connection) return connection.effectiveType;
        else return await handleManualConnection()
    }
    return await handleManualConnection()
}

export async function getImageQuality() {
    const networkSpeed = await getNetworkSpeed();

    switch (networkSpeed) {
        case "":
        case 'slow-2g':
        case '2g':
            return "low"
        case '3g':
            return "medium"
        case '4g':
        case '5g':
        default:
            return "high"
    }
}


export const disabledClick = (target: Node) => {
    if (typeof window === "undefined") throw new Error("disabledClick can only be used by client")

    const IDs = ["manage_access", "resource-info-button", "resource-info", "more-option", "more-option-file", "resource-info-button"]
    const classes = [".ant-select-dropdown", ".selectAccessType", ".selectAccessList"]
    const hasElementWithId = IDs.reduce((prev, Id) => {
        const element = document.getElementById(Id)
        const isContains = element?.contains(target)
        if (isContains) return true;
        if (prev) return prev;

        return false;
    }, false)

    const hasElementWithClass = classes.reduce((prev, Id) => {
        const element = document.querySelector(Id)
        const isContains = element?.contains(target)
        if (isContains) return true;
        if (prev) return prev;

        return false;
    }, false)

    return hasElementWithId || hasElementWithClass
}
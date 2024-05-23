import { AxiosError } from "axios";
import { ValidationError } from "yup";

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
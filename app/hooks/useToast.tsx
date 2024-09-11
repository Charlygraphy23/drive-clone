import { toast } from 'sonner'

const useToast = () => {

    const success = (message: string) => {
        toast(message, {
            className: "success",
            icon: <i className="bi bi-check-lg icon"></i>,
        })
    }

    const error = (message: string) => {
        toast(message, {
            className: "error",
            icon: <i className="bi bi-cone-striped icon"></i>,
        })
    }


    return {
        success,
        error
    }

}

export default useToast
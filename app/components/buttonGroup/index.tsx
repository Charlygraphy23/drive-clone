import { memo, useCallback, useDeferredValue } from "react";
import { Hourglass, HourglassProps, Rings, RingsProps } from "react-loader-spinner";
import style from './style.module.scss';

type Props = {
    handleSubmit?: (_event: React.MouseEvent<HTMLButtonElement>) => any | Promise<void> | void;
    submitText: string
    loading?: boolean
    className?: string;
    loader?: "hour" | "spin"
    order?: 1 | -1
    disabled?: boolean
    type?: "button" | "submit"
}

const ButtonGroup = ({ handleSubmit, submitText, loading = false, className = "", loader = "hour", order = 1, disabled = false, type = "button" }: Props) => {
    const deferredLoading = useDeferredValue(loading)
    const deferredDisabled = useDeferredValue(disabled)
    const deferredLoader = useDeferredValue(loader)



    const GenLoader = useCallback((props: HourglassProps | RingsProps) => {

        switch (deferredLoader) {
            case "hour":
                return <Hourglass {...props} colors={['white', 'white']} />
            case "spin":
                return <Rings  {...props} height="30"
                    width="20" color="white" />
            default:
                return <Hourglass {...props} />
        }

    }, [deferredLoader])


    return (
        <button
            type={type}
            className={`button ${style.button} ${className}`}
            style={{ flexDirection: order === 1 ? "row" : "row-reverse" }}
            onClick={handleSubmit}
            disabled={deferredLoading || deferredDisabled}
        >
            <span>{submitText}</span>

            {deferredLoading && <div className="mx-1 d-flex" >
                <GenLoader
                    visible={loading}
                    height="15"
                    width="20"
                    ariaLabel="loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>}
        </button>
    )
}

export default memo(ButtonGroup)
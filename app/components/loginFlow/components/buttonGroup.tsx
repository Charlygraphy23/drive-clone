import { Hourglass } from "react-loader-spinner";

type Props = {
    handleSubmit: () => Promise<void>;
    submitText: string
    loading?: boolean
}

const ButtonGroup = ({ handleSubmit, submitText, loading = false }: Props) => {
    return (
        <button className="button" onClick={handleSubmit} disabled={loading}>
            {submitText}

            <div className="mx-2 d-flex" >
                <Hourglass
                    visible={loading}
                    height="15"
                    width="20"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={['white', 'white']}
                />
            </div>
        </button>
    )
}

export default ButtonGroup
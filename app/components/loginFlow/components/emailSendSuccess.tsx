import { EmailSendSuccessPropsType } from "../interfaces/index.interface";
import style from "../style.module.scss";
import { getViewSlideClass } from "../utils/index.util";

type Props = EmailSendSuccessPropsType

const EmailSendSuccess = ({
    submitText,
    active,
    goBack,
    index,
    onClear
}: Props) => {

    const handleClick = () => {
        goBack && goBack(0);
        onClear && onClear()
    }


    return (
        <div className={`${style.success} ${style.view} ${getViewSlideClass(active, index)}`}>
            <div>
                <h4>🎉 Your request has been successfully sent!</h4>
                <span>📧✨ Keep an eye on your inbox for further instructions. </span>
            </div>
            <h6>
                If you have any questions or need assistance, don&apos;t hesitate to reach out. Stay secure! 🔒😊 #CyberSafety
            </h6>

            <button className="button" onClick={handleClick}>{submitText}</button>
        </div>
    )
}

export default EmailSendSuccess
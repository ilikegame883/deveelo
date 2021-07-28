import buttonStyles from '../styles/textbutton.module.css'

const TextButton = ({ colorKey, text, action}) => {


    let content = null;

    switch(colorKey){
        case "gold":
            content = (
                <div className={buttonStyles.goldGrad}>
                    <p className={buttonStyles.b_text}>{text}</p>
                </div>
            )
            break;
        case "green":
            content = (
                <div className={buttonStyles.greenGrad}>
                    <p className={buttonStyles.b_text}>{text}</p>
                </div>
            )
            break;
        default:
            content = (
                <div className={buttonStyles.goldGrad}>
                    <p className={buttonStyles.b_text}>{text}</p>
                </div>
            )
            break;
    }

    return (
        <div className={buttonStyles.button}>
            {content}
        </div>
    )
}

export default TextButton

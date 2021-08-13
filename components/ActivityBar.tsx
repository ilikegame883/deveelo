import activityStyles from '../styles/activitybar.module.css'

interface activityBarParams {
    widgetKeys?: string
}

const ActivityBar = ({ widgetKeys }:activityBarParams) => {
    return (
        <div className={activityStyles.activityBar}>
            
        </div>
    )
}

export default ActivityBar

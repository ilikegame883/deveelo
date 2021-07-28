import pictureStyles from '../styles/profilepicture.module.css'
import statusStyles from '../styles/status.module.css'
import Image from 'next/image';

const ProfilePicture = ({ size, source, acc_id}) => {

    let content = null;

    switch(size){
        case "large":
            content = (
                <>
                    <Image
                        className={pictureStyles.p_picture}
                        alt="profile picture"
                        src={source}
                        layout="fill"
                        objectFit="cover"
                    />
                    <div className={statusStyles.indicatorLarge}/>
                </>
            )
            break;
    }

    return (
        <div className={pictureStyles.p_pictureWrapper}>
            {content}
        </div>
    )
}

export default ProfilePicture

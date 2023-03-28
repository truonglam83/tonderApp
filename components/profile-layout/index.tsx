import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/configStore";
import { getProfileUser } from "../../redux/reducers/userReducer";
import ProfilePicture from "./profilePictures";
import ProfileSummary from "./summary/index";
import UserDetails from "./userDetails/index";

const ProfileContainer = () => {
    const dispatch: AppDispatch = useDispatch();
    const { userProfile } = useSelector((state: RootState) => state.userReducer);

    useEffect(() => {
        dispatch(getProfileUser());
    }, []);

    return (
        <>
            {userProfile && (
                <>
                    <ProfileSummary profile={userProfile} />
                    <ProfilePicture />
                    <UserDetails profile={userProfile} />
                </>
            )}
        </>
    );
};

export default ProfileContainer;

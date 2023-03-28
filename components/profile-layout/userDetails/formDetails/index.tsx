import { useState, useEffect } from "react";
import applauseImg from "../../../../public/images/profile/user-details/applause.png";
import childImg from "../../../../public/images/profile/user-details/child.png";
import genderImg from "../../../../public/images/profile/user-details/gender.png";
import graduationImg from "../../../../public/images/profile/user-details/graduation.png";
import heightImg from "../../../../public/images/profile/user-details/length.png";
import marriedImg from "../../../../public/images/profile/user-details/married.png";
import AlcoholField from "./AlcolholField/AlcoholField";
import ChildrenField from "./ChildrenField/ChildrenField";
import EducationField from "./EducationField/EducationField";
import GenderField from "./GenderField/GenderField";
import HeightField from "./HeightField/HeightField";
import MaritalStatusField from "./MaritalStatusField/MaritalStatusField";
import ReligionField from "./ReligionField/ReligionField";
import formStyle from "./formDetails.module.scss";
import detailsStyle from "../userDetails.module.scss";
import SelectForm from "./SelectForm/selectForm";
import { IUser } from "../../../../interface/user-interface";

interface ProfileDetailsProps {
    profile: IUser;
}

const FormDetails: React.FC<ProfileDetailsProps> = ({ profile }) => {
    const [height, setHeight] = useState<number>(170);
    const [marriage, setMarriage] = useState<boolean>(profile.marriage);
    const [children, setChildren] = useState<boolean>(profile.children);
    const [alcohol, setAlcohol] = useState<string>(profile.alcohol);
    const [gender, setGender] = useState<string>(profile.gender);
    const [religion, setReligion] = useState<boolean>(profile.religion);
    const [education, setEducation] = useState<string | undefined>(profile.education);

    useEffect(() => {
        switch (profile.gender) {
            case "male":
                setGender("Nam");
                break;
            case "female":
                setGender("Nữ");
                break;
            case "other":
                setGender("Làng Gốm Bát Tràng");
                break;
            default:
                setGender("");
                break;
        }
    }, [profile.gender]);

    return (
        <div className={detailsStyle["user__details--information"]}>
            <label className={detailsStyle["user__details--introduce__title"]}>Thông tin</label>
            <div className={detailsStyle["user__details--introduce__body"]}>
                <div className={formStyle["form"]}>
                    <SelectForm name="height" image={heightImg} title="Chiều cao" value={height}>
                        <HeightField value={height} onChange={setHeight} />
                    </SelectForm>

                    <SelectForm name="marriage" image={marriedImg} title="Hôn nhân" value={marriage}>
                        <MaritalStatusField value={marriage} onChange={setMarriage} />
                    </SelectForm>

                    <SelectForm name="children" image={childImg} title="Trẻ con" value={children}>
                        <ChildrenField value={children} onChange={setChildren} />
                    </SelectForm>

                    <SelectForm name="alcohol" image={childImg} title="Rượu bia" value={alcohol}>
                        <AlcoholField value={alcohol} onChange={setAlcohol} />
                    </SelectForm>

                    <SelectForm name="gender" image={genderImg} title="Giới tính" value={gender}>
                        <GenderField value={gender} onChange={setGender} />
                    </SelectForm>

                    <SelectForm name="religion" image={applauseImg} title="Tôn giáo" value={religion}>
                        <ReligionField value={religion} onChange={setReligion} />
                    </SelectForm>

                    <SelectForm name="education" image={graduationImg} title="Học vấn" value={education}>
                        <EducationField value={education} onChange={setEducation} />
                    </SelectForm>
                </div>
            </div>
        </div>
    );
};

export default FormDetails;

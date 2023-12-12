import {
  Box,
  Button,
  Checkbox,
  Group,
  Input,
  NativeSelect,
  Radio,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

/*const initData = {
  name:"",
  email:"",
  address:"",
  phone:"",
  gender:"",
  Membership:"",
  date:""


}*/
function Create() {
  const { t } = useTranslation();

  const { id } = useParams();

  const navigate = useNavigate();
  //State
  const [GetData, setGetData] = useState([]);

  const [IdNum, setIdNum] = useState(GetData?.idNum);

  const [Birth, setBirth] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  const [Imgs, setImgs] = useState("");

  //YUP Validation
  const valid = Yup.object().shape({
    name: Yup.string().required("should Enter Name"),
    email: Yup.string()
      .required("should Enter Email")
      .email("Invalid email address"),
    date: Yup.date().required("should Enter date"),
    gender: Yup.string().required("should select gender"),
    membership: Yup.string()
      .required("should  select Membership Type")
      .oneOf(["Basic", "Premium", "VIP"]),
    address: Yup.string().required("add Your Addres"),
    idNum: Yup.number()
      .required("Enter your ID Number")
      .test(
        "len",
        "Must be exactly 14 number",
        (val) => !val || (val && val.toString().length === 14)
      ),
  });

  //UseForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(valid),
    defaultValues: async () => await getDataOneUser().then((res) => res),
  });
  const UserRef = id ? doc(db, "Users", id) : collection(db, "Users");

  const onSubmit = async (data) => {
    const allData = Imgs
      ? { ...data, brith: Birth, imageUser: Imgs }
      : { ...data, brith: Birth };

    if (id) {
      await updateDoc(UserRef, {
        ...data,
      });
    } else {
      await addDoc(UserRef, {
        ...allData,
        TimeAdd: serverTimestamp(),
      });
    }

    navigate("/");
  };

  const err = (data) => {
    console.log(data);
  };

  const handleHeaderInputChange = (e) => {
    const files = e.target.files[0]; // Get the selected files
    console.log(files);
    setSelectedFile(files);
    const imgs = ref(storage, `chat-images/${files.name}`);
    uploadBytes(imgs, files).then((data) => {
      console.log(data, "imgs");
      getDownloadURL(data.ref).then((val) => {
        console.log(val);
        setImgs(val);
      });
    });
  };
  useEffect(() => {
    if (IdNum) {
      const day = IdNum.toString().substring(5, 7);
      const month = IdNum.toString().substring(3, 5);
      const year =
        IdNum.toString().substring(0, 1) == 3
          ? `20${IdNum.toString().substring(1, 3)}`
          : `19${IdNum.toString().substring(1, 3)}`;
      console.log(day);
      console.log(month);
      console.log(year);
      const dateObject = new Date(`${+year}-${month}-${day}`);
      console.log(dateObject);

      const formattedDate = `${dateObject.getDate()}/${
        dateObject.getMonth() + 1
      }/${dateObject.getFullYear()}`;
      console.log(formattedDate);
      setBirth(formattedDate);
    }
  }, [IdNum]);
  useEffect(() => {
    if (id) {
      getDataOneUser();
    }
  }, [id]);
  const getDataOneUser = async () => {
    const docRef = doc(db, "Users", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setGetData({ ...snapshot.data() });
      setIdNum({ ...snapshot.data() }.idNum);
      return { ...snapshot.data() };
    }
  };
  return (
    <div className="add">
      <h2 style={{ textAlign: "center" }}>{t("add.title")}</h2>
      <Box maw={340} mx="auto">
        <form onSubmit={handleSubmit(onSubmit, err)}>
          <TextInput
            label={t("add.name")}
            placeholder={t("add.enterName")}
            radius="md"
            name="name"
            {...register("name")}
            error={errors.name?.message}
          />

          {/* include validation with required or other standard HTML validation rules */}
          <TextInput
            label={t("add.email")}
            placeholder={t("add.enterEmail")}
            {...register("email")}
            radius="md"
            error={errors.email?.message}
          />
          <NativeSelect
            {...register("membership")}
            error={errors.membership?.message}
            label={t("add.selectMembership")}
            data={[
              { label: "null", value: "" },
              { label: t("add.basic"), value: "Basic" },
              { label: t("add.premium"), value: "Premium" },
              { label: t("add.vip"), value: "VIP" },
            ]}
          />

          <Checkbox
            label={t("add.subscribe")}
            {...register("Newsletter")}
            checked={GetData?.Newsletter}
          />
          <Input.Wrapper
            label={t("add.iDNumber")}
            placeholder={t("add.enterID")}
            error={errors.idNum?.message}
          >
            <Input
              placeholder={t("add.enterID")}
              error={errors.idNum?.message}
              type="number"
              {...register("idNum")}
              onChange={(e) => {
                e.target.value.length == 14 ? setIdNum(e.target.value) : null;
              }}
            />
          </Input.Wrapper>

          <Radio.Group
            label={t("add.gender")}
            withAsterisk
            {...register("gender")}
            error={errors.gender?.message}
          >
            <Group mt="xs">
              <Radio value="Male" label={t("add.male")} />
              <Radio value="Female" label={t("add.female")} />
            </Group>
          </Radio.Group>
          <Textarea
            placeholder={t("add.address")}
            label={t("add.enterAddress")}
            autosize
            minRows={2}
            {...register("address")}
            error={errors.address?.message}
          />
          <TextInput
            label={t("add.birth")}
            placeholder={t("add.birth")}
            value={Birth}
            readOnly
          />

          <div className="dateCreate">
            <label>{t("add.startDate")}</label>
            <input
              type="date"
              {...register("date")}
              onChange={(e) => {
                e.target.value;
              }}
            />
          </div>
          {errors.date?.message ? <p>{errors.date?.message}</p> : null}
          <TextInput
            label={t("add.PhoneNumber")}
            placeholder={t("add.EnterPhoneNumber")}
            {...register("pohne")}
          />
          <div className="inputChat">
            <div className="boxInput">
              {selectedFile.name && (
                <div className="boxImages upload_images">
                  <div
                    className="col-4 pluus doneImg"
                    style={{ position: "relative" }}
                  >
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      className="img img-thumbnail m-1 imgPreview"
                      style={{
                        background: "transparent",
                        borderRadius: "50%",
                        border: "1px solid #7fd196",
                        objectFit: "contain",
                        width: "120px",
                        height: "120px",
                      }}
                      alt="person"
                    />
                    <div
                      className="RemoveImge"
                      onClick={() => {
                        deleteObject(
                          ref(storage, `chat-images/${selectedFile.name}`)
                        )
                          .then(() => {
                            console.log("delet form fir");
                          })
                          .catch((error) => {
                            console.log("noooooooooooo delet form fir");
                            console.log(error);
                          });
                      }}
                    >
                      <p>X</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div id="image-container">
            <input
              type="file"
              id="file-input"
              onChange={handleHeaderInputChange}
            />
          </div>
          <Button type="submit" className="submit">
            {t("add.addBtn")}
          </Button>
          {id && (
            <Button
              className="EditBtn"
              onClick={() => {
                navigate(`/`);
              }}
            >
              {t("index.back")}
            </Button>
          )}
        </form>
      </Box>
    </div>
  );
}

export default Create;

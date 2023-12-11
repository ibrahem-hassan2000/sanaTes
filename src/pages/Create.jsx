import {
  Box,
  Button,
  Checkbox,
  Group,
  Input,
  NumberInput,
  Radio,
 
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { storage } from "../Firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
  const t = Yup.object().shape({
    name: Yup.string().required("ffen name"),
    email: Yup.string().required("feeen email").email("not valid"),
    date: Yup.date().required("fuun date"),
    gender: Yup.string().required("select gender"),
    membership: Yup.string().required("select Membership Type").oneOf(["Basic", "Premium","VIP"]),
    address:Yup.string().required("add Your Addres"),
    idNum:Yup.number().required("Enter your ID Number").max(14).min(1)
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(t),
  });
  const onSubmit = (data) => console.log(data);

  const err = (data) => {
    console.log(data);
  };

const [selectedFile, setSelectedFile] = useState([]);
const [Imgs, setImgs] = useState([]);
const handleHeaderInputChange = (e) => {
  const files = e.target.files; // Get the selected files
  for (let i = 0; i < files.length; i++) {
    const selectedFile = files[i];
    console.log(selectedFile);
    setSelectedFile((oldArray) => [...oldArray, selectedFile]);
    const imgs = ref(storage, `chat-images/${selectedFile.name}`);
    uploadBytes(imgs, selectedFile).then((data) => {
      console.log(data, "imgs");
      getDownloadURL(data.ref).then((val) => {
        setImgs((oldArray) => [...oldArray, val]);
      });
    });
  }
};
  return (
    <div className="add">
      <h2 style={{ textAlign: "center" }}>Add User</h2>
      <Box maw={340} mx="auto">
        <form onSubmit={handleSubmit(onSubmit, err)}>
          <TextInput
            label="Name"
            placeholder="Your namemjm"
            radius="md"
            name="name"
            {...register("name")}
            error={errors.name?.message}
          />

          {/* include validation with required or other standard HTML validation rules */}
          <TextInput
            label="Email"
            placeholder="Enter Your Email "
            {...register("email")}
            radius="md"
            error={errors.email?.message}
          />
          <div>
        <label>Select Membership Type</label>
        <select
          {...register("membership")}
         
        >
          <option value="">Null</option>
          <option value="Basic">Basic</option>
          <option value="Premium">Premium</option>
          <option value="VIP">VIP</option>
        </select>
        {errors.membership?.message ? <p>{errors.membership?.message}</p> : null}
      </div>

          
          <Checkbox label="I agree to sell my privacy" onClick={(e)=>{console.log(e.target.checked);}} />
          <NumberInput
            label="Hide controls"
            placeholder="Hide controls"
            hideControls
            {...register("idNum")}
            error={errors.idNum?.message}
            onChange={(e)=>{console.log(e );}}
          />
          <Radio.Group
            label="Gender"
            withAsterisk
            {...register("gender")}
            error={errors.gender?.message}
          >
            <Group mt="xs">
              <Radio value="Male" label="Male" />
              <Radio value="Female" label="Female" />
            </Group>
          </Radio.Group>
          <Textarea
            placeholder="Enter your Address"
            label="Address"
            autosize
            minRows={2}
            {...register("address")}
            error={errors.address?.message}
            

          />
          <Input value="gg" disabled placeholder="Input component" />

          <input type="date" {...register("date")} />
          {errors.date?.message ? <p>{errors.date?.message}</p> : null}
          <NumberInput
            label="Phone Number"
            placeholder="Hide controls"
            hideControls
          />
          <div className="inputChat">
          <div className="boxInput">
            {selectedFile.length > 0 ? (
              <div className="boxImages upload_images">
                {selectedFile.map((file, i) => {
                  return (
                    <div
                      key={i}
                      className="col-4 pluus doneImg"
                      style={{ position: "relative" }}
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        className="img img-thumbnail m-1 imgPreview"
                        style={{
                          background: "transparent",
                          maxHeight: "90px",
                          minHeight: "90px",
                          width: "100%",
                          height: "auto",
                        }}
                        alt="person"
                      />
                      <div
                        className="RemoveImge"
                        onClick={() => {
                          deleteObject(ref(storage, `chat-images/${file.name}`))
                            .then(() => {
                              console.log("delet form fir");
                            })
                            .catch((error) => {
                              console.log("noooooooooooo delet form fir");
                              console.log(error);
                            });
                          setImgs(
                            Imgs.filter((item) => !item.includes(file.name))
                          );
                          setSelectedFile(
                            selectedFile.filter((item) => item !== file)
                          );
                        }}
                      >
                        <p>X</p>
                      </div>
                    </div>
                  );
                })}{" "}
              </div>
            ) : null}
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
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default Create;

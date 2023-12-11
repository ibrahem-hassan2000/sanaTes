import { Box, Button, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
function Create() {
  const t = Yup.object().shape({
    name: Yup.string().required("ffen name"),
    email: Yup.string().required("feeen email").email("not valid"),
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
          <Button type="submit" className="submit" >Submit</Button>
        
        </form>
      </Box>
    </div>
  );
}

export default Create;

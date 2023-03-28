
import React from "react";
import { Button, Error, Input, FormField, Label, Textarea } from "../styles";
import { useFormik } from "formik";
import * as yup from "yup";


function SignUpForm({ onLogin }) {
  
  console.log("fuck")
  const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
    passwordConfirmation: yup.string(),
    imageUrl: yup.string().required(),
    bio: yup.string().required(),
  });
  
  console.log("fuck fuck")


  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
      imageUrl: "",
      bio: "",
    },
    validationSchema,
    onSubmit: (values) => {
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      })
        .then((r) => {
          if (r.ok) {
            r.json().then((user) =>  onLogin(user), console.log("fuck fuck fuck"));
          } 
        })
    },
  });


  console.log("mayday, mayday, please send help")

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormField>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          autoComplete="off"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          autoComplete="current-password"
        />
      </FormField>
      <FormField>
        <Label htmlFor="passwordConfirmation">Password Confirmation</Label>
        <Input
          type="password"
          id="passwordConfirmation"
          value={formik.values.passwordConfirmation}
          onChange={formik.handleChange}
          autoComplete="current-password"
        />
      </FormField>
      <FormField>
        <Label htmlFor="imageUrl">Profile Image</Label>
        <Input
          type="text"
          id="imageUrl"
          value={formik.values.imageUrl}
          onChange={formik.handleChange}
        />
      </FormField>
      <FormField>
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          rows="3"
          id="bio"
          value={formik.values.bio}
          onChange={formik.handleChange}
        />
      </FormField>
      <FormField>
      <Button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Loading..." : "Sign Up"}
        </Button>
      </FormField>
      <FormField>
        {formik.errors &&
          Object.values(formik.errors).map((err) => (
            <Error key={err}>{err}</Error>
          ))
        }
        </FormField>
    </form>
  );
}

export default SignUpForm;
































// import React, { useState } from "react";
// import styled from "styled-components";
// import { Button, Error, Input, FormField, Label, Textarea } from "../styles";

// function SignUpForm({ onLogin }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordConfirmation, setPasswordConfirmation] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [bio, setBio] = useState("");
//   const [errors, setErrors] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   function handleSubmit(e) {
//     e.preventDefault();
//     setErrors([]);
//     setIsLoading(true);
//     fetch("/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         username,
//         password,
//         password_confirmation: passwordConfirmation,
//         image_url: imageUrl,
//         bio,
//       }),
//     }).then((r) => {
//       setIsLoading(false);
//       if (r.ok) {
//         r.json().then((user) => onLogin(user));
//       } else {
//         r.json().then((err) => setErrors(err.errors));
//       }
//     });
//   }

//   return (
//     <Wrapper>
//       <form onSubmit={handleSubmit}>
//       <FormFields>
//         <FormField>
//           <WhiteLabel htmlFor="username">Username</WhiteLabel>
//           <WhiteInput
//             type="text"
//             id="username"
//             autoComplete="off"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </FormField>
//         <FormField>
//           <WhiteLabel htmlFor="password">Password</WhiteLabel>
//           <WhiteInput
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             autoComplete="current-password"
//           />
//         </FormField>
//         <FormField>
//           <WhiteLabel htmlFor="password">Password Confirmation</WhiteLabel>
//           <WhiteInput
//             type="password"
//             id="password_confirmation"
//             value={passwordConfirmation}
//             onChange={(e) => setPasswordConfirmation(e.target.value)}
//             autoComplete="current-password"
//           />
//         </FormField>
//         <FormField>
//           <WhiteLabel htmlFor="imageUrl">Profile Image</WhiteLabel>
//           <WhiteInput
//             type="text"
//             id="imageUrl"
//             value={imageUrl}
//             onChange={(e) => setImageUrl(e.target.value)}
//           />
//         </FormField>
//         <FormField>
//           <WhiteLabel htmlFor="bio">Bio</WhiteLabel>
//           <WhiteTextarea
//             rows="3"
//             id="bio"
//             value={bio}
//             onChange={(e) => setBio(e.target.value)}
//           />
//         </FormField>
//         <FormField>
//           <Button type="submit">{isLoading ? "Loading..." : "Sign Up"}</Button>
//         </FormField>
//         <FormField>
//           {errors.map((err) => (
//             <Error key={err}>{err}</Error>
//           ))}
//         </FormField>
//       </FormFields>
//       </form>
//     </Wrapper>
//   );
// }

// const Wrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
// `;

// const FormFields = styled.div`
//   width: 400px;
// `;

// const WhiteLabel = styled(Label)`
//   color: #4E79D4;
//   font-size: 1.5em; 
//   font-family: 'Press Start 2P', cursive;
// `;

// const WhiteInput = styled(Input)`
//   color: black;
// `;

// const WhiteTextarea = styled(Textarea)`
//   color: black;
// `;

// export default SignUpForm;
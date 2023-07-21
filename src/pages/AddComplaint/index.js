import { ComplaintForm } from '../../core/components/ComplaintForm';

export const AddComplaint = () => {
  // const [signIn] = useMutation(SIGN_IN, {
  //   onCompleted: async (data) => {
  //     const account = data.signIn.account;
  //     const token = data.signIn.token;
  //   },
  // });

  // const handleSignIn = async () => {
  //   try {
  //     setValidationErrors({});
  //     await signInSchema.validate({ email, password }, { abortEarly: false });
  //     const result = await signIn({ variables: { input: { email, password } } });
  //     if (result && result.errors && result.errors.graphQLErrors) {
  //       const errorMessages = result.errors.graphQLErrors.map((error) => error.detailedMessage);
  //       setValidationErrors(errorMessages);
  //     }
  //   } catch (error) {
  //     const errors = {};
  //     if (error.inner && error.inner.length) {
  //       error.inner.forEach((err) => {
  //         errors[err.path] = err.message;
  //       });
  //       setValidationErrors(errors);
  //     }
  //   }
  // };

  function handleSave(formData) {
    console.log('formData', formData)
  }

  return (
    <ComplaintForm complaint={null} handleSave={handleSave} />
  )
};

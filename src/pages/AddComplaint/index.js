import { useMutation } from '@apollo/client';
import { ComplaintForm } from '../../core/components/ComplaintForm';
import { CREATE_COMPLAINT } from '../../core/graphql/mutations';

export const AddComplaint = ({ navigation }) => {
  const [createComplaint] = useMutation(CREATE_COMPLAINT);

  async function handleSave(formData, token) {
    await createComplaint({
      variables: { input: formData },
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });
    navigation.navigate('Denúncias');
  }

  return (
    <ComplaintForm complaint={null} handleSave={handleSave} />
  )
};

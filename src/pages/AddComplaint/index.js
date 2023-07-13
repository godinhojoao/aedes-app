import { ComplaintForm } from '../../core/components/ComplaintForm';

export const AddComplaint = ({ navigation }) => {
  function handleSave(formData) {
    console.log('formData', formData)
  // navigation.navigate('Lista');
  }

  return (
    <ComplaintForm complaint={null} handleSave={handleSave} />
  )
};

import axios from 'axios';

export async function fetchAddressDataByCEP(cep) {
  try {
    const response = await axios.get(`https://api.postmon.com.br/v1/cep/${cep}`);
    return response.data;
  } catch (error) {
    throw new Error('CEP not found.');
  }
}

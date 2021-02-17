import { yupToFormErrors } from 'formik'
import * as Yup from 'yup'

export default Yup.object({

  tipo: Yup.string(),
    //.required('Campo obrigatório'),
  cadastro: Yup.string(),
  //  .required('Campo obrigatório'),
  anexo: Yup.object()
    //.required('Campo obrigatório')
  .nullable()
})

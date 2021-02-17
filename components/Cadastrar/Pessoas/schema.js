import * as Yup from 'yup'

export default Yup.object({

  nome: Yup.string()
    .max(40, 'Quantidade máxima de 40 caracteres')
    .required('O campo Nome / Razão social é obrigatório'),
  email: Yup.string().email('Favor preencher com um e-mail válido').required('O campo e-mail é obrigatório'),
  nick: Yup.string()
    .max(20, 'Quantidade máxima de 20 caracteres')
    .required('O campo nick é obrigatório'),
  cpf: Yup.string()
    .required('O campo CPF é obrigatório')
    .max(14, 'Quantidade máxima de 14 caracteres')
    .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'Favor digitar um CPF válido, exemplo: 999.999.999-99'),
  rg: Yup.string()
    .required('O campo RG é obrigatório')
    .max(12, 'Quantidade máxima de 12 caracteres')
    .matches(/(^(\d{2}\x2E\d{3}\x2E\d{3}[-]\d{1})$|^(\d{2}\x2E\d{3}\x2E\d{3})$)/, 'Favor digitar um RG válido, exemplo: 99.999.999-9'),
  data_nascimento: Yup.string()
    .required('O campo Data de Nascimento é obrigatório -- dd/mm/aaaa')
  .matches(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/, 'Favor preenchar com formato válido: dd/mm/aaaa'),
  celular: Yup.string()
    .required('O campo Celular é obrigatório'),
  endereco: Yup.string()
    .required('O campo Endereço é obrigatório'),
  numero: Yup.number()
    .required('O campo número é obrigatório'),
  senha: Yup.string()
    .required('O campo Senha é obrigatório')
    .min(5, 'Quantidade minima de 5 caracteres, para o campo de Senha')
})


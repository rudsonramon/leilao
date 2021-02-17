import React, { useState, useEffect } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  ButtonGroup,
  Select,
  Image,
} from "@chakra-ui/react"
import ListSelect from '../../List'
import { Formik, Form, Field } from 'formik';
import { useForm } from 'react-hook-form'
import registerDoc from '../../../src/api/v1/Pessoas'// definir API
import axios, { Method } from 'axios'

let linkAttachment = {}
let selectedPhoto = {}
let selectedEdital = null
let selectedFoto = null
let selectedArquivo1 = null
let selectedArquivo2 = null
let selectedArquivo3 = null

export default function index(props) {
  const [filteredCity, setFilteredCity] = useState(null)
  function queryFilter(url: string, method: Method) {
    try {
      axios(url, {
        method,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(res => {
          setFilteredCity(res.data)
        })
        .catch(error => {
          console.log(' method:' + method + ' - register - Error: ' + error)
      })

    } catch (error) {
      console.log(' method:' + method + ' - register - Error: ' + error)
    }
  }

  const { queryField, queryRegister, loadData } = props
  console.log(' VALIDAR -- queryField..... ', queryField)
  //console.log(' VALIDAR ..... queryRegister ', queryRegister)
  //console.log(' VALIDAR ..... loadData ', loadData)

  const [value, setValue] = React.useState(queryField)
  //console.log(' VALIDAR -->>>>>>>>>>>>>>> value..... ', value)
  //useEffect(() => {
    //setTimeout(async () =>{
//    setValue(queryField)
    //}, 900)
//  }, []);

  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    selectedEdital = data.anexo[0]
    selectedFoto = data.picture[0]
    selectedArquivo1 = data.arquivo1[0]
    selectedArquivo2 = data.arquivo2[0]
    selectedArquivo3 = data.arquivo3[0]

    if (data.anexo[0]) {
      s3RegisterImage('', value, data.anexo[0], '', '', '')
    }

    if (data.picture[0]) {
      s3RegisterImage(data.picture[0], value, '', '', '', '')
    }

    if (data.arquivo1[0]) {
      s3RegisterImage('', value, '', data.arquivo1[0], '', '')
    }

    if (data.arquivo2[0]) {
      s3RegisterImage('', value, '', '', selectedArquivo2, '')
    }

    if (data.arquivo3[0]) {
      s3RegisterImage('', value, '', '', '', selectedArquivo3)
    }
  }
  //const s3RegisterImage = async (file, value, attachment) => {
    const s3RegisterImage = async (file, value, attachment, arquivo1, arquivo2, arquivo3) => {
    const formData = new FormData()
    if (String(file).length > 1) {
      formData.append('image', file)
    }
    if (String(attachment).length > 1) {
      formData.append('image', attachment)
    }
    if (String(arquivo1).length > 1) {
      formData.append('image', arquivo1)
    }
    if (String(arquivo2).length > 1) {
      formData.append('image', arquivo2)
    }
    if (String(arquivo3).length > 1) {
      formData.append('image', arquivo3)
    }
    //GRAVAR IMAGEM NO S3
    const s3 = await fetch('http://localhost:3333/documentos_anexo', {
      method: 'POST',
      body:formData
    }).then(s3 => s3.json())

    if (String(file).length > 1) {
      //linkAttachment = {...linkAttachment, file: s3['Location']}
      //selectedPhoto = {file: s3['Location']}
      selectedPhoto = {foto:s3['Location']}
    }
    if (String(attachment).length > 1) {
      //linkAttachment = {...linkAttachment, attachment: s3['Location']}
      //linkAttachment = {attachment: s3['Location']}
      linkAttachment = {attachment:s3['Location']}
    }
    if (String(arquivo1).length > 1) {
      //TODO: INCLUIR A GRAVACAO DE ARQUIVO1
      selectedArquivo1 = {arquivo1:s3['Location']}
    }
    if (String(arquivo2).length > 1) {
      //TODO: INCLUIR A GRAVACAO DE ARQUIVO1
      selectedArquivo2 = {arquivo2:s3['Location']}
    }
    if (String(arquivo3).length > 1) {
      //TODO: INCLUIR A GRAVACAO DE ARQUIVO1
      selectedArquivo3 = {arquivo3:s3['Location']}
    }

    //if (String(linkAttachment['file']).length > 1 || String(linkAttachment['attachment']).length > 1) {
    //documentRegisterImage(value, selectedPhoto['file'], linkAttachment['attachment'])
    documentRegisterImage(value, selectedPhoto['foto'], linkAttachment['attachment'], selectedArquivo1['arquivo1'], selectedArquivo2['arquivo2'], selectedArquivo3['arquivo3'])
  }

  const documentRegisterImage = async (value, foto, edital, arquivo1, arquivo2, arquivo3) => {

    const url = 'http://localhost:3333'

    let hasUpdate = false
    queryField ? (hasUpdate = true) : (hasUpdate = false)

    //console.log('VALIDAR a variavel ----:::: ', value)
//    const id = value['id'] || loadData['id']
    //const nome = value['nome'] || loadData['nome']
    //const meta = value['meta'] || loadData['meta']
    //const categoria = value['categoria'] || loadData['categoria']
    const _foto = foto || loadData['foto']
    const leilao = value['leilao'] || loadData['leilao']
    const dataInicio = value['dataInicio'] || loadData['dataInicio']
    const dataFim = value['dataFim'] || loadData['dataFim']
    const lanceInicial = value['lanceInicial'] || loadData['lanceInicial']
    const lanceMinimo = value['lanceMinimo'] || loadData['lanceMinimo']
    const dataInicioSegundaPraca = value['dataInicioSegundaPraca'] || loadData['dataInicioSegundaPraca']
    const dataFimSegundaPraca = value['dataFimSegundaPraca'] || loadData['dataFimSegundaPraca']
    const lanceMinimoSegundaPraca = value['lanceMinimoSegundaPraca'] || loadData['lanceMinimoSegundaPraca']
    const comissaoLeiloeiro = value['comissaoLeiloeiro'] || loadData['comissaoLeiloeiro']
    const incremento = value['incremento'] || loadData['incremento']
    const acrescimo = value['acrescimo'] || loadData['acrescimo']
    const sucata = value['sucata'] || loadData['sucata']
    const endereco = value['endereco'] || loadData['endereco']
    const estado = value['estado'] || loadData['estado']
    const cidade = value['cidade'] || loadData['cidade']
    const googleMaps = value['googleMaps'] || loadData['googleMaps']
    const observacao = value['observacao'] || loadData['observacao']
    arquivo1 = arquivo1 || value['arquivo1'] // || loadData['arquivo1']
    const anexo1 = value['anexo1'] || loadData['anexo1']
    arquivo2 = arquivo2 || value['arquivo2'] // || loadData['arquivo2']
    const anexo2 = value['anexo2'] || loadData['anexo2']
    arquivo3 = arquivo3 || value['arquivo3'] // || loadData['arquivo3']
    const anexo3 = value['anexo3'] || loadData['anexo3']
    const metaDescricao = value['metaDescricao'] || loadData['metaDescricao']
    const descricaoCompleta = value['descricaoCompleta'] || loadData['descricaoCompleta']
    const descricaoExtra1 = value['descricaoExtra1'] || loadData['descricaoExtra1']
    const tituloDescricaoExtra1 = value['tituloDescricaoExtra1'] || loadData['tituloDescricaoExtra1']

    hasUpdate ? (
      registerDoc({ nome: value['nome'],
      meta: value['meta'],
      foto: foto,
      edital:edital,
      categoria: value['categoria'],
      leilao: value['leilao'],
      dataInicio: value['dataInicio'],
      dataFim: value['dataFim'],
      lanceInicial: value['lanceInicial'],
      lanceMinimo: value['lanceMinimo'],
      dataInicioSegundaPraca: value['dataInicioSegundaPraca'],
      dataFimSegundaPraca: value['dataFimSegundaPraca'],
      lanceMinimoSegundaPraca: value['lanceMinimoSegundaPraca'],
      comissaoLeiloeiro: value['comissaoLeiloeiro'],
      incremento: value['incremento'],
      acrescimo: value['acrescimo'],
      sucata: value['sucata'],
      endereco: value['endereco'],
      estado: value['estado'],
      cidade: value['cidade'],
      googleMaps: value['googleMaps'],
      observacao: value['observacao'],
      arquivo1: arquivo1,
      anexo1: value['anexo1'],
      arquivo2: arquivo2,
      anexo2: value['anexo2'],
      arquivo3: arquivo3,
      anexo3: value['anexo3'],
      metaDescricao: value['metaDescricao'],
      descricaoCompleta: value['descricaoCompleta'],
      descricaoExtra1: value['descricaoExtra1'],
      tituloDescricaoExtra1: value['tituloDescricaoExtra1'], }, url + '/leilao', 'PUT'),
      setTimeout(() => {
        window.location.href='/ConsultarLote'
      }, 5000)
    ) : (
        insertData(selectedEdital, selectedFoto, value, _foto, edital,  url, arquivo1, arquivo2, arquivo3)
      )
  }
  function insertData(selectedEdital, selectedFoto, value, foto, edital, url, arquivo1, arquivo2, arquivo3) {
    try {
      if (selectedEdital !== '' && selectedFoto !== '') {
        if (value['nome']) {
          registerDoc({
            nome: value['nome'],
            meta: value['meta'],
            foto: foto,
            edital: edital,
            categoria: value['categoria'],
            leilao: value['leilao'],
            dataInicio: value['dataInicio'],
            dataFim: value['dataFim'],
            lanceInicial: value['lanceInicial'],
            lanceMinimo: value['lanceMinimo'],
            dataInicioSegundaPraca: value['dataInicioSegundaPraca'],
            dataFimSegundaPraca: value['dataFimSegundaPraca'],
            lanceMinimoSegundaPraca: value['lanceMinimoSegundaPraca'],
            comissaoLeiloeiro: value['comissaoLeiloeiro'],
            incremento: value['incremento'],
            acrescimo: value['acrescimo'],
            sucata: value['sucata'],
            endereco: value['endereco'],
            estado: value['estado'],
            cidade: value['cidade'],
            googleMaps: value['googleMaps'],
            observacao: value['observacao'],
            arquivo1: arquivo1,
            anexo1: value['anexo1'],
            arquivo2: arquivo2,
            anexo2: value['anexo2'],
            arquivo3: arquivo3,
            anexo3: value['anexo3'],
            metaDescricao: value['metaDescricao'],
            descricaoCompleta: value['descricaoCompleta'],
            descricaoExtra1: value['descricaoExtra1'],
            tituloDescricaoExtra1: value['tituloDescricaoExtra1'],
          }, url + '/lotes', 'POST')
        }


        setTimeout(() => {
          window.location.href='/ConsultarLote'
        }, 5000)
      }
    } catch (error) {
      console.log(' :::: erro ao tentar processar GRAVAÇÃO DE NOVO LOTE :::: ')
      console.log(error)
    }
  }

  function handleCancel() {
    window.location.href = '/ConsultarLote'
  }

  function FormataStringData(data) {
    var dia  = data.split("/")[0];
    var mes  = data.split("/")[1];
    var ano  = data.split("/")[2];

    return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
    // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
  }

  const handleChange = (event) => {
    if (event.target.name === 'picture') {
      setValue({ ...value, picture: event.target.value })
    }
    if (event.target.id === 'nome') {
      setValue({ ...value, nome: event.target.value })
    }
    if (event.target.id === 'meta') {
      setValue({ ...value, meta: event.target.value })
    }
    if (event.target.id === 'categoria') {
      setValue({ ...value, categoria: event.target.value })
    }
    if (event.target.id === 'leilao') {
      setValue({ ...value, leilao: event.target.value })
    }
    if (event.target.id === 'dataInicio') {
      const data_inicio = FormataStringData(event.target.value)

      setValue({ ...value, dataInicio: data_inicio })
    }
    if (event.target.id === 'dataFim') {
      const data_fim = FormataStringData(event.target.value)
      setValue({ ...value, dataFim: data_fim })
    }
    if (event.target.id === 'lanceInicial') {
      setValue({ ...value, lanceInicial: event.target.value })
    }
    if (event.target.id === 'lanceMinimo') {
      setValue({ ...value, lanceMinimo: event.target.value })
    }
    if (event.target.id === 'dataInicioSegundaPraca') {
      const data_inicio_segunda_praca = FormataStringData(event.target.value)

      setValue({ ...value, dataInicioSegundaPraca: data_inicio_segunda_praca })
    }
    if (event.target.id === 'dataFimSegundaPraca') {
      const data_fim_segunda_praca = FormataStringData(event.target.value)

      setValue({ ...value, dataFimSegundaPraca: data_fim_segunda_praca })
    }
    if (event.target.id === 'lanceMinimoSegundaPraca') {
      setValue({ ...value, lanceMinimoSegundaPraca: event.target.value })
    }
    if (event.target.id === 'comissaoLeiloeiro') {
      setValue({ ...value, comissaoLeiloeiro: event.target.value })
    }
    if (event.target.id === 'incremento') {
      setValue({ ...value, incremento: event.target.value })
    }
    if (event.target.id === 'acrescimo') {
      setValue({ ...value, acrescimo: event.target.value })
    }
    if (event.target.id === 'sucata') {
      setValue({ ...value, sucata: event.target.value })
    }
    if (event.target.id === 'endereco') {
      setValue({ ...value, endereco: event.target.value })
    }
    //if (event.target.id === 'estado') {
    //setValue({ ...value, estado: event.target.value })
    //}
    //if (event.target.id === 'cidade') {
      //console.log(' VALIDAR TARGET.VALUE >>>>> ', event.target.value)
//      setValue({ ...value, cidade: event.target.value })
  //  }
    if (event.target.id === 'googleMaps') {
      setValue({ ...value, googleMaps: event.target.value })
    }
    if (event.target.id === 'observacao') {
      setValue({ ...value, observacao: event.target.value })
    }
    if (event.target.id === 'arquivo1') {
      setValue({ ...value, arquivo1: event.target.value })
    }
    if (event.target.id === 'anexo1') {
      setValue({ ...value, anexo1: event.target.value })
    }
    if (event.target.id === 'arquivo2') {
      setValue({ ...value, arquivo2: event.target.value })
    }
    if (event.target.id === 'anexo2') {
      setValue({ ...value, anexo2: event.target.value })
    }
    if (event.target.id === 'arquivo3') {
      setValue({ ...value, arquivo3: event.target.value })
    }
    if (event.target.id === 'anexo3') {
      setValue({ ...value, anexo3: event.target.value })
    }
    if (event.target.id === 'metaDescricao') {
      setValue({ ...value, metaDescricao: event.target.value })
    }
    if (event.target.id === 'descricaoCompleta') {
      setValue({ ...value, descricaoCompleta: event.target.value })
    }
    if (event.target.id === 'descricaoExtra1') {
      setValue({ ...value, descricaoExtra1: event.target.value })
    }
    if (event.target.id === 'tituloDescricaoExtra1') {
      setValue({ ...value, tituloDescricaoExtra1: event.target.value })
    }
  }

  const [insertRegister, setInsertRegister] = useState({})

  const [stateType, setStateType] = useState({
    selectedDocument: null,
  })

  const { selectedDocument } = stateType

  const handleChangeType = selectedDocument => {
    setInsertRegister({ ...insertRegister, selectedDocument })
    console.log('insertRegister :: ', insertRegister)

    setStateType({ selectedDocument });
    console.log(`Option selected >>:`, selectedDocument);
    if (selectedDocument['parentComponent']) {
      setValue({ ...value, estado: selectedDocument['value'] })
      //queryFilter('http://localhost:3333/cidades/' + selectedDocument['value'], 'GET')
      //console.log('VALIDAR ---- :::>>>> ', getUrl)
    }
    else {
      setValue({ ...value, cidade: selectedDocument['label'] })
    }
  }
  console.log(' VALIDAR EDIÇÃO value2 ', value)
  return (
    <Formik
      initialValues={queryField}
      enableReinitialize={true}
      //      validationSchema={schema}
    >
      {(props) => (
        <Form onSubmit={handleSubmit(onSubmit)}>
        <Field name='nome' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.nome && form.touched.nome}>
              <FormLabel>Nome</FormLabel>
              <Input {...field} id='nome' name='nome' onChange={handleChange} placeholder="Nome"/>
            </FormControl>
          )}
        </Field>
        <Field name='meta' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.meta && form.touched.meta}>
              <FormLabel>Meta (Titulo do site)</FormLabel>
              <Input {...field} id="meta" onChange={handleChange} placeholder="Informe o titulo do site"/>
            </FormControl>
          )}
        </Field>
        <Field name='categoria' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.categoria && form.touched.categoria}>
              <FormLabel>Categorias</FormLabel>
              <Select {...field} id='categoria' name='categoria' onChange={handleChange}>
                <option>---</option>
                <option value={'Ações - Cadastrar Novo'}>Ações - Cadastrar Novo</option>
                <option value={'Ações - Gerenciar item'}>Ações - Gerenciar item</option>
                <option value={'Itens - Caminhões'}>Itens - Caminhões</option>
                  <option value={'Itens - Motos'}>Itens - Motos</option>
                  <option value={'Itens - Sucadas'}>Itens - Sucadas</option>
                  <option value={'Itens - SUV'}>Itens - SUV</option>
                  <option value={'Itens - Utilitários'}>Itens - Utilitários</option>
                  <option value={'Itens - Veiculos'}>Itens - Veiculos</option>
              </Select>
            </FormControl>
          )}
        </Field>
        <Field name='foto' type='text'>
          {({ field, form }) => (
          <FormControl isInvalid={form.errors.foto && form.touched.foto}>
            <FormLabel>Foto</FormLabel>
                {
                  queryRegister['foto'] ? (
                    <Image width='200px' src={loadData['_foto']} ></Image>
                  ) : (
                    <input {...field} ref={register} onChange={handleChange} type='file' name='picture'></input>
                  )
                }
          </FormControl>
          )}
        </Field>
        <Field name='leilao' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.leilao && form.touched.leilao}>
              <FormLabel>Leilão</FormLabel>
              <Select {...field} id='leilao' name='leilao' onChange={handleChange}>
                <option>---</option>
                <option value={'Caminhões utilitários'}>Caminhões utilitários</option>
                <option value={'Motos'}>Motos</option>
                <option value={'Recuperados de Financiamento'}>Recuperados de Financiamento</option>
                <option value={'Sucadas'}>Sucadas</option>
              </Select>
            </FormControl>
          )}
        </Field>
        <Field name='dataInicio' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.dataInicio && form.touched.dataInicio}>
              <FormLabel>Data Inicio</FormLabel>
              <Input {...field} id='dataInicio' onChange={handleChange} placeholder='Data Inicio'/>
            </FormControl>
            )}
          </Field>
          <Field name='dataFim' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.dataFim && form.touched.dataFim}>
              <FormLabel>Data Fim</FormLabel>
              <Input {...field} id='dataFim' onChange={handleChange} placeholder='Data Fim'/>
            </FormControl>
            )}
          </Field>
          <Field name='lanceInicial' type='number'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.lanceInicial && form.touched.lanceInicial}>
              <FormLabel>Lance Inicial</FormLabel>
              <Input {...field} id="lanceInicial" type='number' required min='0' step='.01' onChange={handleChange} placeholder="Lance Inicial"/>
            </FormControl>
          )}
          </Field>
          <Field name='lanceMinimo' type='number'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.lanceMinimo && form.touched.lanceMinimo}>
              <FormLabel>Lance Minimo</FormLabel>
              <Input {...field} id="lanceMinimo" type='number' required min='0' step='.01' onChange={handleChange} placeholder="Lance Mínimo"/>
            </FormControl>
          )}
          </Field>
          <Field name='dataInicioSegundaPraca' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.dataInicioSegundaPraca && form.touched.dataInicioSegundaPraca}>
              <FormLabel>Data inicio 2ª Praça</FormLabel>
              <Input {...field} id='dataInicioSegundaPraca' type='text' required  onChange={handleChange} placeholder='Data inicio 2ª Praça'/>
            </FormControl>
          )}
          </Field>
          <Field name='dataFimSegundaPraca' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.dataFimSegundaPraca && form.touched.dataFimSegundaPraca}>
              <FormLabel>Data fim 2ª Praça</FormLabel>
              <Input {...field} id='dataFimSegundaPraca' type='text' required  onChange={handleChange} placeholder='Data fim 2ª Praça'/>
            </FormControl>
          )}
          </Field>
          <Field name='lanceMinimoSegundaPraca' type='number'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.lanceMinimoSegundaPraca && form.touched.lanceMinimoSegundaPraca}>
              <FormLabel>Lance Minimo (2ª Praça)</FormLabel>
              <Input {...field} id="lanceMinimoSegundaPraca" type='number' required min='0' step='.01' onChange={handleChange} placeholder="Lance Minimo (2ª Praça)"/>
            </FormControl>
          )}
          </Field>
          <Field name='comissaoLeiloeiro' type='number'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.comissaoLeiloeiro && form.touched.comissaoLeiloeiro}>
              <FormLabel>Comissão do Leiloeiro</FormLabel>
              <Input {...field} id="comissaoLeiloeiro" type='number' required min='0' step='.01' onChange={handleChange} placeholder="Comissão do leiloeiro"/>
            </FormControl>
          )}
          </Field>
          <Field name='incremento' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.incremento && form.touched.incremento}>
              <FormLabel>Incremento</FormLabel>
              <Input {...field} id="incremento" type='text'  onChange={handleChange} placeholder="Incremento"/>
            </FormControl>
          )}
          </Field>
          <Field name='acrescimo' type='number'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.acrescimo && form.touched.acrescimo}>
              <FormLabel>Acréscimo</FormLabel>
              <Input {...field} id="acrescimo" type='number'  onChange={handleChange} placeholder="Acréscimo"/>
            </FormControl>
          )}
        </Field>
        <Field name='sucata' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.sucata && form.touched.sucata}>
              <FormLabel>Sucata</FormLabel>
              <Select {...field} id='sucata' name='sucata' onChange={handleChange}>
                <option>---</option>
                <option value={false}>Não</option>
                <option value={true}>Sim</option>
              </Select>
            </FormControl>
          )}
          </Field>
          <Field name='endereco' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.endereco && form.touched.endereco}>
              <FormLabel>Endereço</FormLabel>
              <Input {...field} id='endereco' type='text'  onChange={handleChange} placeholder='Endereço'/>
            </FormControl>
          )}
          </Field>
          <Field name='estado' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.estado && form.touched.estado}>
              <FormLabel>Estado</FormLabel>
                <ListSelect {...field} id="estado" type='text' parentComponent={true} url={'http://localhost:3333/estados'} value={'abreviacao'} label={'nome'} handleChange={handleChangeType} selectedOption={selectedDocument} />
            </FormControl>
          )}
          </Field>
          <Field name='cidade' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.cidade && form.touched.cidade}>
            <FormLabel>Cidade</FormLabel>
              {
                selectedDocument ? (
                  <ListSelect {...field} id="cidade" type='text' parentComponent={false} url={'http://localhost:3333/cidades/' + selectedDocument['value']} value={'estado_abreviacao'} label={'nome'} handleChange={handleChangeType} selectedOption={selectedDocument} />
                ) :
                  (
                    <Select id="cidade" type='text'>
                      <option>---</option>
                    </Select>
                  )
              }
            </FormControl>
          )}
          </Field>
          <Field name='googleMaps' type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.googleMaps && form.touched.googleMaps}>
                <FormLabel>Google Maps</FormLabel>
                <Input {...field} id='googleMaps' type='text'  onChange={handleChange} placeholder='Google Maps'/>
              </FormControl>
            )}
          </Field>
          <Field name='observacao' type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.observacao && form.touched.observacao}>
                <FormLabel>Observação</FormLabel>
                <Input {...field} id='observacao' type='text'  onChange={handleChange} placeholder='Observação'/>
              </FormControl>
            )}
          </Field>
        <Field name='edital' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.edital && form.touched.edital}>
            <FormLabel>Edital</FormLabel>
              {
                queryRegister['edital'] ? (
                  <Image width='200px' src={loadData['_edital']} ></Image>
                ) : (
                  <input {...field} ref={register} type='file' name='anexo' onChange={handleChange}></input>
                )
              }
            </FormControl>
          )}
          </Field>
          <Field name='arquivo1' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.arquivo1 && form.touched.arquivo1}>
            <FormLabel>Arquivo1</FormLabel>
              {
                queryRegister['arquivo1'] ? (
                  <Image width='200px' src={loadData['_arquivo1']} ></Image>
              ) : (
                <input {...field} ref={register} type='file' name='arquivo1' onChange={handleChange}></input>
              )
            }
            </FormControl>
          )}
          </Field>
          <Field name='anexo1' type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.anexo1 && form.touched.anexo1}>
                <FormLabel>Anexo1</FormLabel>
                <Input {...field} id='anexo1' type='text'  onChange={handleChange} placeholder='Anexo1'/>
              </FormControl>
            )}
          </Field>
          <Field name='arquivo2' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.arquivo2 && form.touched.arquivo2}>
            <FormLabel>Arquivo2</FormLabel>
              {
                queryRegister['arquivo2'] ? (
                  <Image width='200px' src={loadData['_arquivo2']} ></Image>
              ) : (
                <input {...field} ref={register} type='file' name='arquivo2' onChange={handleChange}></input>
              )
            }

            </FormControl>
          )}
          </Field>
          <Field name='anexo2' type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.anexo2 && form.touched.anexo2}>
                <FormLabel>Anexo2</FormLabel>
                <Input {...field} id='anexo2' type='text'  onChange={handleChange} placeholder='Anexo2'/>
              </FormControl>
            )}
          </Field>
          <Field name='arquivo3' type='text'>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.arquivo3 && form.touched.arquivo3}>
            <FormLabel>Arquivo3</FormLabel>
                {
                  queryRegister['arquivo3'] ? (
                    <Image width='200px' src={loadData['_arquivo3']} ></Image>
                  ) : (
                    <input {...field} ref={register} type='file' name='arquivo3' onChange={handleChange}></input>
              )
            }

            </FormControl>
          )}
          </Field>
          <Field name='anexo3' type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.anexo3 && form.touched.anexo3}>
                <FormLabel>Anexo3</FormLabel>
                <Input {...field} id='anexo3' type='text'  onChange={handleChange} placeholder='Anexo3'/>
              </FormControl>
            )}
          </Field>
          <Field name='metaDescricao' type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.metaDescricao && form.touched.metaDescricao}>
                <FormLabel>Meta (Descrição)</FormLabel>
                <Input {...field} id='metaDescricao' type='text'  onChange={handleChange} placeholder='Meta (Descrição)'/>
              </FormControl>
            )}
          </Field>
          <Field name='descricaoCompleta' type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.descricaoCompleta && form.touched.descricaoCompleta}>
                <FormLabel>Descrição completa</FormLabel>
                <Input {...field} id='descricaoCompleta' type='text'  onChange={handleChange} placeholder='Descrição completa'/>
              </FormControl>
            )}
          </Field>
          <Field name='descricaoExtra1' type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.descricaoExtra1 && form.touched.descricaoExtra1}>
                <FormLabel>Descrição Extra 01</FormLabel>
                <Input {...field} id='descricaoExtra1' type='text'  onChange={handleChange} placeholder='Descrição Extra 01'/>
              </FormControl>
            )}
          </Field>
          <Field name='tituloDescricaoExtra1' type='text'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.tituloDescricaoExtra1 && form.touched.tituloDescricaoExtra1}>
                <FormLabel>Descrição Extra 01</FormLabel>
                <Input {...field} id='tituloDescricaoExtra1' type='text'  onChange={handleChange} placeholder='Descrição Extra 01'/>
              </FormControl>
            )}
          </Field>
        <ButtonGroup variant="outline" spacing="6">
        <Button
              size='lg'
              mt={4}
              colorScheme='blue'
              isLoading={props.isSubmitting}
              type='submit'
            >
              {queryField?('Atualizar'):('Gravar')}
            </Button>
            <Button size='lg' mt={4} onClick={handleCancel}> Cancel</Button>
          </ButtonGroup>
      </Form>
      )}
    </Formik>
  )
}

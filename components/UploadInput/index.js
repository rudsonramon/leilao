import React from 'react'
import {useForm} from 'react-hook-form'

export default function index() {
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    console.log(" TESTE data.picture[0] = >> ", data.picture[0])

    const formData = new FormData()
    formData.append('picture', data.picture[0])
    const res = await fetch('http://localhost:3333/picture', {
      method: 'POST',
      body:formData
    }
    ).then(res => res.json())
    alert(JSON.stringify(res))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input ref={register} type='file' name='picture'></input>
      <button>Submit</button>
    </form>

  )
}


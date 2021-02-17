import axios, { Method } from 'axios'

export default function register(data: Object, url: string, method: Method) {
  console.log(' data -->>>> ::  ', data, ' url:: ', url, ' method::  ', method)
  try {
    axios(url, {
      method,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
  },
      data
    })
      .then(res => {
        return res.data
      })
      .catch(error => {
        console.log(' method:' + method + ' ->> register - Error: ' + error)
    })

  } catch (error) {
    console.log(' method:' + method + ' - register - Error: ' + error)
  }
}


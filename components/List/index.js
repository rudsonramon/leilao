import React, {useState, useEffect} from 'react'
import Select from 'react-select';
import {SkeletonText, Box} from "@chakra-ui/react"
const axios = require('axios');

export default function index(props) {
  const initialState = null
  const [selectData, setSelectData] = useState(initialState)
  const { url, value, label, handleChange, selectedOption, selectedValue, selectedType, parentComponent } = props

  function getData(url) {
    axios.get(url)
    .then(function (response) {
      const result = response['data']
      setSelectData(result)
    })
    .catch(function (error) {
      console.log(error);
    })
    //.then(function () {
      // always executed
    //});
  }

  useEffect(() => {
    setTimeout(async () =>{
      getData(url)
    }, 900)
  }, [initialState]);

  let options = ''

  selectData ? (
    options = selectData.map((data) => (
      {
        "value": data[value],
        "label": data[label],
        "parentComponent":parentComponent
      }
      )
    )
  ) : ('')

  return (
    <>
      {!selectData ?
        (
        <Box boxShadow="lg" p={'2'} maxW={'400px'} margin='auto'>
          <SkeletonText mt="2" spacing="4" noOfLines={1} startColor="gray.200" endColor="gray.500" height="15px" />
        </Box>
        ) :
        (
          !selectedValue ?
            (
              !selectedType ? (
                <Select
                  onChange={handleChange}
                  options={options}
                  defaultValue={{ label: selectedValue , value: 0 }}
                />
              ) : (
                  <>
                    <Select
                      onChange={handleChange}
                      options={options}
                      defaultValue={{ label: selectedType , value: 0 }}
                    />
                  </>
              )
            ):
            (
              <Select
                //value={selectedValue}
                onChange={handleChange}
                options={options}
                defaultValue={{ label: selectedValue , value: 0 }}
              />
              )
        )
      }
    </>
  )
}

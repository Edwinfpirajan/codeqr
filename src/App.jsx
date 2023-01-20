import { useState } from 'react'
import reactLogo from './assets/react.svg'
import CodeValidate from './assets/pages/codeValidate'
import CodeDownload from './assets/pages/codeDownload'
import styled from 'styled-components'

function App() {


  return (
   <Container>
      {/* <CodeValidate /> */}
      <CodeDownload />
   </Container>
  )
}

export default App

const Container = styled.section`
    width: 100vw;
    height: 100vh;
`

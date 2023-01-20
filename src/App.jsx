import { useState } from 'react'
import reactLogo from './assets/react.svg'
import CodeValidate from './assets/pages/codeValidate'
import CodeDownload from './assets/pages/codeDownload'
import styled from 'styled-components'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import axios from 'axios'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <CodeDownload/>
        </div>
      ),
    },
    {
      path:"/qr/:link",
      element: <CodeDownload/>,
    },
  ]);


  return (
   <Container>
    <RouterProvider router={router} />     
   </Container>
  )
}

export default App

const Container = styled.section`
    width: 100vw;
    height: 100vh;
`

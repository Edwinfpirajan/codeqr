import CodeValidate from './assets/pages/codeValidate'
import CodeDownload from './assets/pages/codeDownload'
import styled from 'styled-components'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

function App() {

  const router = createBrowserRouter([
    {
      path: "download/:serial",
      element: (
        <div>
          <CodeDownload/>
        </div>
      ),
    },
    {
      path: "validate/:serial",
      element: <CodeValidate/>,
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

import styled from '@emotion/styled'
import { Container } from '@mui/material'
import React, { ReactChild } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

interface ILayout {
  children: ReactChild
  cmsData: any
}

const Layout: React.FC<ILayout> = ({ children, cmsData }) => {
  return (
    <GridLayout>
      <Navbar logoUrl={cmsData?.navLogo} liveTvLink={cmsData?.liveTvLink} />
      <Container>
        <main>{children}</main>
      </Container>
      <Footer socialIcons={cmsData?.socialIcons} logoUrl={cmsData?.footerLogo} />
    </GridLayout>
  )
}

const GridLayout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

export default Layout

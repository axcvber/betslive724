import React from 'react'
import Section from '../../theme/Section'
import Heading from '../Heading'

type contentType = {
  title: string
  description: string
}

interface IAboutUs {
  content: contentType
}

const AboutUs: React.FC<IAboutUs> = ({ content }) => {
  if (!content) {
    return null
  }
  return (
    <Section>
      <Heading secondary title={content.title} subtitle={content.description} />
    </Section>
  )
}

export default AboutUs

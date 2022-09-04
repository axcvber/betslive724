import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import enIcon from '../public/langs/en1.png'
import trIcon from '../public/langs/tr1.png'

const LocaleSwitch = () => {
  const router = useRouter()

  return (
    <>
      <Icon>
        <Link href={router.asPath} locale='tr' passHref>
          <a>
            <Image src={trIcon} priority width={30} height={30} quality={100} alt='tr' />
          </a>
        </Link>
      </Icon>

      <Icon>
        <Link href={router.asPath} locale='en' passHref>
          <a>
            <Image src={enIcon} priority width={30} height={30} quality={100} alt='en' />
          </a>
        </Link>
      </Icon>
    </>
  )
}

const Icon = styled('li')({
  cursor: 'pointer',
  marginLeft: '15px',
  borderRadius: '100%',
  'a': {
    display: 'block',
    height: '30px',
  },
})

export default LocaleSwitch

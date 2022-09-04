import { useRouter } from 'next/router'
import { en } from './en'
import { tr } from './tr'

const useLocale = () => {
  const router = useRouter()
  const t = router.locale === 'en' ? en : tr
  return t
}

export default useLocale

import Client from "@/components/Client"

import getTypingTextByLang, {
  type ITypingTextByLangSlug,
} from "@/actions/getTypingData"

import getCurrentUser from "@/actions/getCurrentUser"
import HomeSection from "@/components/HomeSection"
import { DEFAULT_LANG } from "@/site_settings"

interface IHomeProps {
  searchParams: ITypingTextByLangSlug
}

const HomePage = async (searchParams: IHomeProps) => {
  let langSlug: ITypingTextByLangSlug = { lang: DEFAULT_LANG }

  if (searchParams.searchParams.lang) {
    langSlug = searchParams.searchParams
  }

  let [currentUser, texts] = await Promise.all([
    getCurrentUser(),
    getTypingTextByLang(langSlug),
  ])

  return (
    <Client>
      <HomeSection texts={texts} currentUser={currentUser} />
    </Client>
  )
}

export default HomePage

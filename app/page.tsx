import getTypingTextByLang, {
  type ITypingTextByLangSlug,
} from "./actions/getTypingData"
import HomeSection from "./components/HomeSection"
import { DEFAULT_LANG } from "./site_settings"

interface IHomeProps {
  searchParams: ITypingTextByLangSlug
}

const HomePage = async (searchParams: IHomeProps) => {
  let langSlug: ITypingTextByLangSlug = { lang: DEFAULT_LANG }

  if (searchParams.searchParams.lang) {
    langSlug = searchParams.searchParams
  }
  const texts = await getTypingTextByLang(langSlug)

  return <HomeSection texts={texts} />
}

export default HomePage

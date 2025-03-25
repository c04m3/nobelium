import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { useConfig } from '@/lib/config'

dayjs.extend(localizedFormat)

const loaded = {}

export default function FormattedDate ({ date }) {
  const lang = useConfig().lang.slice(0, 2)
  const [isLocaleLoaded, setIsLocaleLoaded] = useState(loaded[lang] === true)

  useEffect(() => {
    if (!isLocaleLoaded) {
      loaded[lang] ??= import(`dayjs/locale/${lang}`).then(
        () => {
          loaded[lang] = true
          dayjs.locale(lang)
        },
        () => console.warn(`dayjs locale \`${lang}\` not found`)
      )
      loaded[lang].then(() => setIsLocaleLoaded(true))
    }

  }, [isLocaleLoaded, lang])
  // 將日期從原先的 ll 修改成現在的格式
  return <span>{dayjs(date).format('YYYY [年] MM [月] DD [日]')}</span>
}

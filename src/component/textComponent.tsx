import {useLang} from "../generalFunction/providerHook";

export function TextLanguage({
  textId,
  values,
}: {
  textId: string
  values?: any
}) {
  const langPackage = useLang().langPackage
  let output = langPackage[textId] || 'not found'
  if (output === 'not found') return textId
  const replaceRegex: RegExp[] = []
  const replaceValues: string[][] = []
  const replaceComponents: ((str: string) => JSX.Element)[] = []
  if (values) {
    Object.keys(values).forEach((key) => {
      replaceValues.push([])
      const target = new RegExp(`{${key}}`, 'g')
      if (output.match(target)) {
        let replaceStr = langPackage[values[key]] || 'not found'
        output = output.replaceAll(target, replaceStr)
      }
      const styleRegex = new RegExp(`<${key}>(.*?)</${key}>`, 'g')
      if (output.match(styleRegex)) {
        replaceRegex.push(styleRegex)
        replaceComponents.push(values[key])
        output
          .match(styleRegex)
          .forEach((textWithTags: string) => {
            const tag = new RegExp(`</?${key}>`, 'g')
            const text = textWithTags.replace(tag, '')
            replaceValues[replaceComponents.length - 1].push(text)
          })
      }
    })
  }
  if (replaceRegex.length > 0) {
    replaceRegex.forEach((regex, index) => {
      output = output.replaceAll(regex, `|##替換文字${index}##|`)
    })
    const outputArray = output.split('|')
    const replaceComponentTimes: number[] = new Array(
      replaceComponents.length
    ).fill(0)
    return outputArray.map((text: string, index: number) => {
      for (let i = 0; i < replaceComponents.length; i++) {
        if (text === `##替換文字${i}##`) {
          replaceComponentTimes[i] += 1
          return (
            <span key={index}>
              {replaceComponents[i](
                replaceValues[i][replaceComponentTimes[i] - 1]
              )}
            </span>
          )
        }
      }
      return <span key={index}>{text}</span>
    })
  } else {
    return output
  }
}
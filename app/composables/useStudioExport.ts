import type { StudioContent } from '~/types/studio'

export function useStudioExport() {
  function downloadJson(content: StudioContent) {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'motion-icon-studio.json'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  async function readJson(file: File): Promise<unknown> {
    return JSON.parse(await file.text()) as unknown
  }

  return { downloadJson, readJson }
}

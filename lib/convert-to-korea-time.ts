export function convertToKoreanDate(inputDateString: string): string {
  const inputDate = new Date(inputDateString)

  const koreaTime = new Date(inputDate.getTime() + 9 * 60 * 60 * 1000)

  const formattedDate = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    // hour: '2-digit',
    // minute: '2-digit',
    // second: '2-digit',
    timeZone: 'Asia/Seoul',
  }).format(koreaTime)

  return formattedDate
}

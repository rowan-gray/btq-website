import { AlertStrip } from '@/components/alert-strip'
import {
  AlertSeverityLevel,
  fetchTranslinkAlerts,
  filterForAlertsActiveWithinDays,
} from '@/helpers/translinkAlertsHelper'

export async function AlertStripServer() {
  const all = await fetchTranslinkAlerts('all')
  const recent = filterForAlertsActiveWithinDays(all, 3).filter(
    (alert) =>
      alert.severity === AlertSeverityLevel.Major &&
      alert.startDate &&
      Date.now() - alert.startDate.getTime() < 7 * 24 * 60 * 60 * 1000,
  )
  if (recent.length === 0) return null
  return <AlertStrip alerts={recent} />
}

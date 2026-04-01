export interface DateRange {
  StartDate: Date
  EndDate: Date
}

/**
 * Determines whether two date ranges intersect.
 *
 * A date range is considered an interval on the timeline defined by a
 * StartDate and an EndDate. This function returns `true` when the two
 * intervals overlap in any way, including:
 *   - A starting inside B
 *   - A ending inside B
 *   - A fully containing B
 *   - B fully containing A
 *   - A touching B at the boundary (inclusive)
 *
 * Intersection rule:
 *   Two ranges intersect if:
 *     A.StartDate <= B.EndDate  AND  A.EndDate >= B.StartDate
 *
 * The function also validates that each range has a StartDate that is not
 * greater than its EndDate. If an invalid range is detected, a warning is
 * logged and the function returns `false`.
 *
 * @param rangeA - The first date range to compare.
 * @param rangeB - The second date range to compare.
 * @returns `true` if the ranges intersect, otherwise `false`.
 */
export const doDateRangesIntersect = (rangeA: DateRange, rangeB: DateRange) => {
  if (rangeA.StartDate > rangeA.EndDate) {
    console.warn(
      'DoDateRangesIntersect (rangeA): StartDate cannot be greater than EndDate.',
    )
    return false
  }

  if (rangeB.StartDate > rangeB.EndDate) {
    console.warn(
      'DoDateRangesIntersect (rangeB): StartDate cannot be greater than EndDate.',
    )
    return false
  }

  return (
    rangeA.StartDate <= rangeB.EndDate && rangeA.EndDate >= rangeB.StartDate
  )
}

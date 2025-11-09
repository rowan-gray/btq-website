export type Event = {
    /** When the event expires (hidden after this date) */
    date: Date
    /** Title of the event */
    title: string
    /** Text for the optional website banner */
    bannerText?: string,
    /** Optional description text */
    description?: string
    /** Optional location */
    location?: string
    /** Link to learn more */
    href: string
}
  
export const NextEvent: Event = {
    date: new Date('2025-11-23T14:00:00+10:00'),
    title: "Annual General Meeting",
    bannerText: "Join us for our AGM",
    description: "Join us for our annual general meeting at Carindale Library! This is your opportunity to shape the future of the association.",
    location: "Carindale Library",
    href: "/agm"
}
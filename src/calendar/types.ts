export interface EventProps {
  name: string
  avatar: string
  date: Date
  entityId: number
  groupId: number
}

export type EventsProps = EventProps[]

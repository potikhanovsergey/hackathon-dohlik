interface AgendaProps {
  id: number
  date: Date
  oldSolutionId: number
  oldProtocolId: number
  entityId: number
  groupId: number
}

export const agendasTableMock: AgendaProps[] = [
  {
    id: 1,
    date: new Date(),
    oldSolutionId: 1,
    oldProtocolId: 1,
    entityId: 1,
    groupId: 1,
  },
  {
    id: 2,
    date: new Date(),
    oldSolutionId: 2,
    oldProtocolId: 3,
    entityId: 2,
    groupId: 2,
  },
  {
    id: 3,
    date: new Date(),
    oldSolutionId: 2,
    oldProtocolId: 1,
    entityId: 3,
    groupId: 2,
  },
  {
    id: 4,
    date: new Date(),
    oldSolutionId: 3,
    oldProtocolId: 3,
    entityId: 3,
    groupId: 1,
  },
]

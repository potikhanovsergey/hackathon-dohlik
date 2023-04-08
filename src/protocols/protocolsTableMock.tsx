export interface IProtocol {
  id: number
  creationDate: Date //  дата создания протокола
  address: string
  protocolNumber: string // номер протокола
  entityId: number // айди объекта
  groupId: number // айди рабочей группы
  newSolutionId: number // айди нового решения по объекту
  additionalInfo?: {
    [key: string]: {
      label: string
      value: any
    }
  }
}

export const protocolsTableMock: IProtocol[] = [
  {
    id: 1,
    creationDate: new Date(),
    address: "Малая Семеновская",
    protocolNumber: "1234",
    entityId: 1,
    groupId: 1,
    newSolutionId: 1,
  },
  {
    id: 2,
    creationDate: new Date(),
    address: "Большая Семеновская",
    protocolNumber: "2345",
    entityId: 2,
    groupId: 2,
    newSolutionId: 2,
  },
  {
    id: 2,
    creationDate: new Date(),
    address: "Крошка Семеновская",
    protocolNumber: "3456",
    entityId: 3,
    groupId: 2,
    newSolutionId: 3,
  },
]

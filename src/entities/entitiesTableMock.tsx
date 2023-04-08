interface EntityProps {
  id: number
  district: string //  округ
  region: string // район
  address: string
  type: string // тип объекта (признак будет участвовать в определении необходимой рабочей группы)
  area: number // площадь объекта
  state: string // состояние объекта
  owner: string // собственник
  actualUser: string // фактический пользователь
  additionalInfo?: {
    [key: string]: {
      label: string
      value: any
    }
  }
}

// округ
// район
// адрес
// тип объекта (признак будет участвовать в определении необходимой рабочей группы)
// состояние объекта
// площадь объекта
// собственник
// фактический пользователь
// фото/видеоматериалы

export const entitiesTableMock: EntityProps[] = [
  {
    id: 0,
    district: "Восточный административный",
    region: "Соколиная гора",
    address: "Малая Семеновская 12",
    type: "Общежитие",
    area: 400,
    state: "В использовании",
    owner: "Московский Политех",
    actualUser: "Московский Политех",
    additionalInfo: {
      latitude: {
        label: "Широта",
        value: 40,
      },
      longitude: {
        label: "Долгота",
        value: 60,
      },
    },
  },
  {
    id: 1,
    district: "Восточный административный",
    region: "Соколиная гора",
    address: "Малая Семеновская 12",
    type: "Общежитие",
    area: 400,
    state: "В использовании",
    owner: "Московский Политех",
    actualUser: "Московский Политех",
    additionalInfo: {
      latitude: {
        label: "Широта",
        value: 40,
      },
      longitude: {
        label: "Долгота",
        value: 60,
      },
    },
  },
  {
    id: 2,
    district: "Восточный административный",
    region: "Соколиная гора",
    address: "Малая Семеновская 12",
    type: "Общежитие",
    area: 400,
    state: "В использовании",
    owner: "Московский Политех",
    actualUser: "Московский Политех",
    additionalInfo: {
      latitude: {
        label: "Широта",
        value: 40,
      },
      longitude: {
        label: "Долгота",
        value: 60,
      },
    },
  },
  {
    id: 3,
    district: "Восточный административный",
    region: "Соколиная гора",
    address: "Малая Семеновская 12",
    type: "Общежитие",
    area: 400,
    state: "В использовании",
    owner: "Московский Политех",
    actualUser: "Московский Политех",
    additionalInfo: {
      latitude: {
        label: "Широта",
        value: 40,
      },
      longitude: {
        label: "Долгота",
        value: 60,
      },
    },
  },
  {
    id: 4,
    district: "Восточный административный",
    region: "Соколиная гора",
    address: "Малая Семеновская 12",
    type: "Общежитие",
    area: 400,
    state: "В использовании",
    owner: "Московский Политех",
    actualUser: "Московский Политех",
    additionalInfo: {
      latitude: {
        label: "Широта",
        value: 40,
      },
      longitude: {
        label: "Долгота",
        value: 60,
      },
    },
  },
]

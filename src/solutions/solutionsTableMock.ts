interface SolutionProps {
  id: number
  creationDate: Date
  description: string
  deadline: Date
  inCharge: string
  protocol: string
  status: string
  additionalInfo?: {
    [key: string]: {
      label: string
      value: any
    }
  }
}

export const solutionsTableMock: SolutionProps[] = [
  {
    id: 0,
    creationDate: new Date(),
    description:
      "First ipsum dolor sit amet, consectetur adipisicing elit. Veniam, exercitationem.",
    deadline: new Date(),
    inCharge: "Аркадий Аркадьевич Аркадьев",
    protocol: "Протокол",
    status: "Начат",
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
    creationDate: new Date(),
    description:
      "Second ipsum dolor sit amet, consectetur adipisicing elit. Veniam, exercitationem.",
    deadline: new Date(),
    inCharge: "Аркадий Аркадьевич Аркадьев",
    protocol: "Протокол",
    status: "В работе",
  },
  {
    id: 2,
    creationDate: new Date(),
    description:
      "Third ipsum dolor sit amet, consectetur adipisicing elit. Veniam, exercitationem.",
    deadline: new Date(),
    inCharge: "Аркадий Аркадьевич Аркадьев",
    protocol: "Протокол",
    status: "Начат",
  },
  {
    id: 3,
    creationDate: new Date(),
    description:
      "First ipsum dolor sit amet, consectetur adipisicing elit. Veniam, exercitationem.",
    deadline: new Date(),
    inCharge: "Аркадий Аркадьевич Аркадьев",
    protocol: "Протокол",
    status: "Просрочен",

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
    creationDate: new Date(),
    description:
      "Second ipsum dolor sit amet, consectetur adipisicing elit. Veniam, exercitationem.",
    deadline: new Date(),
    inCharge: "Аркадий Аркадьевич Аркадьев",
    protocol: "Протокол",
    status: "Завершен",
  },
  {
    id: 5,
    creationDate: new Date(),
    description:
      "Third ipsum dolor sit amet, consectetur adipisicing elit. Veniam, exercitationem.",
    deadline: new Date(),
    inCharge: "Аркадий Аркадьевич Аркадьев",
    protocol: "Протокол",
    status: "Начат",
  },
  {
    id: 6,
    creationDate: new Date(),
    description:
      "First ipsum dolor sit amet, consectetur adipisicing elit. Veniam, exercitationem.",
    deadline: new Date(),
    inCharge: "Аркадий Аркадьевич Аркадьев",
    protocol: "Протокол",
    status: "Начат",

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
    id: 7,
    creationDate: new Date(),
    description:
      "Second ipsum dolor sit amet, consectetur adipisicing elit. Veniam, exercitationem.",
    deadline: new Date(),
    inCharge: "Аркадий Аркадьевич Аркадьев",
    protocol: "Протокол",
    status: "В работе",
  },
  {
    id: 8,
    creationDate: new Date(),
    description:
      "Third ipsum dolor sit amet, consectetur adipisicing elit. Veniam, exercitationem.",
    deadline: new Date(),
    inCharge: "Аркадий Аркадьевич Аркадьев",
    protocol: "Протокол",
    status: "Начат",
  },
]

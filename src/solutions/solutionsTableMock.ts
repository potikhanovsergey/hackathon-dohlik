interface SolutionProps {
  id: number
  creationDate: Date
  description: string
  deadline: Date
  inCharge: string
  protocol: string
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
  },
  {
    id: 2,
    creationDate: new Date(),
    description:
      "Third ipsum dolor sit amet, consectetur adipisicing elit. Veniam, exercitationem.",
    deadline: new Date(),
    inCharge: "Аркадий Аркадьевич Аркадьев",
    protocol: "Протокол",
  },
  {
    id: 3,
    creationDate: new Date(),
    description:
      "First ipsum dolor sit amet, consectetur adipisicing elit. Veniam, exercitationem.",
    deadline: new Date(),
    inCharge: "Аркадий Аркадьевич Аркадьев",
    protocol: "Протокол",
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
  },
  {
    id: 5,
    creationDate: new Date(),
    description:
      "Third ipsum dolor sit amet, consectetur adipisicing elit. Veniam, exercitationem.",
    deadline: new Date(),
    inCharge: "Аркадий Аркадьевич Аркадьев",
    protocol: "Протокол",
  },
  {
    id: 6,
    creationDate: new Date(),
    description:
      "First ipsum dolor sit amet, consectetur adipisicing elit. Veniam, exercitationem.",
    deadline: new Date(),
    inCharge: "Аркадий Аркадьевич Аркадьев",
    protocol: "Протокол",
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
  },
  {
    id: 8,
    creationDate: new Date(),
    description:
      "Third ipsum dolor sit amet, consectetur adipisicing elit. Veniam, exercitationem.",
    deadline: new Date(),
    inCharge: "Аркадий Аркадьевич Аркадьев",
    protocol: "Протокол",
  },
]

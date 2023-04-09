interface AssignmentProps {
  id: number
  creationDate: Date
  description: string
  deadline: Date
  inCharge: string
  solutionId: number
  status: string
  additionalInfo?: {
    [key: string]: {
      label: string
      value: any
    }
  }
}

export const assignmentsTableMock: AssignmentProps[] = [
  {
    id: 0,
    creationDate: new Date(),
    description:
      "First ipsum dolor sit amet, consectetur adipisicing elit. Veniam, exercitationem.",
    deadline: new Date(),
    inCharge: "Аркадий Аркадьевич Аркадьев",
    solutionId: 1,
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
    solutionId: 2,
    status: "В работе",
  },
  {
    id: 2,
    creationDate: new Date(),
    description:
      "Third ipsum dolor sit amet, consectetur adipisicing elit. Veniam, exercitationem.",
    deadline: new Date(),
    inCharge: "Аркадий Аркадьевич Аркадьев",
    solutionId: 1,
    status: "Начат",
  },
  {
    id: 3,
    creationDate: new Date(),
    description:
      "First ipsum dolor sit amet, consectetur adipisicing elit. Veniam, exercitationem.",
    deadline: new Date(),
    inCharge: "Аркадий Аркадьевич Аркадьев",
    solutionId: 1,
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
    solutionId: 3,
    status: "Завершен",
  },
  {
    id: 5,
    creationDate: new Date(),
    description:
      "Third ipsum dolor sit amet, consectetur adipisicing elit. Veniam, exercitationem.",
    deadline: new Date(),
    inCharge: "Аркадий Аркадьевич Аркадьев",
    solutionId: 2,
    status: "Начат",
  },
  {
    id: 6,
    creationDate: new Date(),
    description:
      "First ipsum dolor sit amet, consectetur adipisicing elit. Veniam, exercitationem.",
    deadline: new Date(),
    inCharge: "Аркадий Аркадьевич Аркадьев",
    solutionId: 3,
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
    solutionId: 2,
    status: "В работе",
  },
  {
    id: 8,
    creationDate: new Date(),
    description:
      "Third ipsum dolor sit amet, consectetur adipisicing elit. Veniam, exercitationem.",
    deadline: new Date(),
    inCharge: "Аркадий Аркадьевич Аркадьев",
    solutionId: 1,
    status: "Начат",
  },
]

interface ISolutions {
  creationDate: Date
  description: string
  deadline: Date
  inCharge: string
  protocol: string
}

export const SolutionsMock: ISolutions[] = [
  {
    creationDate: new Date(),
    description:
      "First ipsum dolor sit amet, consectetur adipisicing elit. Veniam, exercitationem.",
    deadline: new Date(),
    inCharge: "Аркадий Аркадьевич Аркадьев",
    protocol: "protocol",
  },
  {
    creationDate: new Date(),
    description:
      "Second ipsum dolor sit amet, consectetur adipisicing elit. Veniam, exercitationem.",
    deadline: new Date(),
    inCharge: "Аркадий Аркадьевич Аркадьев",
    protocol: "protocol",
  },
  {
    creationDate: new Date(),
    description:
      "Third ipsum dolor sit amet, consectetur adipisicing elit. Veniam, exercitationem.",
    deadline: new Date(),
    inCharge: "Аркадий Аркадьевич Аркадьев",
    protocol: "protocol",
  },
]

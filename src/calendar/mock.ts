import dayjs from "dayjs"
import { EventsProps } from "./types"

export const eventsMock: EventsProps = [
  {
    name: "Привезли цемент",
    avatar:
      "https://www.nzherald.co.nz/resizer/gqSffRvTC-to97K2uhI3xXRfupw=/576x613/smart/filters:quality(70)/cloudfront-ap-southeast-2.images.arcpublishing.com/nzme/3YWLMALNWFAKJD6C7ILGH7GZ3E.jpg",
    date: dayjs().toDate(),
    entityId: 1,
  },
  {
    name: "Увезли цемент",
    avatar: "https://cataas.com/cat",
    date: dayjs().add(1, "day").toDate(),
    entityId: 1,
  },
  {
    name: "Пропал дом",
    avatar: "https://cataas.com/cat",
    date: dayjs().add(2, "day").toDate(),
    entityId: 2,
  },
  {
    name: "Нашелся дом",
    avatar: "https://cataas.com/cat",
    date: dayjs().add(3, "day").toDate(),
    entityId: 2,
  },
  {
    name: "Самострой",
    avatar: "https://cataas.com/cat",
    date: dayjs().add(5, "day").toDate(),
    entityId: 3,
  },
]

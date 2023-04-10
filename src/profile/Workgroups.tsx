import { Stack } from "@mantine/core"
import WorkGroup from "./WorkGroup"
import { useSession } from "@blitzjs/auth"
import { useQuery } from "@blitzjs/rpc"
import getWorkgroups from "src/workgroups/queries/getWorkgroups"
import { User, Workgroup, WorkgroupParticipation } from "@prisma/client"

export interface ExtendedWorkgroup extends Workgroup {
  participations: (WorkgroupParticipation & {
    user: User
  })[]
}

const Workgroups = () => {
  const session = useSession()

  const [workgroups] = useQuery(getWorkgroups, {
    include: {
      participations: {
        include: {
          user: true,
        },
      },
    },
  })

  return (
    <Stack>
      {workgroups?.map((workgroup) => (
        <WorkGroup workgroup={workgroup as ExtendedWorkgroup} key={workgroup.id} />
      ))}
    </Stack>
  )
}

export default Workgroups

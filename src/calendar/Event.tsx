import { Group, Avatar, Stack, Text, ActionIcon } from "@mantine/core"
import { IconCalendar, IconSettings } from "@tabler/icons-react"

const Event = () => {
  return (
    <Group
      position="apart"
      pb="sm"
      sx={(theme) => ({ borderBottom: `1px solid ${theme.colors.gray[1]}` })}
    >
      <Group align="flex-start">
        <Avatar
          size={64}
          alt=""
          src="https://www.nzherald.co.nz/resizer/gqSffRvTC-to97K2uhI3xXRfupw=/576x613/smart/filters:quality(70)/cloudfront-ap-southeast-2.images.arcpublishing.com/nzme/3YWLMALNWFAKJD6C7ILGH7GZ3E.jpg"
        />
        <Stack>
          <Text weight="bold">Leslie Alexander</Text>
          <Group spacing="xs">
            <Text size="sm" color="dimmed">
              <Group spacing="xs">
                <IconCalendar size={20} />
                January 10th, 2022 at 5:00 PM
              </Group>
            </Text>
          </Group>
        </Stack>
      </Group>
      <ActionIcon color="gray" variant="transparent">
        <IconSettings />
      </ActionIcon>
    </Group>
  )
}

export default Event

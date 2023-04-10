import { Switch } from "@legendapp/state/react"
import { AttributeFormProps } from "./Attribute"
import {
  FileInput,
  TextInput,
  Switch as MantineSwitch,
  useMantineTheme,
  Group,
  Checkbox,
  Stack,
  Radio,
} from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { IconFile } from "@tabler/icons-react"

interface AttributeDefaultValueProps {
  type: AttributeFormProps["type"]
  value: any
  data: null | AttributeFormProps["data"]
  onChange: (value: any) => void
}

const LABEL = "Значение по умолчанию"
const PLACEHOLDER = "Введите значение по умолчанию"

const AttributeDefaultValue = ({ type, value, data, onChange }: AttributeDefaultValueProps) => {
  const theme = useMantineTheme()
  return (
    <Switch value={type}>
      {{
        text: () => (
          <TextInput
            size="xs"
            label={LABEL}
            placeholder={PLACEHOLDER}
            value={value[0]}
            onChange={(e) => onChange([e.currentTarget.value])}
          />
        ),
        checkbox: () => (
          <Checkbox.Group value={value} onChange={onChange} size="xs" label={LABEL}>
            <Group spacing="lg" pt={4}>
              {data?.map((checkbox, i) => (
                <Checkbox key={i} value={checkbox} label={checkbox} />
              ))}
            </Group>
          </Checkbox.Group>
        ),
        radio: () => (
          <Radio.Group value={value} onChange={onChange} size="xs" label={LABEL}>
            <Group spacing="lg" pt={4}>
              {data?.map((radio, i) => (
                <Radio key={i} value={radio} label={radio} />
              ))}
            </Group>
          </Radio.Group>
        ),
        switch: () => (
          <MantineSwitch
            size="xs"
            label={LABEL}
            labelPosition="left"
            value={value}
            onChange={onChange}
          />
        ),
        file: () => (
          <FileInput
            size="xs"
            label={LABEL}
            placeholder="Добавить файл"
            value={value}
            onChange={onChange}
            rightSection={<IconFile size={20} color={theme.colors.gray[5]} />}
          />
        ),
        date: () => (
          <DatePickerInput
            size="xs"
            label={LABEL}
            placeholder={PLACEHOLDER}
            value={value?.toISOString ? value : undefined}
            onChange={onChange}
            popoverProps={{ withinPortal: true }}
          />
        ),
        default: () => <></>,
      }}
    </Switch>
  )
}

export default AttributeDefaultValue

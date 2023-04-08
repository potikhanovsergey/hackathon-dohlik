import {
  createStyles,
  Group,
  Text,
  Button,
  Paper,
  Select,
  SelectProps,
  Stack,
  TextInput,
  Checkbox,
  ActionIcon,
} from "@mantine/core"
import {
  IconArrowDown,
  IconArrowUp,
  IconCopy,
  IconEyeOff,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react"
import AttributeControls from "./AttributeControls"
import { useForm } from "@mantine/form"
import AttributeDefaultValue from "./AttributeDefaultValue"
import { useEffect } from "react"

const useStyles = createStyles((theme) => ({}))

export interface AttributeProps {
  isFirst: boolean
  isLast: boolean
  index: number
}

const attributeTypes: SelectProps["data"] = [
  {
    label: "Текст",
    value: "text",
  },
  {
    label: "Флажки (чекбоксы, галочки)",
    value: "checkbox",
  },
  {
    label: "Радио-кнопки",
    value: "radio",
  },
  {
    label: "Переключатель",
    value: "switch",
  },
  {
    label: "Документ/файл",
    value: "file",
  },
  {
    label: "Дата",
    value: "date",
  },
]

const typesWithPlaceholder = ["text", "date"]

export interface AttributeFormProps {
  type: "text" | "checkbox" | "radio" | "switch" | "file" | "date" | null
  name: string
  placeholder: string
  defaultValue: any
  autoFill: boolean
  data: null | { value: string; label: string }[]
}

const Attribute = ({ isFirst, isLast, index }: AttributeProps) => {
  const form = useForm<AttributeFormProps>({
    initialValues: {
      type: null,
      name: "",
      placeholder: "",
      defaultValue: undefined,
      data: null,
      autoFill: false,
    },
  })

  useEffect(() => {
    switch (form.values.type) {
      case "radio":
      case "checkbox":
        form.setFieldValue("data", [{ label: "Значение 1", value: new Date().getTime() + "" }])
        break
      default:
        form.setFieldValue("data", null)
    }
    form.setFieldValue("defaultValue", undefined)
  }, [form.values.type])

  const addValue = () => {
    const data = form.values.data
    const newItem = {
      value: new Date().getTime() + "",
      label: `Значение ${data ? data.length + 1 : 1}`,
    }
    form.setFieldValue("data", data ? [...data, newItem] : [newItem])
  }

  const deleteValue = (index: number) => {
    const data = form.values.data
    if (data) {
      data.splice(index, 1)
      form.setFieldValue("data", data)
    }
  }

  return (
    <Paper withBorder>
      <Group position="apart" mb="md">
        <Text>Свойство {index + 1}</Text>
        <AttributeControls isFirst={isFirst} isLast={isLast} />
      </Group>
      <Stack maw="50%">
        <Select
          size="xs"
          label="Тип свойства"
          required
          data={attributeTypes}
          {...form.getInputProps("type")}
        />
        <TextInput
          size="xs"
          label="Название"
          placeholder="Название аттрибута"
          required
          {...form.getInputProps("name")}
        />
        {(form.values.type === "checkbox" || form.values.type === "radio") && (
          <div>
            <Text size="xs" color="gray.9" mb={4}>
              Значения{" "}
              <Text span inherit color="red">
                *
              </Text>
            </Text>
            <Stack mb="xs">
              {form.values.data &&
                form.values.data.map((item, i) => (
                  <Group key={item.value} spacing="xs" w="100%">
                    <TextInput
                      miw={300}
                      maxLength={20}
                      size="xs"
                      {...form.getInputProps(`data.${i}.label`)}
                    />
                    <ActionIcon
                      onClick={() => deleteValue(i)}
                      variant="transparent"
                      color="red"
                      size="sm"
                    >
                      <IconTrash />
                    </ActionIcon>
                  </Group>
                ))}
            </Stack>
            <Button
              disabled={Boolean(form.values.data && form.values.data.length >= 6)}
              compact
              variant="outline"
              rightIcon={<IconPlus size={16} />}
              onClick={addValue}
            >
              Добавить значение
            </Button>
          </div>
        )}
        {form.values.type && typesWithPlaceholder.includes(form.values.type) && (
          <TextInput
            size="xs"
            label="Подсказка поля (плэйсхолдер)"
            placeholder="Введите подсказку поля"
            {...form.getInputProps("placeholder")}
          />
        )}
        <AttributeDefaultValue
          {...form.getInputProps("defaultValue")}
          data={form.values.data}
          type={form.values.type}
        />

        <div>
          <Text size="xs" color="gray.9" mb={4}>
            Автозаполнение
          </Text>
          <Checkbox
            size="xs"
            label="Заполнить это свойство в существующих объектах значением по умолчанию, если это свойство не заполнено"
          />
        </div>
      </Stack>

      <Group mt="xl" position="right">
        <Button>Сохранить аттрибут</Button>
      </Group>
    </Paper>
  )
}

export default Attribute

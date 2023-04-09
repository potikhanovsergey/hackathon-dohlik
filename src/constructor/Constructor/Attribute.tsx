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
  Box,
} from "@mantine/core"
import { IconPlus, IconTrash } from "@tabler/icons-react"
import AttributeControls from "./AttributeControls"
import { useForm } from "@mantine/form"
import AttributeDefaultValue from "./AttributeDefaultValue"
import { useEffect } from "react"
import { useMutation } from "@blitzjs/rpc"
import upsertAttribute from "src/attributes/mutations/upsertAttribute"
import { ConstructorAttribute } from "."

export interface AttributeProps {
  index: number
  attribute: ConstructorAttribute
  onDelete: () => void
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
  type: ConstructorAttribute["attributeType"] | null
  name: ConstructorAttribute["name"]
  placeholder: ConstructorAttribute["placeholder"]
  defaultValue: ConstructorAttribute["defaultValue"]
  autoFill: ConstructorAttribute["autoFill"]
  data: ConstructorAttribute["data"]
}

const Attribute = ({ index, attribute, onDelete }: AttributeProps) => {
  const form = useForm<AttributeFormProps>({
    initialValues: {
      type: attribute.attributeType,
      name: attribute.name,
      placeholder: attribute.placeholder || "",
      defaultValue: attribute.defaultValue || "",
      data: attribute.data,
      autoFill: attribute.autoFill,
    },
  })

  useEffect(() => {
    switch (form.values.type) {
      case "radio":
      case "checkbox":
        form.setFieldValue("data", ["Значение 1"])
        break
      default:
        form.setFieldValue("data", [])
    }
    form.setFieldValue("defaultValue", [""])
  }, [form.values.type])

  const addValue = () => {
    const data = form.values.data
    const newItem = `Значение ${data ? data.length + 1 : 1}`
    form.setFieldValue("data", data ? [...data, newItem] : [newItem])
  }

  const deleteValue = (index: number) => {
    const data = form.values.data
    if (data) {
      data.splice(index, 1)
      form.setFieldValue("data", data)
    }
  }
  const [upsertAttributeMutation, { isLoading: isCreatingAttribute }] = useMutation(upsertAttribute)

  const onFormSubmit = form.onSubmit(async (values) => {
    const data = {
      attributeType: values.type!,
      autoFill: values.autoFill,
      defaultValue: values.defaultValue[0]?.length > 0 ? values.defaultValue : [],
      name: values.name,
      placeholder: values.placeholder,
      parent: "entity" as "entity",
    }
    await upsertAttributeMutation({
      where: {
        id: attribute.id || Math.floor(Math.random() * 10000),
      },
      update: data,
      create: data,
    })
  })

  return (
    <Box component="form" onSubmit={onFormSubmit}>
      <Paper withBorder>
        <Group position="apart" mb="md">
          <Text>Свойство {attribute.id || index + 1}</Text>
          <AttributeControls onDelete={onDelete} />
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
                    <Group key={i} spacing="xs" w="100%">
                      <TextInput
                        miw={300}
                        maxLength={20}
                        size="xs"
                        {...form.getInputProps(`data.${i}`)}
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
              {...form.getInputProps("autoFill")}
              size="xs"
              label="Заполнить это свойство в существующих объектах значением по умолчанию, если это свойство не заполнено"
            />
          </div>
        </Stack>

        <Group mt="xl" position="right">
          <Button loading={isCreatingAttribute} type="submit">
            Сохранить аттрибут
          </Button>
        </Group>
      </Paper>
    </Box>
  )
}

export default Attribute

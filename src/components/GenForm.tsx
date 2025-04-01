import {
  Input,
  Radio,
  Checkbox,
  Select,
  DatePicker,
  Cascader,
  Rate,
  Upload,
  TimePicker,
  Switch,
  InputNumber,
  Tabs,
  Row,
  Col,
  Form,
  ColProps,
  RowProps
} from 'antd'
import { FormItemProps, Rule } from 'antd/es/form'
import { NamePath } from 'antd/es/form/interface'

const { TextArea, Password } = Input
const { Group: RadioGroup } = Radio
const { Group: CheckboxGroup } = Checkbox

export const Components = {
  Select,
  Checkbox,
  DatePicker,
  Cascader,
  Rate,
  Upload,
  TimePicker,
  Input,
  Switch,
  TextArea,
  InputNumber,
  Password,
  RadioGroup,
  CheckboxGroup,
  Tabs
} as const

// Slot是自定义组件类型
export type ComponentType = keyof typeof Components | 'Slot'

// 单个field属性
export interface IFormItemProps<T> {
  /**所使用组件类型 */
  type: ComponentType
  /**字段key */
  field: NamePath
  /**名称 */
  label?: React.ReactNode
  /**必填样式 */
  required?: boolean
  /**子节点值的属性。如 Switch 的是'checked' */
  valuePropName?: string
  /**校验规则 */
  rules?: Rule[]
  /**Col字段span */
  span?: number
  /** 单个item的col属性*/
  colProps?: ColProps
  /**是否隐藏 */
  isHidden?: boolean
  /**Form.Item 属性 */
  formItem?: FormItemProps<T>
  /**自定义组件 type = 'Solt' 可用 */
  getComponent?: (props: IFormItemProps<T>) => React.ReactNode
  shouldUpdate?: boolean | ((prevValues: any, nextValues: any, info: { source?: string }) => boolean)
  [key: string]: any
}

export interface IGenFormProps<T> {
  /**配置数据 */
  data: IFormItemProps<T>[]
  /**整个表单的Row布局 */
  rowProps?: RowProps
  /**Row 的style */
  style?: React.CSSProperties
}

export default function GenForm<T>({ data, rowProps, style }: IGenFormProps<T>) {
  return (
    <Row {...rowProps} style={style}>
      {data?.map(item => {
        const {
          type,
          span,
          colProps,
          isHidden,
          field,
          label,
          rules,
          required = false,
          getComponent,
          valuePropName = 'value',
          formItem,
          shouldUpdate,
          ...restProps
        } = item
        if (isHidden) {
          return null
        }
        const Comp = (Components as { [key: string]: React.ComponentType<any> })[type]

        const FormItemCom = (
          <Form.Item
            label={label}
            name={field}
            required={required}
            valuePropName={valuePropName}
            rules={rules}
            {...formItem}
          >
            {type === 'Slot' ? getComponent?.(item) : <Comp {...restProps} />}
          </Form.Item>
        )
        return (
          <Col key={Array.isArray(field) ? field.join('.') : field} span={span || colProps?.span} {...colProps}>
            {shouldUpdate ? (
              <Form.Item noStyle={true} shouldUpdate={shouldUpdate}>
                {FormItemCom}
              </Form.Item>
            ) : (
              FormItemCom
            )}
          </Col>
        )
      })}
    </Row>
  )
}

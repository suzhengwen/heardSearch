import React, { useState, useEffect, memo, CSSProperties } from "react";
import {
  PlusOutlined,
  MinusCircleOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Select,
  Input,
  message,
  Divider,
  Space,
  DatePicker,
  Checkbox,
  Form,
  Rate,
  InputNumber,
  Switch,
  Col,
  Row,
  Button,
  Radio,
  TreeSelect,
  Card,
  Table,
} from "antd";
import moment from "moment";
import { FormInstance, FormItemProps } from "antd/lib/form";
import * as Interfaces from "./param.types";
import * as components_ly from "./components/liyu";
import * as components_szw from "./components/szw";
import * as components_lq from "./components/lq";
import styles from "./style.less";
const { RangePicker } = DatePicker;
const { TreeNode } = TreeSelect;


/**
 * @enum {number}
 * @desc 支持的查询参数类型, 需要添加组件， 请在queryParamType添加字段枚举, 然后在itemMap添加对应组件
 */

export enum QueryParamType {
  "checkButton",
  "checkButton_between",
  "radio",
  "radioButton",
  "radioButton_between",
  "date",
  "select",
  "input",
  "treeSelect",
  "skuSearchBar",
  "button",
  "between",
  "minMaxIpt",
  "placeHolder",
  "cascaderSelect",
  "SaleTimePicker",
  "treeSelectasync",
  "datePickerForm",
  "fromList",
  "switch",
  "rate",
  "checkbox",
  "iptSelect",
  "textArea",
  "btnTimeIpt",
  "btnTable",
  "btnTableEdit",
  "upload",
  "selectList",
}

//遵循 组件之间绝对互不影响 思想，  不要在其中组件互相嵌套使用， 需要使用时重新复制一份
export const itemMap: { [key: number]: React.FC<any> } = {
  [QueryParamType.checkButton]: components_ly.CheckButton,
  [QueryParamType.checkButton_between]: components_ly.CheckButton_between,
  [QueryParamType.radio]: (props: Interfaces.InnerQueryListItemProps) => {
    const {
      titleKey,
      valueKey,
      itemList,
      name,
      form,
      customProps,
      itemStyle,
      rules,
      defaultValue,
    } = props;
    return (
      <>
        <Form.Item
          name={name}
          style={{ marginBottom: 1 }}
          initialValue={defaultValue}
          rules={rules}
        >
          <Radio.Group buttonStyle="solid">
            {itemList &&
              itemList?.map((item: any, index: number) => (
                <Radio className="mr10" key={index} value={item[valueKey]}>
                  {item[titleKey]}
                </Radio>
              ))}
          </Radio.Group>
        </Form.Item>
        {customProps?.suffix && (
          <div className={styles.suffix}>{customProps?.suffix}</div>
        )}
      </>
    );
  },
  [QueryParamType.radioButton]: (props: Interfaces.InnerQueryListItemProps) => {
    const {
      form,
      titleKey,
      valueKey,
      itemList,
      defaultValue,
      name,
      customProps,
      rules,
      itemStyle,
      onChange,
    } = props;
    // // // console.log('执行几次')
    useEffect(() => {
      onChange && onChange(form);
    }, [defaultValue]);
    return (
      <>
        <Form.Item
          noStyle
          rules={rules}
          name={name}
          style={{ marginBottom: 1 }}
          initialValue={defaultValue ? defaultValue : ""}
        >
          <Radio.Group
            buttonStyle="solid"
            size={customProps?.size || "small"}
          // onChange={(e) => onChange?.(e, form)}
          >
            {itemList &&
              itemList?.map((item: any, index: number) => (
                <Radio.Button
                  className={
                    customProps?.size
                      ? styles.radioButton_small
                      : styles.radioButton_nomal
                  } // size 为small时 选择后面
                  key={index}
                  value={item[valueKey]}
                >
                  {item[titleKey]}
                </Radio.Button>
              ))}
          </Radio.Group>
        </Form.Item>
      </>
    );
  },
  [QueryParamType.radioButton_between]: (
    props: Interfaces.InnerQueryListItemProps
  ) => {
    const {
      form,
      titleKey,
      valueKey,
      itemList,
      defaultValue,
      name,
      customProps,
      rules,
      itemStyle,
    } = props;
    return (
      <>
        <Form.Item
          noStyle
          name={name}
          rules={rules}
          style={{ marginBottom: 1 }}
          initialValue={defaultValue ? defaultValue : ""}
        >
          <Radio.Group
            buttonStyle="solid"
            size={customProps?.size || "small"}
            onChange={() => {
              form.setFieldsValue({
                // 单选后清除后面的时间和input
                [name + "_minIpt"]: "",
                [name + "_maxIpt"]: "",
                [name + "_Time"]: "",
              });
            }}
          >
            {itemList &&
              itemList?.map((item: any, index: number) => (
                <Radio.Button
                  style={itemStyle}
                  className={
                    customProps?.size
                      ? styles.radioButton_small
                      : styles.radioButton_nomal
                  } // size 为small时 选择后面
                  key={index}
                  value={item[valueKey]}
                >
                  {item[titleKey]}
                </Radio.Button>
              ))}
          </Radio.Group>
        </Form.Item>
        {customProps?.rdoBtnType == "ipt" && (
          <>
            <Form.Item noStyle name={name + "_minIpt"}>
              <Input
                size={customProps?.size || "small"}
                placeholder="最小"
                style={{ width: "80px", ...itemStyle }}
                className={customProps?.classNames || "mr10"}
                type="number"
                min={0}
                onBlur={(e: any) => {
                  let last = form.getFieldValue(name + "_maxIpt");
                  if ((!last && last !== 0) || e.target.value === "") return;
                  if (e.target.value - 0 > last) {
                    message.error("该数据应小于最大值!");
                    form.setFieldsValue({
                      [name + "_maxIpt"]: "",
                    });
                  }
                  form.setFieldsValue({
                    [`${name}`]: "",
                  });
                }}
              />
            </Form.Item>
            <span className="mr10"> - </span>
            <Form.Item noStyle name={name + "_maxIpt"}>
              <Input
                size={customProps?.size || "small"}
                placeholder="最大"
                style={{ width: "80px", ...itemStyle }}
                type="number"
                min={0}
                onBlur={(e: any) => {
                  let before = form.getFieldValue(name + "_minIpt");
                  if ((!before && before !== 0) || e.target.value === "")
                    return;
                  if (e.target.value - 0 < before) {
                    message.error("该数据应大于最小值!");
                    form.setFieldsValue({
                      [name + "_minIpt"]: "",
                    });
                  }
                  form?.setFieldsValue({
                    [`${name}`]: "",
                  });
                }}
              />
            </Form.Item>
          </>
        )}
        {customProps?.rdoBtnType == "time" && (
          <Form.Item noStyle name={name + "_Time"} initialValue={""}>
            <RangePicker
              size={customProps?.size || "small"}
              style={{ width: 240 }}
              onChange={(e: any, dateString: any) => {
                form.setFieldsValue({
                  [`${name}`]: "",
                });
              }}
            />
          </Form.Item>
        )}
      </>
    );
  },
  [QueryParamType.date]: (props: Interfaces.dateExendsPrps) => {
    const {
      form,
      defaultValue,
      itemStyle,
      name,
      customProps,
      disabledDate,
      rules,
      onChange,
    } = props;
    return (
      <Form.Item
        noStyle
        name={name}
        initialValue={defaultValue ? defaultValue : ""}
        rules={rules}
      >
        <DatePicker
          placeholder={customProps?.placeholder}
          onChange={(value) => onChange?.(value, form)}
          size={customProps?.size || "middle"}
          style={{ width: "220px", ...itemStyle }}
          picker={customProps?.picker}
        />
      </Form.Item>
    );
  },
  [QueryParamType.switch]: (props: Interfaces.switchExendsPrps) => {
    const {
      form,
      defaultValue,
      itemStyle,
      name,
      customProps,
      rules,
      onChange,
    } = props;
    // console.log(defaultValue, "");
    return (
      <>
        <Form.Item
          noStyle
          name={name}
          initialValue={defaultValue ? defaultValue : null}
          valuePropName="checked"
          rules={rules}
        >
          <Switch
            // onChange={(value) => onChange?.(value, form)}
            disabled={customProps?.disabled}
            size={customProps?.size || "default"}
            style={{ ...itemStyle }}
          />
        </Form.Item>
        {customProps?.suffix && (
          <div className={styles.suffix}>{customProps?.suffix}</div>
        )}
      </>
    );
  },
  [QueryParamType.rate]: (props: Interfaces.rateExendsPrps) => {
    const {
      form,
      defaultValue,
      itemStyle,
      name,
      customProps,
      rules,
      onChange,
    } = props;
    return (
      <Form.Item
        noStyle
        name={name}
        initialValue={defaultValue ? defaultValue : ""}
        rules={rules}
      >
        <Rate
          className={customProps?.className}
          tooltips={customProps?.tooltips}
          count={customProps?.count}
          allowHalf={customProps?.allowHalf || true}
          onChange={(value) => onChange?.(value, form)}
          disabled={customProps?.disabled || false}
          character={customProps?.character}
          style={{ ...itemStyle }}
        />
      </Form.Item>
    );
  },
  [QueryParamType.fromList]: (props: Interfaces.fromLisExendsPrps) => {
    const {
      form,
      defaultValue,
      itemStyle,
      name,
      customProps,
      rules,
      children,
      onChange,
    } = props;
    return (
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Space
                key={field.key}
                size="small"
                style={{ display: "flex", marginBottom: 0 }}
                align="baseline"
              >
                {children?.map((child: any, index: number) => (
                  <Form.Item
                    initialValue={child[child.initialValueKey]}
                    label={child.label ? child.label : ""}
                    {...field}
                    name={[field.name, child.name]}
                    fieldKey={[field.fieldKey, child.name]}
                    rules={child.rules}
                  >
                    <Input
                      type={child.type ? child.type : ""}
                      placeholder={child.placeholder}
                    />
                  </Form.Item>
                ))}

                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    );
  },

  [QueryParamType.select]: (props: Interfaces.InnerQueryListItemProps) => {
    const {
      form,
      titleKey,
      valueKey,
      itemList,
      defaultValue,
      itemStyle,
      name,
      rules,
      customProps,
      onChange,
    } = props; // isSelf 判断是否是自身为value

    return (
      <>
        <Form.Item
          noStyle
          name={name}
          initialValue={defaultValue ? defaultValue : ""}
        >
          <Select
            size={customProps?.size || "middle"}
            showSearch
            // allowClear
            placeholder={customProps?.placeholder || "请选择"}
            style={{ width: "220px", ...itemStyle }}
            onSelect={(v) => onChange?.(v, form)}
            filterOption={(input, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {itemList &&
              itemList?.map((item: any, idx: any) => {
                return (
                  <Select.Option
                    key={idx}
                    value={customProps?.isSelf ? item : item[valueKey]}
                  >
                    {customProps?.isSelf ? item : item[titleKey]}
                  </Select.Option>
                );
              })}
          </Select>
        </Form.Item>
        {customProps?.suffix && (
          <div className={styles.suffix}>{customProps?.suffix}</div>
        )}
      </>
    );
  },
  [QueryParamType.treeSelect]: (props: Interfaces.InnerQueryListItemProps) => {
    const {
      form,
      titleKey,
      valueKey,
      itemList,
      defaultValue,
      name,
      itemStyle,
      customProps,
    } = props; // isSelf 判断是否是自身为value
    return (
      <Form.Item
        noStyle
        name={name}
        initialValue={defaultValue ? defaultValue : ""}
      >
        <TreeSelect
          showSearch
          size={customProps?.size || "small"}
          style={{ width: "80%", ...itemStyle }}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder={customProps?.placeholder || ""}
          allowClear
        >
          <TreeNode value={""} title={"请选择"}></TreeNode>
          {itemList &&
            itemList?.map((item: any, index: any) => {
              return (
                <TreeNode
                  value={item[valueKey]}
                  title={item[titleKey]}
                  key={item[valueKey]}
                >
                  {item.children &&
                    item.children?.map((child: any, childIdx: any) => {
                      return (
                        <TreeNode
                          style={{ marginLeft: "16px" }}
                          value={child[valueKey]}
                          title={child[titleKey]}
                          key={child[valueKey] ? child[valueKey] : childIdx}
                        />
                      );
                    })}
                </TreeNode>
              );
            })}
        </TreeSelect>
      </Form.Item>
    );
  },
  [QueryParamType.checkbox]: (props: Interfaces.InnerQueryListItemProps) => {
    const {
      form,
      titleKey,
      valueKey,
      itemList,
      defaultValue,
      name,
      itemStyle,
      customProps,
    } = props;

    const [allchecked, setAllchecked] = useState<boolean>(false);

    return (
      <div>
        <Checkbox
          checked={allchecked}
          onChange={(e) => {
            setAllchecked(e.target.checked);
            let oldlist = itemList?.map((x) => x[valueKey]);
            if (e.target.checked) {
              form.setFieldsValue({ [name]: oldlist });
            } else {
              form.setFieldsValue({ [name]: [] });
            }
          }}
        >
          全选
        </Checkbox>
        <Form.Item
          noStyle
          name={name}
          initialValue={defaultValue ? defaultValue : ""}
        >
          <Checkbox.Group
            // size={customProps?.size || "small"}
            style={{ width: "80%", ...itemStyle }}
            // dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            // placeholder={customProps?.placeholder || ""}
            // allowClear
            onChange={(e) => {
              let oldlist = itemList?.map((x) => x[valueKey]);
              oldlist.length == e.length
                ? setAllchecked(true)
                : setAllchecked(false);
            }}
          >
            {itemList &&
              itemList?.map((item: any, index: any) => {
                return (
                  <Checkbox value={item[valueKey]} key={item[valueKey]}>
                    {item[valueKey]}
                  </Checkbox>
                );
              })}
          </Checkbox.Group>
        </Form.Item>
      </div>
    );
  },
  [QueryParamType.input]: components_lq.input,

  [QueryParamType.button]: (props: Interfaces.InnerQueryFormItemProps) => {
    const { form, customProps, itemStyle } = props;
    return (
      <Button
        {...customProps}
        style={{ ...itemStyle }}
        onClick={() => {
          customProps?.onClick(form);
        }}
      >
        {customProps?.text}
      </Button>
    );
  },
  [QueryParamType.between]: components_ly.Between,
  [QueryParamType.minMaxIpt]: (props: Interfaces.QueryFormItemProps) => {
    const { form, name, defaultValue, customProps, itemStyle } = props;
    return (
      <>
        <Form.Item noStyle name={name}>
          <span></span>
        </Form.Item>
        <>
          <Form.Item noStyle name={name + "_minIpt"}>
            <Input
              size={customProps?.size || "small"}
              placeholder="最小"
              style={{ width: "80px", ...itemStyle }}
              className={customProps?.classNames || "mr10"}
              onBlur={(e: any) => {
                let last = form.getFieldValue(name + "_maxIpt") - 0;
                if (!last || !e.target.value) return;
                if (e.target.value - 0 > last) {
                  message.error("该数据应小于最大值!");
                  form.setFieldsValue({
                    [name + "_maxIpt"]: "",
                  });
                }
                form.setFieldsValue({
                  [`${name}`]: "",
                });
              }}
            />
          </Form.Item>
          <span className="mr10"> - </span>
          <Form.Item noStyle name={name + "_maxIpt"}>
            <Input
              size={customProps?.size || "small"}
              placeholder="最大"
              style={{ width: "80px", ...itemStyle }}
              onBlur={(e: any) => {
                let before = form.getFieldValue(name + "_minIpt") - 0;
                if (!before || !e.target.value) return;
                if (e.target.value - 0 < before) {
                  message.error("该数据应大于最小值!");
                  form.setFieldsValue({
                    [name + "_minIpt"]: "",
                  });
                }
                form?.setFieldsValue({
                  [`${name}`]: "",
                });
              }}
            />
          </Form.Item>
        </>
      </>
    );
  },
  [QueryParamType.cascaderSelect]: components_szw.cascaderSelect,
  [QueryParamType.placeHolder]: components_ly.PlaceHolder,
  [QueryParamType.datePickerForm]: components_szw.DatePickerForm,
  [QueryParamType.iptSelect]: components_szw.iptSelect,
  [QueryParamType.textArea]: components_szw.textArea,
  [QueryParamType.btnTimeIpt]: components_szw.BtnTimeIpt,
  [QueryParamType.btnTable]: components_szw.BtnTable,
  [QueryParamType.btnTableEdit]: components_szw.BtnTableEdit,
  [QueryParamType.upload]: components_szw.upload,
  [QueryParamType.selectList]: components_szw.selectList,
};

/**
 * @desc 查询项属性
 */
export interface QueryParam {
  required?: boolean;
  label: string; //给Form.Item的label
  labelCol?: number | 0 | null; //label 的宽度（可自调了）
  ColStyle?: React.CSSProperties; //Col 的样式
  type: QueryParamType; //组件类型， 参考queryParamType
  span?: number; //所有组件被一个Row(gutter=24)包含， 每个组件都由一个Col包含， 这个span就是给Col的span
  rules?: [any]; //所有规则
  queryItemProps: any; //最终给组件的props,   类型为 BasicQueryItemProps或者BasicQueryItemProps的子接口
  onChange?: (value: any) => any; //组件值发送变化时调用, 暂未启用
}
/**
 * @desc QueryParamList的Props，  一个根据对象自动生成各 搜索栏筛选条件组件 的封装组件,
 * 如果需要添加新的筛选组件， 需要在components.tsx中的QueryParamType添加组件类型说明， 然后再components.tsx中的itemMap添加相应组件
 * @props
 *  queryParamList      组件对象, 包含需要的所有组件， key为name,   注意！！！queryParamList的key值确认后不能再改变！
 *  setSearchOpts       设置查询参数
 */
export interface QueryParamListProps {
  queryParamList: { [key: string]: QueryParam }; //搜索项列表
  setSearchOpts?: Function; //设置searchOpts(弃用)
  onSubmit?: Function; //点击查询时的回调
  onReset?: Function; //点击重置时的回调
  formRef?: { form?: FormInstance }; //父组件获取form实例的对象
  bodyStyle?: CSSProperties; //卡片的内联样式
  Toptitle?: string; // 左上角的标题
  isDivider?: true | false; //判断是否需要分割线
  onFinish?: (value: any) => void;
  onFinishFailed?: (value: any) => void;
  onCancel?: (form: FormInstance) => void;
  cancelBttext?: string;
  submitBttext?: string;
  initialValues?: any;
}
//
/**
 * 正确使用方式: 在toQuery的筛选项庞大时, onSubmit和onReset应memoized
 * 搜索筛选->
 * @author          szw, liyu
 */
const QueryParamList: React.FC<QueryParamListProps> = memo(
  (props: QueryParamListProps) => {
    const {
      queryParamList,
      setSearchOpts,
      bodyStyle,
      onSubmit,
      formRef,
      onReset,
      onFinish,
      onFinishFailed,
      onCancel,
      cancelBttext,
      submitBttext,
      Toptitle,
      isDivider,
    } = props;
    const [form] = Form.useForm();
    // useEffect(() => {
    //   formRef && (formRef.form = form);
    // }, [formRef]);
    return (
      <Card bordered={false} bodyStyle={{ ...bodyStyle }}>
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          name="basic"
          requiredMark={true}
        >
          <Row gutter={24} style={{ lineHeight: "37px", margin: 0 }}>
            {Object.keys(queryParamList)?.map((name: any, index: any) => {
              let item = queryParamList[name];
              return (
                <Col
                  hidden={item.span === 0}
                  span={item.span ? item.span : 24}
                  style={{ padding: "6px 0", ...item.ColStyle }} // 增加可调 样式
                  key={index}
                >
                  <Form.Item
                    labelCol={{
                      span:
                        item.labelCol ||
                        (item.label
                          ? item.span
                            ? (3 * 24) / item.span
                            : 3
                          : 0),
                    }}
                    wrapperCol={{
                      span: item.labelCol
                        ? 24 - item.labelCol
                        : item.span
                          ? 24 - (3 * 24) / item.span
                          : 18,
                    }}
                    style={{ marginBottom: 1 }}
                    label={item.label}
                    required={item.required || false} // 结合requiredMark 使用
                  >
                    {itemMap[item.type]({
                      ...item.queryItemProps,
                      form: form,
                      rules: item.rules || false,
                      name: name,
                    })}
                  </Form.Item>
                </Col>
              );
            })}
            <Col span={24}>
              {isDivider && <Divider style={{ margin: "0px 0px 14px 0px" }} />}
              <div
                style={{ overflow: "hidden" }}
                className={styles.button_style}
              >
                <Button
                  icon={cancelBttext ? null : <ReloadOutlined />}
                  className={styles.mr20}
                  onClick={() => {
                    if (onCancel && cancelBttext) {
                      onCancel(form);
                    } else {
                      if (cancelBttext && !onCancel) {
                        throw new Error(
                          "更改’cancelBttext‘文本内容需要传onCancel事件处理，如果你希望重置表单则cancelBttext与onCancel都不需要传"
                        );
                      }
                      if (onCancel) {
                        onCancel(form);
                      } else {
                        form.resetFields(
                          Object.keys(form.getFieldsValue()).filter(
                            (i) =>
                              !queryParamList[i] ||
                              !queryParamList[i].queryItemProps ||
                              !queryParamList[i].queryItemProps.noReset
                          )
                        );
                      }

                      onReset?.({});
                    }
                  }}
                >
                  {cancelBttext ? cancelBttext : "重置"}
                </Button>
                <Button
                  icon={submitBttext ? null : <SearchOutlined />}
                  onClick={async () => {
                    let formdata = await form.validateFields();
                    console.log(formdata, "formdata");
                    onSubmit?.(formDataConverte(formdata, queryParamList)); // all数据
                  }}
                  type="primary"
                >
                  {submitBttext ? submitBttext : "查询"}
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }
);

export default QueryParamList;

export const formDataConverte = (formdata: any, queryParamList: any) => {
  // console.log(formdata, "formdata");

  const toQuery: any = {};
  for (let item in formdata) {
    let itemValue = formdata[item]; // 每一项值
    if (
      queryParamList[item].type === QueryParamType.radioButton_between ||
      queryParamList[item].type === QueryParamType.checkButton_between
    ) {
      // 选择+最大最小/时间选择
      if (
        queryParamList[item].queryItemProps?.customProps?.itemListType === 2
      ) {
        // 类型为2(时间类型) 不需要切割
        if (formdata[`${item}_Time`]) {
          let list = formdata[`${item}_Time`];
          let format =
            queryParamList[item].queryItemProps?.customProps?.format ||
            "YYYY-MM-DD";
          toQuery[item] = `${moment(list[0]).format(format)} - ${moment(
            list[1]
          ).format(format)}`;
        } else {
          toQuery[item] = itemValue;
        }
        delete formdata[`${item}_Time`];
      } else {
        if (!formdata[`${item}_minIpt`] && !formdata[`${item}_maxIpt`]) {
          const vals = itemValue.split("-"); // 切割单选项
          toQuery[`${item}0`] = vals[0] ? vals[0] : "";
          toQuery[`${item}1`] = vals[1] ? vals[1] : "";
        } else {
          // toQuery[item] = formdata[`${item}_minIpt`] ? formdata[`${item}_minIpt`] : '0'
          toQuery[`${item}0`] = formdata[`${item}_minIpt`]
            ? formdata[`${item}_minIpt`]
            : "";
          toQuery[`${item}1`] = formdata[`${item}_maxIpt`]
            ? formdata[`${item}_maxIpt`]
            : "";
        }
        delete formdata[`${item}_minIpt`];
        delete formdata[`${item}_maxIpt`];
      }
      continue;
    }
    if (queryParamList[item].type === QueryParamType.minMaxIpt) {
      toQuery[`${item}0`] = formdata[`${item}_minIpt`]
        ? formdata[`${item}_minIpt`]
        : "";
      toQuery[`${item}1`] = formdata[`${item}_maxIpt`]
        ? formdata[`${item}_maxIpt`]
        : "";
      delete formdata[`${item}_minIpt`];
      delete formdata[`${item}_maxIpt`];
      continue;
    }
    if (queryParamList[item].type === QueryParamType.date) {
      if (!itemValue) {
        toQuery[item] = "";
      } else {
        let format =
          queryParamList[item].queryItemProps?.customProps?.format ||
          "YYYY-MM-DD";
        // // // console.log(toQuery[item]);
        toQuery[item] = `${moment(itemValue[0]).format(format)} - ${moment(
          itemValue[1]
        ).format(format)}`;
        // // // console.log(toQuery[item]);
      }
      continue;
    }
    if (queryParamList[item].type === QueryParamType.input) {
      formdata[item] = formdata[item]?.trim();
    }
    toQuery[item] = itemValue; // 剩下其他的
  }
  toQuery["current"] = 1;
  return toQuery;
};

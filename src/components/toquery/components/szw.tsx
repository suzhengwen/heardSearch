import React, { useState } from "react";
import {
  Form,
  Cascader,
  DatePicker,
  Input,
  Select,
  Radio,
  Space,
  Upload,
  Button,
} from "antd";
import * as Interfaces from "../param.types";
import locale from "antd/lib/locale/zh_CN";
import styles from "../style.less";
import { UploadOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
export const cascaderSelect = (props: Interfaces.InnerQueryListItemProps) => {
  const {
    name,
    defaultValue,
    customProps,
    titleKey,
    valueKey,
    childrenKey,
    itemList,
    itemStyle,
    onChange,
  } = props;
  return (
    <Form.Item
      noStyle
      name={name}
      initialValue={defaultValue ? defaultValue : ""}
    >
      <Cascader
        style={{ width: "80%", ...itemStyle }}
        options={itemList}
        // onChange={treeOnchange}
        changeOnSelect={customProps?.changeOnSelect}
        // showSearch={(iptValue: any, path: any) =>
        //   path.some(
        //     (option: any) =>
        //       option[titleKey].toLowerCase().indexOf(iptValue.toLowerCase()) >
        //       -1
        //   )
        // }
        getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
        fieldNames={{ label: titleKey, value: valueKey, children: childrenKey }}
        placeholder={customProps?.placeholder || ""}
      />
    </Form.Item>
  );
};

export const DatePickerForm = (props: Interfaces.InnerQueryListItemProps) => {
  const {
    name,
    defaultValue,
    customProps,
    titleKey,
    valueKey,
    childrenKey,
    itemList,
    form,
    itemStyle,
    onChange,
  } = props;
  return (
    <Form.Item
      noStyle
      name={name}
      initialValue={defaultValue ? defaultValue : ""}
    >
      <RangePicker
        onChange={(value) => onChange?.(value, form)}
        disabled={customProps?.disabled}
        disabledDate={customProps?.disabledDate}
        size={customProps?.size || "small"}
        style={{ width: "220px", ...itemStyle }}
      />
    </Form.Item>
  );
};
export const iptSelect = (props: Interfaces.InnerQueryListItemProps) => {
  const {
    name,
    defaultValue,
    customProps,
    titleKey,
    valueKey,
    childrenKey,
    itemList,
    itemStyle,
    onChange,
  } = props;
  return (
    <>
      <Form.Item
        noStyle
        name={[name, "ipt"]}
        initialValue={defaultValue ? defaultValue : ""}
      >
        <Input
          size={customProps?.size || "defalut"}
          style={{ width: "120px", ...itemStyle }}
          placeholder={customProps?.placeholder || ""}
        />
      </Form.Item>
      <Form.Item noStyle name={[name, "select"]}>
        <Select size={customProps?.size || "middle"} style={{ width: "80px" }}>
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
    </>
  );
};
export const textArea = (props: Interfaces.InnerQueryListItemProps) => {
  const {
    name,
    defaultValue,
    customProps,
    titleKey,
    valueKey,
    childrenKey,
    itemList,
    itemStyle,
    onChange,
  } = props;
  return (
    <>
      <Form.Item
        noStyle
        name={name}
        initialValue={defaultValue ? defaultValue : ""}
      >
        <Input.TextArea
          rows={customProps?.rows || 4}
          size={customProps?.size || "defalut"}
          style={{ width: "220px", ...itemStyle }}
          placeholder={customProps?.placeholder || ""}
        />
      </Form.Item>
      {customProps?.suffix && (
        <div className={styles.suffix}>{customProps?.suffix}</div>
      )}
    </>
  );
};
export const BtnTimeIpt = (props: Interfaces.InnerQueryListItemProps) => {
  const {
    name,
    defaultValue,
    customProps,
    titleKey,
    valueKey,
    form,
    childrenKey,
    itemList,
    itemStyle,
    onChange,
  } = props;
  const [value, setValue] = useState(0);
  return (
    <>
      <Radio.Group
        buttonStyle="solid"
        size={customProps?.size || "small"}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      >
        <Radio.Button
          className={
            customProps?.size
              ? styles.radioButton_small
              : styles.radioButton_nomal
          } // size 为small时 选择后面
          value={0}
        >
          否
        </Radio.Button>
        <Radio.Button
          className={
            customProps?.size
              ? styles.radioButton_small
              : styles.radioButton_nomal
          } // size 为small时 选择后面
          value={1}
        >
          是
        </Radio.Button>
      </Radio.Group>
      {value > 0 && (
        <>
          <Form.Item
            name={[name, "one"]}
            noStyle
            rules={[{ required: true, message: "必填" }]}
          >
            <RangePicker
              onChange={(value) => onChange?.(value, form)}
              disabled={customProps?.disabled}
              size={customProps?.size || "small"}
              style={{ width: "220px", marginRight: "20px", ...itemStyle }}
            />
          </Form.Item>
          <Form.Item
            name={[name, "two"]}
            noStyle
            rules={[{ required: true, message: "必填" }]}
          >
            <Input
              style={{ width: "120px" }}
              placeholder={customProps?.placeholder || ""}
            />
          </Form.Item>
        </>
      )}
    </>
  );
};
export const BtnTable = (props: Interfaces.InnerQueryListItemProps) => {
  const {
    name,
    defaultValue,
    customProps,
    titleKey,
    valueKey,
    form,
    childrenKey,
    itemList,
    itemStyle,
    onChange,
  } = props;
  const [value, setValue] = useState(0);
  return (
    <>
      <Radio.Group
        buttonStyle="solid"
        size={customProps?.size || "small"}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      >
        <Radio.Button
          className={
            customProps?.size
              ? styles.radioButton_small
              : styles.radioButton_nomal
          } // size 为small时 选择后面
          value={0}
        >
          否
        </Radio.Button>
        <Radio.Button
          className={
            customProps?.size
              ? styles.radioButton_small
              : styles.radioButton_nomal
          } // size 为small时 选择后面
          value={1}
        >
          是
        </Radio.Button>
      </Radio.Group>
      {value > 0 && (
        <table style={{ width: "50%" }} className={styles.tables}>
          <thead>
            <tr
              style={{
                fontWeight: "bold",
                textAlign: "center",
                background: "#D7D7D7",
                padding: 10,
                height: 40,
              }}
            >
              <th>黄金会员</th>
              <th>白金会员</th>
              <th>钻石会员</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ textAlign: "center", padding: 10, height: 40 }}>
              <td>
                <Form.Item name={[name, "first"]} noStyle>
                  <Input
                    style={{ width: "120px" }}
                    placeholder={customProps?.placeholder || ""}
                  />
                </Form.Item>
              </td>
              <td>
                <Form.Item name={[name, "second"]} noStyle>
                  <Input
                    style={{ width: "120px" }}
                    placeholder={customProps?.placeholder || ""}
                  />
                </Form.Item>
              </td>
              <td>
                <Form.Item name={[name, "three"]} noStyle>
                  <Input
                    style={{ width: "120px" }}
                    placeholder={customProps?.placeholder || ""}
                  />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};
export const BtnTableEdit = (props: Interfaces.InnerQueryListItemProps) => {
  const {
    name,
    defaultValue,
    customProps,
    columns,
    titleKey,
    valueKey,
    form,
    childrenKey,
    itemList,
    itemStyle,
    onChange,
  } = props;
  const [value, setValue] = useState(0);
  const [dataList, setDataList] = useState([{}]);
  return (
    <>
      <Radio.Group
        buttonStyle="solid"
        size={customProps?.size || "small"}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      >
        <Radio.Button
          className={
            customProps?.size
              ? styles.radioButton_small
              : styles.radioButton_nomal
          } // size 为small时 选择后面
          value={0}
        >
          否
        </Radio.Button>
        <Radio.Button
          className={
            customProps?.size
              ? styles.radioButton_small
              : styles.radioButton_nomal
          } // size 为small时 选择后面
          value={1}
        >
          是
        </Radio.Button>
      </Radio.Group>
      {value > 0 && (
        <table style={{ width: "50%" }} className={styles.tables}>
          <thead>
            <tr
              style={{
                fontWeight: "bold",
                textAlign: "center",
                background: "#D7D7D7",
                padding: 10,
                height: 40,
              }}
            >
              {columns?.map((item, m) => (
                <th key={m}>{item.dataIndex}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <Form.List name={name} initialValue={defaultValue}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey }, idx) => (
                    <tr
                      key={idx}
                      style={{ textAlign: "center", padding: 10, height: 40 }}
                    >
                      {columns?.map((x, y) => {
                        if (x.name == "operate") {
                          return (
                            <td key={y}>
                              <span
                                style={{ marginRight: "5px" }}
                                onClick={() => {
                                  console.log(key, name, fieldKey);
                                  remove(name);
                                }}
                              >
                                删除
                              </span>
                              <span onClick={() => add()}>增加</span>
                            </td>
                          );
                        } else {
                          return (
                            <td key={y}>
                              <Form.Item
                                name={[name, x.name]}
                                fieldKey={[fieldKey, x.name]}
                                noStyle
                              >
                                <Input
                                  style={{ width: "120px" }}
                                  placeholder={x.placeholder || ""}
                                />
                              </Form.Item>
                            </td>
                          );
                        }
                      })}
                    </tr>
                  ))}
                </>
              )}
            </Form.List>
          </tbody>
        </table>
      )}
    </>
  );
};

export const upload = (props: Interfaces.InnerQueryListItemProps) => {
  const {
    name,
    defaultValue,
    customProps,
    itemStyle,
    rules,
    onChange,
    title,
  } = props;
  return (
    <>
      <Form.Item
        noStyle
        name={name}
        initialValue={defaultValue ? defaultValue : null}
        rules={rules}
        valuePropName="fileList"
        extra={customProps?.extra ? customProps?.extra : null}
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>上传</Button>
        </Upload>
      </Form.Item>
      {customProps?.suffix && (
        <div className={styles.suffix}>{customProps?.suffix}</div>
      )}
    </>
  );
};

// export const upload = (props: Interfaces.InnerQueryListItemProps) => {
//   const {
//     name,
//     defaultValue,
//     customProps,
//     title,
//     itemStyle,
//     onChange,
//   } = props;
//   return (
//     <>
//       <Form.Item
//         noStyle
//         name={name}
//         initialValue={defaultValue ? defaultValue : ""}
//       >
//         <Upload
//           name='file'
//           action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
//           headers={{
//             authorization: 'authorization-text'
//           }} >
//           <Button type={customProps?.type || 'default'} style={{ marginRight: "15px" }} icon={<UploadOutlined />}>{title}</Button>
//         </Upload>
//       </Form.Item>
//     </>
//   );
// };
export const selectList = (props: Interfaces.InnerQueryListItemProps) => {
  const {
    name,
    defaultValue,
    customProps,
    columns,
    titleKey,
    valueKey,
    form,
    childrenKey,
    itemList,
    itemStyle,
    onChange,
  } = props;
  return (
    <Form.List name={name} initialValue={defaultValue}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, fieldKey }, idx) => (
            <div style={{ marginBottom: "5px" }}>
              {columns?.map((m, n) => {
                return (
                  <Form.Item
                    key={n}
                    name={[name, m.name]}
                    fieldKey={[fieldKey, m.name]}
                    noStyle
                  >
                    <Select
                      size={customProps?.size || "middle"}
                      style={{ marginRight: "10px", width: "140px" }}
                    >
                      {itemList &&
                        itemList?.map((item: any, idx: any) => {
                          return (
                            <Select.Option
                              key={idx}
                              value={
                                customProps?.isSelf ? item : item[valueKey]
                              }
                            >
                              {customProps?.isSelf ? item : item[titleKey]}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  </Form.Item>
                );
              })}
              <span
                className={styles.color_span}
                style={{ marginRight: "10px" }}
                onClick={() => add()}
              >
                {" "}
                新增
              </span>
              <span className={styles.color_span} onClick={() => remove(name)}>
                {" "}
                删除
              </span>
            </div>
          ))}
        </>
      )}
    </Form.List>
  );
};

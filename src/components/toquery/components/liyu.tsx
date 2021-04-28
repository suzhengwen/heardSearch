import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
  memo,
} from "react";
import {
  FileSearchOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Select,
  Input,
  message,
  Tooltip,
  DatePicker,
  Checkbox,
  Form,
  Popover,
  Tag,
  Col,
  Row,
  Button,
  Radio,
  TreeSelect,
  Card,
  AutoComplete,
} from "antd";
import {} from "antd/lib/date-picker";
import moment from "moment";
import * as Interfaces from "../param.types";
const { RangePicker } = DatePicker;
const { CheckableTag } = Tag;
const { TreeNode } = TreeSelect;

//列表选项默认样式(暂时部分组件应用)
const defaultListItemStyle: React.CSSProperties = {
  border: "1px solid #d9d9d9",
  borderTopWidth: "1.02px",
  cursor: "pointer",
  height: "24px",
  padding: "0 7px",
  lineHeight: "22px",
  marginRight: "10px",
  marginBottom: "5px",
  marginTop: "5px",
  boxSizing: "border-box",
  touchAction: "manipulation",
  fontSize: 14,
  userSelect: "none",
};

//就是一个空白占位组件
export const PlaceHolder = () => <></>;

export const CheckButton = (props: Interfaces.InnerQueryListItemProps) => {
  const { name, defaultValue } = props;
  //value, onChange是Form.Item传递的， 并且在Form.Item有name属性时才会传递
  const CheckButton = (props: Interfaces.InnerQueryListItemProps) => {
    const {
      value,
      titleKey,
      valueKey,
      itemList,
      itemStyle,
      name,
      customProps,
      defaultValue,
      onChange,
    } = props;
    const handleChange = (tag: any, checked: boolean) => {
      if (tag[valueKey] === "") {
        onChange && onChange("");
        return;
      } else {
        value?.[0] === "" && value.splice(0, 1);
      }
      const newVal = value ? [...value] : [];
      if (checked) {
        newVal.push(tag[valueKey]);
      } else {
        newVal.splice(newVal.indexOf(tag[valueKey]), 1);
      }

      onChange && onChange(newVal);
    };
    return (
      <>
        {itemList
          .filter((i) => i[titleKey])
          ?.map((item, index) => (
            <CheckableTag
              key={index}
              checked={
                (value && value.indexOf(item[valueKey]) > -1) ||
                (item[valueKey] === "" && !value)
              }
              onChange={(checked: any) => handleChange(item, checked)}
              style={{ ...defaultListItemStyle, ...itemStyle }}
            >
              {item[titleKey]}
            </CheckableTag>
          ))}
      </>
    );
  };
  return (
    <Form.Item
      name={name}
      style={{ marginBottom: 1 }}
      initialValue={defaultValue ? [defaultValue] : [""]}
    >
      <CheckButton {...props} />
    </Form.Item>
  );
};

export const CheckButton_between = (
  props: Interfaces.InnerQueryListItemProps
) => {
  const { form, name, defaultValue, customProps, itemStyle } = props;
  //value, onChange是Form.Item传递的， 并且在Form.Item有name属性时才会传递
  const CheckButton = (props: Interfaces.InnerQueryListItemProps) => {
    const {
      form,
      value,
      titleKey,
      valueKey,
      itemList,
      itemStyle,
      name,
      customProps,
      defaultValue,
      onChange,
    } = props;
    const handleChange = (tag: any, checked: boolean) => {
      form.setFieldsValue({
        [`${name}_minIpt`]: "",
        [`${name}_maxIpt`]: "",
        [`${name}_Time`]: "",
      });
      if (tag[valueKey] === "") {
        onChange && onChange("");
        return;
      } else {
        value?.[0] === "" && value.splice(0, 1);
      }
      const newVal = value ? [...value] : [];
      if (checked) {
        newVal.push(tag[valueKey]);
      } else {
        newVal.splice(newVal.indexOf(tag[valueKey]), 1);
      }
      onChange && onChange(newVal);
    };
    return (
      <>
        {itemList
          .filter((i) => i[titleKey])
          ?.map((item: any, index: number) => (
            <CheckableTag
              key={index}
              checked={
                (value && value.indexOf(item[valueKey]) > -1) ||
                (item[valueKey] === "" && !value)
              }
              onChange={(checked: boolean) => handleChange(item, checked)}
              style={{ ...defaultListItemStyle, ...itemStyle }}
            >
              {item[titleKey]}
            </CheckableTag>
          ))}
      </>
    );
  };
  return (
    <>
      <Form.Item
        name={name}
        style={{ marginBottom: 1 }}
        initialValue={defaultValue ? [defaultValue] : [""]}
      >
        <CheckButton {...props} />
      </Form.Item>
      {customProps?.rdoBtnType == "ipt" && (
        <>
          <Form.Item noStyle name={name + "_minIpt"}>
            <Input
              size={customProps?.size || "small"}
              placeholder="最小"
              style={{ width: "80px", ...itemStyle }}
              className={customProps?.classNames || "mr10"}
              onBlur={(e: any) => {
                form.setFieldsValue({
                  [`${name}`]: "",
                });
                let last = form.getFieldValue(name + "_maxIpt") - 0;
                if (!last || !e.target.value) return;
                if (e.target.value - 0 > last) {
                  message.error("该数据应小于最大值!");
                  form.setFieldsValue({
                    [name + "_maxIpt"]: "",
                  });
                }
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
                form?.setFieldsValue({
                  [`${name}`]: "",
                });
                let before = form.getFieldValue(name + "_minIpt") - 0;
                if (!before || !e.target.value) return;
                if (e.target.value - 0 < before) {
                  message.error("该数据应大于最小值!");
                  form.setFieldsValue({
                    [name + "_minIpt"]: "",
                  });
                }
              }}
            />
          </Form.Item>
        </>
      )}
      {customProps?.rdoBtnType == "time" && (
        <Form.Item noStyle name={name + "_Time"}>
          <RangePicker
            size={customProps?.size || "small"}
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
};
export const Between = (props: Interfaces.QueryFormItemProps) => {
  const { name, onChange, form } = props;
  const Between = (props: Interfaces.QueryFormItemProps) => {
    const { customProps, value, itemStyle, onChange } = props;
    // let [min = '', max = ''] = value.split(' - ');
    let [min = "", max = ""] = (value && value.split(" - ")) || ["", ""];
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Input
          size={customProps?.size || "middle"}
          placeholder="最小值"
          style={{ width: "80px", ...itemStyle }}
          className={customProps?.classNames}
          value={min}
          type="number"
          onChange={(e) => onChange?.(`${e.target.value} - ${max}`, form)}
          onBlur={(e) => {
            let val: any = e.target.value;
            let _max = max;
            if (max && val - 0 > max) {
              message.error("该数据应小于最大值!");
              _max = "";
              onChange?.(`${min} - ${val}`, form);
            }
            onChange && onChange(`${val} - ${_max}`);
          }}
        />
        &nbsp;<span> - </span>&nbsp;
        <Input
          size={customProps?.size || "middle"}
          placeholder="最大值"
          style={{ width: "80px", ...itemStyle }}
          value={max}
          type="number"
          onChange={(e) => onChange?.(`${min} - ${e.target.value}`, form)}
          onBlur={(e) => {
            let val: any = e.target.value;
            let _min = min;
            if (min && val - 0 < min) {
              message.error("该数据应大于最小值!");
              _min = "";
              onChange?.(`${_min} - ${val}`, form);
            }
            onChange && onChange(`${_min} - ${val}`);
          }}
        />
      </div>
    );
  };
  return (
    <Form.Item name={name} initialValue="" style={{ marginBottom: 1 }}>
      <Between
        {...props}
        // onChange={(v) => {
        //     onChange && onChange(v);
        // }}
      />
    </Form.Item>
  );
};

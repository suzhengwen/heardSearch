import React, { useState } from "react";
import { Form, InputNumber, Input, Button, Upload } from "antd";
import * as Interfaces from "../param.types";
import locale from "antd/lib/locale/zh_CN";
import styles from "../style.less";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
export const input = (props: Interfaces.InnerQueryListItemProps) => {
  const { name, defaultValue, customProps, itemStyle, rules } = props;
  return (
    <>
      <Form.Item
        noStyle
        name={name}
        initialValue={defaultValue ? defaultValue : null}
        rules={rules}
        extra={customProps?.extra || null}
      >
        {customProps?.iptType === "text" ? (
          <Input.TextArea
            size={customProps?.size || "defalut"}
            style={{ width: "220px", ...itemStyle }}
            placeholder={customProps?.placeholder || ""}
            rows={customProps.rows}
          />
        ) : customProps?.iptType === "number" ? (
          <InputNumber
            size={customProps?.size || "defalut"}
            style={{ width: "220px", ...itemStyle }}
            placeholder={customProps?.placeholder || ""}
          />
        ) : (
          <Input
            size={customProps?.size || "defalut"}
            style={{ width: "220px", ...itemStyle }}
            placeholder={customProps?.placeholder || ""}
          />
        )}
      </Form.Item>
      {customProps?.suffix && (
        <div className={styles.suffix}>{customProps?.suffix}</div>
      )}
    </>
  );
};

export const plainText = (props: Interfaces.InnerQueryListItemProps) => {
  const { name, defaultValue, customProps, itemStyle, rules } = props;
  return (
    <>
      <Form.Item
        noStyle
        name={name}
        initialValue={defaultValue ? defaultValue : null}
        rules={rules}
        extra={customProps?.extra ? customProps?.extra : null}
      >
        <span className="ant-form-text">{customProps?.suffix}</span>
      </Form.Item>
    </>
  );
};

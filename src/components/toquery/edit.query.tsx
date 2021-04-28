import React, { memo, useEffect } from "react";
import { Divider, Form, Col, Row, Button, Card } from "antd";

import { QueryParamListProps, itemMap, formDataConverte } from "./toquery";
import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import styles from "./style.module.sass";

const EditQueryParamList: React.FC<QueryParamListProps> = memo(
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
      initialValues,
    } = props;
    const [form] = Form.useForm();
    useEffect(() => {
      formRef && (formRef.form = form);
    }, [formRef]);
    return (
      <Card bordered={false} bodyStyle={{ ...bodyStyle }}>
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={initialValues ? initialValues : {}}
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
                  style={{ padding: "6px 0" }}
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

export default EditQueryParamList;

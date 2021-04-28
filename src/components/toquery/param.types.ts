import { FormInstance } from "antd/lib/form";

/**
 * 基础组件Props
 */
export interface BasicQueryItemProps {  // 此处参数为选填项
  noReset?: boolean; //是否能被重置
  defaultValue?: any; //默认值
  itemStyle?: React.CSSProperties; //样式
  columns?: any[];
  title?: string; // 考虑到upload 需要的文字
  customProps?: {
    changeOnSelect?: false | true; // 级联做选择 是否可选择每一项菜单项成本
    rdoBtnType?: "ipt" | "time"; //常用属性：组件类型为radio_between时生效, 用来定义单选框后面的 ipt:最大值最小值输入框， time:日期选择器
    itemListType?: 0 | 1 | 2; //常用属性：点击查询按钮做数据适配时需要, 用来判断当前属性值是否需要被按'-'切割暂时只有2生效
    placeholder?: string; //常用属性：input或者skuSearchBar的输入框的placeholder
    size?: any;
    rows?: number; // input.TextArea  高度调节
    isSelf?: boolean | true; // true时 select选择框 为单个数组选项
    [propertys: string]: any; //其他自定义属性
    disabled?: boolean | any;
    disabledDate?: (date: any) => boolean;
    // rules?: any[];   // rules 放在最外层 作为组件必须传的参数
    type?: "default" | "link" | "text" | "primary" | "dashed" | "ghost"; // btn 组件type类型
    iptType?: "text" | "number"; //input组件TYPE类型
    suffix?: string;
    extra?: string;
  }; //自定义属性, 需要一些额外属性时放在里面就好了
  onChange?: (value: any, form?: FormInstance) => any; //值变化时的回调函数
}

//#region       给外部使用的
/**
 * Form组件Props
 */
export interface QueryFormItemProps extends BasicQueryItemProps {  // 此处参数为必填项
  form: FormInstance; //form
  name: string; //字段名 给Form.Item的name
  value?: any;
  required?: boolean;
  rules: any[];
  labelCol: number | 0;
}
/**
 * 选项组组件Props
 */
export interface QueryListItemProps extends BasicQueryItemProps {
  itemList: any[]; //选项列表
  titleKey: string; //选项文本字段名
  valueKey: string; //选项value字段名
  childrenKey?: string; // 选项的子集
}
/**
 * @desc 带SKU自动填充的搜索框组件Props
 */
export interface SKUSearchBarProps extends BasicQueryItemProps {
  skuType: "order" | "product"; //当前查询的sku类型, 后端需要
}
export interface dateExendsPrps extends QueryFormItemProps {
  disabled: [boolean, boolean] | [false, false];
  disabledDate: (date: any) => boolean;
}
export interface switchExendsPrps extends QueryFormItemProps {
  disabled: boolean | null;
}
export interface rateExendsPrps extends QueryFormItemProps {
  disabled: boolean | null;
}
export interface fromLisExendsPrps extends QueryFormItemProps {
  children: {
    rules: any[];
    name: string;
    label: string;
    type: string;
    placeholder: string;
    initialValueKey: any;
  }[];
}
//#endregion

//#region           给ItemMap内部使用的
export interface InnerQueryFormItemProps extends QueryFormItemProps {
  value: any; //都是由Form.Item传递下来的
  onChange: (value: any) => any; //都是由Form.Item传递下来的
}
export interface InnerQueryListItemProps
  extends QueryListItemProps,
  QueryFormItemProps { }
//#endregion

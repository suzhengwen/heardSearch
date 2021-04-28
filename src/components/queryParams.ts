import { BasicQueryItemProps } from './toquery/param.types'
import { QueryParamType } from './toquery/toquery'
export const queryParam: { [key: string]: any & BasicQueryItemProps } = {
    title: {
        label: "商品名称",
        type: QueryParamType.input,
        span: 12,
        rules: [{ required: true, message: "请输入商品名称" }],
        required: true,
        queryItemProps: <BasicQueryItemProps>{
            itemStyle: {
                width: "320px",
            },
            defaultValue: "",
            customProps: {
                placeholder: "请输入商品名称",
            },
        },
    },
    sub_title: {
        label: "副标题",
        type: QueryParamType.input,
        span: 12,
        rules: [{ required: true, message: "请输入副标题" }],
        required: true,
        queryItemProps: {
            itemStyle: {
                width: "320px",
            },
            customProps: {
                placeholder: "请输入副标题",
            },
        },
    },
    brand: {
        label: "商品品牌",
        type: QueryParamType.select,
        span: 12,
        rules: [{ required: true, message: "请选择" }],
        required: true,
        queryItemProps: {
            itemStyle: {
                width: "320px",
            },
            titleKey: "name",
            valueKey: "name",
            itemList: [],
            defaultValue: "",
            customProps: {
                placeholder: "请选择",
            },
        },
    },
    introduction: {
        label: "商品介绍",
        type: QueryParamType.textArea,
        span: 12,
        rules: [{ required: true, message: "请输入内容" }],
        required: true,
        queryItemProps: {
            itemStyle: {
                width: "320px",
            },
            customProps: {
                placeholder: "请输入内容",
            },
        },
    },
    freight_template: {
        label: "运费模板",
        type: QueryParamType.select,
        span: 12,
        rules: [{ required: true, message: "请选择模板" }],
        required: true,
        queryItemProps: {
            itemStyle: {
                width: "320px",
            },
            titleKey: "title",
            valueKey: "value",
            itemList: [
                {
                    title: "这里",
                    value: 1,
                },
                {
                    title: "那里",
                    value: 2,
                },
            ],
            defaultValue: "",
            customProps: {
                placeholder: "请选择模板",
            },
        },
    },
    shopNumber: {
        label: "商品货号",
        type: QueryParamType.input,
        span: 12,
        queryItemProps: {
            itemStyle: {
                width: "320px",
            },
            customProps: {
                suffix: "如果您不输入商品货号，系统将自动生成一个唯一的货号。",
            },
        },
    },
    selling_price: {
        label: "商品售价",
        type: QueryParamType.input,
        span: 12,
        rules: [{ required: true, message: "请输入商品售价" }],
        required: true,
        queryItemProps: <BasicQueryItemProps>{
            customProps: {
                iptType: "number",
            },
            itemStyle: {
                width: "320px",
            },
        },
    },
    market_price: {
        label: "市场价",
        type: QueryParamType.input,
        span: 12,
        queryItemProps: {
            customProps: {
                iptType: "number",
            },
            itemStyle: {
                width: "320px",
            },
        },
    },
    stock: {
        label: "商品库存",
        type: QueryParamType.input,
        span: 12,
        rules: [{ required: true, message: "请输入商品售价" }],
        required: true,
        queryItemProps: {
            itemStyle: {
                width: "320px",
            },
            customProps: {
                iptType: "number",
                suffix:
                    "该设置只对单品有效，当商品存在多规格货品时为不可编辑状态，库存数值取决于货品数量。",
            },
        },
    },
    inventory_warning_value: {
        label: "库存预警值",
        type: QueryParamType.input,
        span: 12,
        queryItemProps: {
            customProps: {
                iptType: "number",
            },
            itemStyle: {
                width: "320px",
            },
        },
    },
    measure: {
        label: "计量单位",
        type: QueryParamType.input,
        span: 12,
        queryItemProps: {
            itemStyle: {
                width: "320px",
            },
        },
    },
    weight: {
        label: "商品重量",
        type: QueryParamType.iptSelect,
        span: 12,
        queryItemProps: <BasicQueryItemProps>{
            nameList: ["one", "two"],
            itemStyle: {
                width: "220px",
                marginRight: "20px",
            },
            itemList: ["克", "元"],
            customProps: {
                isSelf: true,
            },
        },
    },
    gift_coin: {
        label: "赠送优币",
        type: QueryParamType.input,
        span: 12,
        queryItemProps: <BasicQueryItemProps>{
            itemStyle: {
                width: "320px",
            },
            customProps: {
                iptType: "number",
                suffix: "购买该商品时赠送消费积分数。",
            },
        },
    },
    gift_growth_value: {
        label: "赠送等级成长值",
        type: QueryParamType.input,
        span: 12,
        queryItemProps: {
            itemStyle: {
                width: "320px",
            },
            customProps: {
                iptType: "number",
                suffix: "购买该商品时赠送等级积分数",
            },
        },
    },
    coin_purchasing_price: {
        label: "优币购买金额",
        type: QueryParamType.input,
        span: 12,
        queryItemProps: {
            itemStyle: {
                width: "320px",
            },
            customProps: {
                iptType: "number",
                suffix: " (此处需填写金额)购买该商品时最多可以使用积分的金额",
            },
        },
    },
    is_notice: {
        label: "预告商品",
        type: QueryParamType.switch,
        span: 12,
        queryItemProps: {
            defaultValue: true,
            customProps: {
                suffix: " 如果设置为预告商品，商品上架和商品推荐不可用。",
            },
        },
    },
    is_on_line: {
        label: "商品上架",
        type: QueryParamType.switch,
        span: 12,
        queryItemProps: {
            defaultValue: true,
        },
    },
    recommend: {
        label: "商品推荐",
        type: QueryParamType.checkButton,
        span: 12,
        queryItemProps: {
            defaultValue: "",
            valueKey: "value",
            titleKey: "title",
            itemList: [
                {
                    title: "新品",
                    value: 1,
                },
                {
                    title: "推荐",
                    value: 2,
                },
            ],
            customProps: {
                size: "default",
            },
        },
    },
    service_guarantee: {
        label: "服务保证",
        type: QueryParamType.checkButton,
        span: 12,
        queryItemProps: {
            defaultValue: "",
            valueKey: "value",
            titleKey: "title",
            itemList: [
                {
                    title: "无忧退货",
                    value: 1,
                },
                {
                    title: "快速退款",
                    value: 2,
                },
                {
                    title: "免费包邮",
                    value: 3,
                },
            ],
            customProps: {
                size: "default",
            },
        },
    },
    detailed_title: {
        label: "详细页标题",
        type: QueryParamType.input,
        span: 12,
        queryItemProps: {
            itemStyle: {
                width: "320px",
            },
        },
    },
    detailed_description: {
        label: "详细页描述",
        type: QueryParamType.input,
        span: 12,
        queryItemProps: {
            itemStyle: {
                width: "320px",
            },
        },
    },
    key_words: {
        label: "商品关键词",
        type: QueryParamType.input,
        span: 12,
        queryItemProps: {
            itemStyle: {
                width: "320px",
            },
            customProps: {
                suffix:
                    "商品关键词请用空格分隔；有两个功能，一是可以作为站内关键词查询，在前台搜索框输入关键词后，能够搜索到该商品；二是作为搜索引擎收录使用.",
            },
        },
    },
    remarks: {
        label: "商品备注",
        type: QueryParamType.textArea,
        span: 12,
        required: true,
        queryItemProps: {
            itemStyle: {
                width: "320px",
            },
            customProps: {
                placeholder: "请输入内容",
            },
        },
    },
    special_promotion: {
        label: "特惠促销",
        type: QueryParamType.btnTimeIpt,
        span: 12,
        queryItemProps: {
            nameList: ["time", "price"],
            customProps: {
                innerName: "is_special_promotion",
                placeholder: "输入促销价格",
                size: "default",
            },
        },
    },
    purchase_limit: {
        label: "商品限购",
        type: QueryParamType.btnTimeIpt,
        span: 12,
        queryItemProps: {
            nameList: ["time", "quantity"],
            customProps: {
                innerName: "is_purchase_limit",
                placeholder: "输入限购数量",
                size: "default",
            },
        },
    },
    member_price: {
        label: "会员价格",
        type: QueryParamType.btnTable,
        span: 12,
        queryItemProps: {
            nameList: ["gold_member", "diamond_member", "platinum_member"],
            customProps: {
                innerName: "is_member_price",
                placeholder: "输入价格",
                size: "default",
            },
        },
    },
    step_price: {
        label: "阶梯价格",
        type: QueryParamType.btnTableEdit,
        span: 12,
        queryItemProps: {
            defaultValue: [{ quantity: "", price: "" }],
            nameList: ["quantity", "price"],
            columns: [
                {
                    placeholder: "输入数量",
                    dataIndex: "数量",
                    name: "quantity",
                },
                {
                    placeholder: "输入价格",
                    dataIndex: "价格",
                    name: "price",
                },
                {
                    dataIndex: "操作",
                    name: "operate",
                },
            ],
            customProps: {
                innerName: "is_step_price",
                size: "default",
            },
        },
    },
    full_reduction: {
        label: "满减价格",
        type: QueryParamType.btnTableEdit,
        span: 12,
        queryItemProps: {
            defaultValue: [{ full: "", less: "" }],
            columns: [
                {
                    placeholder: "输入数量",
                    dataIndex: "满",
                    name: "full",
                },
                {
                    placeholder: "输入价格",
                    dataIndex: "立减",
                    name: "less",
                },
                {
                    dataIndex: "操作",
                    name: "operate",
                },
            ],
            customProps: {
                innerName: "is_full_reduction",
                size: "default",
            },
        },
    },
};
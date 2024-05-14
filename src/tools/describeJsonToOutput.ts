import {TOutput} from "../define/node.ts";
import {EDataType} from "../define/define.ts";
import useNodeOutput from "./Output.ts";


export default function useDescribeJsonStructure(json: string): TOutput[] {
    const {getRandomKey,convertToApiConfDataTypeEnum} = useNodeOutput()
    const data = JSON.parse(json);
    const result: TOutput[] = [];

    function describeObject(obj: any, key:string): TOutput {

        // Check if obj is not an object or array
        if (typeof obj !== 'object' || obj === null) {
            return {
                row_key: getRandomKey(),
                key: key,
                type: convertToApiConfDataTypeEnum(typeof obj),
                children: [],
                desc:""
            };
        }

        const item: TOutput = {
            row_key: getRandomKey(),
            key: key,
            type: Array.isArray(obj) ? EDataType.Array : EDataType.Object,
            children: [],
            desc:""
        };
        if (Array.isArray(obj)) {
            if (obj.length > 0) {
                const arrayItem = obj[0]; // Assuming all elements in the array have the same structure
                // 判断是否是基础类型数组
                if (typeof arrayItem !== 'object' || arrayItem === null) {
                    item.type = EDataType.MetaArray
                    return item
                }
                item.children = []
                for (const key in arrayItem) {
                    if (typeof arrayItem[key] === 'object' && arrayItem[key] !== null) {
                        item.children.push(describeObject(arrayItem[key], key));
                    } else {
                        switch (typeof arrayItem[key]){
                            case 'string':
                            case 'number':
                            case 'boolean':
                                item.type = EDataType.MetaArray
                                return item
                        }
                        item.children.push({
                            row_key: getRandomKey(),
                            key: key,
                            type: convertToApiConfDataTypeEnum(typeof arrayItem[key]),
                            children: [],
                            desc:""
                        });
                    }
                }
            }
        } else {
            item.children = [];
            for (const key in obj) {
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    item.children.push(describeObject(obj[key], key));
                } else {
                    item.children.push({
                        row_key: getRandomKey(),
                        key: key,
                        type: convertToApiConfDataTypeEnum(typeof obj[key]),
                        children: [],
                        desc:""
                    });
                }
            }
        }

        return item;
    }

    for (const key in data) {
        result.push(describeObject(data[key], key));
    }

    return result;
}


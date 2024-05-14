// export default function getRandomKey() {
//     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//         var r = Math.random() * 16 | 0,
//             v = c === 'x' ? r : (r & 0x3 | 0x8);
//         return v.toString(16);
//     });
// };

import {TOutput} from "../define/node.ts";
import {EDataType} from "../define/define.ts";

export default function useNodeOutput() {
    const getRandomKey = (): string => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // const NewEmptyOutputs = (): TOutput[] => {
    //     return []
    // }

    const NewEmptyOutput = (key:string,type:EDataType,children?:TOutput[],desc?:string): TOutput => {
        return {
            row_key: getRandomKey(),
            key: key,
            type: type,
            children: children,
            desc: desc??""
        }
    }


    function convertToApiConfDataTypeEnum(value: string): EDataType {
        switch (value) {
            case 'string':
                return EDataType.String;
            case 'number':
                return EDataType.Number;
            case 'boolean':
                return EDataType.Boolean;
            case 'object':
                if (Array.isArray(value)) {
                    return EDataType.Array;
                } else {
                    return EDataType.Object;
                }
            default:
                throw new Error(`Invalid value: ${value}`);
        }
    }


    return {
        getRandomKey,
        NewEmptyOutput,
        convertToApiConfDataTypeEnum
    }
}
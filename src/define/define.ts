export enum ENodeType {
    LogicNode = 'logicNode',
    StartNode = 'startNode',
    EndNode = 'endNode',
    SwitchNode = 'switchNode',
}

export enum EDataType {
    Number = 'number',
    String = 'string',
    Boolean = 'boolean',
    Object = 'object',
    Array = 'array',
    // 数字数组
    NumberArray = 'numberArray',
    // 字符串数组
    StringArray = 'stringArray',
    // 布尔数组
    BooleanArray = 'booleanArray',
    // 基础类型数组
    MetaArray = 'metaArray',
}
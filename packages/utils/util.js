import {
    validatenull
} from './validate'
/**
 * 根据字典的value显示label
 */
export const findByvalue = (dic, value) => {
        let result = '';
        if (validatenull(dic)) return value;
        if (typeof(value) == 'string' || typeof(value) == 'number' || typeof(value) == 'boolean') {
            let index = 0;
            index = findArray(dic, value);
            if (index != -1) {
                result = dic[index].label;
            } else {
                result = value;
            }
        } else if (value instanceof Array && dic[0].children) {
            let index = 0;
            let count = 0
            while (count < value.length) {
                index = findArray(dic, value[count]);
                if (!validatenull(dic[index])) {
                    result = result + dic[index].label + '/';
                    dic = dic[index].children;
                }
                count++;
            }
            result = result.substr(0, result.length - 1);

        } else if (value instanceof Array) {
            result = [];
            let index = 0;
            value.forEach(ele => {
                index = findArray(dic, ele);
                if (index != -1) {
                    result.push(dic[index].label);
                } else {
                    result.push(ele);
                }
            });
            result = result.toString();
        }
        return result;
    }
    /**
     * 根据字典的value查找对应的index
     */
export const findArray = (dic, value) => {
        for (let i = 0; i < dic.length; i++) {
            if (dic[i].value == value) {
                return i;
                break;
            }
        }
        return -1;
    }
    /**
     * 获取字典
     */
export const setDic = (dicData, DIC) => {
        return (typeof(dicData) == 'string') ? DIC : dicData
    }
    /**
     * 设置px
     */
export const setPx = (val, defval) => {
    if (validatenull(val)) {
        val = defval;
    }
    val = val + '';
    if (val.indexOf('%') == -1) {
        val = val + 'px';
    }
    return val;
}

/**
 * 表格初始化值
 */

export const formInitVal = (list) => {
    let form = {}
    let searchForm = {}
    list.forEach(ele => {
        if (
            ele.type == 'checkbox' ||
            ele.type == 'radio' ||
            ele.type == 'cascader' ||
            (ele.type == 'select' && ele.multiple)
        ) {
            form[ele.prop] = []
            if (ele.search) {
                searchForm[ele.prop] = []
            }
        } else if (ele.type == 'number') {
            form[ele.prop] = 0
            if (ele.search) {
                searchForm[ele.prop] = 0
            }
        } else {
            form[ele.prop] = ''
            if (ele.search) {
                searchForm[ele.prop] = ''
            }
        }
        if (!validatenull(ele.valueDefault)) form[ele.prop] = ele.valueDefault
    })
    return {
        form,
        searchForm
    }
}

/**
 * 搜索框获取动态组件
 */
export const getSearchType = (type) => {
    if (type == "select" || type == 'radio' || type == 'checkbox') {
        return "crudSelect";
    } else if (type == "time") {
        return "crudTime";
    } else if (type == "date" || type == "datetime") {
        return "crudDate";
    } else if (type == 'cascader') {
        return "crudCascader";
    } else if (type == 'number') {
        return "crudInputNumber";
    } else {
        return "crudInput";
    }
};

/**
 * 动态获取组件
 */
export const getComponent = (type) => {
    if (type == "select") {
        return "crudSelect";
    } else if (type == "radio") {
        return "crudRadio";
    } else if (type == "checkbox") {
        return "crudCheckbox";
    } else if (type == "time") {
        return "crudTime";
    } else if (type == "date" || type == "datetime") {
        return "crudDate";
    } else if (type == 'cascader') {
        return "crudCascader";
    } else if (type == 'number') {
        return "crudInputNumber";
    } else if (type == 'ueditor') {
        return "crudUeditor";
    } else if (type == 'password') {
        return "crudInput";
    } else if (type == 'switch') {
        return "crudSwitch";
    } else {
        return "crudInput";
    }
};
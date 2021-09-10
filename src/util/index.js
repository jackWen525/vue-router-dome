/**
 * 
 * @param {*} target 被克隆对象
 * @returns 返回值新对象
 */
function deepClone(target) {

    if (target === null || typeof target !== "object") {
        return target;
    }
    let clone;
    if (Array.isArray(target)) {
        clone = []
    } else {
        clone = {}
    }
    for (const key in target) {

        if (Object.hasOwnProperty.call(target, key)) {

            clone[key] = deepClone(target[key]);

        }
    }
    return clone;
}
/**
 * 
 * @param {*} min 最小值
 * @param {*} max 最大值
 * @returns 返回区间的随机数
 */
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
/**
 * 
 * @param {*} array 扁平化数据
 * @returns 返回一维数组
 */
function arrayFlattening(array) {
    const falarr = [];
    for (const key in array) {

        if (Object.hasOwnProperty.call(array, key)) {

            if (Array.isArray(array[key])) {
                falarr.push(...arrayFlattening(array[key]))
            } else {
                falarr.push(array[key]);
            }


        }
    }
    return falarr
}
export default {
    deepClone,
    getRandom,
    arrayFlattening
}


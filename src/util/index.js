function deepClone(target) {

    if (target === null || typeof target !== "object") {
        return target;
    }
    let clone;
    if (Array.isArray(target)) {
        clone = []
    }else {
        clone = {}
    }
    for (const key in target) {
        
        if (Object.hasOwnProperty.call(target, key)) {

            clone[key] = deepClone(target[key]);
            
        }
    }
    return clone;
}


export default {
    deepClone,
}


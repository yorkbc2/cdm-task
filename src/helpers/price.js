/** 
 * @param {Array<Object>} data Main data to reduce
 * @param {string} propName Name of property to reduce
 */
export const computeTotalPrice = (data, propName) => {
    let result = 0;

    data.forEach(item => !isNaN(item[propName])? result += item[propName]: result);

    return result;
}
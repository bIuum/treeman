// input: 
// argument 1: arr (array)
// argument 2: str (string)
// 
// output: true if argument 2 is a substring of one or more of the elements in the array
function includesSubstring(arr, str) {
    if (!arr.length)
        return false;
    arr.forEach(function (element) {
        if (element.includes(str))
            return true;
    });
    return false;
}

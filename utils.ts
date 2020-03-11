import path from 'path';

// output: true if argument 2 is a substring of one or more of the elements in the array

export function includesSubstring(arr: string[], str: string): boolean {
    if (!arr.length)
        return false;

    arr.forEach(function (element) {
        if (str.includes(element))
            return true;
    });
    
    return false;
}

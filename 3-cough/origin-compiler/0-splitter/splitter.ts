export function split(code: string) {
    const splitString = code.split(/\s+/).filter(token => token !== "");
    for (let splitIndex = 0; splitIndex < splitString.length; splitIndex++) {
        if (splitString[splitIndex][0] == `"`) {
            while (splitString[splitString[splitIndex].length - 1] !== `"`) {
                splitString[splitIndex] += splitString[splitIndex + 1]
                splitString.splice(splitIndex + 1, 1)
            }
        }
    }

    return splitString
}
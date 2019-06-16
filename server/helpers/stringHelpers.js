export default class StringHelpers {
  static snakeCase(camelCase) {
    return camelCase.split(/(?=[A-Z])/).join('_').toLowerCase();
  }

  static camelCase(snakeCase) {
    return snakeCase.replace(/(_.)/g, (match) => match.toUpperCase()).replace(/_/g, '');
  }

  static camelifyObject(snakeObject) {
    const camelObject = {};
    Object.entries(snakeObject).forEach((entry) => {
      camelObject[this.camelCase(entry[0])] = entry[1];
    });
    return camelObject;
  }
}

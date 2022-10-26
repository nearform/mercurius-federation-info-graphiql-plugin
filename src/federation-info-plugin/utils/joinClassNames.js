/**
 *
 * @param {...string} classNames classNames to join
 * @returns {string} merged multiple classnames
 */
const addClassName = (...classNames) =>
  classNames.filter(classNames => !!classNames).join(' ')

export default addClassName

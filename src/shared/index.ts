/**
 * @author: Gene
 * @age: 永远18岁的美少年
 * @Email： Genejob@163.com
 * @date: 2020-11-17 23:43:18
 * @description: 共享的工具方法
 */

export const isObject = (val: unknown): val is Object => typeof val === 'object' && val !== null

const hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwn = (target, key) => hasOwnProperty.call(target, key)

export const isArray = (target) => Array.isArray(target)

export const hasChange = (oldVal, newVal) => oldVal !== newVal

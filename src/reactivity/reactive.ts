/**
 * @author: Gene
 * @age: 永远18岁的美少年
 * @Email： Genejob@163.com
 * @date: 2020-11-17 23:24:27
 * @description: reactive 实现
 */
import {isObject} from "../shared"
import {mutableHandlers} from "./baseHanders"

// 在 vue2.0 的时候, defineProperty 直接循环对象中的每一个属性, 无法对不存在的属性做处理
// vue2中递归处理多级对象
// 在 vue3.0 中,没有循环,它是对原对象进行代理, vue3.0中不存在的属性也可以监控到
// vue3中没有做递归处理

export const reactive = (target: object) => {
    return createReactiveObject(target, mutableHandlers); // 高阶函数, 可以根据不同的参数,实现不同的功能
}

const reactiveMap = new WeakMap(); // 映射表中的 key 必须是对象, 而且不会有内存泄漏的问题

// 创建代理对象
function createReactiveObject(target, baseHandler) {
    // 如果这个 target 不是一个对象,直接返回
    if (!isObject(target)) {
        return target
    }
    // 如果对象已经被代理过了,就不需要再次代理了
    let existProxy = reactiveMap.get(target)
    if (reactiveMap.get(target)) {
        return existProxy
    }
    // 如果对象已经被代理过了,就不要再次代理了
    const proxy = new Proxy(target, baseHandler) // reactive 核心功能就是 proxy
    reactiveMap.set(target, proxy)
    return proxy;
}

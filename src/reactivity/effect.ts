/**
 * @author: Gene
 * @age: 永远18岁的美少年
 * @Email： Genejob@163.com
 * @date: 2020-11-17 23:24:16
 * @description: effect 实现
 */

/**
 * @param fn effect中的函数
 * @param options 参数对象
 */
export const effect = (fn, options = {}) => {
    // 需要让传递来的 fn 变成响应式的 effect => 数据一变化, fn 就能重新执行
    const effect = createReactiveEffect(fn);
    effect()
}

// effect 应该和数据关联起来
export const effectStack = [] // 这个栈为了保证当前的effect 和 属性能对应上
export let activeEffect = null;

//创建响应式的 effect fn为用户传入的函数
let id = 0

function createReactiveEffect(fn) {
    const effect = function reactiveEffect() {
        if (!effectStack.includes(effect)) {
            try {
                effectStack.push(effect)
                activeEffect = effect  // 记录当前 正在执行的 effect函数
                return fn() // 执行用户传入的函数
            } finally {
                effectStack.pop()
                activeEffect = effectStack[effectStack.length - 1]
            }
        }
    }
    effect.id = id++
    return effect
}

// 收集属性 某个对象中的某个属性, 依赖了哪些 effect
// {} 对象里的某个属性, 对应的 effect 可能有多个 // weakMap
const targetMap = new WeakMap;

// 建立属性 he effect 之间的关联
export function track(target, key) {
    if (activeEffect == undefined) {// 如果 effect 不存在, 那么直接返回
        return;
    }
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, (dep = new Set()))
    }

    if (!dep.has(activeEffect)) {
        dep.add(activeEffect)
    }
}

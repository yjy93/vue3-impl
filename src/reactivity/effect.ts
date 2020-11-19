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
export const effectStack = []

/**
 * @param fn 创建响应式的 effect fn为用户传入的函数
 */
function createReactiveEffect(fn) {
    const effect = function reactiveEffect() {
        effectStack.push(effect)
        fn() // 执行用户传入的函数
    }
    return effect
}

// proxy 和 reflect 通常一块儿来使用. reflect 以后会取代掉 object 上一系列方法
import {effectStack} from "./effect"

export const mutableHandlers = {
    /**
     * @param target 原来的对象
     * @param key 属性
     * @param receiver 代理后的对象
     */
    get(target, key, receiver) { // 当取值的时候, 应该将effect 存储起来
        console.log('get target ->', target);
        return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) { // 当设置值的时候,应该通知对应的 effect 更新
        console.log('set receiver ->', receiver);
        let result = Reflect.set(target, key, value)
        effectStack.forEach((effect) => effect())
        return result
    }
}

// 默认加载页面时, 会先调用一次 effect, 此时 effect 方法中的数据会进行取值操作 -> 走到对应点 get方法
// 让对应的属性保存当前的 effect
// 对象中 name 属性对应的 effect 有几个
// 某个对象中的 name 属性变化了, 需要找到对应的 effect 列表, 让它依次执行.

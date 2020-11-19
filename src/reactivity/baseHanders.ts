// proxy 和 reflect 通常一块儿来使用. reflect 以后会取代掉 object 上一系列方法
import {hasChange, hasOwn, isArray, isObject} from "../shared"
import {reactive} from "./reactive"
import {activeEffect, track} from "./effect"

export const mutableHandlers = {
    /**
     * @param target 原来的对象
     * @param key 属性
     * @param receiver 代理后的对象
     */
    get(target, key, receiver) { // 当取值的时候, 应该将effect 存储起来
        let res = Reflect.get(target, key, receiver)
        // console.log(activeEffect["id"], key)
        track(target, key) // 属性 和 依赖之间做一个关联 => 依赖收集

        // 懒代理, 默认当取值的时候是一个对象的时候, 我再次进行代理, 而不是一上来就进行代理, 所以性能高
        return isObject(res) ? reactive(res) : res
    },
    set(target, key, value, receiver) { // 当设置值的时候,应该通知对应的 effect 更新
        const oldValue = target[key]
        console.log('set ', key);
        // 对象和数组.
        // 如果是数组, 就比较当前新增的属性,是否比长度大, 大的话就是以前没有新增的
        const hadKey = isArray(target) && (parseInt(key) == key) ? Number(key) < target.length : hasOwn(target, key)
        let result = Reflect.set(target, key, value)
        // 调用 push方法,会先进行添加属性,再去更新长度(但是这次长度更新是没有意义的)
        if (!hadKey) {
            console.log('增加属性');
        } else if (hasChange(oldValue, value)) {
            console.log('修改属性');
        }
        // 设置一般 分为两种  一种是添加新的属性, 还有一种是 修改属性
        return result
    }
}


// 默认加载页面时, 会先调用一次 effect, 此时 effect 方法中的数据会进行取值操作 -> 走到对应点 get方法
// 让对应的属性保存当前的 effect
// 对象中 name 属性对应的 effect 有几个
// 某个对象中的 name 属性变化了, 需要找到对应的 effect 列表, 让它依次执行.

// 类型保护  具体到某个类型  类型判断

// js 中 typeof instanceof in 关键字

function getVal(val: string | number) {
    if (typeof val === 'string') {
        val.split('')
    } else {
        val.toFixed()
    }
}

class Dog{}
class Cat{}

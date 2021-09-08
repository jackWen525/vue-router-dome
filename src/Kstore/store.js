
let Vue;
class Store {

    constructor(options) {
        this.$options = options;
        this.state = options.state || {};
        this.actions = options.actions || {};
        this.mutations = options.mutations || {};
        this._wrappedGetters = options.getters || {};
        // 保证this指向；
        this.commit = this.commit.bind(this);
        this.dispatch = this.dispatch.bind(this);

        // getters
        const computed = {};
        this.getters = {};

        let store = this;
        Object.keys(this._wrappedGetters).forEach(key => {

            const fn = store._wrappedGetters[key];
            // 高阶函数
            computed[key] = function () {
                return fn(store.state);
            }

            Object.defineProperty(store.getters, key, {
                get: () => store._vm[key]

            })
        })
        // 利用vue实现响应式
        this._vm = new Vue({ data: this.$options.state, computed })
    }
    commit(type, ...arg) {
        if (!this.$options.mutations[type]) {
            console.error("没有这个方法");
            return;
        }
        this.$options.mutations[type](this.$options.state, ...arg);
    }
    dispatch(type, ...arg) {
        if (!this.actions[type]) {
            console.error("该方法不存在");
            return;
        }
        this.actions[type](this, ...arg);
    }
}

const install = function (_vue) {
    Vue = _vue;
    // 用混入把Store实例挂在原型上
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store;
            }
        }
    })

}
export default { Store, install }
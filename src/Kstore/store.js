
let Vue;
class Store {

    constructor(options){
        this.$options = options;
        this.state = options.state;
        this.actions = options.actions;
        this.mutations = options.mutations;
        this.$options.$data = new Vue({data:this.$options.state})

        // 保证this指向；
        this.commit = this.commit.bind(this);
        this.dispatch = this.dispatch.bind(this);
    }
    commit(type){
        if(!this.$options.mutations[type]) {
            console.error("没有这个方法");
            return;
        }
        this.$options.mutations[type](this.$options.state);
    }
    dispatch(type){
        if(!this.actions[type]) {
            console.error("该方法不存在");
            return;
        }
        this.actions[type](this);
    }
}

const install = function (_vue) {
    Vue = _vue;
    // 用混入把路由示例挂在原型上
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store;
            }
        }
    })

}
export default {Store,install}
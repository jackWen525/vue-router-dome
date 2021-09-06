let Vue;
// 创建路由类
class Router {
    path = "/";
    constructor(options) {
        this.$options = options;
        let inst = window.location.hash.slice(1) || "/";
        // 通过vue自带的工具包实现响应式
        Vue.util.defineReactive(this,"path",inst);
        window.addEventListener("hashchange",()=>{
            this.path = window.location.hash.slice(1) || "/";
        })
    }
}
// 实现install方法
Router.install = function (_vue) {
    Vue = _vue;
    // 用混入把路由示例挂在原型上
    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router;
            }
        }
    })

    // 创建路由组件
    Vue.component("router-link", {
        props: {
            to: {
                type: String,
                required: true
            }
        },
        render(h) {
            return h("a", { attrs: { href: "#" + this.to } }, this.$slots.default)
        },
    })

    Vue.component("router-view", {
        render(h) {
            // 通过循环找到对应的路由组件
            let com = this.$router.$options.routes.find(r => r.path === this.$router.path);
            // 渲染
            return h(com.component)
        },
    })
}


export default Router;
let Vue;
// 创建路由类
class Router {
    path;
    constructor(options) {
        this.$options = options;
        this.path = window.location.hash.slice(1) || "/";
        // 通过vue自带的工具包实现响应式
        // Vue.util.defineReactive(this,"path",inst);
        window.addEventListener("hashchange",()=>{
            this.path = window.location.hash.slice(1) || "/";
            this.routerList = [];
            this.addRouter()
        })
        Vue.util.defineReactive(this,"routerList",[]);
        this.addRouter()
    }
    addRouter(router){
        router = router || this.$options.routes;

        for (const iterator of router) {
    
            if(iterator.path === "/" && this.path === "/") {
                this.routerList.push(iterator);
                return;
            }
            if(iterator.path !== "/" && this.path.indexOf(iterator.path) != -1) {
                this.routerList.push(iterator);
                if(iterator.children) {
                    this.addRouter(iterator.children);
                }
                return;
            }
        }

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
            // 通过routerView来判断是不是路由组件
            this.$vnode.data.routerView = true;
            let parent = this.$parent;
            // 加标记 来判断路由嵌套的深度
            let num = 0;
            // 循环识别深度
            while (parent) {
                if(parent.$vnode && parent.$vnode.data) {
                    if(parent.$vnode.data.routerView) {
                        num++;
                    }
                }
                parent = parent.$parent
            }
            // 通过循环找到对应的路由组件
            let component = "";
            // 通过深度找到对应的路由
            let com = this.$router.routerList[num];
            if(com) {
                component = com
            }
            // 渲染
            return h(component.component)
        },
    })
}


export default Router;
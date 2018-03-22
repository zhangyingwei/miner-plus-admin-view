import VueRouter from 'vue-router';

const initRouter = () => {
    const routerParam = {
        mode: 'history',
        routes: [{
            path: '/admin',
            name: 'home',
            component: (resolve) => require(['components/welcome/home'], resolve)
        }, {
            path: '/admin/login',
            name: 'login',
            component: (resolve) => require(['components/login'], resolve)
        }, {
            path: '/admin/form',
            name: 'form',
            component: (resolve) => require(['components/demo-modules/form'], resolve)
        }, {
            path: '/admin/basic',
            name: 'basic',
            component: (resolve) => require(['components/treehole/basic'], resolve)
        }, {
            path: '/admin/statistic',
            name: 'statistic',
            component: (resolve) => require(['components/treehole/statistic'], resolve)
        }, {
            path: '/admin/settings',
            name: 'settings',
            component: (resolve) => require(['components/treehole/settings'], resolve)
        }, {
            path: '/admin/article/new',
            name: 'new',
            component: (resolve) => require(['components/treehole/article/new'], resolve)
        }, {
            path: '/admin/article/history',
            name: 'history',
            component: (resolve) => require(['components/treehole/article/history'], resolve)
        }, {
            path: '/admin/article/commont',
            name: 'commont',
            component: (resolve) => require(['components/treehole/article/commont'], resolve)
        }, {
            path: '/admin/article/kinds',
            name: 'kinds',
            component: (resolve) => require(['components/treehole/article/kinds'], resolve)
        }, {
            path: '/admin/resources',
            name: 'resources',
            component: (resolve) => require(['components/treehole/resources/resources'], resolve)
        }]
    };

    let router = new VueRouter(routerParam);

    router.beforeEach((to, from, next) => {
        HeyUI.$LoadingBar.start();
        // if (titleConfig[to.name]) {
        //   document.title = titleConfig[to.name] + ' - 应用';
        // } else {
        // document.title = '管理系统';
        // }
        // console.log(to.path)
        var user = Utils.getLocal("loginuser")
            // console.log("user", user)
            // console.log(user === 'null')
        if (user === 'null') {
            if (to.path === "/vue/admin/login") {
                next()
            } else {
                next('/vue/admin/login')
            }
        }
        next();
    })
    router.afterEach(() => {
        HeyUI.$LoadingBar.success();
        // Vue.nextTick(() => {
        //   $('.app-body').scrollTop(0);
        // });
    });
    return router;
}

export default initRouter;
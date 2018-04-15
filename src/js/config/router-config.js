import VueRouter from 'vue-router';

const initRouter = () => {
    const routerParam = {
        mode: 'history',
        routes: [{
            path: '/',
            name: 'home',
            component: (resolve) => require(['components/welcome/home'], resolve)
        }, {
            path: '/admin/login',
            name: 'login',
            component: (resolve) => require(['components/login'], resolve)
        }, {
            path: '/admin/res/new',
            name: 'newres',
            component: (resolve) => require(['components/miner/resources/newlink'], resolve)
        }, {
            path: '/admin/res/bad',
            name: 'badres',
            component: (resolve) => require(['components/miner/resources/badlink'], resolve)
        }, {
            path: '/admin/resources',
            name: 'resources',
            component: (resolve) => require(['components/miner/resources/links'], resolve)
        }, {
            path: '/admin/content/new',
            name: 'newcontent',
            component: (resolve) => require(['components/miner/content/new'], resolve)
        }, {
            path: '/admin/content/push',
            name: 'pushcontent',
            component: (resolve) => require(['components/miner/content/push'], resolve)
        }, {
            path: '/admin/content/history',
            name: 'historycontent',
            component: (resolve) => require(['components/miner/content/push'], resolve)
        }, {
            path: '/admin/content/tags',
            name: 'tags',
            component: (resolve) => require(['components/miner/content/tags'], resolve)
        }, ]
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
        var token = Utils.getLocal("miner-token")
        console.log("user", user)
        console.log("token",token)
        if (!user) {
            if (to.path === "/admin/login") {
                next()
            } else {
                next('/admin/login')
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
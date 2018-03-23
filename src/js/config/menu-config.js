const menuConfig = [{
        title: '首页',
        key: 'home',
        icon: 'h-icon-home'
    },
    {
        title: '资源管理',
        icon: 'h-icon-menu',
        key: 'res',
        children: [{
                title: '新增链接',
                icon: 'h-icon-message',
                key: 'newres'
            },
            {
                title: '失效链接',
                icon: 'h-icon-complete',
                key: 'badres'
            },
            {
                title: '链接管理',
                icon: 'h-icon-complete',
                key: 'resources'
            }
        ]
    },
    {
        title: '内容管理',
        icon: 'h-icon-calendar',
        key: 'content',
        children: [{
                title: '最新文章',
                icon: 'h-icon-edit',
                key: 'newcontent'
            },
            {
                title: '推送管理',
                icon: 'h-icon-link',
                key: 'pushcontent'
            },
            {
                title: '历史内容',
                icon: 'h-icon-message',
                key: 'historycontent'
            },
            {
                title: '标签管理',
                icon: 'h-icon-star-on',
                key: 'tags'
            }
        ]
    }
    // {
    //     title: '示例',
    //     icon: 'h-icon-star-on',
    //     children: [{
    //         title: '表单',
    //         icon: 'h-icon-search',
    //         key: 'form'
    //     }]
    // }
];

export default menuConfig;
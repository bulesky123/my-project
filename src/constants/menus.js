export const menus_old = [
    {
        key: '/app/data-monitor', title: '数据监控', icon: 'bank',id:'3333',
        sub: [
            {key: '/app/data-monitor', title: '数据监控', icon: 'exception'},
        ],
    },
    {
        key: '/app/event', title: '事件诊断', icon: 'contacts',
        sub: [
            {key: '/app/event/unusual', title: '异常事件', icon: 'exception'},
            {key: '/app/event/data-report', title: '统计报告', icon: 'exception'},
        ],
    },
    {
        key: '/app/data', title: '数据管理', icon: 'safety',
        sub: [
            {key: '/app/data/configure', title: '参数配置', icon: 'switcher'},
            {key: '/app/data/imitate', title: '数据模拟', icon: 'switcher'},
            {key: '/app/data/data-unusual', title: '模拟异常', icon: 'switcher'},
        ],
    }
];
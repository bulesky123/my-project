//easy-mock模拟数据接口地址
const EASY_MOCK = 'https://www.easy-mock.com/mock';
const MOCK_AUTH = EASY_MOCK + '/597b5ed9a1d30433d8411456/auth';         // 权限接口地址
export const MOCK_AUTH_ADMIN = MOCK_AUTH + '/admin';                      // 管理员权限接口
export const MOCK_AUTH_VISITOR = MOCK_AUTH + '/visitor';                  // 访问权限接口
const BASEURL = 'http://'+window.location.hostname+':4900/';
let config,env = process.env.NODE_ENV;
switch (env){
    case 'development':
        config={
            HTTP_MAIN:"auth/",
            LOGIN_URL:MOCK_AUTH_ADMIN,
            BASEURL:BASEURL
        };
        break;
    case 'rd':
        config={
            HTTP_MAIN:"auth/",
            LOGIN_URL:"",
            BASEURL:BASEURL
        };
        break;
    case 'production':
        config={
            HTTP_MAIN:"auth/",
            LOGIN_URL:"",
            BASEURL:BASEURL
        };
        break;
    default:
        config={
            HTTP_MAIN:"auth/",
            LOGIN_URL:"",
            BASEURL:BASEURL
        };
}
export default config;
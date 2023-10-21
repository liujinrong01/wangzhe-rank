"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("@tarojs/cli");
const tsconfig_paths_webpack_plugin_1 = require("tsconfig-paths-webpack-plugin");
const dev_1 = require("./dev");
const prod_1 = require("./prod");
// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
exports.default = (0, cli_1.defineConfig)(async (merge, { command, mode }) => {
    const baseConfig = {
        projectName: 'wangzhe-rank',
        date: '2023-10-19',
        designWidth(input) {
            var _a;
            // 配置 NutUI 375 尺寸
            if (((_a = input === null || input === void 0 ? void 0 : input.file) === null || _a === void 0 ? void 0 : _a.replace(/\\+/g, '/').indexOf('@nutui')) > -1) {
                return 375;
            }
            // 全局使用 Taro 默认的 750 尺寸
            return 750;
        },
        deviceRatio: {
            640: 2.34 / 2,
            750: 1,
            828: 1.81 / 2,
            375: 2 / 1
        },
        sourceRoot: 'src',
        outputRoot: 'dist',
        plugins: ['@tarojs/plugin-html'],
        defineConstants: {},
        copy: {
            patterns: [],
            options: {}
        },
        framework: 'react',
        compiler: { type: 'webpack5', prebundle: { enable: false } },
        cache: {
            enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
        },
        mini: {
            postcss: {
                pxtransform: {
                    enable: true,
                    config: {}
                },
                url: {
                    enable: true,
                    config: {
                        limit: 1024 // 设定转换尺寸上限
                    }
                },
                cssModules: {
                    enable: false,
                    config: {
                        namingPattern: 'module',
                        generateScopedName: '[name]__[local]___[hash:base64:5]'
                    }
                }
            },
            webpackChain(chain) {
                chain.resolve.plugin('tsconfig-paths').use(tsconfig_paths_webpack_plugin_1.default);
            }
        },
        h5: {
            publicPath: '/',
            staticDirectory: 'static',
            output: {
                filename: 'js/[name].[hash:8].js',
                chunkFilename: 'js/[name].[chunkhash:8].js'
            },
            miniCssExtractPluginOption: {
                ignoreOrder: true,
                filename: 'css/[name].[hash].css',
                chunkFilename: 'css/[name].[chunkhash].css'
            },
            postcss: {
                autoprefixer: {
                    enable: true,
                    config: {}
                },
                cssModules: {
                    enable: false,
                    config: {
                        namingPattern: 'module',
                        generateScopedName: '[name]__[local]___[hash:base64:5]'
                    }
                }
            },
            webpackChain(chain) {
                chain.resolve.plugin('tsconfig-paths').use(tsconfig_paths_webpack_plugin_1.default);
            }
        },
        rn: {
            appName: 'taroDemo',
            postcss: {
                cssModules: {
                    enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                }
            }
        }
    };
    if (process.env.NODE_ENV === 'development') {
        // 本地开发构建配置（不混淆压缩）
        return merge({}, baseConfig, dev_1.default);
    }
    // 生产构建配置（默认开启压缩混淆等）
    return merge({}, baseConfig, prod_1.default);
});
//# sourceMappingURL=index.js.map
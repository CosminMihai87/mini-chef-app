const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const isEnvDevelopment = process.env.NODE_ENV === 'development';

//Paths
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const appPath =  resolveApp('.');
const appSrcPath = resolveApp('src');
const appHtmlPath = resolveApp('src/index.html');
const appNodeModulesPath = resolveApp('node_modules');
const appBuildPath = resolveApp('build');
const appAssetsPath = resolveApp('src/assets');
const appFaviconPath = resolveApp('src/assets/favicon.ico');

//calcualtes the publicPath relative to 
const publicUrlOrPath = getPublicUrlOrPath(
  isEnvDevelopment,
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL
);

// Optimisation
const optimisation = isEnvDevelopment? {} : {
  minimize: true,
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        parse: {
          ecma: 8,
        },
        compress: {
          ecma: 5,
          warnings: false,
          comparisons: false,
          inline: 2,
          dead_code: true,
          unused: false,
          drop_debugger: false
        },
        mangle: {
          safari10: true,
        },
        keep_classnames: true,
        keep_fnames: true,
        output: {
          ecma: 5,
          comments: false,
          ascii_only: true,
        }
      }
    }),
    new CssMinimizerPlugin()
  ]
};

// returns cert files if provided in env, otherwise just true or false
const getHttpsConfig = () => {
  const { SSL_CRT_FILE, SSL_KEY_FILE, HTTPS } = process.env;
  const isHttps = HTTPS === 'true';

  if (isHttps && SSL_CRT_FILE && SSL_KEY_FILE) {
    const crtFile = path.resolve(appPath, SSL_CRT_FILE);
    const keyFile = path.resolve(appPath, SSL_KEY_FILE);
    const config = {
      cert: readEnvFile(crtFile, 'SSL_CRT_FILE'),
      key: readEnvFile(keyFile, 'SSL_KEY_FILE'),
    };

    validateKeyAndCerts({ ...config, keyFile, crtFile });
    return config;
  }
  return isHttps;
}

console.log(path.resolve(publicUrlOrPath,'/assets'));

module.exports = {
  target: 'web',
  stats: 'errors-warnings',
  mode: isEnvDevelopment ? 'development' : 'production',
  bail: !isEnvDevelopment,
  devtool: isEnvDevelopment ? 'source-map' : 'cheap-source-map',
  entry: './src/index.tsx',
  output: {
    filename: isEnvDevelopment? 'bundle.js' : '[name].[contenthash:8].js',
    chunkFilename: isEnvDevelopment? 'bundle.chunk.js' : '[name].[contenthash:8].chunk.js',
    path: appBuildPath,
    publicPath: publicUrlOrPath,
    assetModuleFilename: '[name].[hash:8][ext]',
    clean: true
  },
  infrastructureLogging: {
    level: 'none',
  },
  optimization: optimisation,
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          }
        },
        generator: {
          publicPath: '',
          outputPath: 'assets/images/'
        }
      },
      {
        test: /\.svg$/,
        type: 'asset',
        use: [
          {
            loader: require.resolve('@svgr/webpack'),
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
              titleProp: true,
              ref: true,
            },
          },
          {
            loader: require.resolve('file-loader'),
            options: {
              name: 'assets/images/[name].[contenthash:8][ext]',
            },
          },
        ],
        issuer: {
          and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset',
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/fonts/[name].[contenthash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }
      },
      {
        test: /\.(js|mjs)$/,
        exclude: /@babel(?:\/|\\{1,2})runtime/,
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          configFile: false,
          compact: false,
          presets: [
            [
              require.resolve('babel-preset-react-app/dependencies'),
              { helpers: true },
            ],
          ],
          cacheDirectory: true,
          cacheCompression: false,
          sourceMaps: isEnvDevelopment,
          inputSourceMap: isEnvDevelopment,
        },
      },
      {
        test: /\.s?[ac]ss$/,
        exclude: /\.module\.s?[ac]ss$/,
        use: [
          isEnvDevelopment && { 
            loader: require.resolve('style-loader') 
          },
          !isEnvDevelopment && MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 3,
              sourceMap: isEnvDevelopment,
              modules: {
                mode: 'icss'
              }
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              postcssOptions: {
                ident: 'postcss',
                config: false,
                plugins: [
                  'postcss-flexbugs-fixes',
                  [
                    'postcss-preset-env',
                    {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    },
                  ],
                  'postcss-normalize',
                ]
              },
              sourceMap: isEnvDevelopment,
            },
          },
        ].filter(Boolean)
      },
      {
        test: /\.module\.s?[ac]ss$/,
        use: [
          isEnvDevelopment && { 
            loader: require.resolve('style-loader') 
          },
          !isEnvDevelopment && MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 3,
              sourceMap: isEnvDevelopment,
              modules: {
                mode: 'local',
                getLocalIdent: getCSSModuleLocalIdent,
              }
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              postcssOptions: {
                ident: 'postcss',
                config: false,
                plugins: [
                  'postcss-flexbugs-fixes',
                  [
                    'postcss-preset-env',
                    {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    },
                  ],
                  'postcss-normalize',
                ]
              },
              sourceMap: isEnvDevelopment,
            },
          },
          {
            loader: require.resolve('resolve-url-loader'),
            options: {
              sourceMap: isEnvDevelopment,
              root: appSrcPath,
            },
          },
          {
            loader: require.resolve('sass-loader'),
            options: {
              sourceMap: true,
            },
          }
        ].filter(Boolean)
      }
    ]
  },
  plugins: [
    new ModuleNotFoundPlugin(appPath),
    isEnvDevelopment && 
      new ReactRefreshWebpackPlugin({
        overlay: false,
      }),
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: appHtmlPath,
          favicon: appFaviconPath
        },
        !isEnvDevelopment
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
          : undefined
      )
    ),
    !isEnvDevelopment && 
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css',
        chunkFilename: '[name].[contenthash:8].chunk.css'
      }),
    new WebpackManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: publicUrlOrPath,
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);
        const entrypointFiles = entrypoints.main.filter(
          fileName => !fileName.endsWith('.map')
        );
        return {
          files: manifestFiles,
          entrypoints: entrypointFiles,
        };
      },
    }),
    new ForkTsCheckerWebpackPlugin({
      async: isEnvDevelopment,
      typescript: {
        typescriptPath: require.resolve('typescript'),
        configFile: 'tsconfig.json',
        diagnosticOptions: {
          syntactic: true,
        },
        mode: 'write-references',
      },
      issue: {
        include: [
          { file: '../**/src/**/*.{ts,tsx}' },
          { file: '**/src/**/*.{ts,tsx}' },
        ],
        exclude: [
          { file: '**/src/**/__tests__/**' },
          { file: '**/src/**/?(*.){spec|test}.*' },
          { file: '**/src/setupTests.*' },
        ],
      },
      logger: {
        infrastructure: 'silent',
      }
    }),
    new ESLintPlugin({
      extensions: ['js', 'ts', 'tsx'],
      formatter: require.resolve('react-dev-utils/eslintFormatter'),
      eslintPath: require.resolve('eslint'),
      failOnError: !isEnvDevelopment,
      context: 'src',
      cache: true,
      cacheLocation: path.resolve(
        appNodeModulesPath,
        '.cache/.eslintcache'
      ),
      cwd: appPath,
      resolvePluginsRelativeTo: __dirname,
      baseConfig: {
        extends: [require.resolve('eslint-config-react-app/base')]
      },
    }),
    new StylelintPlugin()
  ].filter(Boolean),
  devServer: {
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
      reconnect: true
    },
    host: 'localhost',
    port: 3000,
    https: getHttpsConfig(),
    compress: true,
    historyApiFallback: true,
    hot: true,
    open: ['/mini-chef-app'],
    liveReload: false,
    static: {
      directory: path.join(__dirname, 'assets'),
      publicPath: [publicUrlOrPath],
      watch: {
        ignored: ignoredFiles(appSrcPath),
      }
    }
  }
};
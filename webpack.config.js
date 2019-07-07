var Encore = require('@symfony/webpack-encore');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
// directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    // .setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that's included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if you JavaScript imports CSS.
     */
    .addEntry('app', './assets/js/app.js')
    .addEntry('sb-admin-2.min-js', './assets/js/sb-admin-2.min.js')
    .addEntry('chart-area-demo', './assets/js/demo/chart-area-demo.js')
    .addEntry('chart-pie-demo', './assets/js/demo/chart-pie-demo.js')
    .addEntry('bootstrapBundle', 'bootstrap/dist/js/bootstrap.bundle.js')
    .addEntry('jquery.easing', 'jquery.easing/jquery.easing.min.js')


    .addStyleEntry('sb-admin-2.min-css', './assets/css/sb-admin-2.min.css')
    .addStyleEntry('fontawesome', '@fortawesome/fontawesome-free/css/all.min.css')

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()
    // .disableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // enables @babel/preset-env polyfills
    .configureBabel(() => {
    }, {
        useBuiltIns: 'usage',
        corejs: 3,
    })

    // enables Sass/SCSS support
    // .enableSassLoader()

    // uncomment if you use TypeScript
    // .enableTypeScriptLoader()

    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    // .enableIntegrityHashes(Encore.isProduction())

    // uncomment if you're having problems with a jQuery plugin
    .autoProvidejQuery()

    // uncomment if you use API Platform Admin (composer req api-admin)
    .enableReactPreset()
    // .addEntry('admin', './assets/js/admin.js')


    // will be applied for `encore dev --watch` and `encore dev-server` commands
    .configureWatchOptions(watchOptions => {
        watchOptions.poll = 250; // check for changes every 250 milliseconds
    })

    .autoProvideVariables({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
    })

    .copyFiles({
        from: './assets/img/',
        to: 'img/[path][name].[hash:8].[ext]',
    })


    .addLoader({
        test: /\.csv$/,
        loader: 'csv-loader',
        options: {
            dynamicTyping: true,
            header: true,
            skipEmptyLines: true
        }
    })

    .cleanupOutputBeforeBuild()

;


module.exports = Encore.getWebpackConfig();

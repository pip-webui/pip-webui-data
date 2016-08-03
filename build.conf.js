module.exports = {
    module: {
        name: 'pipData',
        styles: 'data'
    },
    build: {
        js: true,
        ts: true,
        html: false,
        css: false,
        lib: true,
        images: false,
        dist: false
    },
    file: {
        lib: [
            '../pip-webui-test/dist/**/*',
            '../pip-webui-lib/dist/**/*',
            '../pip-webui-core/dist/**/*'
        ]
    },
    samples: {
        port: 8190
    },
    api: {
        port: 8191
    }
};

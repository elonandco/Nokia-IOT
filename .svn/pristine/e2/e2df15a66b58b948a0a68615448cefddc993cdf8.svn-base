/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 * Override at the last minute with global.filterSystemConfig (as plunkers do)
 */
(function(global) {

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'src':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { defaultExtension: 'js' },
    'angular2-highcharts':        {main: 'index', format: 'cjs', defaultExtension: 'js'},
    '@ngrx/store':                {main: 'index', format: 'cjs', defaultExtension: 'js'},
    'primeng':                    {defaultExtension: 'js'}
  };

  // map tells the System loader where to look for things
  var map = {
    'src':                        'src', // 'dist',
    'rxjs':                       'node_modules/rxjs',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    '@angular':                   'node_modules/@angular',
    'lodash':                     'node_modules/lodash/lodash.js',
    'angular2-highcharts':        'node_modules/angular2-highcharts/dist',
    'highcharts/highstock.src':   'node_modules/highcharts/highstock.src.js',
    'highcharts/highcharts-3d':   'node_modules/highcharts/highcharts-3d.src.js',
    "primeng":                    "node_modules/primeng",
    '@ngrx/store':                'node_modules/@ngrx/store'

  };

  var paths= {
    'dragula':                    'node_modules/dragula/dist/dragula.js',
    'ng2-dragula/*':              'node_modules/ng2-dragula/ng2-dragula.js'
  };

  var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router-deprecated',
    '@angular/testing',
    '@angular/upgrade'
  ];

  var meta={
    lodash:                        {format:'amd'}
  };

  // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
  packageNames.forEach(function(pkgName) {
    packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });

  var config = {
    defaultJSExtensions: true,
    map: map,
    packages: packages,
    paths: paths,
    meta: meta
  };

  System.config(config);

})(this);

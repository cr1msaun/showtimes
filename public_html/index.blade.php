<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="description" content="Cinema Planning - showtimes planning tool for the cinemas">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1">

    <title>Cinema Planning - showtimes planning tool for the cinemas</title>

    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,400,700,200italic,400italic,700italic">

    <!-- Styles -->
    <link rel="stylesheet" href="/bower_components/normalize-css/normalize.css">
    <link rel="stylesheet" href="/bower_components/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="/bower_components/angular-material/angular-material.min.css">
    <link rel="stylesheet" href="/bower_components/angular-material/layouts/angular-material.layouts.css">
    <link rel="stylesheet" href="/assets/css/app.css">

    <!-- Scripts -->
    <script src="/bower_components/angular/angular.js"></script>
    <script src="/bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
    <script src="/bower_components/angular-resource/angular-resource.min.js"></script>
    <script src="/bower_components/angular-material/angular-material.js"></script>
    <script src="/bower_components/angular-messages/angular-messages.min.js"></script>
    <script src="/bower_components/angular-animate/angular-animate.min.js"></script>
    <script src="/bower_components/angular-aria/angular-aria.min.js"></script>
    <script src="/bower_components/moment/min/moment.min.js"></script>
</head>
<body ng-app="app" ng-controller="AppCtrl as app">
    <div id="main" ui-view></div>

    <script src="/app/app.js"></script>
    <script src="/app/app.routes.js"></script>
    <script src="/app/app.locale.js"></script>

    <!-- Services -->
    <script src="/app/services/CinemaSvc.js"></script>
    <script src="/app/services/HallSvc.js"></script>
    <script src="/app/services/MovieSvc.js"></script>
    <script src="/app/services/PlanningSvc.js"></script>

    <!-- Controllers -->
    <script src="/app/controllers/AppCtrl.js"></script>
    <script src="/app/controllers/DashboardCtrl.js"></script>
    <script src="/app/controllers/SettingsCtrl.js"></script>
    <script src="/app/controllers/PlanningCtrl.js"></script>
    <script src="/app/controllers/AddMovieCtrl.js"></script>

    <!-- Directives -->
    <script src="/app/directives/hall.js"></script>
    <script src="/app/directives/hallDropzone.js"></script>
    <script src="/app/directives/movie.js"></script>
    <script src="/app/directives/showtime.js"></script>
    <script src="/app/directives/break.js"></script>
</body>
</html>

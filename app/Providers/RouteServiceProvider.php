<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\RateLimiter;

class RouteServiceProvider extends ServiceProvider
{
    public const HOME = '/home';

    public function boot(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });

        $this->routes(function (Router $router) {
            $router->middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            $router->middleware('web')
                ->any('{any}', fn() => view('vue'))
                ->where('any', '^(?!api).*$');
        });
    }
}

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/**
 * Disable return-type rule to leave router 'component' imports with short syntax
 */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            props: true,
            children: [],
        },
    ],
});

export default router;
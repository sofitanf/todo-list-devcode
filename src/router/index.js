import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'dashboard',
            component: () =>
                import ('../views/Dashboard.vue'),
        },
        {
            path: '/activity/:id',
            name: 'activity',
            component: () =>
                import ('../views/Activity.vue'),
        },
    ],
});

export default router;
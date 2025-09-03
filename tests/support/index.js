import { test as base, expect } from '@playwright/test';

import { LandingPage } from '../pages/LandingPage';
import { MoviesPage } from '../pages/MoviesPage';
import { LoginPage } from '../pages/LoginPage';
import { Toast } from '../pages/Components';

const test = base.extend({
    page: async ({ page }, use) => {

        const context = page;

        context['landing'] = new LandingPage(page); 
        context['login'] = new LoginPage(page); 
        context['movies'] = new MoviesPage(page); 
        context['toast'] = new Toast(page); 

        await use(context);
    }
})

export { test, expect }

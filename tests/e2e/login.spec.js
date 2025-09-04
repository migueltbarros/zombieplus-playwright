import { test } from '../support';

test('Deve logar como admin', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('admin@zombieplus.com', 'pwd123');
    await page.login.isLoggedIn('Admin');
})

test('Não deve logar com email incorreto', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('adminzombieplus.com', 'pwd123');
    await page.login.alertHaveText('Email incorreto');
})

test('Não deve logar quando o email não é preenchido', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('', 'pwd123');
    await page.login.alertHaveText('Campo obrigatório');
})

test('Não deve logar com senha incorreta', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('admin@zombieplus.com', 'pwd1234');

    const message = 'Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.';
    await page.toast.containText(message);
})

test('Não deve logar quando a senha não é preenchida', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('admin@zombieplus.com', '');
    await page.login.alertHaveText('Campo obrigatório');
})

test('Não deve logar quando nenhum campo é preenchido', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('', '');
    await page.login.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório'
    ]);
})

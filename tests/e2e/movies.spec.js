import { test } from '../support';

import data from '../support/fixture/movies.json' assert { type: 'json' };

import { executeSQL } from '../support/database';

test('Deve poder cadastrar um novo filme', async ({ page }) => {
    const movie = data.create;
    await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}';`);

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.movies.create(movie);
    await page.toast.containText('Cadastro realizado com sucesso!');
})

test('Não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.movies.goForm();
    await page.movies.submit();

    await page.movies.alertHaveText([
        'Por favor, informe o título.',
        'Por favor, informe a sinopse.',
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'
    ]);
})
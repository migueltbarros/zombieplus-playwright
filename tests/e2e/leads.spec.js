import { test, expect } from '../support';
import { faker } from '@faker-js/faker';

test('Deve cadastrar um lead na fila de espera', async ({ page }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  await page.leads.visit();
  await page.leads.openLeadModel();
  await page.leads.submitLeadForm(leadName, leadEmail);

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';
  await page.toast.containText(message);
});

test('Não deve cadastrar quando o email já existe', async ({ page, request }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  });

  expect(newLead.ok()).toBeTruthy();

  await page.leads.visit();
  await page.leads.openLeadModel();
  await page.leads.submitLeadForm(leadName, leadEmail);

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.';
  await page.toast.containText(message);
});

test('Não deve cadastrar com email incorreto', async ({ page }) => {
  await page.leads.visit();
  await page.leads.openLeadModel();
  await page.leads.submitLeadForm('Miguel Torres Barros', 'mtb.email.com');
  await page.leads.alertHaveText('Email incorreto');
});

test('Não deve cadastrar quando o email não é preenchido', async ({ page }) => {
  await page.leads.visit();
  await page.leads.openLeadModel();
  await page.leads.submitLeadForm('Miguel Torres Barros', '');
  await page.leads.alertHaveText('Campo obrigatório');
});

test('Não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  await page.leads.visit();
  await page.leads.openLeadModel();
  await page.leads.submitLeadForm('', 'mtb@email.com');
  await page.leads.alertHaveText('Campo obrigatório');
});

test('Não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  await page.leads.visit();
  await page.leads.openLeadModel();
  await page.leads.submitLeadForm('', '');
  await page.leads.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ]);
});

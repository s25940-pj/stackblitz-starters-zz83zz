const request = require('supertest');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Zaimportuj lub zdefiniuj serwer, np. jeśli serwer jest zdefiniowany w server.js

describe('Testowanie serwera HTTP', () => {
  let server;
  beforeAll(() => {
    server = require('../server'); // Ścieżka do pliku serwera
  });

  afterAll(() => {
    server.close(); // Zamykanie serwera po zakończeniu testów
  });

  test('Powinien zwrócić stronę główną', async () => {
    const response = await request(server).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Witaj na stronie głównej');
  });

  test('Powinien obsługiwać pliki statyczne', async () => {
    const response = await request(server).get('/style.css');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('css')
    );
  });

  test('Powinien dynamicznie generować treść dla /dynamic', async () => {
    const response = await request(server).get('/dynamic');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain(new Date().getFullYear().toString()); // Prosty test, sprawdzający obecność roku w odpowiedzi
  });

  test('Powinien poprawnie zwracać pliki JavaScript', async () => {
    const response = await request(server).get('/test2.js');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('javascript')
    );
  });
});
